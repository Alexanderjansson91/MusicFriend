import React, { useState } from 'react'
import { View, TextInput, Image, Button } from 'react-native'

import firebase from 'firebase'
import { NavigationContainer } from '@react-navigation/native'
require("firebase/firestore")
import * as DocumentPicker from 'expo-document-picker';
import { Audio } from 'expo-av';

export default function AddSong() {
    const [caption, setCaption] = useState("")
    const [sound, setSound] = React.useState();

    
    //async handling for pick an Image from the gallery
    const pickSound = async () => {
      let result = await DocumentPicker.getDocumentAsync(Audio)
      if (!result.cancelled) {
          setSound(result.uri);
          console.log(result);
      }
    }

    const uploadImage = async () => {
        const uri = sound
        const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;
        console.log(childPath)

        const response = await fetch(uri);
        const blob = await response.blob();

        const task = firebase
            .storage()
            .ref()
            .child(childPath)
            .put(blob);

        const taskProgress = snapshot => {
            console.log(`transferred: ${snapshot.bytesTransferred}`)
        }

        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                savePostData(snapshot);
                console.log(snapshot)
            })
        }

        const taskError = snapshot => {
            console.log(snapshot)
        }

        task.on("state_changed", taskProgress, taskError, taskCompleted);
    }

    const savePostData = (downloadURL) => {

        firebase.firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .collection("usersSong")
            .add({
                downloadURL,
                caption,
                likesCount: 0,
                creation: firebase.firestore.FieldValue.serverTimestamp()
            }).then((function () {
                props.navigation.popToTop()
            }))
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
        <TextInput
                placeholder="Write a Caption . . ."
                onChangeText={(caption) =>  setCaption(caption)}
            />
            <Button title="Ny låt" onPress={pickSound} />
            <Button title="Save" onPress={() => { sound }, uploadImage()} />
        </View>
    )

}

