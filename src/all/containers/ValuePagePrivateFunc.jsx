import React from 'react'
import {connect} from 'react-redux'
import ValuePagePrivate from '../components/ValuePagePrivate'

const mapStateToProps = (state) => ({
    lang: state.LangDomain.get("lang"),
    dbValues: state.ValueDomain.get("dbValues"),
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(ValuePagePrivate);

