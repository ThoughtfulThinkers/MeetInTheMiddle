import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;
  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
    >
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: 'rgba(0,0,0,0.85)',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#ffca63',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ffca63',
    marginLeft: 5,
    marginRight: 5
  }
};

export { Button };
