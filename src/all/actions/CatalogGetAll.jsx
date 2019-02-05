import {ActionType} from "./ActionType";
import axiosBackendApi from "../axios/axiosBackendApi"
import {alertErrApi} from "./AlertErrApi";
import { push } from 'connected-react-router'

const _catalogGetAll = (dbValues) => ({
    type: ActionType.CATALOG_GET_ALL,
    dbValues
});


export const catalogGetAll = (lang, find) => {
    return (dispatch) => {
        return axiosBackendApi.get('catalog?imginfo=1'+(find?'&find='+find:''), null, {
            headers: {
                "x-lang": lang,
            }
        })
            .then(result => {
                console.log("catalogGetAll",result.data)
                dispatch(_catalogGetAll(result.data))
            })
            .catch((error) => {
                console.log("catalogGetAll.error",error)
                if (error.response) {
                    if (error.response.data.errorCode) {
                        dispatch(alertErrApi("API-" + error.response.data.errorCode, error.response.data.message, true))
                    } else {
                        dispatch(alertErrApi("HTTP-" + error.response.status, "Network error2", true))
                    }
                } else {
                    dispatch(alertErrApi("HTTP-", "Network error", true))
                }
            })

    };
}