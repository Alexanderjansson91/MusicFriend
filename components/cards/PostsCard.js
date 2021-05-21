import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


//posts card
const PostsCard = (props) => {
  const { container, topContainer, userInfoName, regionText, parent } = styles;
  return (
    <View style={container}>
      <View style={topContainer}>
        <View style={styles.left}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={props.clickProfile}
          >
            <Icon name={props.iconProfile} style={styles.profileIcon} />
            <View>
              <Text style={styles.UserText}>{props.textButtonProfile}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.rightView}>
          <Text style={regionText}>{props.region}</Text>
        </View>
      </View>
      <Text style={styles.descriptiontext}>{props.infoAboutPost}</Text>
      <View style={parent}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={props.clickMessage}
        >
          <Icon name={props.iconComment} size={26} color="#10DDE5" />
          <View>
            <Text style={styles.commentText}>{props.textButtonMessage}</Text>
          </View>
        </TouchableOpacity>
        <View styles={styles.dateView}>
          <Text styles={styles.dateText}>{props.postDate}</Text>
        </View>
      </View>
    </View>
  );
};

//Style for the view
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 40,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    borderStyle: 'solid',
    width: '90%',
    borderColor:'#000000',
    borderWidth: 1,
    fontSize: 20,
    alignSelf: 'center',
  },
  topContainer: {
    backgroundColor: '#000000',
    height: 50,
  },
  profileIcon: {
    margin: 14,
    color:"#10DDE5",
    fontSize: 20,
  },
  parent: {
    flexDirection: 'row',
    color: '#10DDE5',
    margin: 20,
  },
  regionText: {
    color: '#10DDE5', 
    margin: 16,
    position: 'absolute',
    right: 0,
  },
  rightView: {
    position: 'absolute',
    right: 0,
    flexDirection: 'row',
  },
  userInfoIcon:{
    color: '#10DDE5',
    margin: 10,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
    resizeMode: 'contain',
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
    marginRight: "68%",
  },
  UserText: {
    marginTop: 16,
    color: '#ffffff',
  },
  commentText: {
    color: '#000000'
  },
  descriptiontext: {
    color:'#000000',
    margin: 10,
  },
  dateView: {
    color: '#10DDE5',
    marginTop: 30,
  },
  dateText: {
    marginLeft: 30,
  },
});

export default PostsCard;
