import { prisma } from "@/prisma";
import Github from "next-auth/providers/github"
import bcrypt from 'bcrypt'
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import { Adapter } from "next-auth/adapters";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { SessionStrategy } from "next-auth";


export const AUTH_OPTION = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID || " ",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            allowDangerousEmailAccountLinking: true
        }),
        Github({
            clientId: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SCERET || "",
            allowDangerousEmailAccountLinking: true // to protect user data from which ever provider they logged in
        }),
    ],
    session: { strategy: "jwt" as SessionStrategy },
    callbacks: {
        async jwt({token}:any){
            return token;
        },
        async session({ session, token }: any) {
            if(token){
                session.user.id = token.sub;
            }

            return session
        }
    },
    secret: process.env.AUTH_SECRET,

}