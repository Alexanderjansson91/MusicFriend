import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CachedImage from 'react-native-expo-cached-image';


//View whit the rounded corner under the Header
const UserFrameCard = (props) => {
  const { container, topContainer, userInfoName, userInfoIcon, parent } = styles;
  return (
    <View style={container}>
      <View style={topContainer}>
        <Icon
          style={userInfoIcon}
          name={props.icon}
          color="#ffffff"
          size={26}
        />
        <Text style={userInfoName}>{props.userName}</Text>
        <View style={styles.rightView}>
          <TouchableOpacity
            style={styles.reloadContainer}
            onPress={props.reloadClick}
          >
            <Icon name={props.iconReload} color="#10DDE5" size={26} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={parent}>
        <View style={styles.ImageView}>
          <CachedImage style={styles.image} source={props.profileImage} />
        </View>
        <TouchableOpacity style={styles.buttonContainer} onPress={props.click}>
          <Icon name={props.iconMessage} color="#10DDE5" size={26} />
          <View>
            <Text style={styles.messageText}>{props.textButton}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.descriptiontext}>{props.info}</Text>
    </View>
  );
};

//Style for the view
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 50,
    borderBottomWidth: 0,
    borderStyle:'solid',
    width: '90%',
    borderColor:'#000000',
    borderWidth: 1,
    alignSelf: 'center',
  },
  rightView: {
    position: 'absolute',
    right: 0,
    flexDirection: 'row',
  },
  topContainer: {
    backgroundColor: '#000000',
    flexDirection: 'row',
  },
  parent: {
    flexDirection: 'row',
    color: '#10DDE5',
    margin: 20,
  },
  userInfoName: {
    color: '#10DDE5',
    fontSize: 20,
    margin: 10,
    marginLeft: 0,
  },
  userInfoIcon: {
    color: '#10DDE5',
    margin: 10,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: '#000000',
  },
  ImageView: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    marginRight: 20,
    marginBottom: 0,
    textAlignVertical: 'center',
    right: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 40,
    marginLeft: '30%',
  },
  reloadContainer: {
    flexDirection: 'row',
    marginTop: 7,
    marginRight: 10,
  },
  messageText: {
    margin: 5,
  },
  descriptiontext: {
    color: '#000000',
    margin: 20,
  },
});

export default UserFrameCard;
