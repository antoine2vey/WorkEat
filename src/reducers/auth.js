import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, USER_LOGOUT, DELETE_ACCOUNT, UPDATE_ACCOUNT, INCREASE_AMOUNT } from '../actions/auth';
import { CHECKOUT_SUCCESS } from '../actions/cart';

const initialState = {
  token: null,
  user: {},
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case CHECKOUT_SUCCESS:
      if (action.method === 'SOLDE') {
        return {
          ...state,
          user: {
            ...state.user,
            solde: state.user.solde -= action.order.amount,
          },
        };
      }

      return state;
    case UPDATE_ACCOUNT:
      return {
        ...state,
        user: action.account,
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        isAuthenticating: true,
      };
    case INCREASE_AMOUNT:
      return {
        ...state,
        user: {
          ...state.user,
          solde: state.user.solde += action.amount,
        },
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
        user: action.user,
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
    case USER_LOGOUT:
    case DELETE_ACCOUNT:
      return initialState;
    default:
      return state;
  }
};

export default auth;
