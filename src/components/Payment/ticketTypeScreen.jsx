import styled from "styled-components"
import { useEffect, useState } from "react";
import OptionBox from "./OptionBox";
import { AnalyseOptions } from "./analyseOptions";
import useTicketType from "../../hooks/api/useTicketType";
import usePostTicket from "../../hooks/api/usePostTicket";
import useToken from "../../hooks/useToken";
import { toast } from "react-toastify";

export default function TicketTypeScreen(){
    const {ticketType} = useTicketType();
    const{postTicketLoading,postTicketError,postTicket} = usePostTicket();
    const token = useToken();
    
    const [infos, setInfos] = useState(AnalyseOptions([]));
    const [isInPerson, setIsInPerson] = useState(null);
    const [hasHotel, setHasHotel] = useState(null);
    const [precoTotal, setPrecoTotal] = useState({mod:0,hotel:0});
    const [selectedId, setSelectedId] = useState(null);
    


    useEffect(()=>{
        if(ticketType){
            setInfos(AnalyseOptions(ticketType));
        }

    },[ticketType]);

    async function registerTicket(){
        try{
        console.log("aqui");
        const ticket = await postTicket({ticketTypeId:selectedId},token);
        toast('Ticket registrado com sucesso!');
        } catch (err) {
            console.log(err);
            toast('Não foi possível fazer o login!');
        }
    }

    function SelectPresential(){
        setIsInPerson(true);
        setPrecoTotal({mod:infos.prices.presentialTicketPrice ,hotel:0});
        setHasHotel(null);
        setSelectedId(null);
    }
    function SelectOnline(){
        setHasHotel(null);
        setIsInPerson(false);
        setPrecoTotal({mod:infos.prices.remoteTicketPrice ,hotel:0});
        setSelectedId(infos.ids.remoteTicketId);
    }

    function SelectPresentialWithoutHotel(){
        setHasHotel(false);
        setPrecoTotal({mod:infos.prices.presentialTicketPrice ,hotel:0});
        setSelectedId(infos.ids.presentialNoHotelId);
    }
    function SelectPresentialWithHotel(){
        setHasHotel(true);
        setPrecoTotal({mod:infos.prices.presentialTicketPrice ,hotel:infos.prices.HotelOptionPrice});
        setSelectedId(infos.ids.presentialHotelId);
    }


    return(
        <>
            <InformationText>Primeiro, escolha sua modalidade de ingresso</InformationText>
                <OptionsContainer>
                    {infos.booleans.hasPresential && <OptionBox description="Presencial" price={"R$ "+infos.prices.presentialTicketPrice + ",00"}  selected={isInPerson} clickFunction={SelectPresential}/>}
                    {infos.booleans.hasRemote && <OptionBox description="Online" price={"R$ "+infos.prices.remoteTicketPrice + ",00"} selected={(isInPerson!==null)?(!isInPerson):null} clickFunction={SelectOnline}/>}
                </OptionsContainer>

            {(isInPerson === true) &&
            <>
                <InformationText>Ótimo! Agora escolha sua modalidade de hospedagem</InformationText>
                <OptionsContainer>
                    {infos.booleans.hasWithoutHotelOption && <OptionBox description="Sem Hotel" price="+R$ 0" selected={(hasHotel!==null)?(!hasHotel):null} clickFunction={SelectPresentialWithoutHotel}/>}
                    {infos.booleans.hasHotelOption && <OptionBox description="Com Hotel" price={"+R$ "+infos.prices.HotelOptionPrice + ",00"}  selected={hasHotel} clickFunction={SelectPresentialWithHotel}/>}
                </OptionsContainer>
            </>
            }
            {(selectedId!== null) && <InformationText>Fechado! O total ficou em <span>R$ {(precoTotal.mod+precoTotal.hotel)}</span>. Agora é só confirmar:</InformationText>}
            
            {(selectedId!== null) && <ResevoirButton onClick={()=>{registerTicket()}}>RESERVAR INGRESSO (id:{selectedId})</ResevoirButton>}
        </>
    )
}

const InformationText = styled.p`
        margin: 17px 0px;
        color: #8E8E8E;
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 20px;
        line-height:23px;
        span{
            font-weight: 800;
            text-decoration: bold;
        }
`

const ResevoirButton = styled.button`
    background-color: #E0E0E0;
    border: none;
    border-radius: 4px;
    height: 37px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height:17px;
    box-shadow: 0px 2px 10px 0px #00000040;
    &:hover{
        cursor: pointer;
    }

`;

const OptionsContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 24px;
    height: 145px;
`

