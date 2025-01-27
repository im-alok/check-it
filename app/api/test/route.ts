
import { AUTH_OPTION } from "@/lib/auth";
import { prisma } from "@/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(){

    const session = await getServerSession(AUTH_OPTION);
    session && console.log('data fetched');
    console.log(session);

    return NextResponse.json({
        success:true
    })
}


