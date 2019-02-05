import React from 'react'
import {connect} from 'react-redux'
import HomePagePrivate from '../components/HomePagePrivate'
import {alertInfo} from "../actions/AlertInfo"
import {push} from "connected-react-router";
import {dlgUploadImageDialog} from "../actions/DlgUploadImageDialog";

const mapStateToProps = (state) => ({
    lang: state.LangDomain.get("lang"),
    user: state.UserDomain.get("user"),
    profile: state.UserDomain.get("profile"),
})

const mapDispatchToProps = (dispatch) => ({
    goHome: (lang) => dispatch(push("/private/"+lang)),
    goUserValues: (lang, user, profile) => {
        if(profile && profile.verifyState && profile.verifyState=='ok'){
            dispatch(alertInfo("Заглушка", "Здесь будет переход на страницу своих ценностей.", true))
        } else {
            dispatch(push("/private/"+lang+"/profile/"+user.userType))
        }
    },
    goOperations: (lang, user, profile) => {
        if(profile && profile.verifyState && profile.verifyState=='ok'){
            dispatch(alertInfo("Заглушка", "Здесь будет переход на страницу операций.", true))
        } else {
            dispatch(push("/private/"+lang+"/profile/"+user.userType))
        }
    },
    goServices: (lang, user, profile) => {
        if(profile && profile.verifyState && profile.verifyState=='ok'){
            dispatch(alertInfo("Заглушка", "Здесь будет переход на страницу услуг.", true))
        } else {
            dispatch(push("/private/"+lang+"/profile/"+user.userType))
        }
    },
    goValues: (lang, user, profile) => {
        if(profile && profile.verifyState && profile.verifyState=='ok'){
            dispatch(alertInfo("Заглушка", "Здесь будет переход на страницу общего каталога.", true))
        } else {
            dispatch(push("/private/"+lang+"/profile/"+user.userType))
        }
    },
    goProfile: (lang, user) => dispatch(push("/private/"+lang+"/profile/"+user.userType)),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePagePrivate);

