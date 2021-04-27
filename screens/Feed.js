import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Image, FlatList, Button } from 'react-native'

import firebase from 'firebase'
require('firebase/firestore')
import { connect } from 'react-redux'

function Feed(props) {

    const [posts, setPosts] = useState([]);
    
    //const { usersPosts, songs } = props;
    //Hook for clean up
    console.log(posts);
    useEffect(() => {
        let posts = [];
        console.log(posts);
        if(props.userFollowingLoaded == props.allPosts.length){
            for(let  i = 0; i <props.allPosts.length; i++){
                const user = props.users.find(el => el.uid === props.allPosts[i]);
                if(user != undefined){
                    posts = [...posts, ...user.posts]
                }
            }
            posts.sort(function(x,y) {
                return x.creation - y.creation
            })

            setPosts(posts);
        }
    }, [props.userFollowingLoaded]);
    
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
                            <Text style={styles.container}>{item.caption}</Text>
                            <Text style={styles.container}>{item.user.name}</Text>
                            <Text 
                            onPress={()=> props.navigation.navigate('Comment',
                            {postId: item.id, uid: item.user.uid})
                            }>Viewcomments</Text>
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
    userFollowingLoaded: store.usersState.userFollowingLoaded,
    allPosts: store.userState.allPosts,
})
export default connect(mapStateToProps, null)(Feed);
