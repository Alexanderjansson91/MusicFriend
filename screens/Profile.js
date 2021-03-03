import React, { useState, useEffect } from 'react'
import {View, Text, Button} from 'react-native'
import { connect } from 'react-redux';
import firebase from 'firebase'
require('firebase/firestore');

function Profile(props) {
    const [userPost, setUserPost] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const { currentUser, posts } = props;

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

    }, [props.route.params.uid] )

    
    const onLogout = () => {
        firebase.auth().signOut();
    };

    if(user === null ){
        return <View />
    }
    return (
        <View>
            <Text>Profile</Text>
            <Button
                    style={{marginTop:30}}
                    title="Log out"
                    onPress={() => onLogout()}
                />
                <Text>{user.name}</Text>
        </View>
    )
}

//Access the store states from redux
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
  });
  
  export default connect(mapStateToProps, null)(Profile);
