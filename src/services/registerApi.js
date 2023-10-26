import api from './api';

export async function getUserRegister(token) {
  const response = await api.get('/register', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

