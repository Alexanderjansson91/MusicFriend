import firebase, { firestore } from 'firebase'
import { USER_POSTS_STATE_CHANGE, USER_STATE_CHANGE, CLEAR_DATA, USERS_FOLLOWING_STATE_CHANGE, USERS_DATA_STATE_CHANGE, USERS_POSTS_STATE_CHANGE, USERS_SONGS_STATE_CHANGE, USER_ALLPOSTS_STATE_CHANGE } from '../constants/index'
require('firebase/firestore')

//Delete all user redux data
export function clearData() {
    return ((dispatch) => {
        dispatch({type: CLEAR_DATA})
    })
}

export function fetchUser() {
    return ((dispatch) => {
        firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() })
                }
                else {
                    console.log('does not exist')
                }
            })
    })
}

export function fetchUserPosts() {
    return ((dispatch) => {
        firebase.firestore()
            .collection("posts")
            .doc(firebase.auth().currentUser.uid)
            .collection("userPosts")
            .orderBy("creation", "asc")
            .get()
            .then((snapshot) => {
                let posts = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                })
                dispatch({ type: USER_POSTS_STATE_CHANGE, posts })
            
            })
    })
}

export function fetchUserFollowing() {
    return ((dispatch) => {
        firebase.firestore()
            .collection("following")
            .doc(firebase.auth().currentUser.uid)
            .collection("userFollowing")
            .onSnapshot((snapshot) => {
                let following = snapshot.docs.map(doc => {
                    const id = doc.id;
                    return id
                })
                dispatch({ type: USERS_FOLLOWING_STATE_CHANGE, following });

            })
    })
}

export function fetchUsersData(uid, getPosts) {
    return ((dispatch, getState) => {
        const found = getState().usersState.users.some(el => el.uid === uid);
        if (!found) {
            firebase.firestore()
                .collection("users")
                .doc(uid)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists) {
                        let user = snapshot.data();
                        user.uid = snapshot.id;
                        dispatch({ type: USERS_DATA_STATE_CHANGE, user });
                    }
                    else {
                        console.log('does not exist')
                    }
                })
                if(getPosts){
                    dispatch(fetchFollowingUsersPosts(uid));
                }
        }
    })
}

export function fetchFollowingUsersPosts(uid) {
    return ((dispatch, getState) => {
        firebase.firestore()
            .collection("posts")
            .doc(uid)
            .collection("userPosts")
            .orderBy("creation", "asc")
            .get()
            .then((snapshot) => {

                const uid = snapshot.query.EP.path.segments[1];
                const user = getState().usersState.users.find(el => el.uid === uid);
                

                let posts = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data, user }
                    
                })
                //console.log(posts);
                dispatch({ type: USERS_POSTS_STATE_CHANGE, posts, uid })
            })
    })
}

export function fetchUserSongs() {
    return ((dispatch) => {
        firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .collection("usersSong")
            .orderBy("creation", "asc")
            .get()
            .then((snapshot) => {
                let userSongPosts = snapshot.docs.map(doc => {
                    
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                })
                dispatch({ type: USERS_SONGS_STATE_CHANGE, userSongPosts })

            })
         
    })
}



export function fetchAllUsers() {
    return ((dispatch) => {
        firebase.firestore()
        .collection("users")
        .onSnapshot((snapshot) => {
            let allPosts = snapshot.docs.map(doc => {
                const id = doc.id;
                return id
            })
            dispatch({ type: USER_ALLPOSTS_STATE_CHANGE , allPosts })
            for(let i = 0; i < allPosts.length; i++){
                dispatch(fetchUsersData(allPosts[i], true));
            }
        })
    })
}


/*
export function fetchAllUserPosts() {
    return ((dispatch) => {
        firebase.firestore()
        .collection("posts")
        .get()
            .then((snapshot) => {
                let allPosts = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                })
                dispatch({ type: USER_ALLPOSTS_STATE_CHANGE , allPosts })
            })
    })
}*/



/*
export function fetchAllUserPosts(uid, getPosts) {
    return ((dispatch, getState) => {
        const found = getState().userState.user.some(el => el.uid === uid);
        if (!found) {
            firebase.firestore()
            .collection("posts")
            .doc(uid)
            .collection("userPosts")
            .get()
            .then((snapshot) => {
                let posts = snapshot.docs.map(doc => {
                    
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                })
                dispatch({ type: USER_ALLPOSTS_STATE_CHANGE, posts })

            })

            }
    })
}
*/