import useAsync from "../useAsync";
import useToken from "../useToken";
import * as TicketsApi from "../../services/ticketsApi"; 

export default function useTicket(){
    const token = useToken();
    const{
        data: ticket,
        loading: ticketLoading,
        error: ticketError,
        act: getTicket
    }= useAsync(()=> TicketsApi.getUserTicket(token));

    return {ticket, ticketLoading, ticketError, getTicket};
};

