import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList, KeyboardAvoidingView, Button, } from 'react-native'

import firebase from 'firebase';
import { connect } from 'react-redux';
require('firebase/firestore')
import CommentField from '../components/textFields/CommentTextField'
import CommentsCard from '../components/cards/CommentsCard'
import { bindActionCreators } from 'redux'
import { fetchUsersData } from '../redux/actions/index'

//Functions how handle the comments
function Comment(props) {
  const [comments, setComments] = useState([]);
  const [postId, setPostId] = useState("");
  const [text, setText] = useState("");

  //Match comments with the creator of the comment
  useEffect(() => {
    function matchCommentToUser(comments) {
      for (let i = 0; i < comments.length; i++) {
        if (comments[i].hasOwnProperty('user')) {
          continue;
        }
        const user = props.users.find((x) => x.uid === comments[i].creator);
        if (user == undefined) {
          props.fetchUsersData(comments[i].creator, false);
        } else {
          comments[i].user = user;
        }
      }
      setComments(comments);
    }

    //Gets all the commments from firestore
    if (props.route.params.postId !== postId) {
      firebase
        .firestore()
        .collection('posts')
        .doc(props.route.params.uid)
        .collection('userPosts')
        .doc(props.route.params.postId)
        .collection('comments')
        .get()
        .then((snapshot) => {
          let comments = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          matchCommentToUser(comments);
        });
      setPostId(props.route.params.uid);
    } else {
      matchCommentToUser(comments);
    }
  }, [props.route.params.postId, props.users]);

  //Adding new comment to firestore with currentUser.uid
  const onCommentSend = () => {
    firebase
      .firestore()
      .collection('posts')
      .doc(props.route.params.uid)
      .collection('userPosts')
      .doc(props.route.params.postId)
      .collection('comments')
      .add({
        creator: firebase.auth().currentUser.uid,
        text,
      })
      .then(function () {
        props.navigation.navigate("Feed");
      });
  };

  //View Commnents screen
  return (
    <View style={styles.viewContainer}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.select({ios: 90, android: 90})}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboard}
      >
        {/* Flatlist how displays all the commments */}
        <FlatList
          numColumns={1}
          horizontal={false}
          data={comments}
          renderItem={({ item }) => (
            <View>
              {item.user !== undefined ?
                <CommentsCard
                  click={() => props.navigation.navigate("Profile", { uid: item.user.uid })}
                  textName={item.user.name}
                  commentText={item.text}
                />
            : null}
            </View>
          )}
        />
        <View>
          <CommentField
            placeHolder="Kommentar"
            onChange={(text) => setText(text)}
            click={() => onCommentSend()}
            iconSendComment="send-outline"
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

//Access the states from the store
const mapStateToProps = (store) => ({
    users: store.usersState.users
});

const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUsersData }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Comment);

//Style for the view
const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: '#ffffff',
    height:"100%",
  },
  keyboard: {
    flex: 1,
  },
});
