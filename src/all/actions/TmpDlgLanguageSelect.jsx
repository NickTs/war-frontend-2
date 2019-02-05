import {ActionType} from "./ActionType";

export function tmpDlgLanguageSelect(showValue) {
    const dlgData = {
        show: showValue
    }
    return {type: ActionType.TMP_DLG_LANGUAGE_SELECT, dlgData}
}