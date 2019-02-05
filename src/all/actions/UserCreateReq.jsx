import {ActionType} from "./ActionType";
import axiosBackendApi from "../axios/axiosBackendApi"
import {GetBaseUrl} from "../Utils";
import {tmpAlertInfo} from "./TmpAlertInfo";
import {dlgRegisterReqDialog2} from './DlgRegisterReqDialog2'
import {dlgRegisterReqDialog2Ok} from './DlgRegisterReqDialog2Ok'

const _userCreate = (user) => ({
    type: ActionType.USER_CREATE_REQ,
    user
});

export const userCreateReq = (userData, lang) => {
    return (dispatch) => {
        const user = {
            userType: userData.userType,
            name: userData.name,
            addr: userData.addr,
            email: userData.email,
            phone: userData.phone
        };
        console.log("userCreateReq=", user);
        dispatch(dlgRegisterReqDialog2("",false))
        dispatch(dlgRegisterReqDialog2Ok(user,true))
    };
};