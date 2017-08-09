import React, { Component } from 'react';
import axios from 'axios';

class Livreur extends Component {
  constructor() {
    super();

    this.state = {
      livreurs: [],
    };
  }

  componentDidMount() {
    this.fetchLivreurs();
  }

  fetchLivreurs() {
    axios.get('/api/livreurs', {
      headers: { Authorization: `Bearer ${localStorage._token}` },
    })
      .then(({ data }) => this.setState({ livreurs: data }))
      .catch(err => console.error(err.response));
  }

  render() {
    const { livreurs } = this.state;
    return (
      <div>
        <ul>
          { livreurs.map(livreur => (
            <li key={livreur._id}>{livreur.surname} {livreur.name}</li>
          )) }
        </ul>
      </div>
    );
  }
}

export default Livreur;

