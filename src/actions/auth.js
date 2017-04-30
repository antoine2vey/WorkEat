import axios from 'axios';
import history from '../utils/history';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const USER_LOGOUT = 'USER_LOGOUT';

const loginUserRequest = () => ({
  type: LOGIN_REQUEST,
});

const loginUserSuccess = (token) => {
  localStorage.setItem('_token', token);
  history.push('/');
  return {
    type: LOGIN_SUCCESS,
    token,
  };
};

const loginUserFailure = err => ({
  type: LOGIN_FAILURE,
  err,
});

const logout = () => {
  localStorage.removeItem('_token');
  history.push('/');
  return {
    type: USER_LOGOUT,
  };
};

export const logoutUser = () => (dispatch) => {
  axios.post('/account/logout')
    .then(() => dispatch(logout()))
    .catch(err => console.log(err));
};

export const loginUser = ({ email, password }) => (dispatch) => {
  dispatch(loginUserRequest());
  axios.post('/account/login', {
    username: email,
    password,
  })
  .then(res => dispatch(loginUserSuccess(res.data.token)))
  .catch(err => dispatch(loginUserFailure(err)));
};
