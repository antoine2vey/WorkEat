import axios from 'axios';

class Auth {
  static authenticateUser(credentials) {
    const { email, password } = credentials;

    /**
     * Promise based for clearer instructions
     */
    return new Promise((resolve, reject) => {
      axios.post('/account/login', { username: email, password })
        .then((res) => {
          const { token, user } = res.data;
          /**
           * LocalStorage set
           */
          localStorage.setItem('_token', token);
          localStorage.setItem('_user', JSON.stringify(user));

          /**
           * Strange bug, have to make axios available from window
           * so token is available everywhere, because defaults are set to
           * an instance ..
           */
          window.axios = axios;
          window.axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
          resolve(res.data);
        })
        .catch(err => reject(err));
    });
  }

  static isUserAuthenticated() {
    return localStorage.getItem('_token') !== null;
  }

  static deAuthenticateUser() {
    localStorage.removeItem('_token');
    localStorage.removeItem('_user');
  }

  static getToken() {
    return localStorage.getItem('_token');
  }
}

export default Auth;
