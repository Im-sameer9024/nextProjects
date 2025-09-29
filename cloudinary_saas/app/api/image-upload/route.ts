import { UploadResult } from "@/types/cloudinary";
import cloudinary from "@/utils/Cloudinary";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      {
        success: false,
        message: "User not authenticated",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const formData = await request.json();

    const file = formData.file as File | null;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "File Not Found",
        },
        {
          status: 400,
        }
      );
    }

    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    const dataUri = `data:${file.type};base64,${base64}`;

    const result: UploadResult = await cloudinary.uploader.upload(dataUri, {
      resource_type: "image",
      folder: process.env.CLOUDINARY_IMAGE_FOLDER,
      transformation: [
        {
          quality: "auto",
          fetch_format: "auto",
        },
      ],
      eager: [
        { width: 300, height: 300, crop: "fill" }, // Thumbnail
        { width: 600, height: 400, crop: "limit" }, // Medium size
      ],
    });

    return NextResponse.json(
      {
        success: true,
        message: "Image uploaded successfully",
        data: result,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error occur in ImageUpload api ", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
