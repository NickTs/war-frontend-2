import React from 'react'
import {connect} from 'react-redux'
import RegisterFirstPage from '../components/RegisterFirstPage'
import {userCreate} from '../actions/UserCreate'
import {push} from "connected-react-router";


const mapStateToProps = (state) => ({
    lang: state.LangDomain.get("lang"),
})

const mapDispatchToProps = (dispatch) => ({
    submitUserCreate:
        (values) => {
            const userData = {
                userType: values.userType,
                email: values.email,
                phone: values.phone ? values.phone.replace(/\D+/g,"") : ""
            };
            dispatch(userCreate(userData, values.lang))
        },
    goHome: (lang) => dispatch(push("/public/"+lang))
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterFirstPage);

