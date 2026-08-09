import api from "./api";

async function createProject(body) {
    const response = await api.post('/projects', body)
    return response.data

}

async function getAllProjects() {
    const response = await api.get('/projects')
    return response.data
}

async function getProjectsDeadline() {
    const response = await api.get('/projects/deadlines')
    return response.data
}

async function getProjectById(id) {
    const response = await api.get(`/projects/${id}`)
    return response.data
}

async function updateProjectDetails(id, body) {
    const response = await api.put(`/projects/${id}`, body)
    return response.data
}

async function deleteProject(id) {
    const response = await api.delete(`/projects/${id}`)
    return response.data
}

async function addCollaberator(id, body) {
    const response = await api.post(`/projects/${id}/add-collaberator`, body)
    return response.data
}

async function removeCollaberator(id, body) {
    const response = await api.post(`/projects/${id}/remove-collaberator`, body)
    return response.data
}

export {
    createProject,
    getAllProjects,
    getProjectsDeadline,
    getProjectById,
    updateProjectDetails,
    deleteProject,
    addCollaberator,
    removeCollaberator
}