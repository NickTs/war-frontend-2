import {ActionType} from "./ActionType";

export function catalogRefresh(dbValues) {
    return {type: ActionType.CATALOG_REFRESH, dbValues}
}
