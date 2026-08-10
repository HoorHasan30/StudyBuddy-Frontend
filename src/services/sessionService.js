import api from "./api";

async function createSessions(body){
    const res = await api.post('/sessions', body)
    return res.data
}

async function getSessions(){
    const res =  await api.get('/sessions')
    return res.data
}

export{
    createSessions,
    getSessions
}