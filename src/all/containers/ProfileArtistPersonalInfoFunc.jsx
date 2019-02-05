import React from 'react'
import {connect} from 'react-redux'
import ProfileArtistPersonalInfo from '../components/ProfileArtistPersonalInfo'
import {push} from "connected-react-router";
import {alertInfo} from "../actions/AlertInfo";
import {artistCreate} from "../actions/ArtistCreate";

const mapStateToProps = (state) => ({
    lang: state.LangDomain.get("lang"),
    user: state.UserDomain.get("user"),
    profile: state.UserDomain.get("profile"),
    session: state.UserDomain.get("session"),
})

const mapDispatchToProps = (dispatch) => ({
    goHome: (lang) => dispatch(push("/private/"+lang)),
    goTrap: (lang, msg) => dispatch(alertInfo("Заглушка", msg, true)),
    goSubmitCreate: (values, cardLang, lang, user, profile, session) => {
        let artist = {}
        if(profile){
            artist.id = profile.id
        }
        artist.userId = user.id
        artist.listPersonalInfo = [{
            l: cardLang
        }]
        if(values.firstName){
            artist.listPersonalInfo[0].firstName = values.firstName
        }
        if(values.lastName){
            artist.listPersonalInfo[0].lastName = values.lastName
        }
        if(values.middleName){
            artist.listPersonalInfo[0].middleName = values.middleName
        }
        if(values.birthday){
            artist.listPersonalInfo[0].birthday = values.birthday
        }
        if(values.nationIdType){
            artist.listPersonalInfo[0].nationIdType = values.nationIdType.value
        }
        if(values.nationIdSeria){
            artist.listPersonalInfo[0].nationIdSeria = values.nationIdSeria
        }
        if(values.nationIdNumber){
            artist.listPersonalInfo[0].nationIdNumber = values.nationIdNumber
        }
        if(values.country){
            artist.listPersonalInfo[0].country = values.country.value
        }
        if(values.addr){
            artist.listPersonalInfo[0].addr = values.addr
        }
        if(values.billingAddr){
            artist.listPersonalInfo[0].billingAddr = values.billingAddr
        }
        if(values.infoUrl){
            artist.listPersonalInfo[0].infoUrl = values.infoUrl
        }
        dispatch(artistCreate(artist, lang, session))
    },
    goSubmitUpdate: (values, cardLang, lang, user, profile, session) => {
        let artist = {}
        if(profile){
            artist.id = profile.id
        }
        artist.userId = user.id
        artist.listPersonalInfo = [{
            l: cardLang
        }]
        if(values.firstName){
            artist.listPersonalInfo[0].firstName = values.firstName
        }
        if(values.lastName){
            artist.listPersonalInfo[0].lastName = values.lastName
        }
        if(values.middleName){
            artist.listPersonalInfo[0].middleName = values.middleName
        }
        if(values.birthday){
            artist.listPersonalInfo[0].birthday = values.birthday
        }
        if(values.nationIdType){
            artist.listPersonalInfo[0].nationIdType = values.nationIdType.value
        }
        if(values.nationIdSeria){
            artist.listPersonalInfo[0].nationIdSeria = values.nationIdSeria
        }
        if(values.nationIdNumber){
            artist.listPersonalInfo[0].nationIdNumber = values.nationIdNumber
        }
        if(values.country){
            artist.listPersonalInfo[0].country = values.country.value
        }
        if(values.addr){
            artist.listPersonalInfo[0].addr = values.addr
        }
        if(values.billingAddr){
            artist.listPersonalInfo[0].billingAddr = values.billingAddr
        }
        if(values.infoUrl){
            artist.listPersonalInfo[0].infoUrl = values.infoUrl
        }
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileArtistPersonalInfo);

