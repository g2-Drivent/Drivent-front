import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import styled from "styled-components"
import { Activity } from "./Activity";

const data = [
    {
        title: "Gigachad: Como se tornar um?",
        status: "closed",
        place: "Auditório Principal",
        date: dayjs(1698148800).toISOString(),
        duration: 60
    },
    {
        title: "Tio do jorel, a série infantil mais controvérsa.",
        status: "joined",
        place: "Auditório Principal 7",
        date: dayjs(1698152400).toISOString(),
        duration: 90
    },
    {
        title: "Tio do jorel, a série infantil mais controvérsa.",
        status: "joined",
        place: "Major's palace",
        date: dayjs(1698152400).toISOString(),
        duration: 90
    },
    {
        title: "Tio do jorel, a série infantil mais controvérsa.",
        status: "joined",
        place: "Major's palace 2",
        date: dayjs(1698152400).toISOString(),
        duration: 90
    },
// Status enum:
// "joined" Evento tenha register do usuário.
// "open"   Evento tenha registers < capacity.
// "closed" Evento em que register count == capacity.
    {
        activityId: 1,
        title: "Whatszac jr? Quem é esse cara e porquê está tão famoso?",
        status: "open",
        spacesLeft: 99,
        place: "Beco atrás do prédio",
        date: dayjs(1698148800).toISOString(),
        duration: 60
    }
];


export function ActivityBoard() {

    const [columns, setColumns] = useState();

    function genColums() {

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
            />
        })
    }

    useEffect(() => {
        genColums();
    },[])

    return (
        <Board>
            {columns ?? "Loading"}
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