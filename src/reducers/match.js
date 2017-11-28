const initialState = {  
  testStr: 'asdf',
  history: []
};

// action handler to change/set the name of the user
const sampleAction = (state, action) => {
  return Object.assign({}, state, {
    testStr: action.payload.newStr
  });
};

// setting up the reducer
// here we have a switch statement to direct the right type of action
// to the right handler
const match = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  };
};

export default match;
