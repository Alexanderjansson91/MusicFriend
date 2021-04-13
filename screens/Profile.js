import React, { useState, useEffect } from 'react'
import {View, Text, Button, FlatList} from 'react-native'
import { connect } from 'react-redux';
import firebase from 'firebase'
import * as DocumentPicker from 'expo-document-picker';
import { Audio } from 'expo-av';
require('firebase/firestore');

function Profile(props) {
    const [userPost, setUserPost] = useState([]);
    const [user, setUser] = useState(null);
    const [sound, setSound] = React.useState();
    
    const [following, setFollowing] = useState(false)
    const { currentUser, posts } = props;


    async function onChooseAudioPress()  {
        let result = await DocumentPicker.getDocumentAsync(Audio)


        //let result = await ImagePicker.launchImageLibraryAsync();
    
        if (!result.cancelled) {
          uploadImage(result.uri, "audio")
            .then(() => {
              Alert.alert("Success");
            })
            .catch((error) => {
              Alert.alert(error);
            });
        }
      }
    
       async function uploadImage (uri, audioName){
        const response = await fetch(uri);
        const blob = await response.blob();
    
        var ref = firebase.storage().ref().child("audio/" + audioName);
        return ref.put(blob);
      }





    async function playSound() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(
           require('../assets/iphone.wav')
        );
        setSound(sound);
    
        console.log('Playing Sound');
        await sound.playAsync(); }
    
      React.useEffect(() => {
        return sound
          ? () => {
              console.log('Unloading Sound');
              sound.unloadAsync(); }
          : undefined;
      }, [sound]);


      async function stopPlaying() {
        await sound.pauseAsync(); }
      React.useEffect(() => {
        return sound
          ? () => {
              console.log('Unloading Sound');
              sound.unloadAsync(); }
          : undefined;
      }, [sound]);

    useEffect(() => {

        if (props.route.params.uid === firebase.auth().currentUser.uid){
            setUser(currentUser)
            setUserPost(posts)
        }else{
            firebase.firestore()
            .collection("users")
            .doc(props.route.params.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    setUser(snapshot.data());
                }
                else {
                    console.log('does not exist')
                }
            })
            firebase.firestore()
            .collection("posts")
            .doc(props.route.params.uid)
            .collection("userPosts")
            .orderBy("creation", "asc")
            .get()
            .then((snapshot) => {
                let posts = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                })
                setUserPost(posts);            })
        }

        if(props.following.indexOf(props.route.params.uid) > -1) {
            setFollowing(true);
        }else{
            setFollowing(false);
        }

    }, [props.route.params.uid, props.following] )

    
    const onLogout = () => {
        firebase.auth().signOut();
    };

    const onFollow = () => {
        firebase.firestore()
            .collection("following")
            .doc(firebase.auth().currentUser.uid)
            .collection("userFollowing")
            .doc(props.route.params.uid)
            .set({})
    }
    const onUnfollow = () => {
        firebase.firestore()
            .collection("following")
            .doc(firebase.auth().currentUser.uid)
            .collection("userFollowing")
            .doc(props.route.params.uid)
            .delete()
    }


    if(user === null ){
        return <View />
    }
    return (
        <View>
            <Text>Profile</Text>

                <Text>{user.name}</Text>
                {props.route.params.uid !== firebase.auth().currentUser.uid ? (
                    <View>
                    {following ? (
                        <Button
                        title="Following"
                        onPress={() => onUnfollow()}
                        />
                    ) :
                    (
                        <Button
                        title="Follow"
                        onPress={() => onFollow()}
                        />
                    )}
                    </View>     
                ) :             <Button
                style={{marginTop:30}}
                title="Log out"
                onPress={() => onLogout()}
            />} 
<                   FlatList
                    numColumns={1}
                    horizontal={false}
                    data={posts}
                    renderItem={({ item }) => (
                        <View
                            style={styles.containerImage}>
                            <Text style={styles.container}>{item.caption}</Text>
                        </View>

                    )}

                />
        <Button title="Play" onPress={playSound} />
        <Button title="Stop" onPress={stopPlaying} />
        <Button title="Ny låt" onPress={onChooseAudioPress} />
        </View>
    )
}

//Access the store states from redux
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    following: store.userState.following,

  });
  
  export default connect(mapStateToProps, null)(Profile);
