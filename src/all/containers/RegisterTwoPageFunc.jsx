import React from 'react'
import {connect} from 'react-redux'
import {push} from "connected-react-router";
import RegisterTwoPage from '../components/RegisterTwoPage'
import {userSignUp} from "../actions/UserSignUp";

const mapStateToProps = (state) => ({
    lang: state.LangDomain.get("lang"),
    user: state.UserDomain.get("user"),
})

const mapDispatchToProps = (dispatch) => ({
    submitUserSignUp:
        (values) => {
            console.log("RegisterTwoPageFunc.map.values",values)
            const authIntSignUpData = {
                userId: values.userId,
                alg: values.alg,
                salt: values.salt,
                psw: values.psw,
            }
            dispatch(userSignUp(authIntSignUpData, values.tkn, values.lang))
        },
    goHome: (lang) => dispatch(push("/public/" + lang))
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterTwoPage);

