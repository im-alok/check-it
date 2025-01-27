"use client"
import { signIn, signOut, useSession } from "next-auth/react"
export default function(){

    const session= useSession();
    return(
        <div>
            <button className="px-3 py-2 bg-black text-white" onClick={(e)=>{
                e.preventDefault();
                signIn();
            }}>
                Login
            </button>

            <button className="px-3 py-2 bg-black text-white" onClick={(e)=>{
                e.preventDefault();
                signOut();
            }}>
                log out
            </button>

            <div className="text-4xl font-medium">
                {JSON.stringify(session)}
            </div>

        </div>
    )
}