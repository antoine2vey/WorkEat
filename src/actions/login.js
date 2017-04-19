import axios from 'axios';

export const LOGIN = 'LOGIN';
export const BAD_LOGIN = 'BAD_LOGIN';
export const LOGOUT = 'LOGOUT';

export function login(payload) {
  return dispatch =>
    axios.post('/account/login', payload).then(() => {
      dispatch();
    });
}
