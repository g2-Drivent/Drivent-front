import styled from 'styled-components';
import { useEffect } from 'react';
import useEnrollment from '../../../hooks/api/useEnrollment';
import TicketPaymentScreen from "../../../components/Payment";
import UnauthorizedScreen from "../../../components/Payment/unauthorizedScreen";



export default function Payment() {
  const { enrollment } = useEnrollment();
  useEffect(()=>{

  },[enrollment]);
  
  return (
  <PaymentContainer>
    <h1>Ingresso e Pagamento</h1>
    {enrollment?
        <TicketPaymentScreen/>
      :
        <UnauthorizedScreen/>
    }
  </PaymentContainer>
);

 
}

const PaymentContainer = styled.div`

display: flex;
  flex-direction: column;
  h1{
    font-size: 34px;
    font-weight: 400;
    font-family: 'Roboto', sans-serif;
    color: #000000; 
    margin-left: 5px;
  }
`




