import { NextResponse } from "next/server";
import prisma from '../../lib/prisma';

export async function PUT(req) {
  try {
    const { name , tagsIds, email } = await req.json();  
    
    await prisma.user.update({
      where: { email },
      data: {
        name,
        skills: {
          connect: tagsIds.map(id => ({ id }))
        },
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function DELETE({params}) {
  try {
    const userId = params.userid;  
    
    await prisma.user.delete({
      where: { 
          id:userId
       }
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
