import {ActionType} from "./ActionType";

export function alertErrApi(errCodeValue, errMsgValue, showValue) {
    const alertData = {
        errCode: errCodeValue,
        errMsg: errMsgValue,
        show: showValue
    }
    return {type: ActionType.ALERT_ERR_API, alertData}
}