import React, { Component } from 'react';
import axios from 'axios';
import { NotificationManager, NotificationContainer } from 'react-notifications';
import { Redirect } from 'react-router-dom';
import { Input } from '../Admin/tabs/FormFields';
import Header from '../Header/Header';
import { Helmet } from 'react-helmet';

class Reset extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      shouldRedirect: false,
    };

    this.token = props.match.params.token;
    this.handleChange = this.handleChange.bind(this);
    this.focusInput = this.focusInput.bind(this);
    this.blurInput = this.blurInput.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  componentDidMount() {
    axios.get(`/reset/${this.token}`)
      .then(({ data }) => this.setState({ username: data.user }))
      .catch(() => this.setState({ shouldRedirect: true }));
  }

  focusInput(event) {
    const { parentNode } = event.target;
    parentNode.classList.add('is-focused');
  }

  blurInput(event) {
    const { parentNode } = event.target;
    parentNode.classList.remove('is-focused');
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  changePassword(event) {
    const { password, confirmPassword } = this.state;
    event.preventDefault();

    if (password === confirmPassword) {
      axios.post(`/reset/${this.token}`, { password, confirmPassword })
        .then(() => {
          this.setState({ shouldRedirect: true }, () => {
            NotificationManager.error('Vous pouvez vous connecter!', 'Compte', 3000);
          });
        })
        .catch(({ response }) => {
          NotificationManager.error(response.data, 'Compte', 3000);
        });
    }
  }

  render() {
    const { username, password, confirmPassword, shouldRedirect } = this.state;
    const displayError = (password !== confirmPassword) && confirmPassword;

    if (shouldRedirect) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <Header />
        <Helmet>
          <title>Workeat - Modification du mot de passe</title>
        </Helmet>
        <div className="admin__reset">
          <h2 className="admin__container-title">Nouveau mot de passe</h2>
          <form noValidate onSubmit={this.changePassword} className="admin__form">
            <div className="admin__field-column admin__field-column-1">
              <Input name="username" type="text" value={username} placeholder="Email" onFocus={this.focusInput} onBlur={this.blurInput} onChange={this.handleChange} />
            </div>
            <div className="admin__field-column admin__field-column-2">
              <Input name="password" type="password" placeholder="Nouveau mot de passe" onFocus={this.focusInput} onBlur={this.blurInput} onChange={this.handleChange} />
            </div>
            <div className="admin__field-column admin__field-column-2">
              <Input name="confirmPassword" type="password" placeholder="Confirmez" onFocus={this.focusInput} onBlur={this.blurInput} onChange={this.handleChange} />
            </div>
            <button className="btn-gold" type="submit" disabled={displayError}>Modifier le mot de passe</button>
          </form>
        </div>
        <NotificationContainer />
      </div>
    );
  }
}

export default Reset;
