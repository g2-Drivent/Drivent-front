import styled from "styled-components";

export default function UnauthorizedScreen(){
    return(
    <SuperContainer>
        <TextContainer>
            <span>Você precisa completar sua inscrição antes</span>
            <span>de prosseguir pra escolha de ingresso</span>
        </TextContainer>
    </SuperContainer>
    );
}

const SuperContainer = styled.div`
    height: 90%;
    display: flex;
    justify-content: center;
    padding-top: 234px;
`

const TextContainer = styled.div`
    width: 388px;
    height: 46px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    span{
        color: #8E8E8E;
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 20px;
        line-height:23px
    }
`