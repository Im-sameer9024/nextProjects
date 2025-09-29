import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function POST(request: Request) {

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

        const{publicId} = await request.json();

        
        
    } catch (error) {
        
    }
}