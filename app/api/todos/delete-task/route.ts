import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req:NextRequest){
    try {

        const {taskId} = await req.json();

        if(!taskId){
            return NextResponse.json({
                success:false,
                message:"Data is missing"
            },{status:400})
        }

        const taskDetails = await prisma.task.findFirst({
            where:{
                id:taskId
            }
        })

        if(!taskDetails){
            return NextResponse.json({
                success:false,
                message:'TaskID is invalid'
            },{status:400})
        }

        // delete the task

        await prisma.task.delete({
            where:{
                id:taskId
            }
        })

        return NextResponse.json({
            success:true,
            message:'Task deleted successFully'
        },{status:200})
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:'Something went wrong'
        },{status:500})
    }
}