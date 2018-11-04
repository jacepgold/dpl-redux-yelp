const restaurants = (state = [], action) => {
  // action { type: 'SET_RESTAURANTS',  restaurants: [{}, {}, {}] }
  switch(action.type) {
    case 'SET_RESTAURANTS':
      return action.restaurants
    case 'MORE_RESTAURANTS':
      return [...state, ...action.restaurants]
    default:
      return state;
  }
}

export default restaurants;