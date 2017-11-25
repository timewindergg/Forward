// the ONE store that combines all reducers
// this is then passed to the Provider wrapper for the top level component
// and allows lower level components to connect to the store and read its state

import { combineReducers } from 'redux'
import match from './match'

const forward = combineReducers({
  match  
});

export default forward;
