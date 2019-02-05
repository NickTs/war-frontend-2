import {ActionType} from "./ActionType";

export function dlgRegisterReqDialog2(userTypeValue, showValue) {
    const dlgData = {
        userType: userTypeValue,
        show: showValue
    }
    return {type: ActionType.DLG_REGISTERREQ_DIALOG_2, dlgData}
}