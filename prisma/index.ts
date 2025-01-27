import { PrismaClient } from "@prisma/client";

let globalForPrimsa = global as unknown as {prisma:PrismaClient}

export const prisma = globalForPrimsa.prisma || new PrismaClient();

if(process.env.NODE_ENV !== "production")
    globalForPrimsa.prisma = prisma