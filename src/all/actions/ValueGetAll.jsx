import {ActionType} from "./ActionType";
import axiosBackendApi from "../axios/axiosBackendApi"
import {alertErrApi} from "./AlertErrApi";
import { push } from 'connected-react-router'

const _valueGetAll = (dbValues) => ({
    type: ActionType.VALUE_GET_ALL,
    dbValues
});


export const valueGetAll = (lang, user, userSession) => {
    return (dispatch) => {
        return axiosBackendApi.get('users/'+user.id+'/values?active=1&vtreq=1&imginfo=1', null, {
            headers: {
                "x-lang": lang,
                "Authorization": "Bearer " + userSession.jwt
            }
        })
            .then(result => {
                console.log("valueGetAll",user,result.data)
                dispatch(_valueGetAll(result.data))
            })
            .catch((error) => {
                console.log("valueGetAll.error",error)
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