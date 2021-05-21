import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

//My read more button
const NewUserButton = (props) => {
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
    flex: 1,
  },
  buttonContainer: {
    height: 70,
    width: 300,
    padding: 30,
    borderBottomEndRadius: 10,
    borderTopStartRadius: 10,
    marginBottom: 40,
    backgroundColor:'#000000',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonView: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: 180,
    margin: -10,
  },
  textButton: {
    color: '#10DDE5',
    fontWeight: '500',
    fontSize: 18,
  },
});

export default NewUserButton;
