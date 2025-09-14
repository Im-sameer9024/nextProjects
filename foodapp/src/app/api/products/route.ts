import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  const cat = searchParams.get("cat");

  try {
    const products = await prisma.product.findMany({
      where: {
        ...(cat ? { catSlug: cat } : { bestSeller: true }),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Products fetched successfully",
        products,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error occur in best seller products", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
        error,
      },
      { status: 500 }
    );
  }
};
