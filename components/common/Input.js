import React from 'react';
import { Text, TextInput, View } from 'react-native';


const Input = ({ label, labelStyleAdd, value, onChangeText, onSubmit, placeholder, secureTextEntry, multiline }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;
  let labelAdd = labelStyleAdd || {};
  labelAdd = { ...labelStyle, ...labelAdd };
  return (
    <View style={containerStyle}>
      <Text style={labelAdd}>{label}</Text>
      <TextInput
        multiline={multiline}
        secureTextEntry={secureTextEntry}
        autoCorrect={false}
        autoCapitalize={'none'}
        placeholder={placeholder}
        style={inputStyle}
        value={value}
        onSubmitEditing={onSubmit}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2,
    paddingTop: 5
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export { Input };
