// the ONE store that combines all reducers
// this is then passed to the Provider wrapper for the top level component
// and allows lower level components to connect to the store and read its state
import { combineReducers } from 'redux';
import match from './match';
import context from './context';
import pregame from './pregame';
import matchHistory from './matchHistory'

const forward = combineReducers({
  context,
  match,
  matchHistory
});

export default forward;
