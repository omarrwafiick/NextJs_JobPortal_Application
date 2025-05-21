import { hash } from 'bcryptjs';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { name, email, password, role } = await req.json();
  
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }
 
  const hashedPassword = await hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });

  return NextResponse.json({ user }, { status: 201 });
}
