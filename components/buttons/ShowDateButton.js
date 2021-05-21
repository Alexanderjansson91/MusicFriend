import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

//My read more button
const ShowDateButton = (props) => {
  const { viewContainer, parent } = styles;
  return (
    <View>
      <View style={parent}>
        <TouchableOpacity style={styles.buttonContainer} onPress={props.click}>
          <View style={styles.buttonView}>
            <Text style={styles.textButton}>{props.textButton}</Text>
            <Icon name={props.iconDate} color="#10DDE5" size={26} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

//Styles for my header
const styles = StyleSheet.create({
  buttonContainer: {
    padding: 20,
    width: '95%',
    borderWidth:1,
    borderStyle: 'solid',
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: "#000000",
    marginTop: 40,
  },
  buttonView: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    margin: -10,
    flexDirection: 'row'
  },
  textButton: {
    color: '#10DDE5',
    fontWeight: '500',
    fontSize: 18,
    marginRight: 10,
  },
});

export default ShowDateButton;
