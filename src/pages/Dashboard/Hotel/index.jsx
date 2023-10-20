import { useEffect, useState } from "react";
import styled from "styled-components";

import { Typography } from "@mui/material";

import useHotel from "../../../hooks/api/useHotel";
import useFindBooking from "../../../hooks/api/useFindBooking";

import Rooms from "../../../components/Dashboard/Hotel/Rooms";
import HotelCard from "../../../components/Dashboard/Hotel/HotelCard";

import { StyledTypography } from "../../../components/PersonalInformationForm";
import UnauthorizedScreen from "../../../components/unauthorizedScreen";
import useTicket from "../../../hooks/api/useTicket";

export default function Hotel() {

  const ticket = useTicket();
  const { hotels } = useHotel();
  const { booking } = useFindBooking();
  const [selectedHotel, setSelectedHotel] = useState({});

  useEffect(() => {
    if(booking) {
      setSelectedHotel(hotels?.find(hotel => hotel.id === booking.Room.hotelId) || {});
    }
  }, [booking, hotels]);

  function checkAccommodationTypes(hotel){
    const accommodationTypes = [];
    const capacities = [... new Set(hotel.Rooms.map(r => r.capacity))].sort((a, b) => a - b);
    for (let i = 0; i < capacities.length; i++){
      if (capacities[i] === 1)
        accommodationTypes.push("Single");
      else if (capacities[i] === 2)
        accommodationTypes.push("Double");
      else if (capacities[i] === 3)
        accommodationTypes.push("Triple");
      else{
        accommodationTypes.push("Large(4+)");
        break;
      }
    }
    return accommodationTypes.join(', ');
  }

  return (
    <div>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      {booking && Object.keys(selectedHotel).length > 0 ?
      <>
        <Typography variant="h5" color='#8E8E8E' mb={2}>Você já escolheu seu quarto:</Typography>
        <HotelCard
          hotel={selectedHotel}
          isSelected={true}
          checkAccommodationTypes={checkAccommodationTypes}
          setSelectedHotel={setSelectedHotel}
          isBooked={true}
          booking={booking}
        />
      </>
       : <>
            { !ticket.ticket ?
            <UnauthorizedScreen firstLine="Você precisa completar sua inscrição antes" secondLine="de prosseguir pra escolha de hospedagem"/> :
            ticket.ticket.status !== 'PAID'  ?
            <UnauthorizedScreen firstLine="Você precisa ter confirmado pagamento antes" secondLine="de fazer a escolha de hospedagem"/> :
            !ticket.ticket.TicketType.includesHotel ?
            <UnauthorizedScreen firstLine="Sua modalidade de ingresso não inclui hospedagem" secondLine="Prossiga para a escolha de atividades"/> : ""}
          <div>
            { hotels && hotels.length > 0 ?
              <HotelsWrapper>
                { hotels.map(h =>
                  <HotelCard
                    key={h.id}
                    hotel={h}
                    isSelected={selectedHotel.id === h.id}
                    checkAccommodationTypes={checkAccommodationTypes}
                    setSelectedHotel={setSelectedHotel}
                  />
                )}
              </HotelsWrapper>
              : ""
            }
          </div>
          {selectedHotel?.id && <Rooms hotel={selectedHotel} />}
      </>
      }
    </div>
  );
}

const HotelsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px;

  flex-wrap: wrap;
`;
