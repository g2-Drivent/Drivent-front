/* eslint-disable react/prop-types */
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import styled from "styled-components"
import { Activity } from "./Activity";

export function ActivityBoard({data}) {

    const [columns, setColumns] = useState();

    function genColums() {

        if(!data) return;

        // Sort events by places.
        const places = {};
        data.forEach((act => {
            if(places[act.place] === undefined) places[act.place] = [act];
            else places[act.place].push(act);
        }));

        // Generate columns html (with activities included).
        const columnsArr = [];
        for (let place in places) {
            const component = (
                <Column key={place}>
                    <h1>{place}</h1>
                    <div>
                        {genActivities(places[place])}
                    </div>
                </Column>
            )
            columnsArr.push(component);
        }
        
        setColumns(columnsArr);
    }

    function genActivities(activities) {
        return activities.map((act, i ) => {
            const subTitle = `${dayjs(act.date).format("HH:mm")} - ${dayjs(act.date).add(act.duration, 'minute').format("HH:mm")}`
            return <Activity 
                key={i}
                title={act.title}
                subTitle={subTitle}
                status={act.status}
                duration={act.duration}
                spacesLeft={act.spacesLeft}
                activityId={act.activityId}
            />
        })
    }

    useEffect(() => {
        genColums();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[data])

    return (
        <Board>
            {columns}
        </Board>
    )

}

const Board = styled.div`

    width: 100%;
    height: 70%;

    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;

`

const Column = styled.div`

    height: 100%;
    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;

    & > h1 {
        height: 6%;
        color: #7B7B7B;
        font-size: 17px;
        line-height: 17px;
    }

    & > div {
        position: relative;
        box-sizing: border-box;

        display: flex;
        flex-direction: column;
        flex: 0 0 auto;
        gap: 12px;
        align-items: center;

        width: 280px;
        height: 90%;

        padding: 12px;

        border: 1px solid #D7D7D7;
    }
`
