"use client"
import { deleteTask, updateStatus } from '@/db/apicalls';
import { dateFormat, timeFormat } from '@/lib/data'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { MdOutlineDeleteOutline } from "react-icons/md";

const TaskManagement = ({ task }: any) => {

    const [modalData,setModalData] = useState(null);
    const router = useRouter();

    async function deleteHandler(){
        try {
            const response = await deleteTask(task.id);
            if(response.success)
                router.refresh();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='w-10/12 mx-auto flex justify-between items-center'>
            <div className='flex  items-center gap-5'>
                <div className={`${task?.status ? 'bg-green-500' : 'bg-red-600'} w-4 h-4 rounded-full aspect-square block cursor-pointer`}
                onClick={()=>setModalData(task?.id)}
                ></div>
                <h2 className={`text-xl font-bold `}>
                    {task?.taskDescription}
                    <span className='text-xs font-normal'>
                        ~ {timeFormat(task.createdAt)}
                    </span>
                </h2>
            </div>

            <div className='text-2xl text-richblack-400 cursor-pointer'
            onClick={()=>deleteHandler()}
            ><MdOutlineDeleteOutline /></div>

            {
                modalData && (<Modal modalData={modalData} setModalData={setModalData} />)
            }

        </div>
    )
}

export default TaskManagement


function Modal({modalData,setModalData}:any){

    const router = useRouter();

    async function Done(){
        try {
            const response = await updateStatus(modalData, true);
            console.log(response)
            if(response?.success)
                router.refresh();
                

        } catch (error) {
            console.log(error);
        }finally{
            setModalData(null);
        }
    }

    async function NotDone(){
        try {
            const response = await updateStatus(modalData, false);
            console.log(response)
            if(response?.success)
                router.refresh();

        } catch (error) {
            console.log(error);
        }finally{
            setModalData(null)
        }
    }

    return(
        <div className='fixed w-[200px] h-[200px] bg-slate-400 right-40 border-2 border-black'>
            <div className='flex flex-col  gap-10'>
                <h3 className='text-black text-center'>is task completed?</h3>
                <div className='flex justify-center items-center gap-10'>
                    <button className='px-3 py-2 hover:scale-95 transition duration-500 ease-linear bg-caribbeangreen-300 text-black text-xs font-semibold rounded-lg cursor-pointer'
                    onClick={()=>Done()}
                    >Yes</button>
                    <button className='px-3 py-2 hover:scale-95 transition duration-500 ease-linear bg-red-800 text-black text-xs font-semibold rounded-lg cursor-pointer'
                    onClick={()=>NotDone()}
                    >No</button>
                </div>
            </div>
        </div>
    )
}