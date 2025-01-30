import Task from "@/components/Todo/Task";
import {getServerSession} from 'next-auth'
import { redirect } from "next/navigation";

export  default async function(){

  const session = await getServerSession();
  if(!session){
    redirect('/api/auth/signin')
    // return;
  }
    

  return(
    <div className="min-w-11/12 mt-10 text-white flex mx-auto p-5 max-h-[calc(100vh-8rem)] overflow-x-hidden overflow-y-scroll scrollbar-hidden custom-scrollbar">
      <Task />
      {/* dsds */}
    </div>

  )
}