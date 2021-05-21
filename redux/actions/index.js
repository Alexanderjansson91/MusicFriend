import firebase, { firestore } from 'firebase';
import moment from "moment";

import { USER_POSTS_STATE_CHANGE, USER_STATE_CHANGE, CLEAR_DATA, USERS_FOLLOWING_STATE_CHANGE, USERS_DATA_STATE_CHANGE, USERS_POSTS_STATE_CHANGE, USERS_SONGS_STATE_CHANGE, USER_ALLPOSTS_STATE_CHANGE, USER_ALLUSERS_STATE_CHANGE } from '../constants/index'
require('firebase/firestore')


//Delete all user redux data
export function clearData() {
  return (dispatch) => {
    dispatch({ type: CLEAR_DATA });
  };
}

//fetch UserInfo from firebase
export function fetchUser() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() });
        } else {
          console.log('does not exist');
        }
      });
  };
}

//Fetch users posts from firebase
export function fetchUserPosts() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .orderBy("creation", "asc")
      .get()
      .then((snapshot) => {
        let posts = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        dispatch({ type: USER_POSTS_STATE_CHANGE, posts });
      });
  };
}

export function fetchUserFollowing() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .onSnapshot((snapshot) => {
        let following = snapshot.docs.map((doc) => {
          const id = doc.id;
          return id;
        });
        dispatch({ type: USERS_FOLLOWING_STATE_CHANGE, following });
      });
  };
}

//Fetch users UID from firebase and bind and dispatch it with the posts.
export function fetchUsersData(uid, getPosts) {
  return (dispatch, getState) => {
    const found = getState().usersState.users.some((el) => el.uid === uid);
    if (!found) {
      firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            let user = snapshot.data();
            user.uid = snapshot.id;
            dispatch({ type: USERS_DATA_STATE_CHANGE, user });
          } else {
            console.log('does not exist');
          }
        });
      if (getPosts) {
        dispatch(fetchUsersPosts(uid));
      }
    }
  };
}

//Fetch users posts and add date to it by using moment
export function fetchUsersPosts(uid) {
  return (dispatch, getState) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(uid)
      .collection("userPosts")
      .orderBy("creation", "asc")
      .get()
      .then((snapshot) => {
        const uid = snapshot.query.EP.path.segments[1];
        const user = getState().usersState.users.find((el) => el.uid === uid);

        const posts = snapshot.docs.map((doc) => {
          const { data: firebaseTimestamp, ...rest } = doc.data();
          const id = doc.id;
          const data = firebaseTimestamp ? moment(firebaseTimestamp.toDate()) : null;
          return {
            ...rest,
            id,
            user,
            ...data,
          };
        });
        //console.log(posts);
        dispatch({ type: USERS_POSTS_STATE_CHANGE, posts, uid });
      });
  };
}

//Ftech Users songs
export function fetchUserSongs() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("usersSong")
      .orderBy("creation", "asc")
      .get()
      .then((snapshot) => {
        let userSongPosts = snapshot.docs.map(doc => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        dispatch({ type: USERS_SONGS_STATE_CHANGE, userSongPosts });
      });
  };
}

//Fetch users data to bind it the posts and dispatch all posts
export function fetchAllUsers() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("users")
      .onSnapshot((snapshot) => {
        let allPosts = snapshot.docs.map((doc) => {
          const id = doc.id;
          return id;
        });
        dispatch({ type: USER_ALLPOSTS_STATE_CHANGE, allPosts });
        for(let i = 0; i < allPosts.length; i++){
          dispatch(fetchUsersData(allPosts[i], true));
        }
      });
  };
}

//fetch all users and dispatch all users
export function fetchUsers() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("users")
      .onSnapshot((snapshot) => {
        let allUsers = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        dispatch({ type: USER_ALLUSERS_STATE_CHANGE, allUsers });
      });
  };
}
