import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

//Login Textfield for sign in
const LoginTextField = (props) => {
  const { viewContainer, textInput } = styles;
  return (
    <View style={viewContainer}>
      <TextInput
        placeholder={props.placeHolder}
        onChangeText={props.onChange}
        style={textInput}
      />
    </View>
  );
};

//Style for Login Textfield
const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: '#ffffff',
    height: 40,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: '#10DDE5',
    width: 390,
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 80,
    marginBottom: 10,
  },
  textInput: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 6,
    alignItems: 'center',
    fontWeight: '600',
    color: 'black',
    fontSize: 17,
  },
});

export default LoginTextField;
