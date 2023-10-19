import { useState } from "react";
import useEnrollment from "../../../hooks/api/useEnrollment";
import useHotel from "../../../hooks/api/useHotel";
import useToken from "../../../hooks/useToken";

export default function Hotel() {
  const ticket= 1;
  const payment = 1;
  const hotelIncluded = 1;
  const token = useToken();
  const { enrollment } = useEnrollment();
  const { hotels } = useHotel();
  const [selectedHotel, setSelectedHotel] = useState(0);
  
  console.log(hotels);
  
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
    console.log(accommodationTypes);
    return accommodationTypes.join(', ');
  }

  return (
    <div>
      <h1>Escolha de hotel e quarto</h1>
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
          <div>
            { hotels.map(h => 
              <div key={h.id}>
                  <h3>{h.name}</h3>
                  <div>
                    <h4>Tipos de acomodação:</h4>
                        <p>{checkAccommodationTypes(h)}</p>
                  </div>
                  <div>
                    <h4>Vagas disponíveis:</h4>
                    <p>
                      {
                        h.Rooms.reduce((ac, cv) => ac + cv.capacity, 0) -
                        h.Rooms.reduce((ac, cv) => ac + cv.Booking.length, 0)
                      }
                    </p>
                  </div>
              </div>
            )}
          </div>
          : <p>Nenhum hotel cadastrado para este evento</p>
        }
      </div>
      
    </div>
  );

}