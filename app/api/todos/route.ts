import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try {

        const {userId} = await req.json();

        if(!userId){
            return NextResponse.json({
                success:false,
                message:"some details is missing"
            },{status:400});
            
        }

        // getting the user details

        const userDetails = await prisma.user.findUnique({
            where:{
                id:userId
            }
        })

        if(!userDetails){
            return NextResponse.json({
                success:false,
                message:'UserDetails is incorrect'
            },{status:404})
        }


        //creating the heading // task
        const name = new Date().toLocaleDateString('en-US',{
            day:'numeric',
            month:'long',
            year: 'numeric'
        })
    

        const headingDetails = await prisma.tODO.create({
            data:{
                userId:userDetails?.id,
                name:name
            }
        })


        return NextResponse.json({
            success:true,
            message:'space from adding task created successfully'
        },{status:200})

    } catch (error) {
        return NextResponse.json({
            success:false,
            message:'Something went wrong'
        },{status:500})
    }
}