import {ActionType} from "./ActionType";

export function dlgRegisterDialog2(userTypeValue, showValue) {
    const dlgData = {
        userType: userTypeValue,
        show: showValue
    }
    return {type: ActionType.DLG_REGISTER_DIALOG_2, dlgData}
}