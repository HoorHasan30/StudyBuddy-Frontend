import api from "./api";

async function getAllCourses(){
    const res = await api.get('/courses')
    return res.data 
}

async function createCourse(body) {
    const res = await api.post('/courses', body)
    return res.data
}

async function getOneCourse(id){
    const res = await api.get('/courses' + id)
    return res.data

}

async function updateCourse(id, body){
    const res = await api.put(`/courses/${id}`, body)
    return res.data

}

async function deleteCourse(id){

    const res = await api.delete(`/courses/${id}`)
    return res.data
}

export {
    getAllCourses,
    createCourse,
    getOneCourse,
    updateCourse,
    deleteCourse
}