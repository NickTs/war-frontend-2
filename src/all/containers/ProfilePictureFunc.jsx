import React from 'react'
import {connect} from 'react-redux'
import ProfilePicture from '../components/ProfilePicture'
import {alertInfo} from "../actions/AlertInfo"
import {push} from "connected-react-router";
import {catalogRefresh} from "../actions/CatalogRefresh";

const mapStateToProps = (state) => ({
    lang: state.LangDomain.get("lang"),
    session: state.UserDomain.get("session"),
    user: state.UserDomain.get("user"),
    profile: state.UserDomain.get("profile"),
    dbValues: state.ValueDomain.get("dbValues"),
})

const mapDispatchToProps = (dispatch) => ({
    goHome: (lang) => document.location.href = "/private/"+lang,
    goBack: (lang,dbValues) => document.location.href = "/private/"+lang+"/uservalue/?valueid="+dbValues.listValue[0].id,
    goPictureRefresh: (dbValues) => dispatch(catalogRefresh(dbValues)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePicture);

