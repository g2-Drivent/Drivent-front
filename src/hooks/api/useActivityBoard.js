import useToken from "../useToken";
import * as ActivitiesApi from "../../services/activitiesApi"; 
import { useState } from "react";

export default function useActivityBoard(){
    const token = useToken();
    const [activities, setActivities] = useState(null);

    async function updateBoard(date) {
        const response = await ActivitiesApi.getActivitiesByDay(token, date);
        setActivities(response);
        return response;
    }

    return [activities, updateBoard]
}
