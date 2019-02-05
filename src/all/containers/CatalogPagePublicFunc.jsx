import React from 'react'
import {connect} from 'react-redux'
import CatalogPagePublic from '../components/CatalogPagePublic'
import {push} from 'connected-react-router'
import {dlgLogin} from "../actions/DlgLogin";

const mapStateToProps = (state) => ({
    lang: state.LangDomain.get("lang"),
    dbValues: state.ValueDomain.get("dbValues"),
})

const mapDispatchToProps = (dispatch) => ({
    goLogin: (lang, loginName) => {
        if (loginName && loginName != '1') {
            dispatch(dlgLogin(loginName, true))
        } else {
            dispatch(dlgLogin("", true))
        }
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(CatalogPagePublic);

