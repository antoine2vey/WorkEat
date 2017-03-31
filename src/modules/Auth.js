class Auth {
  static authenticateUser(data, callback = null) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    callback();
  }

  static isUserAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

  static deAuthenticateUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  static getToken() {
    return localStorage.getItem('token');
  }
}

export default Auth;