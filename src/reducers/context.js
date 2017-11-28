import {NavigationActions} from '../actions/navigation';

const initialState = {  
  region: '',
  summoner: '',
};

// action handler to search for a summoner
const searchSummoner = (state, payload) => {
  return Object.assign({}, state, {
    region: payload.region,
    summoner: payload.summoner,
  });
};

// setting up the reducer
// here we have a switch statement to direct the right type of action
// to the right handler
const context = (state = initialState, action) => {
  switch (action.type) {
    case NavigationActions.SEARCH_SUMMONER:
      return searchSummoner(state, action.payload);
      break;
    default:
      return state;
  };
};

export default context;
