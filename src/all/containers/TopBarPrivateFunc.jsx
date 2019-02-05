import React from 'react'
import {connect} from 'react-redux'
import TopBarPrivate from '../components/TopBarPrivate'
import {push} from "connected-react-router";
import {alertInfo} from "../actions/AlertInfo";
import {dlgUploadImageDialog} from "../actions/DlgUploadImageDialog";
import {valueGetAll} from "../actions/ValueGetAll";



const mapStateToProps = (state) => ({
    lang: state.LangDomain.get("lang"),
    user: state.UserDomain.get("user"),
    profile: state.UserDomain.get("profile"),
    session: state.UserDomain.get("session")
})

const mapDispatchToProps = (dispatch) => ({
    goHome: (lang) => document.location.href = "/private/"+lang,
    goUserValues: (lang, user, profile, session) => {
        if(profile && profile.verifyState && profile.verifyState=='ok'){
            document.location.href = "/private/"+lang+"/uservalues"
        } else {
            document.location.href = "/private/"+lang+"/profile/"+user.userType
        }
    },
    goOperations: (lang, user, profile) => {
        if(profile && profile.verifyState && profile.verifyState=='ok'){
            dispatch(alertInfo("Заглушка", "Здесь будет переход на страницу операций.", true))
        } else {
            document.location.href = "/private/"+lang+"/profile/"+user.userType
        }
    },
    goServices: (lang, user, profile) => {
        if(profile && profile.verifyState && profile.verifyState=='ok'){
            dispatch(alertInfo("Заглушка", "Здесь будет переход на страницу услуг.", true))
        } else {
            document.location.href = "/private/"+lang+"/profile/"+user.userType
        }
    },
    goCatalog: (lang, user, profile) => {
        if(profile && profile.verifyState && profile.verifyState=='ok'){
            document.location.href = "/private/" + lang+"/catalog"
        } else {
            document.location.href = "/private/"+lang+"/profile/"+user.userType
        }
    },
    goProfile: (lang, user) => document.location.href = "/private/"+lang+"/profile/"+user.userType,
})


export default connect(mapStateToProps,mapDispatchToProps)(TopBarPrivate);

