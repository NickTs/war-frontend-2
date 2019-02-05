import React from 'react'
import {connect} from 'react-redux'
import TopBar from '../components/TopBar'



const mapStateToProps = (state) => ({
    lang: state.LangDomain.get("lang"),
})


export default connect(mapStateToProps)(TopBar);

