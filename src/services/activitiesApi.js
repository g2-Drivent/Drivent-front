import api from './api';

export async function joinActivity(token){
    const response = await api.get('/tickets',{
        headers:{
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export async function getActivitiesByDay(token, dateString){
    const response = await api.get(`/activities/${dateString}`,{
        headers:{
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}