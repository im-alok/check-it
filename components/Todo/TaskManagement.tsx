"use client"
import { deleteTask, updateStatus } from '@/db/apicalls';
import { dateFormat, timeFormat } from '@/lib/data'
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { MdOutlineDeleteOutline } from "react-icons/md";

const TaskManagement = ({ task }: any) => {

    const [modalData,setModalData] = useState(null);
    const [showFullTask,setShowFullTask] = useState(null);
    const router = useRouter();

    async function deleteHandler(){
        try {
            const response = await deleteTask(task.id);
            if(response.success){
                toast.success(response?.message)
                router.refresh();
            }else{toast.error(response?.message)}
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='xs:w-10/12 mx-auto flex justify-between items-center flex-wrap'>
            <div className='flex  items-center gap-3 xs:gap-5 '>
                <div className={`${task?.status ? 'bg-green-500' : 'bg-red-600'} xs:w-4 xs:h-4 w-2 h-2 rounded-full aspect-square block cursor-pointer hover:scale-150 transition-all duration-1000 ease-in-out`}
                onClick={()=>setModalData(task)}
                ></div>
                <div className={`xs:text-lg text-sm  flex gap-1 items-center`} >
                    <h2 className='cursor-pointer hidden xs:flex w-[800px] overflow-hidden' onClick={()=>setShowFullTask(task)}>
                        {task?.taskDescription?.length < 60 ? (task?.taskDescription) : (task?.taskDescription.slice(0,75) + "...")}
                    </h2>
                    <h2 className='cursor-pointer flex xs:hidden w-[220px] overflow-hidden'
                    onClick={()=>setShowFullTask(task)}
                    >
                        {task?.taskDescription?.length < 39 ? (task?.taskDescription) : (task?.taskDescription.slice(0,25) + "...")}
                    </h2>
                    <span className='text-xs font-normal'>
                        ~ {timeFormat(task.createdAt)}
                    </span>
                </div>
            </div>

            <div className='text-2xl text-richblack-400 cursor-pointer'
            onClick={()=>deleteHandler()}
            ><MdOutlineDeleteOutline /></div>

            {
                modalData && (<Modal modalData={modalData} setModalData={setModalData} />)

            }

            {
                showFullTask && (<ShowTaskDetails task={task} setShowFullTask={setShowFullTask}/>)
            }

        </div>
    )
}

export default TaskManagement


function Modal({modalData,setModalData}:any){

    const router = useRouter();

    async function Done(){
        if(modalData?.status === true){
            toast.error('status - already done!')
            setModalData(null)
            return
        }

        try {
            const response = await updateStatus(modalData?.id, true);
            // console.log("from frontend" , response)
            if(response?.success){
                toast.success(response?.message);
                router.refresh();
            }
            else{
                toast.error(response?.data?.message);
            }
            
            

        } catch (_error) {
            // console.log(error);
        }finally{
            setModalData(null);
        }
    }

    async function NotDone(){
        if(modalData?.status === false){
            toast.error('status - already not done!')
            setModalData(null);
            return
        }

        try {
            const response = await updateStatus(modalData?.id, false);
            // console.log(response)
            if(response?.success){
                toast.success(response?.message);
                router.refresh();
            }else{
                toast.error(response?.data?.message);
            }

        } catch (error) {
            console.log(error);
        }finally{
            setModalData(null)
        }
    }

    const ref = useRef(null);

    async function closeModal(e:any){
        if(ref?.current === e.target)
            setModalData(null);
    }

    return(
        <div ref={ref} onClick={(e)=>closeModal(e)} className='w-screen h-screen inset-0 fixed bg-richblack-900 backdrop-blur-md opacity-90 flex justify-center items-center z-[1000]'>
            <div className='w-[200px] h-[200px] bg-yellow-300 '>
                <div className='flex flex-col gap-5'>
                    <h2 className='text-center text-wrap w-[200px] h-fit overflow-hidden shadow-sm shadow-black text-black'>Task: {modalData?.taskDescription?.length < 20 ? (modalData?.taskDescription) : (modalData?.taskDescription.slice(0,20) + "...")}</h2>
                    
                    <div className='flex flex-col  gap-10'>
                        <h3 className='text-black text-center'>is above task completed?</h3>
                        <div className='flex justify-center items-center gap-10'>
                            <button className={`px-3 py-2 hover:scale-95 transition duration-500 ease-linear bg-caribbeangreen-300 text-black text-xs font-semibold rounded-lg cursor-pointer`}
                            onClick={()=>Done()}
                            >Yes</button>
                            <button className={`px-3 py-2 hover:scale-95 transition duration-500 ease-linear bg-red-800 text-black text-xs font-semibold rounded-lg cursor-pointer`}
                            onClick={()=>NotDone()}
                            >No</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


function ShowTaskDetails({task,setShowFullTask}:any){
    const ref = useRef(null);

    async function closeModal(e:any){
        if(ref?.current === e.target)
            setShowFullTask(null);
    }

    return(
        <div ref={ref} onClick={(e)=>closeModal(e)} className='w-screen h-screen inset-0 fixed bg-richblack-900 backdrop-blur-md opacity-90 flex justify-center items-center z-[1000]'>
            <div className='xs:text-4xl text-2xl w-[350px] xs:max-w-[700px] xs:min-h-[300px] p-5 bg-white text-black break-words '>
                {task?.taskDescription}
            </div>
        </div>
    )
}