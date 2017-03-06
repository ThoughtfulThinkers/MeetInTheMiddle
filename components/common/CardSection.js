import React from 'react';
import { View } from 'react-native';
import { styles } from '../../assets/Styles';

const CardSection = (props) => {
  return (
    <View style={[styles.cardSection, props.style]}>
      {props.children}
    </View>
  );
};

export { CardSection };
