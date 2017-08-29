import React, { Component } from 'react';
import axios from 'axios';
import omit from 'lodash/omit';
import { connect } from 'react-redux';
import { fetchPlacesIfNeeded } from '../../../actions/livraison';
import { Input, Select } from './FormFields';
import { trashBlanc, edit } from '../../../images';

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
      .then(({ data }) => {
        this.setState({ livreurs: [
          ...this.state.livreurs,
          data,
        ] });
      })
      .catch(err => console.error(err));
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

  showUpdatePanel(livreur) {
    document.body.classList.toggle('dont-scroll');
    this.setState({
      isUpdatePanelShown: !this.state.isUpdatePanelShown,
      ...livreur,
    });
  }

  handleUpdate = (evt) => {
    evt.preventDefault();
    const updatedLivreur = omit(this.state, ['isUpdatePanelShown', 'livreurs', 'placesToGo']);

    axios
      .put(`/api/livreurs/${updatedLivreur._id}`, updatedLivreur, {
        headers: { Authorization: `Bearer ${localStorage._token}` },
      })
      .then(({ data }) => {
        console.log(data);
        this.setState({
          passowrd: '',
          name: '',
          placesToGo: [],
          livreurs: this.state.livreurs.map((livreur) => {
            if (livreur._id !== data._id) {
              return livreur;
            }

            return data;
          }),
        });
      })
      .catch(err => console.error(err.response));
    this.setState({ isUpdatePanelShown: !this.state.isUpdatePanelShown });
  }

  render() {
    const { places } = this.props;
    const { livreurs } = this.state;
    return (
      <div>
        <h2 className="admin__container-title">Mes livreurs</h2>
        <div className={`admin__product-panel ${this.state.isUpdatePanelShown ? ' admin__product-panel--open' : ''}`}>
          <div className="admin__add-product">
            <h2 className="admin__container-title">Modification de {this.state.name}</h2>
            <form className="admin__form" encType="multipart/form-data" method="POST" onSubmit={this.handleUpdate}>
              <div className="admin__field-column admin__field-column-2">
                <Input type="email" value={this.state.email} name="email" placeholder="Email" onChange={this.handleChange} />
              </div>
              <div className="admin__field-column admin__field-column-2">
                <Input type="text" value={this.state.password} name="password" placeholder="Mot de passe" onChange={this.handleChange} />
              </div>
              <div className="admin__field-column admin__field-column-2" />
              <button type="submit" className="btn-gold">Modifier</button>
            </form>
          </div>
        </div>
        <div className="admin__container-list">
          {
            livreurs.map(livreur => (
              <div className="admin__livraison-column" key={livreur._id}>
                <div className="admin__livraison">
                  <p className="admin__livraison-text">{livreur.email}</p>
                  <div className="admin__button-container">
                    <div className="admin__delete-btn" onClick={() => this.handleDelete(livreur._id)}>
                      <img src={trashBlanc} alt="Supprimer" className="admin__delete-btn-icon" />
                    </div>
                    <div className="admin__update-btn" onClick={() => this.showUpdatePanel(livreur)}>
                      <img src={edit} alt="Modifier" className="admin__update-btn-icon" />
                    </div>
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
