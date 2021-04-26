

import React, { useState, useEffect } from 'react'
import {View, Text, Button, FlatList, Image} from 'react-native'
import { connect } from 'react-redux';
import firebase from 'firebase'
import * as DocumentPicker from 'expo-document-picker';
import { Audio } from 'expo-av';
//import MusicPlayerButton from '../components/MediaPlayer'
require('firebase/firestore');

function Profile(props) {
    const [userSongs, setUserSongs] = useState([]);
    const [user, setUser] = useState(null);
    const [sound, setSound] = React.useState();
    const [following, setFollowing] = useState(false)
    const { currentUser, songs } = props;


    async function playSound() {
        const source = { uri: userSongs.downloadURL }
        console.log(source);
        const { sound } = await Audio.Sound.createAsync(
            //{uri: 'https://firebasestorage.googleapis.com/v0/b/musicfriendsapp.appspot.com/o/post%2FxqGTuOboXMN0yLv4L0ICBgNqBJv1%2F0.thduvq3hsic?alt=media&token=1a22f80a-3352-4caf-9106-21e1426699a6'}
            source,
            { shouldPlay: true }

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
            setUserSongs(songs)
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
        <Button title="Play" onPress={playSound} />
        <Button title="Stop" onPress={stopPlaying} />
        <Button title="Ny låt nästa" onPress={() => props.navigation.navigate('NewSong')} />  
        <FlatList
                    numColumns={3}
                    horizontal={false}
                    data={userSongs}
                    renderItem={({ item }) => (
                        <View> 
                               <Text>{item.downloadURL}</Text>
                        </View>

                    )}

                />
        </View>
    )
}

//Access the store states from redux
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    following: store.userState.following,
    songs: store.userState.songs,
  });
  
  export default connect(mapStateToProps, null)(Profile);



