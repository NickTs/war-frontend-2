import React from 'react'
import {connect} from 'react-redux'
import AlertErrApi from '../components/AlertErrApi'
import {alertErrApi} from '../actions/AlertErrApi'

const mapStateToProps = (state) => ({
    lang: state.LangDomain.get("lang"),
    alertData: state.AlertDomain.get("errApi")
})

const mapDispatchToProps = (dispatch) => ({
    goClose:
        () => {
            dispatch(alertErrApi(0,"",false))
        },
})

export default connect(mapStateToProps, mapDispatchToProps)(AlertErrApi);

