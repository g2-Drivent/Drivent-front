import api from './api';

export async function getActivitiesDate(token) {
    const response = await api.get(`/activities/`,{
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

export async function joinActivity(token, activityId){
    let response;

    try {
        response = await api.post(`/activities/register/${activityId}`,{}, {
            headers:{
                Authorization: `Bearer ${token}`,
            },
        });
    
        return response.status;
    } catch (error) {
        return error.response.status;
    }
}