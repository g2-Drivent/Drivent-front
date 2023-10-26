import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const typeMap = {
  1: 'Single',
  2: 'Double',
  3: 'Triple',
}

const countBookings = (hotel, roomId) => {
  const userRoom = hotel['Rooms'].find(room => room.id === roomId);
  return userRoom['Booking'].length;
};

const HotelCard = ({
  hotel,
  isSelected,
  checkAccommodationTypes,
  setSelectedHotel = () => { return; },
  isBooked = false,
  booking = {},
  changeRoom
}) => {
  let nOfBookings;
  if (isBooked && Object.keys(booking).length > 0) {
    nOfBookings = countBookings(hotel, booking['Room'].id);
  }

  return (
    <>
      <HotelContainer
        onClick={() => {
          if (isBooked) return;
          if (isSelected) {
            setSelectedHotel({});
          } else {
            setSelectedHotel(hotel)
          }
        }}
        selected={isSelected}
      >
        <img src={hotel.image} alt={`${hotel.name} picture`} />
        <h3>{hotel.name}</h3>
        <div>
          {isBooked
            ? <>
              <h4>Quarto reservado:</h4>
              <p>{`${booking['Room'].id} (${typeMap[booking['Room'].capacity] || 'Large(4+)'})`}</p>
            </>
            : <>
              <h4>Tipos de acomodação:</h4>
              <p>{checkAccommodationTypes(hotel)}</p>
            </>
          }
        </div>
        <div>
          {isBooked
            ? <>
              <h4>Pessoas no seu quarto</h4>
              <p>Você{' '}{nOfBookings > 1 ? `e mais ${nOfBookings - 1} pessoas` : ''}</p>
            </>
            : <>
              <h4>Vagas disponíveis:</h4>
              <p>
                {
                  hotel.Rooms.reduce((ac, cv) => ac + cv.capacity, 0) -
                  hotel.Rooms.reduce((ac, cv) => ac + cv.Booking.length, 0)
                }
              </p>
            </>
          }
        </div>
      </HotelContainer>
      {isBooked &&
        <Button
          onClick={() => changeRoom()}
          variant='contained'
          color='inherit'
        >TROCAR DE QUARTO</Button>
      }
    </>
  )
}

HotelCard.propTypes = {
  hotel: PropTypes.object,
  isSelected: PropTypes.bool,
  setSelectedHotel: PropTypes.func,
  checkAccommodationTypes: PropTypes.func,
  isBooked: PropTypes.bool,
  booking: PropTypes.object,
  changeRoom: PropTypes.func,
}

const HotelContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  gap: 20px;

  width: 200px;
  height: 285px;
  padding: 12px;
  margin-bottom: 35px;
  border-radius: 10px;
  background: ${props => props.selected ? '#FFEED2' : '#F1F1F1'};

  cursor: pointer;

  img {
    width: 100%;
    max-width: 200px;
    height: 110px;
    border-radius: 5px;
  }

  h3 {
    color: #343434;
    font-size: 20px;
    font-weight: 400;
  }

  h4, p {
    color: #3C3C3C;
    font-size: 15px;
    font-weight: 700;
  }

  p {
    font-weight: 400;
  }
`;

export default HotelCard