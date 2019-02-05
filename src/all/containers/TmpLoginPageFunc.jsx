import React from 'react'
import {connect} from 'react-redux'
import TmpLoginPage from '../components/TmpLoginPage'
import {userSignIn} from "../actions/UserSignIn";
import {tmpAlertInfo} from "../actions/TmpAlertInfo";
import {push} from "connected-react-router";

const mapStateToProps = (state) => ({
    lang: state.LangDomain.get("lang"),
})

const mapDispatchToProps = (dispatch) => ({
    submitLogin:
        (values) => {
            dispatch(userSignIn(values.login, values.password, values.lang))
        },
    goForgot:
        (lang) => {
            dispatch(tmpAlertInfo("Заглушка", "Отсутствует UseCase.", true))
        },
    goRegister:
        (lang) => {
            dispatch(push('/public/' + lang + '/register'))
        },
})

export default connect(mapStateToProps, mapDispatchToProps)(TmpLoginPage);

