import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

async function PUT(req:NextRequest){

    try {

        const {todoId, desc} = await req.json();

        if(!todoId || !desc){
            return NextResponse.json({
                success:false,
                message:'Data is missing'
            },{status:400})
        }

        //fetching the todo

        const todoDetails = await prisma.tODO.findFirst({
            where:{
                id:todoId
            }
        })

        if(!todoDetails){
            return NextResponse.json({
                sucess:false,
                message:'Todo details not found'
            },{status:400})
        }

        //update the todoanme
        await prisma.tODO.update({
            where:{
                id:todoId
            },
            data:{
                description:desc
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