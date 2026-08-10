import api from './api'


async function getTimetable(){
    const res = await api.get('/timetable')
    return res.data
}

async function createTimeTable(body){
    const res = await api.post('/timetable', body)
    return res.data

}

async function deleteTimetable(id){
    const res = await api.delete(`/timetable/${id}`)
    return res.data
}

export{
    getTimetable,
    createTimeTable,
    deleteTimetable
}