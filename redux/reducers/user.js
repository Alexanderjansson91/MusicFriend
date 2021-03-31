
import {
    USER_STATE_CHANGE,
    USER_POSTS_STATE_CHANGE,
    CLEAR_DATA,
    USER_FOLLOWING_STATE_CHANGE
  } from '../constants';
  
  //Constructor
  const initialState = {
    currentUser: null,
    posts: [],
    following: [],
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
        case USER_FOLLOWING_STATE_CHANGE:
        return {
          ...state,
          following: action.following,
        };
      case CLEAR_DATA:
        return {
          currentUser: null,
          posts: [],
        };
      default:
        return state;
    }
  };