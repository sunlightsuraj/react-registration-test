import { combineReducers } from 'redux';
import tokenReducer from './token';
import loggedReducer from './isLogged';

const allReducers = combineReducers({
    token: tokenReducer,
    isLogged: loggedReducer
})

export default allReducers;