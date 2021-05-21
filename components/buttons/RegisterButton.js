import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

//My read more button
const RegisterButton = (props) => {
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
    marginTop: 50,
    marginBottom: 30,
  },
  buttonContainer: {
    height: 30,
    width: 300,
    padding: 30,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor:'#000000',
    borderColor:'#000000',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonView: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: 150,
    margin: -10,
  },
  textButton: {
    color: '#10DDE5',
    fontWeight: '500',
    fontSize: 18,
  },
});

export default RegisterButton;
