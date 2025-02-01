import Loading from "@/components/common/Loading";
import Task from "@/components/Todo/Task";
import Protect from "@/components/protection"
import { Suspense } from "react";
import Appbar from "@/components/Appbar";

export  default async function Page(){


  return(
    <div className="lg:w-10/12 w-11/12 mx-auto  text-white flex p-5 max-h-[100%]">
      <Suspense fallback={<Loading />}>
        <div className="w-full flex flex-col gap-10">
          <Appbar/>
          <div className="mt-20 max-h-[calc(100vh-8rem)] overflow-x-hidden overflow-y-scroll scrollbar-hidden w-11/12 p-4 mx-auto">
              <Protect><Task /></Protect> 
          </div>

        </div>
      </Suspense>
    </div>

  )
}