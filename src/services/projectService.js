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
    const response = await api.put(`/projects/${id}/edit`, body)
    return response.data
}

async function deleteProject(id) {
    const response = await api.delete(`/projects/${id}`)
    return response.data
}

async function addCollaberator(id, body) {
    const response = await api.put(`/projects/${id}/add-collaberator`, body)
    return response.data
}

async function removeCollaberator(id, body) {
    const response = await api.put(`/projects/${id}/remove-collaberator`, body)
    return response.data
}


// tasks
async function createProjectTask(projectId, body) {
    const response = await api.post(`/projects/${projectId}/tasks`, body)
    return response.data
}

async function getProjectTaskDetails(projectId, taskId) {
    const response = await api.get(`/projects/${projectId}/tasks/${taskId}`)
    return response.data
}

async function updateProjectTaskById(projectId, taskId, body) {
    const response = await api.put(`/projects/${projectId}/tasks/${taskId}`, body)
    return response.data
}

async function updateProjectTaskStatus(projectId, taskId, body) {
    const response = await api.put(`/projects/${projectId}/tasks/${taskId}/status`, body)
    return response.data
}

async function deleteProjectTaskById(projectId, taskId) {
    const response = await api.delete(`/projects/${projectId}/tasks/${taskId}`)
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
    removeCollaberator,
    createProjectTask,
    getProjectTaskDetails,
    updateProjectTaskById,
    updateProjectTaskStatus,
    deleteProjectTaskById,
}