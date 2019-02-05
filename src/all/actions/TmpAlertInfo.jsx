import {ActionType} from "./ActionType";

export function tmpAlertInfo(titleValue, msgValue, showValue) {
    const alertData = {
        title: titleValue,
        msg: msgValue,
        show: showValue
    }
    return {type: ActionType.TMP_ALERT_INFO, alertData}
}