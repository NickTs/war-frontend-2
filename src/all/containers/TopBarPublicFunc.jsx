import React from 'react'
import {connect} from 'react-redux'
import TopBarPublic from '../components/TopBarPublic'
import {push} from "connected-react-router";

const mapStateToProps = (state) => ({
    lang: state.LangDomain.get("lang"),
})

const mapDispatchToProps = (dispatch) => ({
    goHome: (lang) => document.location.href = "/public/" + lang,
    goCatalog: (lang) => document.location.href = "/public/" + lang + "/catalog",
    goServices: (lang) => document.location.href = "/public/" + lang + "/?go=services",
    goContacts: (lang) => document.location.href = "/public/" + lang + "/?go=contacts",
})

export default connect(mapStateToProps, mapDispatchToProps)(TopBarPublic);

