import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPlacesIfNeeded, createPlaces, deletePlaces } from '../../../actions/livraison';
import GMap from './GoogleMap';
import { Input } from './FormFields';

class Livraison extends Component {
  constructor() {
    super();
    this.state = {
      geolocation: [0, 0],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handlePosition = this.handlePosition.bind(this);
  }

  componentDidMount() {
    this.props.fetchPlacesIfNeeded();
    console.log(this.props);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.createPlaces(this.state);
  }

  handleChange(event) {
    const { value, name } = event.target;
    this.setState({ [name]: value }, () => console.log(this.state));
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

  render() {
    const { places } = this.props;
    const [lat, lng] = this.state.geolocation;
    return (
      <div>
        <h2 className="admin__container-title">Points de livraison</h2>
          <div className="admin__container-list">
            <div className="admin__container-list admin__field-column-2">
              {
                places.map(place => (
                  <div className="admin__livraison-column" key={place._id}>
                    <div className="admin__livraison">
                      {place.name}
                      <button className="delete" style={{ padding: 0 }} onClick={() => this.handleDelete(place._id)} />
                    </div>
                  </div>
                ))
              }
            </div>
            <div className="admin__livraison-gmap admin__field-column-2">
              <GMap loadedPlaces={places} handlePosition={this.handlePosition} />
            </div>
          </div>
        <div>
          <h2 className="admin__container-title">Ajouter un point de livraison</h2>
          <form method="POST" onSubmit={this.handleSubmit}>
            <Input type="text" name="name" placeholder="Nom" onChange={this.handleChange} />
            <Input type="text" name="description" placeholder="Description" onChange={this.handleChange} />
            <Input type="text" name="lat" placeholder="Latitude" onChange={this.handlePosition} readOnly value={lat} />
            <Input type="text" name="lng" placeholder="Longitude" onChange={this.handlePosition} readOnly value={lng} />
            <button type="submit" className="btn-gold">Créer</button>
          </form>
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
})(Livraison);
