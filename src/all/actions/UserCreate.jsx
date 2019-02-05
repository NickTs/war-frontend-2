import {ActionType} from "./ActionType";
import axiosBackendApi from "../axios/axiosBackendApi"
import {GetBaseUrl} from "../Utils";
import {tmpAlertInfo} from "./TmpAlertInfo";
import {dlgRegisterDialog2} from './DlgRegisterDialog2'
import {dlgRegisterDialog2Ok} from './DlgRegisterDialog2Ok'

const _userCreate = (user) => ({
    type: ActionType.USER_CREATE,
    user
});

export const userCreate = (userData, lang) => {
    return (dispatch) => {
        const user = {
            userType: userData.userType,
            email: userData.email,
            phone: userData.phone
        };
        console.log("userCreate=", user)
        return axiosBackendApi.post('users', user, {
            headers: {
                "x-lang": lang,
                "x-verifyemail-path": GetBaseUrl() + "/public/" + lang + "/?tkn="
            }
        })
            .then(result => {
                dispatch(_userCreate(result.data))
                if(lang=='ru'){
                    dispatch(tmpAlertInfo("OK", "Пожалуйста проверьте ваш email " + user.email, true))
                } else {
                    dispatch(tmpAlertInfo("OK", "Please check your email " + user.email, true))
                }
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.data.errorCode) {
                        dispatch(tmpAlertInfo("API-" + error.response.data.errorCode, error.response.data.message, true))
                    } else {
                        dispatch(tmpAlertInfo("HTTP-" + error.response.status, "Network error2", true))
                    }
                } else {
                    dispatch(tmpAlertInfo("HTTP-", "Network error", true))
                }
            })

    };
};