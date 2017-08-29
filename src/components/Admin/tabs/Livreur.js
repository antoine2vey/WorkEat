import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchPlacesIfNeeded } from '../../../actions/livraison';
import { Input, Select } from './FormFields';
import { trashBlanc } from '../../../images';

class Livreur extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      placesToGo: [],
      livreurs: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchPlacesIfNeeded();
    this.fetchLivreurs();
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
      .catch(err => console.error(err));
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

  handleDelete(id) {
    axios
      .delete(`/api/livreurs/${id}`, {
        headers: { Authorization: `Bearer ${localStorage._token}` },
      })
      .then(({ data }) => {
        this.setState({
          livreurs: this.state.livreurs.filter(livreur => livreur._id !== data),
        });
      })
      .catch(err => console.error(err.response));
  }

  render() {
    const { places } = this.props;
    return (
      <div>
        <h2 className="admin__container-title">Mes livreurs</h2>
        <div className="admin__container-list">
          {
            this.state.livreurs.map(livreur => (
              <div className="admin__livraison-column" key={livreur._id}>
                <div className="admin__livraison">
                  <p className="admin__livraison-text">{livreur.email}</p>
                  <div className="admin__delete-btn" onClick={() => this.handleDelete(livreur._id)}>
                    <img src={trashBlanc} alt="Supprimer" className="admin__delete-btn-icon" />
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        <h2 className="admin__container-title">Ajouter un livreur</h2>
        <form onSubmit={this.handleSubmit} noValidate>
          <div className="admin__container-list">
            <div className="admin__field-column admin__field-column-2">
              <Input type="email" name="email" placeholder="Email" onChange={this.handleChange} />
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
