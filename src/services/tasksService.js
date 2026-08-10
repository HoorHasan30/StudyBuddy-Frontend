import api from "./api";

async function getTasksDeadline(){
    const response = await api.get('/tasks/deadline')
    return response.data
}

export{
    getTasksDeadline
}