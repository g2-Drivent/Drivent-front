import api from './api';

export async function getTickets(token){
  console.log({token});
  const response = await api.get('/tickets/types',{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}