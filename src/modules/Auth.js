class Auth {
  static authenticateUser(data) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
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