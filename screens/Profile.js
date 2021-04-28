

import React, { useState, useEffect } from 'react'
import {View, Text, Button, FlatList, Image, StyleSheet} from 'react-native'
import { connect } from 'react-redux';
import firebase from 'firebase'
import Icon from 'react-native-vector-icons/Ionicons';


//Style components imports
import HeaderView from '../components/views/Header';
import MainView from '../components/views/CurvedView';
import PlaySongButton from '../components/MediaPlayer';



import * as DocumentPicker from 'expo-document-picker';
import { Audio } from 'expo-av';
//import MusicPlayerButton from '../components/MediaPlayer'
require('firebase/firestore');

function Profile(props) {
    const [userSongs, setUserSongs] = useState([]);
    const [user, setUser] = useState(null);
    const [following, setFollowing] = useState(false)
    const { currentUser, songs } = props;

       
    
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
        <View style={styles.container}>
            <HeaderView 
            headerText="Music Buddy"
            icon="cog-outline"
            click={() => props.navigation.navigate('Settings')}
            />
            <MainView></MainView>
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

        <Button title="Ny låt nästa" onPress={() => props.navigation.navigate('NewSong')} />  
        <FlatList
                    numColumns={1}
                    horizontal={false}
                    data={userSongs}
                    renderItem={({ item }) => (
                        <View> 
                               <PlaySongButton 
                               submitText={item.caption}
                               songURL={item.downloadURL}
                               />
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


//Style for the view
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        height: '100%',
        width: '100%',
    },
  });

