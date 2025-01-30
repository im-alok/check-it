"use client"
import { signIn, signOut, useSession } from "next-auth/react"

import { LuNotebookPen } from "react-icons/lu";
import Button from "./Button";
import { NavItems } from "@/lib/data";
import Link from "next/link";
import Underline from "./common/underline";
import Profile from "./Appbar/Profile";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {createNewTodo} from "@/db/apicalls"

export default function(){

    const session= useSession();
    const router = useRouter();
    // console.log(session?.data?.user?.id)

    async function createTodo(){
        try {
            const response = await createNewTodo(session?.data?.user?.id!);
            if(response.success){
                toast.success(response?.message)
                router.refresh()
            }else{toast.error(response?.message)}
                
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div className="text-richblack-200 text-lg flex items-center justify-between pt-5">
            
            {/* menus */}
            {/* <div>
                <ol className="flex gap-10">
                    {
                        NavItems?.map((item,key)=>(
                            <Link href={item.to} key={key} 
                            className="hover:text-richblack-50 hover:scale-110 transition duration-200 ease-in-out"
                            >{item.title}</Link>
                        ))
                    }
                </ol>
            </div> */}

            {/* logo */}

            <Underline>
            <div className="text-white group ">
                <h1 className="flex items-center gap-2 ">
                    <span className="xs:text-4xl text-xl font-extrabold font-serif bg-gradient-to-r from-richblue-50 to-richblue-100 text-transparent bg-clip-text "
                    >
                        TaskTracker
                    </span> 
                    <div className="group-hover:rotate-[360deg] transition duration-1000 ease-in-out group-hover:text-richblack-300 text-richblack-500 sm:text-4xl text-2xl">
                        <LuNotebookPen />
                    </div> 
                </h1>
            </div>

            </Underline>

                {/* Create TAsk Button */}
            {
                session?.data && (
                    <div>
                        <Button type="button" onclick={createTodo}
                        customClasses="shadow-[1px_1px_115px_1px_#E7BC5B]"
                        >
                            Add Task
                        </Button>
                    </div>
                )
            }

            {/* Buttons */}
            <div className="">
                {
                    !session.data && (
                        <div className="flex justify-between items-center">
                            {/* <Button type="button" onclick={()=>console.log(session)}
                            customClasses="shadow-[1px_1px_115px_1px_#E7BC5B]"
                            >
                                Sign up
                            </Button> */}

                            <Button type="button" onclick={signIn}
                            customClasses="shadow-[1px_1px_115px_1px_#E7BC5B]"    
                            >
                                SignIn
                            </Button>
                            
                        </div>
                    )
                }
                {
                    session.data && (
                        <div className="flex gap-5">
                            <Profile session={session}/>

                            <Button type="button" onclick={signOut}
                            customClasses="shadow-[1px_1px_115px_1px_#E7BC5B] hidden xs:flex"    
                            >
                                Log out
                            </Button>
                            
                        </div>
                    )
                }
                
            </div>

        </div>
    )
}