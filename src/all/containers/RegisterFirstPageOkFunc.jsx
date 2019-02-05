import React from 'react'
import {connect} from 'react-redux'
import RegisterFirstPageOk from '../components/RegisterFirstPageOk'
import {push} from "connected-react-router";


const mapStateToProps = (state) => ({
    lang: state.LangDomain.get("lang"),
    user: state.UserDomain.get("user")
})

const mapDispatchToProps = (dispatch) => ({
    goHome: (lang) => dispatch(push("/public/"+lang))
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterFirstPageOk);

