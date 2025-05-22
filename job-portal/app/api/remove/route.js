import cloudinary from "@/app/lib/cloudinary";  
import { NextResponse } from "next/server";

export async function POST({params}) { 
  const public_id = params.id;

  if (!public_id) return NextResponse.json({ error: "Something went wrong" }, { status: 400 });
  
  try {
    await cloudinary.uploader.destroy(user.imagePublicId);
  } catch (error) {
    return NextResponse.json({success: false},{status: 400});
  } 

  return NextResponse.json({success: true},{status: 200});
}
 