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
      <div>
        <h2 className="admin__container-title">Mes livreurs</h2>
        <h2 className="admin__container-title">Ajouter un livreur</h2>
        <form onSubmit={this.handleSubmit} noValidate>
          <div className="admin__container-list">
            <div className="admin__field-column admin__field-column-2">
              <Input type="email" name="email" placeholder="Nom" onChange={this.handleChange} />
            </div>
            <div className="admin__field-column admin__field-column-2">
              <Input type="text" name="password" placeholder="Mot de passe" onChange={this.handleChange} />
            </div>
            <div className="admin__field-column admin__field-column-1">
              <Select label="Endroits" name="placesToGo" multiple data={places} onChange={this.handleChange} />
            </div>
            <div className="admin__field-column">
              <button type="submit" className="btn-gold">Créer</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  places: state.places.places,
});

export default connect(mapStateToProps, { fetchPlacesIfNeeded })(Livreur);
