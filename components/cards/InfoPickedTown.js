import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MatetrialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';


//Card how displayed picked town
const InfoPickedTown = (props) => {
  const { viewContainer, infoText } = styles;
  return (
    <View style={viewContainer}>
      <View style={styles.space} />
      <View style={styles.parent}>
        <Text style={infoText}>Område:</Text>
        <View style={styles.parent}>
          <Text style={infoText}>{props.cityText}</Text>
        </View>
      </View>
    </View>
  );
};

//Style for card
const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: '#ffffff',
    height: 40,
    bottom: 0,
    marginBottom: 10,
    marginLeft: 10,
    justifyContent: 'center',
    alignSelf: 'center',
  },

  space: {
    marginTop: 20,
  },
  iconStyle: {
    color: '#000000',
    fontSize: 25,
    marginLeft: 10,
    marginTop: -2,
  },
  textButton: {
    color: '#10DDE5',
    fontSize: 20,
    marginLeft: 10,
    marginTop: -2,
  },
  infoText: {
    color: '#000000',
    fontSize: 17,
    marginLeft: 10,
    marginTop: 0,
  },
  welcomeNameUser: {
    color: '#875195',
    fontSize: 20,
    marginTop: 0,
  },
  parent: {
    flexDirection: 'row',
  },
});

export default InfoPickedTown;
