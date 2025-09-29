import cloudinary from "@/utils/Cloudinary";
import prisma from "@/utils/Prisma";
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
    const title = formData.title as string;
    const description = formData.description as string;
    const originalSite = formData.originalSite as string;

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

    //Convert file to base64

    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    const dataUri = `data:${file.type};base64,${base64}`;

    //upload to cloudinary

    const result = await cloudinary.uploader.upload(dataUri, {
      resource_type: "video",
      folder: process.env.CLOUDINARY_VIDEO_FOLDER,
      chunk_size: 6000000,
      transformation: [
        {
          quality: "auto",
          fetch_format: "auto",
          crop: "limit",
          width: 1920,
          height: 1080,
          aspect_ratio: "16:9",
          background: "#000000",
        },
      ],
      eager: [
        { width: 300, height: 300, crop: "pad", audio_codec: "none" },
        {
          width: 160,
          height: 100,
          crop: "crop",
          gravity: "south",
          audio_codec: "none",
        },
      ],
      eager_async: true,
    });

    const video = await prisma.video.create({
      data: {
        title,
        description,
        publicId: result.public_id,
        originalSize: originalSite,
        compressedSize: String(result.bytes),
        duration: String(result.duration),
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Image uploaded successfully",
        data: video,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error occur in video api ", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
