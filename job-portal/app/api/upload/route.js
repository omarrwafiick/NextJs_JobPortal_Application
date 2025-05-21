import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export async function POST(req) {
  const formData = await req.formData();

  const file = formData.get("file");  
  const type = formData.get("type");  

  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "File missing" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const uploadResult = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        resource_type: "auto", 
        folder: `jobportal/${type}`,
      },
      (error, result) => {
        if (error) reject(error);
        resolve(result);
      }
    ).end(buffer);
  });

  return NextResponse.json({ url: uploadResult.secure_url });
}

export async function GET(req) {
  
}