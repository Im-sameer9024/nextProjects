import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export const GET = async() => {
  try {

    const categories = await prisma.category.findMany({
      include:{
        products:true
      }
    })

    return NextResponse.json(
      {
        success: true,
        message: "Categories fetched successfully",
        categories,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        status: 500,
        message: "Failed to fetch categories",
      },
      {
        status: 500,
      }
    );
  }
};
