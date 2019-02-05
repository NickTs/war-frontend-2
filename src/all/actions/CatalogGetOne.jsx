import {ActionType} from "./ActionType";
import axiosBackendApi from "../axios/axiosBackendApi"
import {alertErrApi} from "./AlertErrApi";
import { push } from 'connected-react-router'

const _catalogGetOne = (dbValues) => ({
    type: ActionType.CATALOG_GET_ONE,
    dbValues
});


export const catalogGetOne = (lang, valueId, flowner) => {
    return (dispatch) => {
        return axiosBackendApi.get('catalog/'+valueId+'?imginfo=1'+(flowner?'&owner=1':''), null, {
            headers: {
                "x-lang": lang,
                "X-ResponseFull": flowner?"true":"false"
            }
        })
            .then(result => {
                console.log("catalogGetOne",result.data)
                dispatch(_catalogGetOne(result.data))
            })
            .catch((error) => {
                console.log("catalogGetOne.error",error)
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