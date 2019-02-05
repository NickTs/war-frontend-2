import { combineReducers } from 'redux'
import {reducer as formReducer} from "redux-form"
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

import { connectRouter } from 'connected-react-router'
import { routerMiddleware } from 'connected-react-router'
import LangDomain from '../reducers/LangDomain'
import UserDomain from '../reducers/UserDomain'
import ValueDomain from "../reducers/ValueDomain";
import AlertDomain from "../reducers/AlertDomain";
import DlgDomain from "../reducers/DlgDomain";

export default (history) => {
    const allReducers = Object.assign({}, {LangDomain, UserDomain, ValueDomain, AlertDomain, DlgDomain}, {form: formReducer},{router:connectRouter(history)});
    const reducer = combineReducers(allReducers);
    return createStore(reducer, applyMiddleware(routerMiddleware(history),thunk));
};