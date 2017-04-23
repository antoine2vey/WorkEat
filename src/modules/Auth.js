class Auth {
  static isUserAuthenticated() {
    return localStorage.getItem('_token') !== null;
  }

  static getToken() {
    return localStorage.getItem('_token');
  }
}

export default Auth;
