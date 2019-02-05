import React from 'react'
import {connect} from 'react-redux'
import AlertInfo from '../components/AlertInfo'
import {alertInfo} from '../actions/AlertInfo'

const mapStateToProps = (state) => ({
    lang: state.LangDomain.get("lang"),
    alertData: state.AlertDomain.get("info")
})

const mapDispatchToProps = (dispatch) => ({
    goClose:
        () => {
            dispatch(alertInfo("","",false))
        },
})

export default connect(mapStateToProps, mapDispatchToProps)(AlertInfo);

