import {ActionType} from "./ActionType";

export function dlgRegisterDialog3(showValue, tknValue) {
    const dlgData = {
        show: showValue,
        tkn: tknValue
    }
    return {type: ActionType.DLG_REGISTER_DIALOG_3, dlgData}
}