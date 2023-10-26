import api from './api';

export async function signIn(email, password) {
  const response = await api.post('/auth/sign-in', { email, password });
  return response.data;
}

export async function signWithGitHub(code){
  const response = await api.post('/auth/sign-in/github',{code});
  return response.data;
}
//
