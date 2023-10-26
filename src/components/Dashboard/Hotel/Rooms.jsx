import PropTypes from 'prop-types';

import styled from 'styled-components';
import { toast } from 'react-toastify';

import { Button, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import useBooking from '../../../hooks/api/useBooking';
import useChangeRoom from '../../../hooks/api/useChangeRoom';

const Rooms = ({ hotel, isChangingRoom = false }) => {
    const [roomsState, setRoomsState] = useState({});
    const [initialState, setInitialState] = useState({});
    const [selectedRoom, setSelectedRoom] = useState(null);
    const { createBooking } = useBooking();
    const { changeRoom } = useChangeRoom();
    useEffect(() => {
        setSelectedRoom(null)
        if (hotel) {
            const roomAvailability = {
                hotelId: hotel.id,
            };
            for (let i = 0; i < hotel['Rooms'].length; ++i) {
                const capacity = hotel['Rooms'][i].capacity;
                const bookings = hotel['Rooms'][i]['Booking'].length;
                const available = capacity - bookings;

                roomAvailability[hotel['Rooms'][i].id] = {
                    available,
                    taken: bookings,
                    svgRepr: Array(hotel['Rooms'][i].capacity).fill().map((_, idx) => {
                        if (available === 0) return personSVGGrey;
                        if (idx + 1 <= available) {
                            return personSVGWhite;
                        } else return personSVGBlack;
                    }),
                    selected: false,
                    bgcolor: available === 0 ? '#E9E9E9' : '#FFF',
                };
            }
            setInitialState(Object.assign({}, roomAvailability));
            setRoomsState(Object.assign({}, roomAvailability));
        }
    }, [hotel]);

    const selectRoom = room => {
        const selected = !roomsState[room.id].selected;
        const newAvbl = roomsState[room.id].available + (selected ? -1 : 1);
        const newTaken = roomsState[room.id].taken + (selected ? 1 : -1);
        const newSvgRepr = [...roomsState[room.id].svgRepr];

        const newBgcolor = selected ? '#FFEED2' : '#FFF';

        const idxToChange = selected ? roomsState[room.id].available - 1 : roomsState[room.id].available;
        newSvgRepr[idxToChange] = selected ? personSVGPink : personSVGWhite;

        setRoomsState({
            ...initialState, [room.id]: {
                available: newAvbl, taken: newTaken,
                svgRepr: newSvgRepr, selected, bgcolor: newBgcolor,
            },
        });
        setSelectedRoom(prev => prev === room.id ? null : room.id);
    };
    const submit = async () => {
        try {
            if (isChangingRoom) {
                await changeRoom({ roomId: selectedRoom });
                toast('Quarto alterado com sucesso!');
            } else {
                await createBooking({ roomId: selectedRoom });
                toast('Quarto reservado com sucesso!');
            }
        } catch (err) {
            toast('Não foi possível fazer a reserva!')
        } finally {
            setInterval(() => {
                location.reload();
            }, 2000);
        }
    };

    return (<>
        <Typography variant='body1' color='#8E8E8E' mt={3}>Ótima pedida! Agora escolha seu quarto:</Typography><br />
        {roomsState?.hotelId === hotel.id && Object.keys(roomsState).length > 1 &&
            <RoomsContainer
                container rowSpacing={0} columnSpacing={2} gap={1} justifyContent='center'
            >
                {hotel['Rooms'].map((room, idx) => <Grid container
                    item xs={10} sm={3.5} md={2.8} key={idx} justifyContent='space-between' alignItems='center'
                    className='room'
                    style={{ background: roomsState[room.id].bgcolor }}
                    onClick={() => {
                        if ((roomsState[room.id].available <= 0
                            && !roomsState[room.id].selected)) return;
                        selectRoom(room, selectedRoom);
                    }}
                >
                    {room.id > 99 ? room.id : room.id > 9 ? '0' + (room.id).toString() : '00' + (room.id).toString()}
                    <div>
                        {roomsState[room.id].svgRepr.map((rep, idx) => <span key={idx}>
                            {rep}
                        </span>)}
                    </div>
                </Grid>)}
            </RoomsContainer>
            || <h1>Parece que esse hotel não possui quartos...</h1>}
        <Button variant='contained' color='inherit' style={{
            display: 'flex', alignItems: 'center', padding: '8px 20px', marginTop: '25px',
        }}
            onClick={submit}
            disabled={!selectedRoom}
        >
            {isChangingRoom ? 'FAZER TROCA' : 'RESERVAR QUARTO'}
        </Button>
    </>
    )
}

const RoomsContainer = styled(Grid)`
    .room {
        background: ${props => props.selected && '#FFEED2' || '#FFF'};
        width: 190px;
        min-height: 45px;
        padding: 5px;
        border-radius: 10px;
        border: 1px solid #CECECE;
        cursor: pointer;
    }
`;

Rooms.propTypes = {
    hotel: PropTypes.object,
    isChangingRoom: PropTypes.bool,
}

const personSVGWhite = <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
    <path d="M13.5 13.5C14.8427 13.5 16.1303 12.9666 17.0797 12.0172C18.0291 11.0678 18.5625 9.78016 18.5625 8.4375C18.5625 7.09484 18.0291 5.80717 17.0797 4.85777C16.1303 3.90837 14.8427 3.375 13.5 3.375C12.1573 3.375 10.8697 3.90837 9.92027 4.85777C8.97087 5.80717 8.4375 7.09484 8.4375 8.4375C8.4375 9.78016 8.97087 11.0678 9.92027 12.0172C10.8697 12.9666 12.1573 13.5 13.5 13.5ZM16.875 8.4375C16.875 9.33261 16.5194 10.1911 15.8865 10.824C15.2535 11.4569 14.3951 11.8125 13.5 11.8125C12.6049 11.8125 11.7464 11.4569 11.1135 10.824C10.4806 10.1911 10.125 9.33261 10.125 8.4375C10.125 7.54239 10.4806 6.68395 11.1135 6.05101C11.7464 5.41808 12.6049 5.0625 13.5 5.0625C14.3951 5.0625 15.2535 5.41808 15.8865 6.05101C16.5194 6.68395 16.875 7.54239 16.875 8.4375ZM23.625 21.9375C23.625 23.625 21.9375 23.625 21.9375 23.625H5.0625C5.0625 23.625 3.375 23.625 3.375 21.9375C3.375 20.25 5.0625 15.1875 13.5 15.1875C21.9375 15.1875 23.625 20.25 23.625 21.9375ZM21.9375 21.9307C21.9358 21.5156 21.6776 20.2669 20.5335 19.1227C19.4333 18.0225 17.3627 16.875 13.5 16.875C9.63562 16.875 7.56675 18.0225 6.4665 19.1227C5.32238 20.2669 5.06588 21.5156 5.0625 21.9307H21.9375Z" fill="black" />
</svg>;

const personSVGBlack = <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
    <path d="M5.0625 23.625C5.0625 23.625 3.375 23.625 3.375 21.9375C3.375 20.25 5.0625 15.1875 13.5 15.1875C21.9375 15.1875 23.625 20.25 23.625 21.9375C23.625 23.625 21.9375 23.625 21.9375 23.625H5.0625ZM13.5 13.5C14.8427 13.5 16.1303 12.9666 17.0797 12.0172C18.0291 11.0678 18.5625 9.78016 18.5625 8.4375C18.5625 7.09484 18.0291 5.80717 17.0797 4.85777C16.1303 3.90837 14.8427 3.375 13.5 3.375C12.1573 3.375 10.8697 3.90837 9.92027 4.85777C8.97087 5.80717 8.4375 7.09484 8.4375 8.4375C8.4375 9.78016 8.97087 11.0678 9.92027 12.0172C10.8697 12.9666 12.1573 13.5 13.5 13.5Z" fill="black" />
</svg>;

const personSVGPink = <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
    <path d="M2.0625 20.625C2.0625 20.625 0.375 20.625 0.375 18.9375C0.375 17.25 2.0625 12.1875 10.5 12.1875C18.9375 12.1875 20.625 17.25 20.625 18.9375C20.625 20.625 18.9375 20.625 18.9375 20.625H2.0625ZM10.5 10.5C11.8427 10.5 13.1303 9.96663 14.0797 9.01723C15.0291 8.06782 15.5625 6.78016 15.5625 5.4375C15.5625 4.09484 15.0291 2.80717 14.0797 1.85777C13.1303 0.908369 11.8427 0.375 10.5 0.375C9.15734 0.375 7.86968 0.908369 6.92027 1.85777C5.97087 2.80717 5.4375 4.09484 5.4375 5.4375C5.4375 6.78016 5.97087 8.06782 6.92027 9.01723C7.86968 9.96663 9.15734 10.5 10.5 10.5Z" fill="#FF4791" />
</svg>;

const personSVGGrey = <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
    <path d="M5.0625 23.625C5.0625 23.625 3.375 23.625 3.375 21.9375C3.375 20.25 5.0625 15.1875 13.5 15.1875C21.9375 15.1875 23.625 20.25 23.625 21.9375C23.625 23.625 21.9375 23.625 21.9375 23.625H5.0625ZM13.5 13.5C14.8427 13.5 16.1303 12.9666 17.0797 12.0172C18.0291 11.0678 18.5625 9.78016 18.5625 8.4375C18.5625 7.09484 18.0291 5.80717 17.0797 4.85777C16.1303 3.90837 14.8427 3.375 13.5 3.375C12.1573 3.375 10.8697 3.90837 9.92027 4.85777C8.97087 5.80717 8.4375 7.09484 8.4375 8.4375C8.4375 9.78016 8.97087 11.0678 9.92027 12.0172C10.8697 12.9666 12.1573 13.5 13.5 13.5Z" fill="#8C8C8C" />
</svg>;

export default Rooms