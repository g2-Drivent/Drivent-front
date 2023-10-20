import useAsync from "../useAsync";
import useToken from "../useToken";
import * as ticketTypeApi from '../../services/ticketTypeApi';

export default function usePostTicket(){
    const token = useToken();

    const{
        loading: postTicketLoading,
        error: postTicketError,
        act: postTicket
    } = useAsync(ticketTypeApi.postTicket, false);

    return {postTicketLoading,postTicketError,postTicket};
}