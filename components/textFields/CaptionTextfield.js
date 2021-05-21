import React from 'react';
import { StyleSheet, TextInput, View, TouchableWithoutFeedback } from 'react-native';
import { Keyboard } from "react-native";

//Email Textfield for sign in
const CaptionTextfield = (props) => {
  const { viewContainer, textInput } = styles;
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={viewContainer}>
        <TextInput
          numberOfLines={5}
          multiline={true}
          maxLength={200}
          placeholder={props.placeHolder}
          onChangeText={props.onChange}
          style={textInput}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

//Style for Email Textfield
const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: '#ffffff',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: '#000000',
    width: "100%",
    height: 150,
    marginTop: 20,
    textAlign: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },
  textInput: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 10,
    alignItems: 'center',
    fontWeight: '600',
    color: 'black',
    fontSize: 17,
  },
});

export default CaptionTextfield;
