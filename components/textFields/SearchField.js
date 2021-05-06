import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

//Email Textfield for sign in
const SearchField = (props) => {
  const { viewContainer, textInput } = styles;
  return (
    <View style={viewContainer}>
      <TextInput
        placeholder={props.placeHolder}
        onChangeText={props.onChange}
        onClear={props.Clear}
        style={textInput}
        value={props.searchValue}

      />
    </View>
  );
};

//Style for Email Textfield
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
    marginTop: 50,
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

export default SearchField;