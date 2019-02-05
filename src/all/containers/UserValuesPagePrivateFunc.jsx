import React from 'react'
import {connect} from 'react-redux'
import UserValuesPagePrivate from '../components/UserValuesPagePrivate'
import {alertInfo} from "../actions/AlertInfo"
import {push} from "connected-react-router";
import {profileRefresh} from "../actions/ProfileRefresh";

const mapStateToProps = (state) => ({
    lang: state.LangDomain.get("lang"),
    session: state.UserDomain.get("session"),
    user: state.UserDomain.get("user"),
    profile: state.UserDomain.get("profile"),
    dbValues: state.ValueDomain.get("dbValues"),
})

const mapDispatchToProps = (dispatch) => ({
    goHome: (lang) => document.location.href = "/private/"+lang,
    goProfileRefresh: (profile) => dispatch(profileRefresh(profile)),
    goPictureNew: (lang) => document.location.href = "/private/"+lang+"/newvalue/pict",
})

export default connect(mapStateToProps, mapDispatchToProps)(UserValuesPagePrivate);

