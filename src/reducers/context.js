// summoner info
// loaded when a page is loaded
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
    default:
      return state;
  };
};

export default context;
