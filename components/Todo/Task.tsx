import axios from 'axios'
import React from 'react'
import TaskDetails from './TaskDetails';
import { getServerSession } from 'next-auth';
import { AUTH_OPTION } from '@/lib/auth';

async function getAllTask() {
    try {
        const response = await axios.get(`${process.env.BACKEND_URL}/api/todos/getusertasklist`)

        return response?.data;

    } catch (error: any) {
        // console.log(error)
        // return error?.response?.data
    }
}


const  Task = async () => {
    const session = await getServerSession(AUTH_OPTION);
    if(!session)
        return(<div>No details found as user is not logged in</div>)

    const data = await getAllTask();

    return (
        <div className='w-full'>
            <TaskDetails data={data}/>
        </div>
    )
}

export default Task
