import styled from 'styled-components';
import Card from '../../../assets/images/card-model.png'
import { useContext, useState } from 'react';
import UserContext from '../../../contexts/UserContext';
import axios from 'axios';

export default function CardComponent() {

    const [cardNumber, setCardNumber] = useState('');
    const [name, setName] = useState('');
    const [validThru, setValidThru] = useState('');
    const [cvv, setCvv] = useState('');
    const [disabled, setDisabled] = useState(false);
    //const {userData} = useContext(UserContext);
    const token = userData.token;

    console.log(token)
    function payment(e) {
      e.preventDefault();
      console.log('foi')

      const url = `${import.meta.env.VITE_API_URL}/payment/process`;
      const card = {
        ticketId: 1,
        cardData: {
          issuer: 'Visa',
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
      .then( () => {
        console.log('foi')
        setDisabled(false)
      }
      )
      .catch( () => {
        console.log('foi')
        setDisabled(false)
      })
      

    }

    return (
        <Container>

        <form onSubmit={payment}>
          <div className='card-info'>
            <img src={Card} />
            <div className='input-box'>
              <input className='input' placeholder="Card Number" type="text" fullWidth value={cardNumber} onChange={e => setCardNumber(e.target.value)} disabled={disabled}/>
              <p>E.g.: 49..., 51..., 36..., 37...</p>
              <input className='input' placeholder="Name" type="text" fullWidth value={name} onChange={e => setName(e.target.value)} disabled={disabled}/>
              <div>
                <input className='input-valid' placeholder="Valid Thru" type="text" fullWidth value={validThru} onChange={e => setValidThru(e.target.value)} disabled={disabled}/>
                <input className='input-cvc' placeholder="CVC" type="text" fullWidth value={cvv} onChange={e => setCvv(e.target.value)} disabled={disabled}/>
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
  /* height: 183px;
  border-radius: 20px;
  background-color: #898989; */
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