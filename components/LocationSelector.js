import React, { Component } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card, CardSection, Input } from './common';
import { googlePlacesConfig } from '../envConfig';

const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } } };

class LocationSelector extends Component {
  onCurrentLocationPress() {
    console.log('current location');
  }

  onPreferredLocationPress() {
    console.log('preferred location');
  }

  onChange(e) {
    console.log(e.target.value);
  }

  onSubmit() {
    console.log('submitting location');
  }

  render() {
    return (
      <GooglePlacesAutocomplete
              placeholder='Search'
              minLength={2} // minimum length of text to search
              autoFocus={false}
              listViewDisplayed='auto'    // true/false/undefined
              fetchDetails
              renderDescription={(row) => row.description} // custom description render
              onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                console.log(data);
                console.log(details);
              }}
              getDefaultValue={() => {
                return ''; // text input default value
              }}
              query={{
                // available options: https://developers.google.com/places/web-service/autocomplete
                key: googlePlacesConfig.apiKey,
                language: 'en', // language of the results
                types: '(cities)', // default: 'geocode'
              }}
              styles={{
                description: {
                  fontWeight: 'bold',
                },
                predefinedPlacesDescription: {
                  color: '#1faadb',
                },
              }}

              currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
              currentLocationLabel="Current location"
              nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
              GoogleReverseGeocodingQuery={{
                // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
              }}
              GooglePlacesSearchQuery={{
                // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                rankby: 'distance',
                types: 'food',
              }}


              filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

              predefinedPlaces={[homePlace, workPlace]}
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
  return {}
};

export default connect(mapStateToProps, null)(LocationSelector);
