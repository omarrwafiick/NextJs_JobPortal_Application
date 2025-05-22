import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma'; 

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query'); 

    const jobs = await prisma.job.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          {
            tags: {
              some: {
                name: { contains: query, mode: 'insensitive' },
              },
            },
          },
        ],
      },
      include: {
        company: true,
        tags: true,
      },
    });

    return NextResponse.json({ success: true, data: jobs }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
