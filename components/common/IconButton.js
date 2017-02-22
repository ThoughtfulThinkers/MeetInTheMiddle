import React from 'react';
import { Ionicons } from '@exponent/vector-icons';
import { Text, TouchableOpacity } from 'react-native';

const IconButton = ({ onPress, name, size, color }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
    >
      <Text>
        <Ionicons name={name} size={size} color={color} />
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
};

export { IconButton };
