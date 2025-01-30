import axios from "axios"



export async function updateStatus(taskId: string, status: boolean) {
    console.log(status)
    try {
        const response = await axios.put(
            `http://localhost:3000/api/todos/update-todos/update-task-status`,
            {
                status: status,
                taskId: taskId
            }
        )
        return response?.data

    } catch (error: any) {
        console.log(error)
        return error?.response
    }
}


export async function addTask(todoId:string,taskDescription:string){
    // console.log(process.env.BACKEND_URL)
    try {
        const response = await axios.post(
            `http://localhost:3000/api/todos/createtask`,
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
            `http://localhost:3000/api/todos/delete-task`,
            {
                data:{
                    taskId:taskId
                }
            })

        return response?.data;
    } catch (error) {
        console.log(error)
    }
}


export async function createNewTodo(userId:string){
    try {
        const response = await axios.post(
            'http://localhost:3000/api/todos',{
                userId:userId
            }
        )

        return response?.data;
    } catch (error) {
        console.log(error)
    }
}