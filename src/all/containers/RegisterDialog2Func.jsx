import React from 'react'
import {connect} from 'react-redux'
import {dlgRegisterDialog2} from '../actions/DlgRegisterDialog2'
import RegisterDialog2 from "../components/RegisterDialog2";
import {userCreate} from "../actions/UserCreate";

const mapStateToProps = (state) => ({
    lang: state.LangDomain.get("lang"),
    dlgData: state.DlgDomain.get("register2Dialog"),
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
                email: values.email,
                phone: values.phone ? values.phone.replace(/\D+/g,"") : ""
            };
            dispatch(userCreate(userData, values.lang))
        },
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterDialog2);

