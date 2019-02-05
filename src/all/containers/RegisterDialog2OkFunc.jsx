import React from 'react'
import {connect} from 'react-redux'
import {dlgRegisterDialog2Ok} from '../actions/DlgRegisterDialog2Ok'
import RegisterDialog2Ok from "../components/RegisterDialog2Ok";
import {push} from "connected-react-router";

const mapStateToProps = (state) => ({
    lang: state.LangDomain.get("lang"),
    dlgData: state.DlgDomain.get("register2OkDialog"),
})

const mapDispatchToProps = (dispatch) => ({
    goCancel:
        (lang) => {
            dispatch(dlgRegisterDialog2Ok(null, false))
            dispatch(push("/public/" + lang))
        },
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterDialog2Ok);

