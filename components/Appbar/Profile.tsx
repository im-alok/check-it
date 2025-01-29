"use client"
import React, { useState } from 'react'
import Modal from './Modal'

const Profile = ({session} : {session:any} ) => {

    const [openModal, setopenModal] = useState(false)

  return (
    <div className='relative'>
        <img 
            src={session?.data?.user?.image}
            alt='user avatar '
            
            className='aspect-square rounded-full cursor-pointer w-10'
            onClick={()=>setopenModal(true)}
        />

        {
            openModal && (<Modal data={session?.data} closeModal={setopenModal}/>)
        }
        
    </div>
  )
}

export default Profile

type session ={
    data:data,
    status: "authenticated" | "unauthenticated" | "loading"
}

type data={
    expires:string,
    user:user
}

type user={
    email:string,
    id:string,
    image:string,
    name:string
}
