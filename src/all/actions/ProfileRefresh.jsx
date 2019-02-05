import {ActionType} from "./ActionType";

export function profileRefresh(profile) {
    return {type: ActionType.PROFILE_REFRESH, profile}
}