import React from 'react'
import {connect} from 'react-redux'
import RegisterTwoPageOk from '../components/RegisterTwoPageOk'
import {push} from "connected-react-router";


const mapStateToProps = (state) => ({
    lang: state.LangDomain.get("lang"),
    user: state.UserDomain.get("user")
})

const mapDispatchToProps = (dispatch) => ({
    goLogin: (lang,email) => dispatch(push("/public/"+lang+"/login/?login="+email))
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterTwoPageOk);

