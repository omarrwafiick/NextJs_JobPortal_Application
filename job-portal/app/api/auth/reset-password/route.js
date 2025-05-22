import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { hash } from 'bcryptjs';

export async function POST(req, {params}) {
  try {
    const token = params.token;
    const { email, password } = await req.json();
    const user = await prisma.user.findUnique({
        where:{
            email,
            resetToken:token
        }, 
    });
    if(!user || user.resetExpiresAt < Date.now()) return NextResponse.json({ success: false, message: "invalid credintials" }, { status: 400 });

    user.password = await hash(password, 10);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
