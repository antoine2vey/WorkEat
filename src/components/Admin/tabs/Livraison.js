import React, { Component } from 'react';
import { connect } from 'react-redux';
import omit from 'lodash/omit';
import { fetchPlacesIfNeeded, createPlaces, deletePlaces, updatePlace } from '../../../actions/livraison';
import GMap from './GoogleMap';
import { Input } from './FormFields';
import { trashBlanc, edit } from '../../../images';

class Livraison extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      geolocation: [0, 0],
      isUpdatePanelShown: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handlePosition = this.handlePosition.bind(this);
    this.focusInput = this.focusInput.bind(this);
    this.blurInput = this.blurInput.bind(this);
  }

  componentDidMount() {
    this.props.fetchPlacesIfNeeded();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.createPlaces(this.state);
  }

  handleChange(event) {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  handleDelete(id) {
    this.props.deletePlaces(id);
  }

  handlePosition({ lat, lng }) {
    this.setState({
      geolocation: [
        lat,
        lng,
      ],
    });
  }

  focusInput(event) {
    const { parentNode } = event.target;
    parentNode.classList.add('is-focused');
  }

  blurInput(event) {
    const { parentNode } = event.target;
    parentNode.classList.remove('is-focused');
  }

  showUpdatePanel(place) {
    document.body.classList.toggle('dont-scroll');
    this.setState({
      isUpdatePanelShown: !this.state.isUpdatePanelShown,
      ...place,
    });
  }

  updateTag() {
    document.body.classList.toggle('dont-scroll');
    this.setState({ isUpdatePanelShown: !this.state.isUpdatePanelShown });
  }

  handleSubmit = (evt) => {
    evt.preventDefault();

    this.props.updatePlace(omit(this.state, ['isUpdatePanelShown']));
    this.setState({ isUpdatePanelShown: !this.state.isUpdatePanelShown });
  }

  render() {
    const { places } = this.props;
    const [lat, lng] = this.state.geolocation;
    return (
      <div>
        <h2 className="admin__container-title">Points de livraison</h2>
        <div className={`admin__product-panel ${this.state.isUpdatePanelShown ? ' admin__product-panel--open' : ''}`}>
          <div className="admin__add-product">
            <h2 className="admin__container-title">Modification de {this.state.name}</h2>
            <form className="admin__form" encType="multipart/form-data" method="POST" onSubmit={this.handleSubmit}>
              <div className="admin__field-column admin__field-column-2">
                <Input value={this.state.name} type="text" name="name" placeholder="Nom" onFocus={this.focusInput} onBlur={this.blurInput} onChange={this.handleChange} />
              </div>
              <div className="admin__field-column admin__field-column-2">
                <Input value={this.state.description} type="text" name="description" placeholder="Description" onChange={this.handleChange} onFocus={this.focusInput} onBlur={this.blurInput} />
              </div>
              <div className="admin__field-column admin__field-column-2">
                <Input type="text" name="lat" placeholder="Latitude" onChange={this.handlePosition} value={lat} onFocus={this.focusInput} onBlur={this.blurInput} />
              </div>
              <div className="admin__field-column admin__field-column-2">
                <Input type="text" name="lat" placeholder="Longitude" onChange={this.handlePosition} value={lng} onFocus={this.focusInput} onBlur={this.blurInput} />
              </div>
              <button type="submit" className="btn-gold">Modifier</button>
            </form>
          </div>
        </div>
        <div className="admin__container-list">
          {
            places.map(place => (
              <div className="admin__livraison-column" key={place._id}>
                <div className="admin__livraison">
                  <p className="admin__livraison-text">{place.name}</p>
                  <div className="admin__button-container">
                    <div className="admin__delete-btn" onClick={() => this.handleDelete(place._id)}>
                      <img src={trashBlanc} alt="Supprimer" className="admin__delete-btn-icon" />
                    </div>
                    <div className="admin__update-btn" onClick={() => this.showUpdatePanel(place)}>
                      <img src={edit} alt="Modifier" className="admin__update-btn-icon" />
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        <h2 className="admin__container-title">Ajouter un point de livraison</h2>
        <div className="admin__container-list">
          <div className="admin__field-column admin__field-column-2">
            <form method="POST" onSubmit={this.handleSubmit}>
              <Input type="text" name="name" placeholder="Nom" onChange={this.handleChange} onFocus={this.focusInput} onBlur={this.blurInput} />
              <Input type="text" name="description" placeholder="Description" onChange={this.handleChange} onFocus={this.focusInput} onBlur={this.blurInput} />
              <Input type="text" name="lat" placeholder="Latitude" onChange={this.handlePosition} readOnly value={lat} onFocus={this.focusInput} onBlur={this.blurInput} />
              <Input type="text" name="lng" placeholder="Longitude" onChange={this.handlePosition} readOnly value={lng} onFocus={this.focusInput} onBlur={this.blurInput} />
              <button type="submit" className="btn-gold">Créer</button>
            </form>
          </div>
          <div className="admin__livraison-gmap admin__field-column admin__field-column-2">
            <GMap loadedPlaces={places} handlePosition={this.handlePosition} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  places: state.places.places,
});

export default connect(mapStateToProps, {
  fetchPlacesIfNeeded,
  deletePlaces,
  createPlaces,
  updatePlace,
})(Livraison);
