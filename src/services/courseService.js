import api from "./api";

async function getAllCourses() {
    const res = await api.get('/courses')
    return res.data
}

async function createCourse(body) {
    const res = await api.post('/courses', body)
    return res.data
}

async function getOneCourse(id) {
    const res = await api.get('/courses/' + id)
    return res.data

}

async function updateCourse(id, body) {
    const res = await api.put(`/courses/${id}`, body)
    return res.data

}

async function deleteCourse(id) {

    const res = await api.delete(`/courses/${id}`)
    return res.data
}

async function createCourseTask(id, body) {

    const res = await api.post(`/courses/${id}/tasks`, body)
    return res.data
}

async function getCourseTask(id, taskId) {
    const res = await api.get(`/courses/${id}/tasks/${taskId}`)
    return res.data
}

async function updateCourseTask(id, taskId, body) {
    const res = await api.put(`/courses/${id}/tasks/${taskId}`, body)
    return res.data
}

async function deleteCourseTask(id, taskId){
    const res = await api.delete(`/courses/${id}/tasks/${tasksId}`)
    return res.data
}

async function updateTaskStatus(id, taskId, body){
    const res = await api.put(`/courses/${id}/tasks/${taskId}/status`, body)
    return res.data
}

export {
    getAllCourses,
    createCourse,
    getOneCourse,
    updateCourse,
    deleteCourse,

    createCourseTask,
    getCourseTask, 
    updateCourseTask,
    deleteCourseTask,
    updateTaskStatus
}