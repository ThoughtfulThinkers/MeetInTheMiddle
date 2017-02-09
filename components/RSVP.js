import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { setRsvp } from '../actions';
import LocationSelector from './LocationSelector';
import { CardSection, Card, Button } from './common';

class RSVP extends Component {
  onPress() {
    const { street, lat, lon, uid } = this.props;
    this.props.setRsvp(street, lat, lon, uid);
    Actions.pop();
  }

  render() {
    return (
      <Card>
        <CardSection style={{ justifyContent: 'center' }}>
          <Text style={styles.titleStyle}>
            Where are you coming from?
          </Text>
        </CardSection>
        <CardSection>
          <LocationSelector />
        </CardSection>
        <CardSection>
          <Button
            onPress={this.onPress.bind(this)}
          >
            Confirm RSVP
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18
  }
};

const mapStateToProps = state => {
  const { lat, lon, street } = state.rsvp;
  return { lat, lon, street };
};

export default connect(mapStateToProps, { setRsvp })(RSVP);
