import {ActionType} from "./ActionType";

export function sessionRefresh(session) {
    return {type: ActionType.SESSION_REFRESH, session}
}