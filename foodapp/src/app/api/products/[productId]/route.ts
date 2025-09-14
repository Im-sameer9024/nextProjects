import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export const GET = async (req:NextRequest,{ params }: { params: { productId: string } }) => {
  try {
    const { productId } = await params;

    const products = await prisma.product.findUnique({
      where: {
        id: productId,
      }      
    });

    if (!products) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 }
      );
    }


    console.log("prducts",products)

    return NextResponse.json(
      {
        success: true,
        message: "Products fetched successfully",
        products,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error occur while fetching products", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error occur while fetching products",
        error,
      },
      { status: 500 }
    );
  }
};
