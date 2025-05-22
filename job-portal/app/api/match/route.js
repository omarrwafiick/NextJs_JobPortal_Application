import { NextResponse } from "next/server";
import prisma from '../../lib/prisma';

export async function POST(req) {
  try {
    const {email} = await req.json();

    const userWithTags = await prisma.user.findUnique({
        where:{
            email
        },
        include:{
            skills
        }
    });
 
    const jobsWithTags = await prisma.job.findMany({
        include:{
            tags
        }    
    });

    if(!userWithTags || !jobsWithTags) return NextResponse.json({ success: false, message:'nothing was found' }, { status: 404 });

    const userTagIds = user.skills.map(tag => tag.id);

    const matchedJobs = jobs.filter(job =>
      job.tags.some(tag => userTagIds.includes(tag.id))
    );
    
    return NextResponse.json({ success: true, data: matchedJobs }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
