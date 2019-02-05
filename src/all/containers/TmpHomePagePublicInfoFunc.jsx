import React from 'react'
import {connect} from 'react-redux'
import TmpHomePagePublicInfo from '../components/TmpHomePagePublicInfo'
import {dlgLogin} from '../actions/DlgLogin'
import {dlgRegisterDialog1} from '../actions/DlgRegisterDialog1'
import {userSignIn} from "../actions/UserSignIn";
import {alertInfo} from "../actions/AlertInfo";

const mapStateToProps = (state) => ({
    lang: state.LangDomain.get("lang"),
})

const mapDispatchToProps = (dispatch) => ({
    goRegister:
        (lang) => {
            dispatch(dlgRegisterDialog1(true))
        },
})

export default connect(mapStateToProps, mapDispatchToProps)(TmpHomePagePublicInfo);

