import { Map } from 'immutable';
import {ActionType} from '../actions/ActionType'

function ValueDomain(state = Map(), action) {
    switch (action.type) {
        case ActionType.PICTURE_CREATE:
            return state
        case ActionType.VALUE_GET_ALL:
            return state.set("dbValues", action.dbValues)
        case ActionType.CATALOG_GET_ALL:
            return state.set("dbValues", action.dbValues)
        case ActionType.CATALOG_GET_ONE:
            return state.set("dbValues", action.dbValues)
        case ActionType.CATALOG_REFRESH:
            return state.set("dbValues", action.dbValues)
        default:
            return state
    }
}

export default ValueDomain