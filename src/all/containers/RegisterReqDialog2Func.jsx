import React from 'react'
import {connect} from 'react-redux'
import {dlgRegisterDialog2} from '../actions/DlgRegisterDialog2'
import RegisterReqDialog2 from "../components/RegisterReqDialog2";
import {userCreateReq} from "../actions/UserCreateReq";

const mapStateToProps = (state) => ({
    lang: state.LangDomain.get("lang"),
    dlgData: state.DlgDomain.get("registerReq2Dialog"),
})

const mapDispatchToProps = (dispatch) => ({
    goCancel:
        () => {
            dispatch(dlgRegisterDialog2(false))
        },
    submitUserCreate:
        (values) => {
            const userData = {
                userType: values.userType,
                name: values.name,
                addr: values.addr,
                email: values.email,
                phone: values.phone ? values.phone.replace(/\D+/g,"") : ""
            };
            dispatch(userCreateReq(userData, values.lang))
        },
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterReqDialog2);

