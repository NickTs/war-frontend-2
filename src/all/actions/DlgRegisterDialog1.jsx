import {ActionType} from "./ActionType";

export function dlgRegisterDialog1(showValue) {
    const dlgData = {
        show: showValue
    }
    return {type: ActionType.DLG_REGISTER_DIALOG_1, dlgData}
}