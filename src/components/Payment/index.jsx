import { useEffect, useState } from "react";
import TicketTypeScreen from "./ticketTypeScreen";
import useTicket from "../../hooks/api/useTicket";
import TicketData from "../Dashboard/Payment/TicketData";
import CardComponent from "../Dashboard/Payment/CardContainer";
import ConfirmComponent from "../Dashboard/Payment/ConfirmContainer";

export default function TicketPaymentScreen(){

    let{ticket,getTicket} = useTicket();
    useEffect(()=>{},[ticket]);


    return(
        <>
            {ticket?
            <> 
                <TicketData ticket={ticket}/>
                <CardComponent/>
                {/* <ConfirmComponent/> */}
            </>
            : 
                <TicketTypeScreen getTicket={getTicket}/>
            }
        </>
    )
}