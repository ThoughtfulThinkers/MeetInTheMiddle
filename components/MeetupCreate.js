import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { meetupChange } from '../actions';
import { Card, CardSection, Input, Button } from './common';

class MeetupCreate extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }
  onButtonPress() {
    const { name, description, start, end } = this.props;
    console.log(name, description, start, end);
  }

  onChange(prop, value) {
    this.props.meetupChange(prop, value);
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Name"
            placeholder="Sarah's Birthday"
            value={this.props.name}
            onChangeText={value => this.onChange('name', value)}
          />
        </CardSection>

        <CardSection>
          <Input
           style={{ height: 100 }}
            label="Description"
            placeholder="Bring cake to Judy's house"
            value={this.props.description}
            onChangeText={value => this.onChange('description', value)}
          />
        </CardSection>

        <CardSection style={{ alignItems: 'center' }}>
          <Text style={styles.pickerTextStyle}>Start</Text>
          <DatePicker
            style={{ flex: 2 }}
            date={this.props.start}
            mode="datetime"
            format="YYYY-MM-DD HH:mm"
            confirmBtnText="Choose"
            cancelBtnText="Cancel"
            onDateChange={(value) => this.onChange('start', value)}
          />
        </CardSection>

        <CardSection style={{ alignItems: 'center' }}>
          <Text style={styles.pickerTextStyle}>End</Text>
          <DatePicker
            style={{ flex: 2 }}
            date={this.props.end}
            mode="datetime"
            format="YYYY-MM-DD HH:mm"
            confirmBtnText="Choose"
            cancelBtnText="Cancel"
            onDateChange={(value) => this.onChange('end', value)}
          />
        </CardSection>

        <CardSection>
          <Button
            onButtonPress={this.onButtonPress()}
          >
            Next
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  pickerTextStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  }
};

const mapStateToProps = ({ meetupForm }) => {
  const { name, description, start, end } = meetupForm;
  return { name, description, start, end };
};

export default connect(mapStateToProps, { meetupChange })(MeetupCreate);
