import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

async function PUT(req:NextRequest){

    try {

        const {taskId, status} = await req.json();

        if(!taskId || !status){
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
            message:'updated SuccessFully'

        })
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:'Something went wrong'
        },{status:200})
    }
}