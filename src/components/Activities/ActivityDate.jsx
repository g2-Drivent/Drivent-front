import { useEffect, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import 'dayjs/locale/pt-br';
import { getActivitiesDate } from "../../services/activitiesApi";
import useToken from "../../hooks/useToken";

export function ActivityDate({ updateBoard }) {
    const token = useToken();
    const [date, setDate] = useState([]);
    const [click, setClick] = useState(false);
    const [selected, setSelected] = useState('');

    useEffect(() => {
        async function fetchData() {
            const dateData = await getActivitiesDate(token);
            setDate(dateData);
        }
        fetchData();
    }, []);

    function select(day) {
        const dateFormat = dayjs(day).format('YYYY-MM-DD').toString();
        setSelected(dateFormat)
        setClick(true)
    }

    function formatDate(date) {
        let remove = /-feira/g;
        const formattedDate = dayjs(date).locale('pt-br').format('dddd, DD/MM').toString();
        const firstLetterUpperCase = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
        return firstLetterUpperCase.replace(remove, '');
    }
    return (
        <>
            {!click && (
                <Paragraph>Primeiro, filtre pelo dia do evento:</Paragraph>
            )}
            {date.length > 0 && (
                date
                    .filter(day => dayjs(day) >= dayjs().startOf('day'))
                    .map(day => (
                        <Button className={selected === dayjs(day).format('YYYY-MM-DD').toString() ? 'selected' : ''}
                            key={day} onClick={() => (select(day),
                                updateBoard(day))}>
                            {formatDate(day)}
                        </Button>
                    ))
            )}
        </>
    )
}

const Paragraph = styled.p`
    font-size: 20px;
    font-weight: 400;
    font-family: 'Roboto', sans-serif;
    color: #8E8E8E;
    margin-top: 36px;
`

const Button = styled.button`
  width: 131px;
  height: 37px;
  border-radius: 4px;
  border: none;
  box-shadow: 0px 2px 10px 0px #00000040;
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  margin-right: 17px;
  margin-top: 17px;
  background-color: #E0E0E0;
  &.selected {
    background-color: #FFD37D;
  } 
  `