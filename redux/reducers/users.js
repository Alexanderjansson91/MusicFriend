
import {
    USERS_DATA_STATE_CHANGE,
    USERS_POSTS_STATE_CHANGE,
    CLEAR_DATA,

  } from '../constants';
  
  //Constructor
  const initialState = {
    users: [],
    userLoaded: 0,
  };

  //Updates the states that gets from the action
  export const users = (state = initialState, action) => {
    switch (action.type) {
      case USERS_DATA_STATE_CHANGE:
        return {
          ...state,
          users: [...state.users,  action.user]
        };
      case USERS_POSTS_STATE_CHANGE:
        return {
          ...state,
          userLoaded: state.userLoaded + 1,
          users: state.users.map(user => user.uid === action.uid ? 
           {...user, posts: action.posts} : user)
        };
        case CLEAR_DATA:
          return initialState
      default:
        return state;
    }
  };