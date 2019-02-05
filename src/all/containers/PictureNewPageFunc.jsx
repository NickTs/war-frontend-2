import React from 'react'
import {connect} from 'react-redux'
import PictureNewPage from '../components/PictureNewPage'
import {alertInfo} from "../actions/AlertInfo"
import {push} from "connected-react-router";
import {profileRefresh} from "../actions/ProfileRefresh";
import {dlgUploadImageDialog} from "../actions/DlgUploadImageDialog";
import {pictureCreate} from "../actions/PictureCreate";

const mapStateToProps = (state) => ({
    lang: state.LangDomain.get("lang"),
    session: state.UserDomain.get("session"),
    user: state.UserDomain.get("user"),
    profile: state.UserDomain.get("profile"),
})

const mapDispatchToProps = (dispatch) => ({
    goHome: (lang) => dispatch(push("/private/"+lang)),
    goProfileRefresh: (profile) => dispatch(profileRefresh(profile)),
    goUploadImage: (lang, goCancel, goSubmit) => {
        dispatch(dlgUploadImageDialog(true, goCancel, goSubmit))
    },
    goSubmitCreate: (values, cardLang, cardDimensionMetric, lang, user, profile, session) => {
        let value = {
            vt: "pict",
            info: [{
                l: cardLang
            }]
        }
        value.info[0].name = values.name
        let picture = {
            info: [{
                l: cardLang
            }]
        }
        picture.info[0].author = values.author
        if(values.creationTech){
            picture.info[0].creationTech = values.creationTech.label
        }
        if(values.description){
            picture.info[0].description = values.description
        }
        if(values.concept){
            picture.info[0].concept = values.concept
        }
        if(values.resume){
            picture.info[0].resume = values.resume
        }
        if(values.dateCreate){
            picture.dateCreate = values.dateCreate
        }
        if(values.count){
            picture.count = values.count
        }
        if(values.dimensionW || values.dimensionH){
            picture.dimension = [{
                metric: cardDimensionMetric
            }]
            if(values.dimensionW){
                picture.dimension[0].w = values.dimensionW
            }
            if(values.dimensionH){
                picture.dimension[0].h = values.dimensionH
            }
        }
        if(values.imgFront || values.imgBack){
            picture.attachments = []
            if(values.imgFront){
                picture.attachments.push(values.imgFront)
            }
            if(values.imgBack){
                picture.attachments.push(values.imgBack)
            }
        }
        dispatch(pictureCreate(value,picture,lang,user,session,true,true,true,false))
    },

})

export default connect(mapStateToProps, mapDispatchToProps)(PictureNewPage);

