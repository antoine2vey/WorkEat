import React, { Component } from 'react';
import Auth from '../../modules/Auth';
import { Redirect } from 'react-router';
import axios from 'axios';

class LoginBox extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    }

    this.handleLogin = this.handleLogin.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleLogin(event) {
    const { email, password } = this.state;
    event.preventDefault();

    axios.post('/account/login', {
      username: email,
      password
    })
    .then(res => {
      const { token } = res.data;
      let instance = axios.create();
      instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
      Auth.authenticateUser(res.data);
    })
    .catch(err => console.log(err));
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({[name]: value})
  }

  render() {
    return (
      <div>
        { Auth.isUserAuthenticated() ? 'Déjà connecté' : 'Non connecté' }
        <form onSubmit={this.handleLogin}>
          <div className="field">
            <label className="label">Email</label>
            <p className="control">
              <input className="input" type="email" name="email" placeholder="Text input" onChange={this.handleChange}/>
            </p>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <p className="control">
              <input className="input" type="password" name="password" placeholder="Text input" onChange={this.handleChange}/>
            </p>
          </div> 
          <input type="submit" value="login"/>
        </form>
      </div>
    );
  }
}

class ConnectionBox extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      surname: '',
      email: '',
      password: '',
      zipCode: '',
      town: '',
      address: '',
      phoneNumber: ''
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({[name]: value});
  }
  
  handleLogin(e) {
    const {
      name,
      surname,
      email,
      password,
      zipCode,
      town,
      address,
      phoneNumber
    } = this.state;
    e.preventDefault();
    
    axios.post('/account/create', {
      username: email,
      password,
      name,
      surname,
      codePostal: zipCode,
      town,
      address,
      phoneNumber      
    })
    .then(res => {
      
    })
    .catch(err => console.error(err));
  }
  render() {
    return (
      <form onSubmit={this.handleLogin}>
          <div className="field">
            <label className="label">Nom</label>
            <p className="control">
              <input className="input" type="text" name="name" placeholder="Text input" onChange={this.handleChange}/>
            </p>
          </div>
          <div className="field">
            <label className="label">Prénom</label>
            <p className="control">
              <input className="input" type="text" name="surname" placeholder="Text input" onChange={this.handleChange}/>
            </p>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <p className="control">
              <input className="input" type="email" name="email" placeholder="Text input" onChange={this.handleChange}/>
            </p>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <p className="control">
              <input className="input" type="password" name="password" placeholder="Text input" onChange={this.handleChange}/>
            </p>
          </div>
          <div className="field">
            <label className="label">Code postal</label>
            <p className="control">
              <input className="input" name="zipCode" type="text" placeholder="Text input" onChange={this.handleChange}/>
            </p>
          </div> 
          <div className="field">
            <label className="label">Ville</label>
            <p className="control">
              <input className="input" name="town" type="text" placeholder="Text input" onChange={this.handleChange}/>
            </p>
          </div> 
          <div className="field">
            <label className="label">Adresse</label>
            <p className="control">
              <input className="input" name="address" type="text" placeholder="Text input" onChange={this.handleChange}/>
            </p>
          </div>  
          <div className="field">
            <label className="label">Numéro de téléphone</label>
            <p className="control">
              <input className="input" name="phoneNumber" type="text" placeholder="Text input" onChange={this.handleChange}/>
            </p>
          </div>  
          <input type="submit" value="create"/>
        </form>
    );
  }
}

export { LoginBox, ConnectionBox };