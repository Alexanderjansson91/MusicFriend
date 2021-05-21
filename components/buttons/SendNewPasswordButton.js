import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

//My read more button
const SendNewPasswordButton = (props) => {
  const { viewContainer, parent } = styles;
  return (
    <View style={viewContainer}>
      <View style={parent}>
        <TouchableOpacity style={styles.buttonContainer} onPress={props.click}>
          <View style={styles.buttonView}>
            <Text style={styles.textButton}>{props.textButton}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

//Styles for my header
const styles = StyleSheet.create({
  viewContainer: {
    marginBottom: 40,
  },
  buttonContainer: {
    height: 30,
    width: 300,
    padding: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonView: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: 300,
    margin: -10,
  },
  textButton: {
    color: '#000000',
    fontWeight: '500',
    fontSize: 18,
  },
});

export default SendNewPasswordButton;
