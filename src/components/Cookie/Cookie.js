import React, { Component } from 'react';

class Cookie extends Component {
  constructor(props){
    super(props);
}
    cookieValid(){
      document.cookie += ' cookie=off';
      var element = document.getElementById("cookie-valider");
      element.classList.add('fadeOut');
  }
  render() {
    console.log(document.cookie);
    console.log(document.cookie.indexOf('cookie'))
    return (
      <div>
      { (document.cookie.indexOf('cookie') === -1) &&
          <div className="container-fluid cookie" id="cookie-valider">
              <p className="cookie-content">En continuant à naviguer sur ce site vous acceptez nos conditions d'utilisations
                  <button className="cookie-valider" onClick={this.cookieValid} >OK</button>
                  <a href="https://www.cnil.fr/fr/site-web-cookies-et-autres-traceurs" target="_blank"><button className="cookie-infos">En savoir plus</button></a></p>
            </div>
  }
  </div>
    );
  }
}

export default Cookie;
