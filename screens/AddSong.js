import React, { useState } from 'react'
import { View,StyleSheet, TextInput, Image, Button } from 'react-native'

import AddNewSongCard from '../components/cards/AddNewSongCard'
import firebase from 'firebase'
import { NavigationContainer } from '@react-navigation/native'
require("firebase/firestore")
import * as DocumentPicker from 'expo-document-picker';
import { Audio } from 'expo-av';

export default function AddSong(props) {
  const [caption, setCaption] = useState("");
  const [sound, setSound] = React.useState();

  //async handling for pick an song from the gallery
  const pickSound = async () => {
    let result = await DocumentPicker.getDocumentAsync(Audio);
    if (!result.cancelled) {
      setSound(result.uri);
      console.log(result);
    }
  };

  //Function how handling the uploading of the song and save it the firebase storage
  const uploadSound = async () => {
    const uri = sound;
    const childPath = `audio/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;
    console.log(childPath);

    const response = await fetch(uri);
    const blob = await response.blob();

    const task = firebase.storage().ref().child(childPath).put(blob);
    const taskProgress = (snapshot) => {
      console.log(`transferred: ${snapshot.bytesTransferred}`);
    };

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        saveSongData(snapshot);
        console.log(snapshot);
      });
    };
    const taskError = (snapshot) => {
      console.log(snapshot);
    };
    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };

  //Save the song data to firestore
  const saveSongData = (downloadURL) => {
    firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .collection("usersSong")
      .add({
        downloadURL,
        caption,
        likesCount: 0,
        creation: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(function () {
        props.navigation.push("Feed");
      });
  };

  //Addsong View
  return (
    <View style={styles.pickSongButtonr}>
      <AddNewSongCard
        placeHolder="låt titel"
        onChange={(caption) => setCaption(caption)}
        pickNewSongText="Välj fil"
        iconPickMusic="document-outline"
        songUrl={sound ? "Låten du valt är godkänd ✔" : "ingen fil vald"}
        iconsaveMusic="add-circle-outline"
        saveNewSongText="Ladda upp"
        pickClick={pickSound}
        saveClick={() => uploadSound()}
      />
    </View>
  );
}

//Style for the view
const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: '#ffffff',
    height:'100%',
  },
});
