import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req:NextRequest){

    try {

        const {taskId, status} = await req.json();
        console.log(taskId, status);

        if(!taskId && !status){
            return NextResponse.json({
                success:false,
                message:'Data is missing'
            },{status:400})
        }

        //fetching the todo

        const taskDetails = await prisma.task.findFirst({
            where:{
                id:taskId
            }
        })

        if(!taskDetails){
            return NextResponse.json({
                sucess:false,
                message:'task details not found'
            },{status:400})
        }

        //update the todoanme
        await prisma.task.update({
            where:{
                id:taskId
            },
            data:{
                status:status
            }
        })


        return NextResponse.json({
            success:true,
            message:'done'

        })
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:'Something went wrong'
        },{status:200})
    }
}