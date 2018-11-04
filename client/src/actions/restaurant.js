import axios from 'axios';
import { setFlash } from './flash';

// action creator
const setRestaurants = (restaurants) => {
  // action that is being dispatched
  // key of type
  // key of restaurants
  return { type: 'SET_RESTAURANTS', restaurants: restaurants }
}

export const fetchRestaurants = () => {
  // thunk
  return dispatch => {
    axios.get('/api/restaurants')
      .then( res => {
        debugger
        dispatch(setRestaurants(res.data.restaurants));
      })
      .catch( err => {
        dispatch(setFlash('Error fetching restaurants. Try again!', 'red'));
    });
  }
}