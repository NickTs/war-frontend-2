import {ActionType} from "./ActionType";

export function alertInfo(titleValue, msgValue, showValue) {
    const alertData = {
        title: titleValue,
        msg: msgValue,
        show: showValue
    }
    return {type: ActionType.ALERT_INFO, alertData}
}