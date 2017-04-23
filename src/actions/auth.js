import axios from 'axios';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const USER_LOGOUT = 'USER_LOGOUT';

const loginUserRequest = () => ({
  type: LOGIN_REQUEST,
});

const loginUserSuccess = (token) => {
  // TODO: Redirect to logged home!
  localStorage.setItem('_token', token);
  axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
  return {
    type: LOGIN_SUCCESS,
  };
};

const loginUserFailure = err => ({
  type: LOGIN_FAILURE,
  err,
}); 

const logout = () => {
  localStorage.removeItem('_token');
  // TODO: Redirect to not logged home;
  return {
    type: USER_LOGOUT,
  };
};

export const logoutUser = () => (dispatch) => {
  axios.post('/account/logout')
    .then(() => dispatch(logout()));
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
