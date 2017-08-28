import flowRight from 'lodash/flowRight';
import React, { Component } from 'react';
import withScriptjs from 'react-google-maps/lib/async/withScriptjs';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';

const geolocation = (
  navigator.geolocation ?
  navigator.geolocation :
  ({
    getCurrentPosition(success, failure) {
      failure('Your browser doesn\'t support geolocation.');
    },
  })
);

const AsyncGettingStartedExampleGoogleMap = flowRight(
  withScriptjs,
  withGoogleMap,
)(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={15}
    center={props.center}
    onClick={props.onMapClick}
  >
    {props.markers.map(marker => (
      <Marker
        {...marker}
      />
    ))}
    {props.places.map(place => (
      <Marker
        key={place._id}
        position={{
          lat: place.geolocation[0],
          lng: place.geolocation[1],
        }}
        onClick={() => props.onMarkerClick(place._id)}
      >
        <InfoWindow
          position={{
            lat: place.geolocation[0],
            lng: place.geolocation[1],
          }}
        >
          <div>{place.description}</div>
        </InfoWindow>
      </Marker>
    ))}
  </GoogleMap>
));

class GMap extends Component {
  constructor() {
    super();
    this.state = {
      markers: [],
      center: null,
      content: null,
      radius: 6000,
    };

    this.isUnmounted = false;
    this.handleMapLoad = this.handleMapLoad.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);    
  }

  componentDidMount() {
    geolocation.getCurrentPosition((position) => {
      if (this.isUnmounted) {
        return;
      }
      this.setState({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
      });
    }, () => {
      if (this.isUnmounted) {
        return;
      }
      this.setState({
        center: {
          lat: 60,
          lng: 105,
        },
      });
    });
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  handleMapLoad(map) {
    this._mapComponent = map;
  }

  handleMapClick(event) {
    const nextMarkers = [
      {
        position: event.latLng,
        defaultAnimation: 2,
        key: Date.now(),
      },
    ];
    this.props.handlePosition({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    this.setState({
      markers: nextMarkers,
    });
  }

  render() {
    return (
      <AsyncGettingStartedExampleGoogleMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA6gHqeycUHEafQjIUWJCmrvC67rRTUc7Y"
        containerElement={
          <div style={{ height: 200, minHeight: 500, paddingBottom: 30 }} />
        }
        mapElement={
          <div style={{ height: '100%' }} />
        }
        loadingElement={
          <div>Loading!</div>
        }
        onMapLoad={this.handleMapLoad}
        center={this.state.center}
        onMapClick={this.handleMapClick}
        markers={this.state.markers}
        places={this.props.loadedPlaces}
      />
    );
  }
}

export default GMap;
