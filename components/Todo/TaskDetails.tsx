"use client"

import React, { useRef, useState } from 'react'
import TaskManagement from './TaskManagement'
import { CiCirclePlus } from "react-icons/ci";
import Button from '../Button';
import UnderLine from '../common/underline';
import { addTask } from '@/db/apicalls';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const TaskDetails = ({ data }: any) => {
    const [addTask, setAddTask] = useState(null);

    // if(!data?.success){
    //     return(
    //         <div>Something went wrong</div>
    //     )
    // }

    async function addtask(todo: any) {
        // console.log(todo?.id)
        setAddTask(todo?.id)
    }


    return (
        <>
            <div className='w-full flex flex-col-reverse xs:gap-5 gap-10 '>
                {
                    data?.userTask?.map((todo: any) => (
                        <div key={todo?.id} className='flex gap-3 flex-col'>
                            <div className='w-full relative flex justify-between items-center'>
                                <details>
                                    <summary className='xs:text-2xl font-mono cursor-pointer flex xs:justify-evenly xs:items-center'>
                                        {todo.name}

                                    </summary>
                                    <p className='text-sm font-serif text-white'>
                                        {todo?.description}
                                    </p>
                                </details>
                                <Button type='button' onclick={() => addtask(todo)} customClasses='shadow-[0px_0px_5px_5px_#FFE83D] text-white font-extrabold '>
                                    <CiCirclePlus />
                                </Button>
                            </div>

                            {
                                todo?.task?.map((task: any) => (
                                    <div key={task?.id}>
                                        <TaskManagement task={task} />
                                    </div>
                                ))
                            }
                        </div>

                    ))
                }
            </div>

            {
                addTask && (<Modal data={addTask} setAddTask={setAddTask} />)
            }
        </>

    )
}


export default TaskDetails

function Modal({ data, setAddTask }: any) {
    // console.log(data)

    const ModalRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const textRef = useRef<HTMLTextAreaElement>(null);

    function CloseModal(e: any) {
        if (ModalRef?.current === e.target)
            setAddTask(null)

    }


    const addNewTask = async () => {
        const value = textRef.current?.value.trim(); // ✅ Trim input value to prevent accidental spaces

        if (!value) {
            console.warn("Task cannot be empty"); // Handle empty input gracefully
            return;
        }

        setLoading(true);
        try {
            const response = await addTask(data, value);
            // console.log(response);
            if (response?.success) {
                toast?.success(response?.message)
                router.refresh();
            } else {
                toast.error(response?.message);
            }
        } catch (error) {
            // console.error("Failed to add task:", error);
        } finally {
            setLoading(false);
            setAddTask(null);
        }
    };


    return (
        <div ref={ModalRef} onClick={(e: any) => CloseModal(e)} className='w-screen h-screen fixed bg-[#88662D] inset-0 opacity-90 backdrop-blur-2xl flex justify-center items-center'>
            <div className=' bg-richblack-900 rounded-lg xs:w-2/6 p-9 flex xs:flex-row flex-col items-center gap-5 shadow-[0px_0px_75px_75px_#FFE83D] '>
                <UnderLine><h2 className='text-caribbeangreen-25 text-2xl xs:text-xl font-serif font-extrabold italic '>Add new Task: </h2> </UnderLine>
                <div className='flex flex-col xs:gap-5 gap-3'>
                    <textarea ref={textRef} placeholder='say what you wanna do?' className='w-full text-black font-normal focus:outline-none p-2' wrap='true'></textarea>
                    <button className='px-3 py-2 w-full bg-yellow-25 rounded-full backdrop-brightness-90 text-black text-lg font-semibold active:scale-95 transition-all duration-200 ease-linear'
                        onClick={() => addNewTask()
                        }
                        disabled={loading ? true : false}
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    )
}
