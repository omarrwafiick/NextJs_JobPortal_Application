import { NextResponse } from "next/server";
import prisma from '../../../lib/prisma';
//get job applicants
export async function GET({params}) {
  try { 
    const jobid = params.userid;

    const job= await prisma.job.findMany({
        where:{
            id: jobid
        },
        include:{
          applications:{
            include:{
              user
            }
          }
        }
    });

    if(!job) return NextResponse.json({ success: false, message:'nothing was found' }, { status: 404 });

    return NextResponse.json({ success: true, data: job }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}