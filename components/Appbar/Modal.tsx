import React, { useRef } from 'react'

const Modal = ({data,closeModal}:any) => {

    const modalRef = useRef(null);

    function modalClick(e:any){
        if(e.target === modalRef?.current)
            closeModal(false)
    }

  return (
    <div ref={modalRef} onClick={(e)=>modalClick(e)} className='w-screen h-screen fixed inset-0  backdrop-blur-sm flex justify-end'>
        <div className='w-fit h-fit  p-7 rounded-xl mt-20 mr-5 bg-black opacity-80'>
            <h1 className='text-xs text-white font-bold font-mono'>Name : {data?.user.name}</h1>
            <p className='text-xs text-white font-bold font-mono'>Email: {data?.user?.email}</p>
        </div>
      
    </div>
  )
}

export default Modal
