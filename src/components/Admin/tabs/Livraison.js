import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions/livraison';
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
        <div className="columns">
          <div className="column">
            <form method="POST" onSubmit={this.handleSubmit}>
              <div className="column">
                <Input type="text" name="name" placeholder="Nom" onChange={this.handleChange} />
                <Input type="text" name="description" placeholder="Description" onChange={this.handleChange} />
                <Input type="text" name="lat" placeholder="Latitude" onChange={this.handlePosition} readOnly value={lat} />
                <Input type="text" name="lng" placeholder="Longitude" onChange={this.handlePosition} readOnly value={lng} />
                <Input type="submit" value="Créer" className="btn" />
              </div>
            </form>

            <div>
              {
                places.map(place => (
                  <span className="tag is-danger is-large" key={place._id} style={{ marginRight: 10, marginBottom: 10 }}>
                    {place.name}
                    <button className="delete" style={{ padding: 0 }} onClick={() => this.handleDelete(place._id)} />
                  </span>
                ))
              }
            </div>
          </div>
          <div className="column">
            <GMap loadedPlaces={places} handlePosition={this.handlePosition} />
            <br />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  places: state.places.places,
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Livraison);
