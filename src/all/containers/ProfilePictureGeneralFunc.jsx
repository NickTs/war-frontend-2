import React from 'react'
import {connect} from 'react-redux'
import {push} from "connected-react-router";
import {alertInfo} from "../actions/AlertInfo";
import {pictureUpdate} from "../actions/PictureUpdate";
import ProfilePictureGeneral from "../components/ProfilePictureGeneral";

const mapStateToProps = (state) => ({
    lang: state.LangDomain.get("lang"),
    user: state.UserDomain.get("user"),
    profile: state.UserDomain.get("profile"),
    session: state.UserDomain.get("session"),
    dbValues: state.ValueDomain.get("dbValues"),
})

const mapDispatchToProps = (dispatch) => ({
    goHome: (lang) => dispatch(push("/private/"+lang)),
    goTrap: (lang, msg) => dispatch(alertInfo("Заглушка", msg, true)),
    goSubmitCreate: (values, cardLang, lang, user, profile, session, dbValues) => {
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
    goSubmitUpdate: (values, cardLang, lang, user, profile, session, dbValues, cardDimensionMetric) => {
        let updateValue = {}
        const dbValue = dbValues.listValue[0]
        const dbPicture = dbValues.listPicture[0]
        updateValue.value = {
            id: dbValue.id,
            vt: dbValue.vt,
            info: [{
                l: cardLang,
                name: values.name
            }]
        }
        updateValue.picture = {
            id: dbPicture.id,
            valueId: dbPicture.valueId,
            info: [{
                l: cardLang
            }]
        }
        if(values.author){
            updateValue.picture.info[0].author = values.author
        }
        if(values.creationTech){
            updateValue.picture.info[0].creationTech = values.creationTech.label
        }
        if(values.description){
            updateValue.picture.info[0].description = values.description
        }
        if(values.concept){
            updateValue.picture.info[0].concept = values.concept
        }
        if(values.resume){
            updateValue.picture.info[0].resume = values.resume
        }
        if(values.dateCreate){
            updateValue.picture.dateCreate = values.dateCreate
        }
        if(values.count){
            updateValue.picture.count = values.count
        }
        if(values.dimensionW || values.dimensionH){
            updateValue.picture.dimension = [{
                metric: cardDimensionMetric
            }]
            if(values.dimensionW){
                updateValue.picture.dimension[0].w = values.dimensionW
            }
            if(values.dimensionH){
                updateValue.picture.dimension[0].h = values.dimensionH
            }
        }
        dispatch(pictureUpdate(updateValue, lang, session, "generalInfo"))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePictureGeneral);

