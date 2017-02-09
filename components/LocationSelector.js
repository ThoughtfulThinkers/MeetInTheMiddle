import React, { Component } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { changeRSVP } from '../actions';
import { Card, CardSection, Input } from './common';
import { googlePlacesConfig } from '../envConfig';

class LocationSelector extends Component {

  render() {
    const homePlace = {
      description: this.props.street,
      geometry: { location: { lat: this.props.lat, lng: this.props.lon } }
    };

    return (
      <GooglePlacesAutocomplete
              placeholder='Search'
              minLength={2} // minimum length of text to search
              autoFocus={false}
              listViewDisplayed='auto'    // true/false/undefined
              fetchDetails
              renderDescription={(row) => row.description} // custom description render
              onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                if (!details) {
                  Alert.alert('Location latitude and longitude unavailable. Please try again.');
                } else {
                  this.props.changeRSVP(details.geometry.location.lat,
                      details.geometry.location.lng);
                }
              }}
              getDefaultValue={() => {
                return ''; // text input default value
              }}
              query={{
                // available options: https://developers.google.com/places/web-service/autocomplete
                key: googlePlacesConfig.apiKey,
                language: 'en', // language of the results
              }}
              styles={{
                description: {
                  fontWeight: 'bold',
                },
                predefinedPlacesDescription: {
                  color: '#1faadb',
                },
              }}

              currentLocation
              currentLocationLabel="Current location"
              predefinedPlaces={[homePlace]}
      />
          );
        }
}

const styles = {
  textStyle: {
    fontSize: 18,
    padding: 5
  }
};

const mapStateToProps = state => {
  const { lat, lon, street } = state.user.location;
  return { lat, lon, street };
};

export default connect(mapStateToProps, { changeRSVP })(LocationSelector);
