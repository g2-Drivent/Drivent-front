import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import useToken from '../../../hooks/useToken';
import useTicket from '../../../hooks/api/useTicket';
import { AnalyseOptions } from '../../Payment/analyseOptions';
import { toast } from 'react-toastify';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';


export default function CardComponent({ getTicket }) {

  const [cardNumber, setCardNumber] = useState('');
  const [name, setName] = useState('');
  const [validThru, setValidThru] = useState('');
  const [cvv, setCvv] = useState('');
  const [focus, setFocus] = useState('');
  const [disabled, setDisabled] = useState(false);
  const { ticket } = useTicket();
  const token = useToken();

  function payment(e) {
    e.preventDefault();

    const url = `${import.meta.env.VITE_API_URL}/payments/process`;
    const card = {
      ticketId: ticket.id,
      cardData: {
        issuer: 'Não informado',
        number: cardNumber,
        name,
        expirationDate: validThru,
        cvv
      }
    }

    setDisabled(true);
    axios.post(url, card, {
      headers: { authorization: `Bearer ${token}` },
    })
      .then(() => {
        toast('Pagamento registrado com sucesso!');
        getTicket();
        setDisabled(false)
      }
      )
      .catch((err) => {
        console.log(err);
        toast('Ocorreu algum erro no pagamento do ticket!');
        setDisabled(false)
      })
  }

  function formatNumber(value) {
    const numericValue = value.replace(/\D/g, '');
    if (numericValue.length <= 16) {
      setCardNumber(numericValue);
    }
  }

  const validateName = (value) => {
    if (value === '' || /^[A-Za-z\s]+$/.test(value)) {
      setName(value);
    }
  }

  function formatValidThru(value) {
    const numericValue = value.replace(/\D/g, '');
    if (numericValue.length <= 4) {
      if (numericValue.length >= 2) {
        setValidThru(numericValue.substring(0, 2) + '/' + numericValue.substring(2));
      } else {
        setValidThru(numericValue);
      }
    }
  };

  function formatCvv(value) {
    const numericValue = value.replace(/\D/g, '');
    if (numericValue.length <= 3) {
      setCvv(numericValue);
    }
  };

  return (
    <Container>
      <form onSubmit={payment}>
        <div className='card-info'>
          <Cards
            number={cardNumber}
            expiry={validThru}
            cvc={cvv}
            name={name}
            focused={focus}
          />
          <div className='input-box'>
            <input className='input' name="number" placeholder="Card Number" type="text" fullWidth
              value={cardNumber} onChange={e => formatNumber(e.target.value)}
              onFocus={e => setFocus(e.target.name)} disabled={disabled} />
            <p>E.g.: 49..., 51..., 36..., 37...</p>
            <input className='input' name="name" placeholder="Name" type="text"
              fullWidth value={name} onChange={e => validateName(e.target.value)}
              onFocus={e => setFocus(e.target.name)} disabled={disabled} />
            <div>
              <input className='input-valid' name="expiry" placeholder="Valid Thru" type="text" fullWidth
                value={validThru} onChange={e => formatValidThru(e.target.value)}
                onFocus={e => setFocus(e.target.name)} disabled={disabled} />
              <input className='input-cvc' name="cvc" placeholder="CVC" type="text" fullWidth
                value={cvv} onChange={e => formatCvv(e.target.value)}
                onFocus={e => setFocus(e.target.name)} disabled={disabled} />
            </div>
          </div>
        </div>
        <button type="submit" fullWidth >FINALIZAR PAGAMENTO</button>
      </form>

    </Container>
  )
}

const Container = styled.div`
  width: 80%;
  max-width: 600px;
  margin-top: 17px;
  img  {
    width: 50%;
    margin-right: 34px;
  }

  form {
    display: flex;
    flex-direction: column;

    .card-info {
      display: flex;
      flex-direction: row;
    }

    .input-box {
      display: flex;
      flex-direction: column;
      width: 50%;
      justify-content: space-around;
      margin-left: 15px;
     
      
      p {
        font-size: 14px;
        font-weight: 200;
        color: #8E8E8E;
      }

      input {
        height: 50px;
        border-radius: 5px;
        outline: none;
        padding: 10px;
        border: 1px solid rgb(146, 146, 146);
        margin: 1px;

        &:focus {
          border-color: rgb(51, 51, 51);
        }
      }

      input::placeholder {
          font-size: 20px;
          font-weight: 400;
          font-family: 'Roboto', sans-serif;
          color: #8E8E8E; 
      } 

      .input {
        width: 100%;        
      }

      div {
        display: flex;
        justify-content: space-between;
      }

      .input-valid {
        width: 60%;
      }

      .input-cvc {
        width: 30%;
      }
    }
    
    button {
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
  }
`