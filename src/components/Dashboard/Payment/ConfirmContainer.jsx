import { useContext } from 'react';
import styled from 'styled-components';
import { PaymentDataContext } from '../../../contexts/PaymentContext';

export default function ConfirmComponent() {
    const { payment } = useContext(PaymentDataContext);
    return (
        <>
            {payment && (
                <ConfirmContainer>
                    <ion-icon name="checkmark-circle"></ion-icon>
                    <div>
                        <p><strong>Pagamento confirmado!</strong><br></br> Prossiga para escolha de hospedagem e atividades</p>
                    </div>
                </ConfirmContainer>
            )}

            {!payment && (
                <ErroConfirm>
                    <p>Não foi possível concluir o pagamento</p>
                    <button>Tentar novamente</button>
                </ErroConfirm>
            )}
        </>
    )
}

const ConfirmContainer = styled.div`
  display: flex;
  margin-top: 15px;
  ion-icon {
    width: 44px;
    height: 44px;
    color: #36b853;
  }

  p {
    font-size: 16px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    color: #454545;
  }

  div {
    margin-left: 12px;
    display: flex;    
    align-items: center;
  }
`

const ErroConfirm = styled.div`     
    p {
        font-size: 30px;
        font-weight: 400;
        font-family: 'Roboto', sans-serif;
        color: #8E8E8E;
        margin-top: 30px;
    }
    button {      
        margin-top: 15px;
        width: 182px;
        height: 32px;
        border-radius: 4px;
        border: none;
        margin-top: 37px;
        font-size: 14px;
        font-weight: 400;
        font-family: 'Roboto', sans-serif;
        color: #000000; 
        background-color: #e0e0e0;
        box-shadow: 2px 2px 10px 2px rgba(0,0,0,0.1);
    }
`