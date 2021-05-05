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
    height: 5,
    width: 300,
    padding:10,
    borderBottomEndRadius:10,
    borderTopStartRadius:10,
    marginTop:20,
    marginBottom:20,
    backgroundColor:'#ffffff',
    flexDirection: 'row',

  },
  buttonView: {
    marginLeft:0,
    width: 100,
    margin: -10,
    
  },
  textButton: {
    color: '#000000',
    fontWeight: '500',
    fontSize: 18,
      
  },
});

export default NewUserButton;