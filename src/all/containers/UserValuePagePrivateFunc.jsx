import React from 'react'
import {connect} from 'react-redux'
import UserValuePagePrivate from '../components/UserValuePagePrivate'

const mapStateToProps = (state) => ({
    lang: state.LangDomain.get("lang"),
    dbValues: state.ValueDomain.get("dbValues"),
    session: state.UserDomain.get("session"),
    user: state.UserDomain.get("user"),
    profile: state.UserDomain.get("profile"),
})

const mapDispatchToProps = (dispatch) => ({
    goEditValue: (lang, dbValues) => document.location.href = "/private/"+lang+"/editvalue/"+dbValues.listValue[0].vt+"/?valueid="+dbValues.listValue[0].id
})

export default connect(mapStateToProps, mapDispatchToProps)(UserValuePagePrivate);

