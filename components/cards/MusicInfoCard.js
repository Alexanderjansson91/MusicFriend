import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MatetrialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';


//Music info with add button
const MusicInfoCard = (props) => {
  const { viewContainer, infoText } = styles;
  return (
    <View style={viewContainer}>
      <View style={styles.space} />
      <View style={styles.parent}>
        <Text style={infoText}>{props.musicText}</Text>
        <View style={styles.parent}>
          <TouchableOpacity onPress={props.click}>
            <View>
              <Icon name={props.iconAddMusik} style={styles.iconStyle} />
            </View>
          </TouchableOpacity>
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
    marginBottom: 40,
    marginLeft:10
  },
  iconStyle: {
    color: '#000000',
    fontSize: 25,
    marginLeft: 10,
    marginTop: -2,
  },
  space: {
    height: 20,
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

export default MusicInfoCard;
