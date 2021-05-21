import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MatetrialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//Contact card for companys, used on Login page
const CommentsCard = (props) => {
  const { viewContainer, infoText } = styles;
  return (
    <View style={viewContainer}>
      <View style={styles.space} />
      <View style={styles.parent}>
        <TouchableOpacity onPress={props.click}>
          <View>
            <Text style={styles.textButton}>{props.textName}</Text>
            <MatetrialCommunityIcons
              name={props.icon}
              style={styles.iconStyle}
            />
          </View>
        </TouchableOpacity>
        <Text style={infoText}>{props.commentText}</Text>
        <View style={styles.parent}></View>
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

export default CommentsCard;
