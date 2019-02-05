import React from 'react'
import {connect} from 'react-redux'
import {dlgUploadImageDialog} from '../actions/DlgUploadImageDialog'
import UploadImageDialog from "../components/UploadImageDialog";
import {alertErrApi} from "../actions/AlertErrApi";

const mapStateToProps = (state) => ({
    lang: state.LangDomain.get("lang"),
    dlgData: state.DlgDomain.get("uploadImageDialog")
})

const mapDispatchToProps = (dispatch) => ({
    goCancel:
        () => {
            dispatch(dlgUploadImageDialog(false, undefined, undefined))
        },
    goSubmit:
        () => {
            dispatch(dlgUploadImageDialog(false, undefined, undefined))
        },
    goError: (title,msg) => {
        dispatch(alertErrApi(title, msg, true))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(UploadImageDialog);

