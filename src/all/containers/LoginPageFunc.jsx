import React from 'react'
import {connect} from 'react-redux'
import LoginPage from '../components/LoginPage'
import {push} from "connected-react-router";
import {userSignIn} from "../actions/UserSignIn";


const mapStateToProps = (state) => ({
    lang: state.LangDomain.get("lang"),
})

const mapDispatchToProps = (dispatch) => ({
    submitLogin:
        (values) => {
            dispatch(userSignIn(values.login,values.password,values.lang))
        },
    goHome: (lang) => dispatch(push("/public/"+lang))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

