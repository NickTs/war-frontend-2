import React from 'react'
import {connect} from 'react-redux'
import LoginDialog from '../components/LoginDialog'
import {dlgLogin} from '../actions/DlgLogin'
import {dlgRegisterDialog1} from '../actions/DlgRegisterDialog1'
import {userSignIn} from "../actions/UserSignIn";
import {alertInfo} from "../actions/AlertInfo";

const mapStateToProps = (state) => ({
    lang: state.LangDomain.get("lang"),
    dlgData: state.DlgDomain.get("loginDialog")
})

const mapDispatchToProps = (dispatch) => ({
    submitLogin:
        (values) => {
            dispatch(userSignIn(values.login,values.password,values.lang))
        },
    goCancel:
        () => {
            dispatch(dlgLogin("",false))
        },
    goForgot:
        (lang) => {
            dispatch(alertInfo("Заглушка", "Окно восстановления пароля.", true))
            dispatch(dlgLogin("",false))
        },
    goRegister:
        (lang) => {
            dispatch(dlgLogin("",false))
            dispatch(dlgRegisterDialog1(true))
        },
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginDialog);

