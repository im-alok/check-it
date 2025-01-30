import Loading from "@/components/common/Loading";
import Task from "@/components/Todo/Task";
import {getServerSession} from 'next-auth'
import { redirect } from "next/navigation";
import { Suspense } from "react";

export  default async function(){

  const session = await getServerSession();
  if(!session){
    redirect('/api/auth/signin')
    // return;
  }
    

  return(
    <div className="w-[100%] xs:w-11/12 mt-10 text-white flex mx-auto p-5 max-h-[calc(100vh-8rem)] overflow-x-hidden overflow-y-scroll scrollbar-hidden custom-scrollbar ">
      <Suspense fallback={<Loading />}>
        <Task />
      </Suspense>
    </div>

  )
}