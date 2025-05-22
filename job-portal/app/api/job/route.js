import { NextResponse } from "next/server";
import prisma from '../../lib/prisma';

export async function POST(req) {
  try {  
  const { title, description, tagsIds, companyId } = await req.json(); 
  
    const post = await prisma.job.create({
      data:{
        title,
        description,
        companyId,
        tags:{
          connect:{
            id: tagsIds.map(id => ({ id }))
          }
        }
      }
    }); 

    return NextResponse.json({ success: true, postId: post.id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function GET() {
  try {  
    const jobs = await prisma.job.findMany();

    if(!jobs) return NextResponse.json({ success: false, message:'nothing was found' }, { status: 404 });

    return NextResponse.json({ success: true, data: jobs }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}