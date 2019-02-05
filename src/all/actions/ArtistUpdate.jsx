import {ActionType} from "./ActionType";
import axiosBackendApi from "../axios/axiosBackendApi"
import {alertErrApi} from "./AlertErrApi";

const _artistUpdate = (profile) => ({
    type: ActionType.ARTIST_UPDATE,
    profile
});

export const artistUpdate = (artistData, lang, userSession, fieldName) => {
    return (dispatch) => {
        const artist = artistData
        console.log("artistUpdate["+fieldName+"]=", artist)
        return axiosBackendApi.post('artists/'+artist.id+"?field="+fieldName, artist, {
            headers: {
                "x-lang": lang,
                "Authorization": "Bearer " + userSession.jwt,
                "X-ResponseFull": "true"
            }
        })
            .then(result => {
                dispatch(_artistUpdate(result.data))
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