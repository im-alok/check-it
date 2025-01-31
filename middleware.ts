import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req:NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;
  // console.log(token)

  // Redirect authenticated users away from sign-in page
  if (token && pathname === "/api/auth/signin" || token && pathname === "/auth") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Redirect unauthenticated users away from protected pages

  return NextResponse.next(); // Continue request if no conditions match
}

// Apply middleware only to these paths
export const config = {
  matcher: ["/api/auth/signin","/auth"],
};
