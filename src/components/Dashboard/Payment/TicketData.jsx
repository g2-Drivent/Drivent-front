import styled from 'styled-components';

export default function TicketData() {

    return (
        <TicketContainer>            
            <h2>Ingresso escolhido</h2>
            <div className='ticket-info'>
                <p className='info'>Presencial + Com Hotel</p>
                <p className='value'>R$ 600</p>
            </div>
            <h2>Pagamento</h2>
        </TicketContainer>
    )
}

const TicketContainer = styled.div`    
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 20px;
    font-weight: 400;
    font-family: 'Roboto', sans-serif;
    color: #8E8E8E;    
    margin-top: 34px;
    margin-left: 5px;
  }

  .ticket-info {
    width: 290px;
    height: 108px;
    border-radius: 20px;
    background-color: #FFEED2;
    margin-top: 17px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .info {
      font-size: 16px;
      font-weight: 400;
      font-family: 'Roboto', sans-serif;
      color: #454545;   
      margin-bottom: 10px;
    }

    .value {
      font-size: 14px;
      font-weight: 400;
      font-family: 'Roboto', sans-serif;
      color: #898989;  
    }
  }
`