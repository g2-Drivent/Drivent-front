import { useEffect, useState } from "react";
import styled from "styled-components";

import { Typography } from "@mui/material";

import useHotel from "../../../hooks/api/useHotel";
import useFindBooking from "../../../hooks/api/useFindBooking";

import Rooms from "../../../components/Dashboard/Hotel/Rooms";
import HotelCard from "../../../components/Dashboard/Hotel/HotelCard";

import { StyledTypography } from "../../../components/PersonalInformationForm";

export default function Hotel() {
  const ticket= 1;
  const payment = 1;
  const hotelIncluded = 1;
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
          <div>
            { !ticket ?
            <h2>Você precisa completar sua inscrição antes de prosseguir pra escolha de hospedagem</h2> :
            !payment  ?
            <h2>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</h2> :
            !hotelIncluded ?
            <div>
              <h2>Sua modalidade de ingresso não inclui hospedagem</h2>
              <h2>Prossiga para a escolha de atividades</h2>
            </div> : ""}
          </div>
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
              : <p>Nenhum hotel cadastrado para este evento</p>
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
