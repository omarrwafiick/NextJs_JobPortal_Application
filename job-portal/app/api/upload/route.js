import cloudinary from "@/app/lib/cloudinary";
import { NextResponse } from "next/server";
import prisma from '../../lib/prisma';

export async function POST(req) {
  try {
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

  return NextResponse.json({ url: uploadResult.secure_url, id: uploadResult.public_id });
    
  } catch (error) {
    return NextResponse.json({ succes: false },{status:400});
  }
  
} 

export async function PUT({params}) {
  try {
  const userId = params.id; 
  const url = params.id; 
  const public_id = params.id; 
  //note:old files already removed and new is added via client

  if(type==='profile'){
    const user = await prisma.User.Update({
        where:{
          id: userId
        },
        data:{
          profileUrl: url,
          profilePublicId: public_id
        }
      });
  }
  else if(type==='resume'){
    const user = await prisma.User.Update({
        where:{
          id: userId
        },
        data:{
          resumeUrl: url,
          resumePublicId: public_id
        }
      });
  } 

  return NextResponse.json({ succes:true },{status: 200});
    
  } catch (error) {
    return NextResponse.json({ succes: false },{status:400});
  }
} 