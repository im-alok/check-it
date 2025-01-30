import React, { useRef } from 'react'
import Button from '../Button';
import { redirect } from 'next/navigation';

const Modal = ({data,closeModal}:any) => {

    const modalRef = useRef(null);

    function modalClick(e:any){
        if(e.target === modalRef?.current)
            closeModal(false)
    }

    async function logOutHandler(){
      redirect('/api/auth/signout');
    }


  return (
    <div ref={modalRef} onClick={(e)=>modalClick(e)} className='w-screen h-screen fixed inset-0  backdrop-blur-sm flex justify-end z-[1000]'>
        <div className='w-fit h-fit  p-7 rounded-xl mt-20 mr-5 bg-black flex flex-col gap-10'>
            <div>
              <h1 className='text-xs text-white font-bold font-mono'>Name : {data?.user.name}</h1>
              <p className='text-xs text-white font-bold font-mono '>Email: {data?.user?.email}</p>
            </div>

            <Button type='button' onclick={logOutHandler} customClasses='flex xs:hidden shadow-[0px_0px_150px_5px_#B89144] animate-bounce hover:animate-none'>
              Log out
            </Button>
        </div>
      
    </div>
  )
}

export default Modal
