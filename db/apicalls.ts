import axios from "axios"

const url = process.env.NEXT_PUBLIC_BACKEND_URL



export async function updateStatus(taskId: string, status: boolean) {
    try {
        const response = await axios.put(
            `https://todo.alokramranjan.in/api/todos/update-todos/update-task-status`,
            {
                status: status,
                taskId: taskId
            }
        )

        // console.log(response?.data);

        return response?.data

    } catch (error: any) {
        // console.log(error)
        return error?.response
    }
}


export async function addTask(todoId:string,taskDescription:string){
    // console.log(process.env.BACKEND_URL)
    try {
        const response = await axios.post(
            `https://todo.alokramranjan.in/api/todos/createtask`,
            {
                    todoId: todoId,
                    taskDescription: taskDescription
            }
        )
        return response?.data

    } catch (error: any) {
        return error?.response?.data
    }
}


export async function deleteTask(taskId:string){
    try {
        const response = await axios.delete(
            `https://todo.alokramranjan.in/api/todos/delete-task`,
            {
                data:{
                    taskId:taskId
                }
            })

        return response?.data;
    } catch (error:any) {
        return error?.response?.data
    }
}


export async function createNewTodo(userId:string){
    try {
        const response = await axios.post(
            `https://todo.alokramranjan.in/api/todos`,{
                userId:userId
            }
        )

        return response?.data;
    } catch (error: any) {
        console.log(error?.response?.data)
    }
}