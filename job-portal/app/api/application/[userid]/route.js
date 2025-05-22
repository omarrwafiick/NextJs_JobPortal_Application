import { NextResponse } from "next/server";
import prisma from '../../../lib/prisma';

export async function GET({params}) {
  try { 
    const userId = params.userid;

    const jobApplications = await prisma.jobApplication.findMany({
        where:{
            userId
        }
    });

    if(!jobApplications) return NextResponse.json({ success: false, message:'nothing was found' }, { status: 404 });

    return NextResponse.json({ success: true, data: jobApplications }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
//withdraw user from job application
export async function DELETE({params}) {
  try { 
    const userId = params.userid;

    const jobApplications = await prisma.jobApplication.delete({
        where:{
            userId
        }
    }); 

    return NextResponse.json({ success: true, data: jobApplications }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}