import { Map } from 'immutable';
import {GET_VALUES, ADD_VALUE} from '../actions/ValueType';

export const reducer = function(state = Map(), action) {
    switch (action.type) {
        case GET_VALUES:
            return state.update("values", action.values);
        case ADD_VALUE:
            return state.update("values", (values) => values.push(action.value));
        default:
            return state;
    }
};

