import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import history from '../utils/history';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const USER_LOGOUT = 'USER_LOGOUT';
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT';
export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';
export const INCREASE_AMOUNT = 'INCREASE_AMOUNT';

const loginUserRequest = () => ({ type: LOGIN_REQUEST });
const loginUserSuccess = (userInformations) => {
  localStorage.setItem('_token', userInformations.token);
  history.push('/');
  NotificationManager.warning('Cliquez ici pour la renseigner', 'Pas de point de livraison', 10000, () => {
    history.push('/compte/infos');
  });
  return {
    type: LOGIN_SUCCESS,
    token: userInformations.token,
    user: userInformations.user,
  };
};
const loginUserFailure = (err) => {
  NotificationManager.error('Vérifiez bien!', 'Mauvais identifiants', 3000);
  return {
    type: LOGIN_FAILURE,
    err,
  };
};
const logout = () => {
  document.body.classList.toggle('dont-scroll');
  localStorage.removeItem('_token');
  history.push('/');
  return {
    type: USER_LOGOUT,
  };
};
export const deleteAccount = () => {
  localStorage.removeItem('_token');
  history.push('/');
  return {
    type: DELETE_ACCOUNT,
  };
};
export const updateAccount = account => ({ type: UPDATE_ACCOUNT, account });
export const increaseSolde = (amount, token = '') => ({ type: INCREASE_AMOUNT, amount, token });

export const logoutUser = () => (dispatch) => {
  axios.post('/account/logout')
    .then(() => dispatch(logout()))
    .catch(err => console.error(err));
};

export const loginUser = ({ email, password }) => (dispatch) => {
  dispatch(loginUserRequest());
  axios.post('/account/login', {
    username: email,
    password,
  })
  .then(res => dispatch(loginUserSuccess(res.data)))
  .catch(err => dispatch(loginUserFailure(err)));
};

export const deleteUser = () => (dispatch) => {
  axios.delete('/account/delete', {
    headers: {
      Authorization: `Bearer ${localStorage._token}`,
    },
  })
    .then((res) => {
      dispatch(deleteAccount());
      console.log('Acc deleted', res);
    })
    .catch(err => console.error('Cannot delete account', err));
};

export const updateUser = account => (dispatch) => {
  NotificationManager.success('Vos modifications ont bien été prises en compte', 'Informations modifiées', 3000);
  axios.put('/account/update', account, {
    headers: {
      Authorization: `Bearer ${localStorage._token}`,
    },
  })
    .then(res => dispatch(updateAccount(res.data.user)))
    .catch(err => console.error(err));
};

export const updateSolde = (amount, token) => (dispatch) => {
  if (!token) {
    return axios.put('/account/update/solde?method=paypal', { amount }, {
      headers: {
        Authorization: `Bearer ${localStorage._token}`,
      },
    })
      .then(res => dispatch(increaseSolde(res.data.amount)));
  }

  return axios.put('/account/update/solde', { amount, token }, {
    headers: {
      Authorization: `Bearer ${localStorage._token}`,
    },
  })
    .then(res => dispatch(increaseSolde(res.data.amount)));
};
