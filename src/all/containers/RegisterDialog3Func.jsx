import React from 'react'
import {connect} from 'react-redux'
import {dlgRegisterDialog3} from '../actions/DlgRegisterDialog3'
import RegisterDialog3 from "../components/RegisterDialog3";
import {userSignUp} from "../actions/UserSignUp";
import {push} from "connected-react-router";

const mapStateToProps = (state) => ({
    lang: state.LangDomain.get("lang"),
    user: state.UserDomain.get("user"),
    dlgData: state.DlgDomain.get("register3Dialog"),
})

const mapDispatchToProps = (dispatch) => ({
    goCancel:
        (lang) => {
            dispatch(dlgRegisterDialog3(false))
            dispatch(push("/public/" + lang))
        },
    submitUserSignUp:
        (values) => {
            console.log("RegisterDialog3Func.map.values",values)
            const authIntSignUpData = {
                userId: values.userId,
                alg: values.alg,
                salt: values.salt,
                psw: values.psw,
            }
            dispatch(userSignUp(authIntSignUpData, values.tkn, values.lang))
        },
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterDialog3);

