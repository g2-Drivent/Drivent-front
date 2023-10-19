import styled from 'styled-components';
import TicketData from '../../../components/Dashboard/Payment/TicketData';
import CardComponent from '../../../components/Dashboard/Payment/CardContainer';
import ConfirmComponent from '../../../components/Dashboard/Payment/ConfirmContainer';
import TicketPaymentScreen from "../../../components/Payment";
import UnauthorizedScreen from "../../../components/Payment/unauthorizedScreen";

export default function Payment() {

  return (
    <PaymentContainer>
      <h1>Ingresso e Pagamento</h1>
      {/* <TicketData/>

      <CardComponent /> */}

      <ConfirmComponent />

    </PaymentContainer>

);

  // return ( <TicketPaymentScreen/>);
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




