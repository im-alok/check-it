//create an api to fetch all the tasks associated to user

import { prisma } from "@/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        }
    }
}

export async function GET(_req: NextRequest) {
    try {
        const session = await getServerSession();

        const userId = session?.user?.id

        // get all usertask

        const userTaskDetails = await prisma.tODO.findMany({
            where:{
                userId:userId
            },
            include:{
                task:{
                    orderBy:[
                        {status:'asc'},
                        {createdAt:'desc'}
                    ]
                }
            }
        })

        return NextResponse.json({
            success: true,
            message: 'User task fetched successfully',
            userTask: userTaskDetails
        }, { status: 200 })
    } catch (error:unknown) {

        return NextResponse.json({
            success: false,
            message: error instanceof Error ? error.message : "else"
        }, { status: 500 })
    }
}