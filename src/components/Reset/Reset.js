import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Input } from '../Admin/tabs/FormFields';

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
    this.changePassword = this.changePassword.bind(this);
  }

  componentDidMount() {
    axios.get(`/reset/${this.token}`)
      .then(({ data }) => this.setState({ username: data.user }))
      .catch(() => this.setState({ shouldRedirect: true }));
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
      axios.post(`/reset/${this.token}`, { password })
        .then(() => this.setState({ shouldRedirect: true }))
        .catch(({ response }) => console.log(response));
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
        <form noValidate onSubmit={this.changePassword}>
          <Input name="username" type="text" value={username} onChange={this.handleChange} />
          <Input name="password" type="password" placeholder="Nouveau mot de passe" onChange={this.handleChange} />
          <Input name="confirmPassword" type="password" placeholder="Confirmez" onChange={this.handleChange} />
          <Input type="submit" />
        </form>
        {displayError && 'ne correspond pas'}
      </div>
    );
  }
}

export default Reset;

