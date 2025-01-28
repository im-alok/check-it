import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try {

        const {todoId, taskDescription} = await req.json(); 

        if(!todoId || !taskDescription){
            return NextResponse.json({
                success:false,
                message:'Data are missing'
            }, {status:400})
        }

        const todo = await prisma.tODO.findUnique({
            where:{
                id:todoId
            }
        })

        if(!todo){
            return NextResponse.json({
                success:false,
                message:'Todo is not found'
            })
        }

        //creating the task

        const taskDetails = await prisma.task.create({
            data:{
                todoId:todoId,
                taskDescription:taskDescription
            }
        })

        return NextResponse.json({
            success:true,
            message:'task created successfully',
            taskDetails
        },{status:200})

    } catch (error) {
        return NextResponse.json({
            success:false,
            message:'Something went wrong'
        },{status:500})
    }
}