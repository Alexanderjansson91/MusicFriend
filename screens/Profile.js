import React, { useState, useEffect } from 'react'
import { View, Button, FlatList, StyleSheet, Linking } from 'react-native'
import { connect } from 'react-redux';
import firebase from 'firebase'
require('firebase/firestore');

import HeaderView from '../components/views/Header';
import UserInfoFrame from '../components/cards/UserFrameCard'
import MusicInfoCard from '../components/cards/MusicInfoCard'

import {Restart} from 'fiction-expo-restart';

import PlaySongButton from '../components/MediaPlayer';

function Profile(props) {
  const [userSongs, setUserSongs] = useState([]);
  const [user, setUser] = useState(null);
  const { currentUser, songs } = props;

  //Set the users from route.params.uid
  useEffect(() => {
    if (props.route.params.uid === firebase.auth().currentUser.uid) {
      setUser(currentUser);
      setUserSongs(songs);
    } else {
      firebase
        .firestore()
        .collection("users")
        .doc(props.route.params.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            setUser({ uid: props.route.params.uid, ...snapshot.data() });
          } else {
            console.log("does not exist")
          }
        });

      //Set users song from the route.params.uid
      firebase
        .firestore()
        .collection("users")
        .doc(props.route.params.uid)
        .collection("usersSong")
        .orderBy("creation", "desc")
        .get()
        .then((snapshot) => {
          let usersongs = snapshot.docs.map(doc => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          setUserSongs(usersongs);
        });
    }
  }, [props.route.params.uid]);

  if (user === null) {
    return <View />;
  }

  const renderSeparator = () => (
    <View
      style={{
        backgroundColor: 'lightgrey',
        height: 0.5,
      }}
    />
)

  
  //Profile View
  return (
    <View style={styles.container}>
      <HeaderView
        headerText="Music Buddy"
        icon="cog-outline"
        click={() => props.navigation.navigate('Settings')}
      />

      {/* Card how display user info */}
      <UserInfoFrame
        userName={user.name}
        icon="person-outline"
        iconReload="refresh-outline"
        reloadClick={() => Restart()}
        profileImage={{ uri: user.image }}
        info={user.description}
        textButton="Meddelande"
        click={() => Linking.openURL("mailto:" + user.email)}
        iconMessage="mail-outline"> </UserInfoFrame>
      <View style={styles.frameBottom}>
        <MusicInfoCard
          musicText="Min Musik"
          iconAddMusik="add-circle-outline"
          click={() => props.navigation.navigate('NewSong')}
        />
        {/* Flatlist how render all the currentUser Songs */}
        <FlatList
          numColumns={1}
          horizontal={false}
          data={userSongs}
          ItemSeparatorComponent={renderSeparator}
          renderItem={({ item }) => (
            <View>
              <PlaySongButton
                songTitle={item.caption}
                songURL={item.downloadURL}
                playMusic="play-circle-outline"
                pauseMusic="pause-circle-outline"
              />
            </View>
          )}
        />
        <View style={styles.space}></View>
      </View>
    </View>
  );
}
//Access the store states from redux
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  following: store.userState.following,
  songs: store.userState.songs,
});

export default connect(mapStateToProps, null)(Profile);

//Style for the view
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    height: "100%",
    width: "100%",
  },
  ImageStyle: {
    backgroundColor: "#ffffff",
    height: "20%",
    width: "20%",
  },
  space: {
    height: 50,
  },
  frameBottom: {
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    color: "#000000",
    borderStyle: "solid",
    width: "90%",
    borderWidth: 1,
    alignSelf: "center",
  },
});
