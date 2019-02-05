import React from 'react'
import {connect} from 'react-redux'
import {dlgRegisterReqDialog2Ok} from '../actions/DlgRegisterReqDialog2Ok'
import RegisterReqDialog2Ok from "../components/RegisterReqDialog2Ok";
import {push} from "connected-react-router";

const mapStateToProps = (state) => ({
    lang: state.LangDomain.get("lang"),
    dlgData: state.DlgDomain.get("registerReq2OkDialog"),
})

const mapDispatchToProps = (dispatch) => ({
    goCancel:
        (lang) => {
            dispatch(dlgRegisterReqDialog2Ok(null, false))
            dispatch(push("/public/" + lang))
        },
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterReqDialog2Ok);

