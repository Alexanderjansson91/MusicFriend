import React, { useState } from 'react'
import { View, TextInput, Image, Button } from 'react-native'

import firebase from 'firebase'
import { NavigationContainer } from '@react-navigation/native'
require("firebase/firestore")

export default function Add(props) {
    const [caption, setCaption] = useState("")


    const savePostData = () => {
        firebase.firestore()
        .collection('posts')
        .doc(firebase.auth().currentUser.uid)
        .collection("userPosts")
            .add({
                caption,
                creation: firebase.firestore.FieldValue.serverTimestamp()
            }).then((function () {
                props.navigation.popToTop()
            }))
    }
    return (
        <View style={{ flex: 1 }}>
            <TextInput
                placeholder="Write a Caption . . ."
                onChangeText={(caption) => setCaption(caption)}
            />
            <Button title="Save" onPress={() => savePostData()} />
        </View>
    )
}