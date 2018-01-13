// reducer to store pregame data
const initialState = {
  particpants: [{
    championId: 5,
    summonerSpell1: 5,
    summonerSpell2: 5,
    timestamp: 12345,
    level: 5,
    stats: {
      kills: 5,
      deaths: 5,
      assists: 5,
      totalCs: 5,
      totalCs10: 5,
      totalCs20: 55,
      totalCs30: 5,
      wins: 5,
      losses: 5
    },
    team: 100, // 100 or 200
    championWinrate: {
      123: 0.543, // TODO: Kelvin: I have no idea what significance this field name has
      csDifferentials: -5 // ill let you decide on this,
    },
    mainRoleIcon: 5,
    matches: [ // can be the same as from the dashboard?
      1, 0, 1, 1, 0, 2 // 0 is lose, 1 is win
    ],
    summonerName: "aewf",
    tier: "Diamond",
    division: 5,
  }],
  recommendedBuild: {
    core : [5,5,5],
    situational: [5,55],
    boots: [5,5],
    trinket: [5,5]
  },
  recommendedRunes: [1,2,3,4,5,6]
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
const pregame = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  };
};

export default pregame;