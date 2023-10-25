import { Typography } from "@mui/material";
import { ActivityBoard } from "../../../components/Activities/ActivityBoard";
import useTicket from "../../../hooks/api/useTicket";
import UnauthorizedScreen from "../../../components/unauthorizedScreen";

export default function Activities() {

  const { ticket } = useTicket();

  if(!ticket) 
    return <UnauthorizedScreen firstLine="Você precisa completar sua inscrição antes" secondLine="de prosseguir pra escolha de hospedagem"/>; 

  if(ticket.status !== "PAID") 
    return <UnauthorizedScreen firstLine="Você precisa ter confirmado pagamento antes" secondLine="de fazer a escolha de atividades"/>;

  if(ticket.TicketType.includesHotel === false)  
    return <UnauthorizedScreen firstLine="Sua modalidade de ingresso não necessita escolher" secondLine="atividade. Você terá acesso a todas atividades"/>;

  return (
    <>
      <Typography variant="h4">Escolha de atividades</Typography>
      <ActivityBoard/>
    </>
  )
}
