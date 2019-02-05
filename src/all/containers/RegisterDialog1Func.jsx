import React from 'react'
import {connect} from 'react-redux'
import {dlgRegisterDialog1} from '../actions/DlgRegisterDialog1'
import {dlgRegisterDialog2} from '../actions/DlgRegisterDialog2'
import {dlgRegisterReqDialog2} from '../actions/DlgRegisterReqDialog2'
import RegisterDialog1 from "../components/RegisterDialog1";

const mapStateToProps = (state) => ({
    lang: state.LangDomain.get("lang"),
    dlgData: state.DlgDomain.get("register1Dialog")
})

const mapDispatchToProps = (dispatch) => ({
    goSubmit:
        (lang, userType) => {
            console.log('userType=', userType)
            if(userType=='artist') {
                dispatch(dlgRegisterDialog1(false))
                dispatch(dlgRegisterDialog2(userType,true))
            } else if(userType=='gallery' || userType=='museum'){
                dispatch(dlgRegisterDialog1(false))
                dispatch(dlgRegisterReqDialog2(userType,true))
            }
        },
    goCancel:
        () => {
            dispatch(dlgRegisterDialog1(false))
        },
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterDialog1);

