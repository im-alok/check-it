import Loading from "@/components/common/Loading";
import Task from "@/components/Todo/Task";
import Protect from "@/components/protection"
import { Suspense } from "react";
import Appbar from "@/components/Appbar";

export  default async function Page(){


  return(
    <div className="w-[100%] xs:w-11/12 mt-10 text-white flex mx-auto p-5 max-h-[calc(100vh-8rem)] overflow-x-hidden overflow-y-scroll scrollbar-hidden custom-scrollbar ">
      <Suspense fallback={<Loading />}>
        <Appbar/>
        <Protect><Task /></Protect>
      </Suspense>
    </div>

  )
}