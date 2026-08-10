import api from "./api";

async function getTasksDeadline(){
    const response = await api.get('/tasks/deadlines')
    return response.data
}

export{
    getTasksDeadline
}