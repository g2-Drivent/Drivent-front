import api from './api';

export async function getEventInfo() {
  const response = await api.get('/event');
  return response.data;
}

export async function getEventLogo() {
  const response = await api.get('/event/image');
  return response.data;
}
//
