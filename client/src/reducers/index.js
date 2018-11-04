import { combineReducers } from 'redux';
import user from './user';
import flash from './flash';
import restaurants from './restaurants';

const rootReducer = combineReducers({
  user,
  flash,
  restaurants,
});

export default rootReducer;

// {
//   user: {},
//   flash: {},
//   restaurants: [],
// }
