import React from 'react'
import {connect} from 'react-redux'
import ProfileArtistScans from '../components/ProfileArtistScans'
import {push} from "connected-react-router";
import {alertInfo} from "../actions/AlertInfo";
import {dlgUploadImageDialog} from "../actions/DlgUploadImageDialog";
import {artistUpdate} from "../actions/ArtistUpdate";

const mapStateToProps = (state) => ({
    lang: state.LangDomain.get("lang"),
    user: state.UserDomain.get("user"),
    profile: state.UserDomain.get("profile"),
    session: state.UserDomain.get("session"),
})

const mapDispatchToProps = (dispatch) => ({
    goHome: (lang) => dispatch(push("/private/"+lang)),
    goTrap: (lang, msg) => dispatch(alertInfo("Заглушка", msg, true)),
    goUploadImage: (lang, goCancel, goSubmit) => {
        dispatch(dlgUploadImageDialog(true, goCancel, goSubmit))
    },
    goUploadImageOk: (lang, session, profileNew, fieldName) => {
        dispatch(artistUpdate(profileNew, lang, session, fieldName))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileArtistScans);

