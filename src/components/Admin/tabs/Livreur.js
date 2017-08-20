import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchPlacesIfNeeded } from '../../../actions/livraison';
import { Input, Select } from './FormFields';

class Livreur extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      placesToGo: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    //this.fetchLivreurs();
    this.props.fetchPlacesIfNeeded();
  }

  handleChange(event) {
    const { name, value, options } = event.target;

    switch (name) {
      case 'placesToGo': {
        this.setState({ [name]: [...options].filter(option => option.selected).map(option => option.value) });
        break;
      }
      default: {
        this.setState({ [name]: value });
      }
    }

    console.log(this.state);
  }

  fetchLivreurs() {
    axios
      .get('/api/livreurs', {
        headers: { Authorization: `Bearer ${localStorage._token}` },
      })
      .then(({ data }) => this.setState({ livreurs: data }))
      .catch(err => console.error(err.response));
  }

  handleSubmit(event) {
    event.preventDefault();
    axios
      .post('/api/livreurs', this.state, {
        headers: { Authorization: `Bearer ${localStorage._token}` },
      })
      .then(({ data }) => console.log(data))
      .catch(err => console.error(err.response));
  }

  render() {
    const { places } = this.props;
    return (
      <div className="admin__products">
        <div className="admin__add-product">
          <h2 className="admin__products-title">Créer un livreur</h2>
          <form onSubmit={this.handleSubmit} noValidate>
            <Input type="email" name="email" placeholder="Nom" onChange={this.handleChange} />
            <Input type="text" name="password" placeholder="Mot de passe" onChange={this.handleChange} />
            <Select label="Endroits" name="placesToGo" multiple data={places} onChange={this.handleChange} />
            <Input type="submit" value="Créer" className="btn" />
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  places: state.places.places,
});

export default connect(mapStateToProps, { fetchPlacesIfNeeded })(Livreur);
