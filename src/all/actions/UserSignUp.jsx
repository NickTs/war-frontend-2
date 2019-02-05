import {ActionType} from "./ActionType";
import axiosBackendApi from "../axios/axiosBackendApi"
import {push} from 'connected-react-router'
import {GetBaseUrl} from "../Utils";
import {alertErrApi} from "./AlertErrApi";
import {dlgRegisterDialog3} from "./DlgRegisterDialog3";

const _userSignUp = (user) => ({
    type: ActionType.USER_SIGN_UP,
    user
});

export const userSignUp = (authIntSignUpData, tkn, lang) => {
    return (dispatch) => {
        const authIntSignUp = {
            userId: authIntSignUpData.userId,
            alg: authIntSignUpData.alg,
            salt: authIntSignUpData.salt,
            psw: authIntSignUpData.psw,
        };
        console.log("userSignUp.tkn=", tkn)
        console.log("userSignUp.auth=", authIntSignUp)
        return axiosBackendApi.post('auth/int/signup?tkn='+tkn, authIntSignUp, {
            headers: {
                "x-lang": lang
            }
        })
            .then(result => {
                dispatch(_userSignUp(result.data))
                dispatch(dlgRegisterDialog3(false))
                document.location.href = '/public/'+lang+'/?signin=1'
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