import axios from 'axios';
import history from '../utils/history';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const USER_LOGOUT = 'USER_LOGOUT';
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT';
export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';

const loginUserRequest = () => ({ type: LOGIN_REQUEST });
const loginUserSuccess = (userInformations) => {
  localStorage.setItem('_token', userInformations.token);
  history.push('/');
  return {
    type: LOGIN_SUCCESS,
    token: userInformations.token,
    user: userInformations.user,
  };
};
const loginUserFailure = err => ({ type: LOGIN_FAILURE, err });
const logout = () => {
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
  axios.put('/account/update', account, {
    headers: {
      Authorization: `Bearer ${localStorage._token}`,
    },
  })
    .then(res => dispatch(updateAccount(res.data.user)))
    .catch(err => console.error(err));
};
