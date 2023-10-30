import { useContext } from "react";
import EventInfoContext from "../../../contexts/EventInfoContext";
import dayjs from "dayjs";
import { Button } from '@mui/material';
import { Typography } from "@mui/material";
import { StyledTypography } from "../../../components/PersonalInformationForm";
import styled from "styled-components";
import UnauthorizedScreen from "../../../components/unauthorizedScreen";
import useRegister from "../../../hooks/api/useRegister";
import useTicket from "../../../hooks/api/useTicket";

export default function Certificate() {

  const { eventInfo } = useContext(EventInfoContext);
  const { ticket } = useTicket();
  console.log(ticket);
  const timeFromEndOfEvent = dayjs(dayjs()).diff(eventInfo.endsAt, 'hour');
  const { register } = useRegister();


  return (<>
    { timeFromEndOfEvent < 24 ? <UnauthorizedScreen firstLine="O certificado ficará disponível apenas 1 dia após a realização do evento."/> : 
     ticket && !ticket.TicketType.isRemote && register && register.length < 5 ? <UnauthorizedScreen firstLine="Para participantes presenciais, é necessário ter participado" secondLine="de pelo menos cinco atividades para emitir o certificado."/>  : 
    <>
    <StyledTypography variant="h4">Certificado</StyledTypography>
    <Content>
      <Typography variant="h6" color='#8E8E8E'>Clique no botão abaixo para gerar seu certificado de participação.</Typography>
      <a href="/certificate" 
      target="_blank" 
      rel="noopener noreferrer">
        <Button
          variant='contained'
          color='inherit'>
            GERAR CERTIFICADO
        </Button>
      </a>
    </Content>
    </>
    }
    
  </>);
}

const Content = styled.div`
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`