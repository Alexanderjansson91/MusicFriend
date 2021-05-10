

import React, { useState, useEffect } from 'react'
import { View, Text, Button, FlatList, Image, StyleSheet, Modal, Linking } from 'react-native'
import { connect } from 'react-redux';
import firebase from 'firebase'
import Icon from 'react-native-vector-icons/Ionicons';
import FriendsModal from '../components/Modals/Friends'
import CachedImage from 'react-native-expo-cached-image';

//Style components imports
import HeaderView from '../components/views/Header';
import UserInfoFrame from '../components/cards/UserFrameCard'
import MusicInfoCard from '../components/cards/MusicInfoCard'

import MainView from '../components/views/CurvedView';
import PlaySongButton from '../components/MediaPlayer';
import * as FileSystem from 'expo-file-system'


import * as DocumentPicker from 'expo-document-picker';
import { Audio } from 'expo-av';
//import MusicPlayerButton from '../components/MediaPlayer'
require('firebase/firestore');

function Profile(props) {
    const [userSongs, setUserSongs] = useState([]);
    const [user, setUser] = useState(null);
    const [following, setFollowing] = useState(false)
    const { currentUser, songs } = props;
    const [modalOpen, setModalOpen] = useState(false);




    useEffect(() => {

        if (props.route.params.uid === firebase.auth().currentUser.uid) {
            setUser(currentUser)
            setUserSongs(songs)
        } else {
            firebase.firestore()
                .collection("users")
                .doc(props.route.params.uid)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists) {
                        setUser({ uid: props.route.params.uid, ...snapshot.data() });
                    }
                    else {
                        console.log('does not exist')
                    }
                })
            firebase.firestore()
                .collection("users")
                .doc(props.route.params.uid)
                .collection("usersSong")
                .orderBy("creation", "desc")
                .get()
                .then((snapshot) => {
                    let usersongs = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return { id, ...data }
                    })
                    setUserSongs(usersongs)
                })
        }


        if (props.following.indexOf(props.route.params.uid) > -1) {
            setFollowing(true);
        } else {
            setFollowing(false);
        }

    }, [props.route.params.uid, props.following])

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
    if (user === null) {
        return <View />
    }
    return (
        <View style={styles.container}>
            <HeaderView
                headerText="Music Buddy"
                icon="cog-outline"
                click={() => props.navigation.navigate('Settings')}
            />
            <UserInfoFrame
            userName={user.name} 
            icon ="person-outline" 
            imageUri={{uri: user.image}}
            info={user.description}
            textButton="Meddelande"
            click={() => Linking.openURL('mailto:' + user.email)}
            iconMessage="mail-outline" 
            >
            </UserInfoFrame>
            <View style={styles.frameBottom}>
            <MusicInfoCard
            musicText="Min Musik"
            iconAddMusik="add-circle-outline" 
            click={() => props.navigation.navigate('NewSong')}
            />
            <FlatList
                numColumns={1}
                horizontal={false}
                data={userSongs}
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
            </View> 
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
    ImageStyle: {
        backgroundColor: '#ffffff',
        height: '20%',
        width: '20%',
    },
    frameBottom:{
        borderBottomRightRadius: 40,
        borderBottomLeftRadius: 40,
        color:'#000000',
        borderStyle:'solid',
        width: '90%',
        borderWidth:1,
        alignSelf: 'center',
    }
});

