import { combineReducers } from 'redux'
import * as reducers from '../reducers';

import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

export default () => {
    const reducer = combineReducers(reducers);
    return createStore(reducer, applyMiddleware(thunk));
};