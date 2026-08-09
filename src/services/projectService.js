import api from "./api";

async function createProject(body) {
    const res = await api.post('/projects', body)

    return res.data
    
}

async function getAllProjects(){
    const res = await api.get('/projects' )
    return res.data

}

export {
    createProject,
    getAllProjects
}