import { AUTH_OPTION } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";



const protection =  async ({ children }: { children: React.ReactNode }) => {

  console.log('router page done')
  const session = await getServerSession(AUTH_OPTION)
  if(!session){
    redirect('/api/auth/signin')
  }

  return <div>
    {children}
  </div>;
};

export default protection;
