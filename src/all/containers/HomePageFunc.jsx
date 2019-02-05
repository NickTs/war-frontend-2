import React from 'react'
import {connect} from 'react-redux'
import HomePage from '../components/HomePage'
import { push } from 'connected-react-router'
import {userVerifyEmail} from "../actions/UserVerifyEmail";

const mapStateToProps = (state) => ({
    lang: state.LangDomain.get("lang"),
})

const mapDispatchToProps = (dispatch) => ({
    goRegister: (lang) => dispatch(push("/public/"+lang+"/register")),
    goLogin: (lang) => dispatch(push("/public/"+lang+"/login")),
    goAbout: (lang) => dispatch(push("/public/"+lang+"/about")),
    goRegister2: (lang,tkn) => dispatch(userVerifyEmail(tkn, lang))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

