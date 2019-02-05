import {ActionType} from "./ActionType";

export function dlgLogin(loginValue, showValue) {
    const dlgData = {
        login: loginValue,
        show: showValue
    }
    return {type: ActionType.DLG_LOGIN, dlgData}
}