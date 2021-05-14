import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

//Email Textfield for sign in
const CaptionTextfield = (props) => {
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

//Style for Email Textfield
const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: '#ffffff',
    borderStyle: 'solid',
    borderWidth:1,
    borderRadius:20,
    borderColor: '#10DDE5',
    width: 350,
    textAlign: 'center',
    alignSelf: 'center',

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

export default CaptionTextfield;