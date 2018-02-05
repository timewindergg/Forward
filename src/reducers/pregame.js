import {PREGAME_SELECT_SUMMONER} from '../actions/pregameActions';

// reducer to store pregame data
// so we assume people don't have id of -1
const initialState = {
  selectedRed: -1,
  selectedBlue: -1
};

const selectSummoner = (state, payload) => {
  const {summonerID, isRed} = payload;

  return (isRed) ?
    Object.assign({}, state, {selectedRed: summonerID}) : Object.assign({}, state, {selectedBlue: summonerID});
}

// setting up the reducer
// here we have a switch statement to direct the right type of action
// to the right handler
const pregame = (state = initialState, action) => {
  switch (action.type) {
    case PREGAME_SELECT_SUMMONER:
      return selectSummoner(state, action.payload);
    default:
      return state;
  };
};

export default pregame;
