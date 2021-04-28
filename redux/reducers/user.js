
import {
    USER_STATE_CHANGE,
    USER_POSTS_STATE_CHANGE,
    CLEAR_DATA,
    USERS_FOLLOWING_STATE_CHANGE,
    USERS_SONGS_STATE_CHANGE,
    USER_ALLPOSTS_STATE_CHANGE,

  } from '../constants';
  
  //Constructor
  const initialState = {
    currentUser: null,
    posts: [],
    following: [],
    allPosts: [],
    songs: [],
  };
  
  //Updates the states that gets from the action
  export const user = (state = initialState, action) => {
    switch (action.type) {
      case USER_STATE_CHANGE:
        return {
          ...state,
          currentUser: action.currentUser,
        };
      
      case USER_POSTS_STATE_CHANGE:
        return {
          ...state,
          posts: action.posts,
        };
        case USER_ALLPOSTS_STATE_CHANGE:
        return {
          ...state,
          allPosts: action.allPosts,
        };
        
        case USERS_SONGS_STATE_CHANGE:
        return {
          ...state,
          songs: action.userSongPosts,
        };
        case USERS_FOLLOWING_STATE_CHANGE:
        return {
          ...state,
          following: action.following,
        };
        case CLEAR_DATA:
          return initialState
      default:
          return state;
    }
  };