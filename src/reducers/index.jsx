import { combineReducers } from 'redux';
import user from './user.reducer';
import planet from './planet.reducer';

export default combineReducers({
  user,
  planet
});
