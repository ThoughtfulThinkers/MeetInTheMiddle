import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from '../../assets/Styles';

const Button = ({ onPress, children }) => {
  return (
    <TouchableOpacity
      style={styles.buttonStyle}
      onPress={onPress}
    >
      <Text style={styles.buttonTextStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export { Button };
