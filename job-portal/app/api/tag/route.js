import { NextResponse } from "next/server";
import prisma from '../../lib/prisma';
//will be used by admin so we can prevent unnecessarily or duplicates
export async function POST(req) {
  try {
    const {name, userId, jobId} = await req.json();

    const newTag = await prisma.tag.create({
        data:{
            name,
            users:{
                connect:{
                    id: userId
                }
            },
            jobs:{
                connect:{
                    id: jobId
                }
            }
        }
    });

    return NextResponse.json({ success: true, tagId: newTag.id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function GET() {
  try {  
    const tags = await prisma.tag.findMany();
    if(!tags) return NextResponse.json({ success: false, message:'nothing was found' }, { status: 404 });
    return NextResponse.json({ success: true, date: tags }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function DELETE({params}) {
  try { 
    const tagId = params.tagid;
    const tag = await prisma.tag.delete({
      where:{
        id: tagId
      }
    }); 
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
