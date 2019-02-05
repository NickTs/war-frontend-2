import React from 'react'
import {connect} from 'react-redux'
import TmpLanguageSelectDialog from '../components/TmpLanguageSelectDialog'
import {tmpDlgLanguageSelect} from '../actions/TmpDlgLanguageSelect'

const mapStateToProps = (state) => ({
    lang: state.LangDomain.get("lang"),
    dlgData: state.DlgDomain.get("tmpLanguageSelectDialog")
})

const mapDispatchToProps = (dispatch) => ({
    goCancel:
        (lang) => {
            dispatch(tmpDlgLanguageSelect(false))
        },
})

export default connect(mapStateToProps, mapDispatchToProps)(TmpLanguageSelectDialog);

