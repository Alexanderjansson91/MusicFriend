import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MatetrialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//Card for the new user
const NewUserCard = (props) => {
  const { viewContainer, infoText } = styles;
  return (
    <View style={viewContainer}>
      <View style={styles.space} />
      <View style={styles.bottomView}>
        <View style={styles.parent}>
          <Text style={infoText}>{props.readMoreText}</Text>
          <TouchableOpacity onPress={props.click}>
            <View>
              <Text style={styles.textButton}>{props.textInfo}</Text>
              <MatetrialCommunityIcons
                name={props.icon}
                style={styles.iconStyle}
              />
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
    height: '60%',
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomView: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
  },

  space: {
    marginTop: 20,
  },
  iconStyle: {
    color: '#000000',
    fontSize: 25,
    marginLeft: 20,
  },
  textButton: {
    color: '#10DDE5',
    fontSize: 20,
    marginLeft: 10,
    marginTop:-2
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

export default NewUserCard;
