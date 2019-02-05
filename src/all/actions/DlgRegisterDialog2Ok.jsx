import {ActionType} from "./ActionType";

export function dlgRegisterDialog2Ok(userDataValue, showValue) {
    const dlgData = {
        userData: userDataValue,
        show: showValue
    }
    return {type: ActionType.DLG_REGISTER_DIALOG_2_OK, dlgData}
}