import {
  USERS_DATA_STATE_CHANGE,
  USERS_POSTS_STATE_CHANGE,
  CLEAR_DATA,
} from '../constants';

//Constructor for my user reducer
const initialState = {
  users: [],
  usersPostLoaded: 0,
};

//Updates the previous state
export const users = (state = initialState, action) => {
  switch (action.type) {
    case USERS_DATA_STATE_CHANGE:
      return {
        ...state,
        users: [...state.users, action.user],
      };
    case USERS_POSTS_STATE_CHANGE:
      return {
        ...state,
        usersPostLoaded: state.usersPostLoaded + 1,
        users: state.users.map(user => user.uid === action.uid ?
        {...user, posts: action.posts} : user),
      };
    case CLEAR_DATA:
      return initialState;
    default:
      return state;
  }
};
