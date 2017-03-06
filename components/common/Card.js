import React from 'react';
import { View } from 'react-native';
import { styles } from '../../assets/Styles';

const Card = (props) => {
  return (
    <View style={styles.card}>
      {props.children}
    </View>
  );
};

export { Card };
