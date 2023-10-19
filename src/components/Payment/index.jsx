import styled from "styled-components"
import UnauthorizedScreen from "./unauthorizedScreen"
import useEnrollment from "../../hooks/api/useEnrollment";
import { useEffect } from "react";
import TicketTypeScreen from "./ticketTypeScreen";

export default function TicketPaymentScreen(){
    const { enrollment } = useEnrollment();
    useEffect(()=>{
        console.log(enrollment);
    },[enrollment]);
    
    return(
        <>
            <TitleText>
                Ingresso e pagamento
            </TitleText>
            {
                enrollment?
                    <TicketTypeScreen/>
                :
                    <UnauthorizedScreen/>
            }

        </>
    )
}


const TitleText = styled.div`
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 34px;
    line-height: 40px;
    margin-bottom: 20px;
`