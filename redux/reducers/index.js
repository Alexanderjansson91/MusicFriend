import { combineReducers } from 'redux';
import { user } from './user';
import { users } from './users';

//help function that reduces the functions in user to a single reducer
const Reducers = combineReducers({
  userState: user,
  usersState: users,
});

export default Reducers;
