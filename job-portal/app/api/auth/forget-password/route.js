import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import crypto from 'crypto';

export async function POST(req) {
  try {
    const {email} = await req.json();
    const user = await prisma.user.findUnique({
        where:{
            email
        }
    });
    if(!user) return NextResponse.json({ success: false, message: "user was not found" }, { status: 404 });

    const token = crypto.randomBytes(32).toString('hex');
    user.resetToken = token;
    user.resetExpiresAt=  new Date(Date.now() + 15 * 60 * 1000);;

    return NextResponse.json({ success: true, token }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 400 });
  }
}
