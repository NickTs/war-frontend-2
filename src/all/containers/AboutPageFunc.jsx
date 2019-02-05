import React from 'react'
import {connect} from 'react-redux'
import AboutPage from '../components/AboutPage'
import { push } from 'connected-react-router'

const mapStateToProps = (state) => ({
    lang: state.LangDomain.get("lang"),
})

const mapDispatchToProps = (dispatch) => ({
    goRegister: (lang) => dispatch(push("/public/"+lang+"/register")),
    goLogin: (lang) => dispatch(push("/public/"+lang+"/login")),
})

export default connect(mapStateToProps, mapDispatchToProps)(AboutPage);

