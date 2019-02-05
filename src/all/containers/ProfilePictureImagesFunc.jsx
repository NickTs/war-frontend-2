import React from 'react'
import {connect} from 'react-redux'
import ProfilePictureImages from '../components/ProfilePictureImages'
import {push} from "connected-react-router";
import {alertInfo} from "../actions/AlertInfo";
import {dlgUploadImageDialog} from "../actions/DlgUploadImageDialog";
import {pictureUpdate} from "../actions/PictureUpdate";

const mapStateToProps = (state) => ({
    lang: state.LangDomain.get("lang"),
    user: state.UserDomain.get("user"),
    profile: state.UserDomain.get("profile"),
    session: state.UserDomain.get("session"),
    dbValues: state.ValueDomain.get("dbValues"),
})

const mapDispatchToProps = (dispatch) => ({
    goHome: (lang) => dispatch(push("/private/"+lang)),
    goTrap: (lang, msg) => dispatch(alertInfo("Заглушка", msg, true)),
    goUploadImage: (lang, goCancel, goSubmit) => {
        dispatch(dlgUploadImageDialog(true, goCancel, goSubmit))
    },
    goUploadImageOk: (lang, session, uploadValue, fieldName) => {
        dispatch(pictureUpdate(uploadValue, lang, session, fieldName))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePictureImages);

