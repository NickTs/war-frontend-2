import React from 'react'
import {connect} from 'react-redux'
import TmpHomePagePublic from '../components/TmpHomePagePublic'
import { push } from 'connected-react-router'
import {userVerifyEmail} from "../actions/UserVerifyEmail";
import {dlgLogin} from "../actions/DlgLogin";
import {alertInfo} from "../actions/AlertInfo";
import {tmpDlgLanguageSelect} from "../actions/TmpDlgLanguageSelect";
import {tmpAlertInfo} from "../actions/TmpAlertInfo";

const mapStateToProps = (state) => ({
    lang: state.LangDomain.get("lang"),
})

const mapDispatchToProps = (dispatch) => ({
    goRegister: (lang) => dispatch(push("/public/"+lang+"/register")),
    goLogin: (lang, loginName) => {
        if(loginName && loginName!='1') {
            dispatch(dlgLogin(loginName, true))
        } else {
            dispatch(dlgLogin("", true))
        }
    },
    goAbout: (lang) => dispatch(push("/public/"+lang+"/about")),
    goRegister2: (lang,tkn) => dispatch(userVerifyEmail(tkn, lang)),
    goLanguageSelect: (lang) => {
            dispatch(tmpDlgLanguageSelect(true))
    },
    goStarted:
        (lang) => {
            dispatch(tmpAlertInfo("Заглушка", "Непонятно куда переходить.", true))
        },
})

export default connect(mapStateToProps, mapDispatchToProps)(TmpHomePagePublic);