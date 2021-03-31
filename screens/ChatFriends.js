import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Image, FlatList, Button } from 'react-native'

import firebase from 'firebase'
require('firebase/firestore')
import { connect } from 'react-redux'

function ChatFriends(props) {

    const [posts, setPosts] = useState([]);
    //Hook for clean up
    useEffect(() => {
        let posts = [];
        if(props.userLoaded == props.following.length){
            for(let  i = 0; i <props.following.length; i++){
                const user = props.users.find(el => el.uid === props.following[i]);
                if(user != undefined){
                    posts = [...posts, ...user.posts]
                }
            }
            posts.sort(function(x,y) {
                return x.creation - y.creation
            })

            setPosts(posts);
            console.log(posts);
        }
    }, [props.userLoaded]);


    return (
        <View style={styles.container}>
            <View style={styles.containerGallery}>
                <FlatList
                    numColumns={1}
                    horizontal={false}
                    data={posts}
                    renderItem={({ item }) => (
                        <View
                            style={styles.containerImage}>
                            <Text style={styles.container}>{item.user.name}</Text>
                        </View>
                    )}
                />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerInfo: {
        margin: 20
    },
    containerGallery: {
        flex: 1
    },
    containerImage: {
        flex: 1 / 3

    },
    image: {
        flex: 1,
        aspectRatio: 1 / 1
    }
})
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    following: store.userState.following,
    users: store.usersState.users,
    userLoaded: store.usersState.userLoaded,
})
export default connect(mapStateToProps, null)(ChatFriends);