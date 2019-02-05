import React from 'react'
import {connect} from 'react-redux'
import TmpAlertInfo from '../components/TmpAlertInfo'
import {tmpAlertInfo} from '../actions/TmpAlertInfo'

const mapStateToProps = (state) => ({
    lang: state.LangDomain.get("lang"),
    alertData: state.AlertDomain.get("tmpInfo")
})

const mapDispatchToProps = (dispatch) => ({
    goClose:
        () => {
            dispatch(tmpAlertInfo("","",false))
        },
})

export default connect(mapStateToProps, mapDispatchToProps)(TmpAlertInfo);

