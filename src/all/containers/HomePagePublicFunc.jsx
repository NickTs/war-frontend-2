import React from 'react'
import {connect} from 'react-redux'
import HomePagePublic from '../components/HomePagePublic'
import { push } from 'connected-react-router'
import {userVerifyEmail} from "../actions/UserVerifyEmail";
import {dlgLogin} from "../actions/DlgLogin";
import {alertInfo} from "../actions/AlertInfo";

const mapStateToProps = (state) => ({
    lang: state.LangDomain.get("lang"),
})

const mapDispatchToProps = (dispatch) => ({
    goRegister: (lang) => dispatch(push("/public/"+lang+"/?go=register")),
    goLogin: (lang, loginName) => {
        if(loginName && loginName!='1') {
            dispatch(dlgLogin(loginName, true))
        } else {
            dispatch(dlgLogin("", true))
        }
    },
    goServices: (lang) => dispatch(push("/public/"+lang+"/?go=services")),
    goAbout: (lang) => dispatch(push("/public/"+lang+"/about")),
    goRegister2: (lang,tkn) => dispatch(userVerifyEmail(tkn, lang)),
    goValues: (lang) => dispatch(alertInfo("Заглушка", "Здесь будет переход на страницу коллекций с кратким описанием.", true)),
    goArtists: (lang) => dispatch(alertInfo("Заглушка", "Здесь будет переход на страницу списка артистов.", true)),
    goGalleries: (lang) => dispatch(alertInfo("Заглушка", "Здесь будет переход на страницу списка галерей.", true)),
    goInfoMore: (lang, stepLabel) => {
        if(stepLabel=='step1') {
            dispatch(alertInfo("Заглушка", "Описать, что дает история владения картиной.", true))
        } else if(stepLabel=='step2') {
            dispatch(alertInfo("Заглушка", "Описать, преимущества покупки через World Art Registry.", true))
        } else if(stepLabel=='step3') {
            dispatch(alertInfo("Заглушка", "Описать, услуги, которые мы предоставляем.", true))
        } else {
            dispatch(alertInfo("Заглушка", "Здесь будет дополнительная информация.", true))
        }
    },
    goAllSales: (lang) => dispatch(alertInfo("Заглушка", "Здесь будет переход на страницу списка продаваемых картин.", true)),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePagePublic);

