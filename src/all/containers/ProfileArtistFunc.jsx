import React from 'react'
import {connect} from 'react-redux'
import ProfileArtist from '../components/ProfileArtist'
import {alertInfo} from "../actions/AlertInfo"
import {push} from "connected-react-router";
import {profileRefresh} from "../actions/ProfileRefresh";

const mapStateToProps = (state) => ({
    lang: state.LangDomain.get("lang"),
    session: state.UserDomain.get("session"),
    user: state.UserDomain.get("user"),
    profile: state.UserDomain.get("profile"),
})

const mapDispatchToProps = (dispatch) => ({
    goHome: (lang) => dispatch(push("/private/"+lang)),
    goProfileRefresh: (profile) => dispatch(profileRefresh(profile)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileArtist);

