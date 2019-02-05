import {ActionType} from "./ActionType";
import axiosBackendApi from "../axios/axiosBackendApi"
import {alertErrApi} from "./AlertErrApi";
import { push } from 'connected-react-router'

const _pictureCreate = (valueDB) => ({
    type: ActionType.PICTURE_CREATE,
    valueDB
});

const _apiUserValueCreate = (dispatch, lang, userSession, userValue) => {
    axiosBackendApi.post('uservalues', userValue, {
        headers: {
            "x-lang": lang,
            "Authorization": "Bearer " + userSession.jwt,
            "X-ResponseFull": "true"
        }
    })
        .then(result => {
            console.log('userValue', result.data)
        })
        .catch((error) => {
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
}

const _apiPictureCreate = (dispatch, lang, userSession, valueData, pictureData) => {
    axiosBackendApi.post('pictures', pictureData, {
        headers: {
            "x-lang": lang,
            "Authorization": "Bearer " + userSession.jwt,
            "X-ResponseFull": "true"
        }
    })
        .then(result => {
            console.log('picture', result.data)
            let valueDB = {
                value: valueData,
                picture: result.data
            }
            dispatch(_pictureCreate(valueDB))
            document.location.href = "/private/" + lang + "/uservalue/?valueid="+valueDB.value.id
        })
        .catch((error) => {
            console.log('_apiPictureCreate.error', error)
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
}

export const pictureCreate = (valueData, pictureData, lang, user, userSession, rtCreator, rtOwner, rtAuthor, rtHolder) => {
    return (dispatch) => {
        let value = valueData
        console.log("valueCreate=", value)
        return axiosBackendApi.post('values', value, {
            headers: {
                "x-lang": lang,
                "Authorization": "Bearer " + userSession.jwt,
                "X-ResponseFull": "true"
            }
        })
            .then(result => {
                value = result.data
                let dtCur = ""
                let userValue = {
                    active: "1",
                    userId: user.id,
                    valueId: value.id,
                    vt: value.vt,
                    dtStart: dtCur
                }
                if(rtCreator) {
                    userValue.rt = '1'
                    _apiUserValueCreate(dispatch, lang, userSession, userValue)
                }
                if(rtOwner) {
                    userValue.rt = '2'
                    _apiUserValueCreate(dispatch, lang, userSession, userValue)
                }
                if(rtAuthor) {
                    userValue.rt = '3'
                    _apiUserValueCreate(dispatch, lang, userSession, userValue)
                }
                if(rtHolder) {
                    userValue.rt = '4'
                    _apiUserValueCreate(dispatch, lang, userSession, userValue)
                }
                let picture = pictureData
                picture.valueId = value.id
                _apiPictureCreate(dispatch, lang, userSession, value, picture)
            })
            .catch((error) => {
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