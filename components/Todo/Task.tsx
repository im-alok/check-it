import axios from 'axios'
import React from 'react'
import TaskDetails from './TaskDetails';

async function getAllTask() {
    try {
        const response = await axios.get(`${process.env.BACKEND_URL}/api/todos/getusertasklist`)

        return response?.data;

    } catch (error: any) {
        // console.log(error)
        // return error?.response?.data
    }
}


const Task = async () => {
    const data = await getAllTask();

    return (
        <div className='w-full'>
            <TaskDetails data={data}/>
        </div>
    )
}

export default Task
