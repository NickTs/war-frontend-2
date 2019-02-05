import {ActionType} from "./ActionType";
import axiosBackendApi from "../axios/axiosBackendApi"
import {GetBaseUrl} from "../Utils";
import {alertErrApi} from "./AlertErrApi";
import {dlgRegisterDialog3} from './DlgRegisterDialog3'


const _userVerifyEmail = (user) => ({
    type: ActionType.USER_VERIFY_EMAIL,
    user
});

export const userVerifyEmail = (tkn, lang) => {
    return (dispatch) => {
        return axiosBackendApi.get('auth/verifyemail?tkn='+tkn, {
            headers: {
                "x-lang": lang
            }
        })
            .then(result => {
                dispatch(_userVerifyEmail(result.data))
                dispatch(dlgRegisterDialog3(true,tkn))
            })
            .catch((error) => {
                if (error.response) {
                    if(error.response.data.errorCode){
                        dispatch(alertErrApi("API-"+error.response.data.errorCode, error.response.data.message, true))
                    } else {
                        dispatch(alertErrApi("HTTP-"+error.response.status, "Network error2", true))
                    }
                } else {
                    dispatch(alertErrApi("HTTP-", "Network error", true))
                }
            })

    };
};