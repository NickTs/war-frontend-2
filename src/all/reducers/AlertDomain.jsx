import {ActionType} from '../actions/ActionType'
import {Map} from "immutable";

function AlertDomain(state = Map(), action) {
    switch (action.type) {
        case ActionType.ALERT_ERR_API:
            return state.set("errApi", action.alertData)
        case ActionType.ALERT_INFO:
            return state.set("info", action.alertData)
        case ActionType.TMP_ALERT_INFO:
            return state.set("tmpInfo", action.alertData)
        default:
            return state
    }
}

export default AlertDomain