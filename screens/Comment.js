import React, { useState, useEffect } from 'react'
import {View, Text, FlatList,TextInput,Button, ShadowPropTypesIOS } from 'react-native'

import firebase from 'firebase';
import { connect } from 'react-redux';
require('firebase/firestore')

import{bindActionCreators} from 'redux'
import {fetchUsersData} from '../redux/actions/index'

function Comment(props) {

    const [comments, setComments] = useState([])
    const [postId, setPostId] = useState("")
    const [text, setText] = useState("")

    //Get all the posts from firestore 
    useEffect(() => {

        function matchCommentToUser(comments) {
            for(let i = 0; i<comments.length; i++){
                
                if (comments[i].hasOwnProperty('user')){
                    continue;
                }

                const user = props.users.find(x => x.uid === comments[i].creator)

                if(user == undefined) {
                    props.fetchUsersData(comments[i].creator, false)
                }else {
                    comments[i].user = user
                }
            }
            setComments(comments)
        }


            if (props.route.params.postId !== postId){
                firebase.firestore()
                .collection('posts')
                .doc(props.route.params.uid)
                .collection('userPosts')
                .doc(props.route.params.postId)
                .collection('comments')
                .get()
                .then((snapshot) => {
                    let comments = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id
                        return {id, ...data}
                    })
                    matchCommentToUser(comments)
                })
                setPostId(props.route.params.uid)
            }else{
                matchCommentToUser(comments)
            }
    }, [props.route.params.postId, props.users])


    const onCommentSend = () => {
        firebase.firestore()
                .collection('posts')
                .doc(props.route.params.uid)
                .collection('userPosts')
                .doc(props.route.params.postId)
                .collection('comments')
                .add({
                    creator: firebase.auth().currentUser.uid,
                    text
                })

    }
    
    return (
        <View style>
                  <FlatList
                numColumns={1}
                horizontal={false}
                data={comments}
                renderItem={({ item }) => (
                    <View>
                        {item.user !== undefined ?
                            <Text>
                                {item.user.name}
                            </Text>
                            : null}
                        <Text>{item.text}</Text>
                    </View>
                )}
            />


            <View>
                <TextInput 
                placeholder="kommentar"
                onChangeText={(text) => setText(text)}
                />
                <Button
                onPress= {() => onCommentSend()}
                title="Skicka"
                />
            </View>


        </View>
    )
}

const mapStateToProps = (store) => ({
    users: store.usersState.users
})

const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUsersData }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Comment);
