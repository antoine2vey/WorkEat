import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/auth';

const initialState = {
  token: null,
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isAuthenticating: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isAuthenticating: false,
        statusText: 'Connecté!',
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticating: false,
        statusText: 'Mauvais mot de passe/nom de compte',
      };
    default:
      return state;
  }
};

export default auth;
