import { Typography } from "@mui/material";
import { ActivityBoard } from "../../../components/Activities/ActivityBoard";
import useTicket from "../../../hooks/api/useTicket";
import UnauthorizedScreen from "../../../components/unauthorizedScreen";
import useActivityBoard from "../../../hooks/api/useActivityBoard";

export default function Activities() {

  const { ticket } = useTicket();
  const [activities, updateBoard] = useActivityBoard("2023-10-27");

  if(!ticket) 
    return <UnauthorizedScreen firstLine="Você precisa completar sua inscrição antes" secondLine="de prosseguir pra escolha de hospedagem"/>; 

  if(ticket.status !== "PAID") 
    return <UnauthorizedScreen firstLine="Você precisa ter confirmado pagamento antes" secondLine="de fazer a escolha de atividades"/>;

  if(ticket.TicketType.includesHotel === false)  
    return <UnauthorizedScreen firstLine="Sua modalidade de ingresso não necessita escolher" secondLine="atividade. Você terá acesso a todas atividades"/>;

  return (
    <>
      <h1>Botões para debug</h1>
      <button onClick={() => updateBoard("2023-10-27")}>teste1</button>
      <button onClick={() => updateBoard("2023-10-28")}>teste2</button>
      <button onClick={() => updateBoard("2023-10-29")}>teste3</button>
      <Typography variant="h4">Escolha de atividades</Typography>
      {
      // Esse board (ActivityBoard) tem que receber os dados provindos do useActivityBoard();
      // Troque o dia usando o metodo "updateBoard como nos botões acima"
      }
      <ActivityBoard data={activities}/>
    </>
  )
}
