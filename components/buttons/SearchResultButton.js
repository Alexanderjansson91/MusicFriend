import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

//Search result Button
const SerachResultButton = (props) => {
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

//Styles fot the button
const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    padding: 30,
  },
  buttonContainer: {
    height: 5,
    width: 100,
    borderBottomEndRadius: 10,
    borderTopStartRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonView: {
    width: 100,
    margin: -10,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  textButton: {
    color: '#000000',
    fontWeight: '500',
    fontSize: 18,
  },
});

export default SerachResultButton;
