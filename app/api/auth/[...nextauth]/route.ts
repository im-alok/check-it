import { AUTH_OPTION } from "@/lib/auth"
import NextAuth from "next-auth"

const fn = NextAuth(AUTH_OPTION);

export {fn as GET, fn as POST}



