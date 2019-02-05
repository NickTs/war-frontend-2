import {ActionType} from "./ActionType";

export function dlgRegisterReqDialog2Ok(userDataValue, showValue) {
    const dlgData = {
        userData: userDataValue,
        show: showValue
    }
    return {type: ActionType.DLG_REGISTERREQ_DIALOG_2_OK, dlgData}
}