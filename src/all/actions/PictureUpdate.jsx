import {ActionType} from "./ActionType";
import axiosBackendApi from "../axios/axiosBackendApi"
import {alertErrApi} from "./AlertErrApi";

const _pictureUpdate = (picture) => ({
    type: ActionType.PICTURE_UPDATE,
    picture
});

export const pictureUpdate = (updateValueData, lang, userSession, fieldName) => {
    return (dispatch) => {
        const updateValue = updateValueData
        console.log("pictureUpdate["+fieldName+"]=", updateValueData)
        return axiosBackendApi.post('pictures/'+updateValue.picture.id+"?field="+fieldName, updateValue, {
            headers: {
                "x-lang": lang,
                "Authorization": "Bearer " + userSession.jwt,
                "X-ResponseFull": "false"
            }
        })
            .then(result => {
                document.location.href = "/private/"+lang+"/editvalue/"+updateValue.value.vt+"/?valueid="+updateValue.value.id
            })
            .catch((error) => {
                console.log('pictureUpdate', updateValue, fieldName, error)
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