import {ActionType} from "./ActionType";

export function langChange(lang) {
    return {type: ActionType.LANG_CHANGE, lang}
}