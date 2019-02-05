import {ActionType} from "./ActionType";
import axiosBackendApi from "../axios/axiosBackendApi"
import {alertErrApi} from "./AlertErrApi";
import { push } from 'connected-react-router'

const _artistCreate = (profile) => ({
    type: ActionType.ARTIST_CREATE,
    profile
});

export const artistCreate = (artistData, lang, userSession) => {
    return (dispatch) => {
        const artist = artistData
        console.log("artistCreate=", artist)
        return axiosBackendApi.post('artists', artist, {
            headers: {
                "x-lang": lang,
                "Authorization": "Bearer " + userSession.jwt,
                "X-ResponseFull": "true"
            }
        })
            .then(result => {
                dispatch(_artistCreate(result.data))
                dispatch(push("/private/" + lang + "/profile/artist"))
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