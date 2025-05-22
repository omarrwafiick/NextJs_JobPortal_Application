import { NextResponse } from "next/server";
import prisma from '../../../lib/prisma';  

export async function GET({params}) {
  try { 
    const tagId = params.tagid;
    const tag = await prisma.tag.findUnique({
      where:{
        id: tagId
      }
    });
    if(!tag) return NextResponse.json({ success: false, message:'nothing was found' }, { status: 404 });
    return NextResponse.json({ success: true, date: tag }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
 