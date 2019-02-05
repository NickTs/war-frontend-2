import React from 'react'
import {connect} from 'react-redux'
import ProfileArtistGeneral from '../components/ProfileArtistGeneral'
import {push} from "connected-react-router";
import {alertInfo} from "../actions/AlertInfo";

const mapStateToProps = (state) => ({
    lang: state.LangDomain.get("lang"),
    user: state.UserDomain.get("user"),
    profile: state.UserDomain.get("profile"),
})

const mapDispatchToProps = (dispatch) => ({
    goHome: (lang) => dispatch(push("/private/"+lang)),
    goTrap: (lang, msg) => dispatch(alertInfo("Заглушка", msg, true)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileArtistGeneral);

