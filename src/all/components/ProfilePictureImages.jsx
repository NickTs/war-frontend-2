import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import {injectIntl} from "react-intl"
import {profileGeneral} from "../styles/ThemeDefault";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import PanelUploadAction from "./PanelUploadAction";
import {backendBaseURL} from "../Utils";


class PanelFile extends React.Component {
    state = {
        expansionPanelOpen: false,
        editNewValue: ""
    }

    handleReset = () => {
        this.setState({
            expansionPanelOpen: false,
            disabledSave: true,
        });
    };
    handleEditCancel = () => {
        this.setState({
            expansionPanelOpen: false,
            disabledSave: true,
        });
    }
    handleEditUploadCancel = () => {
    }
    handleEditUploadSubmit = (uploadFile) => {
        const {dbValues, scanType} = this.props
        const dbValue = dbValues.listValue[0]
        const dbPicture = dbValues.listPicture[0]
        let uploadValue = {
            value: {
                id: dbValue.id,
                vt: dbValue.vt
            },
            picture: {
                id: dbPicture.id,
                valueId:dbPicture.valueId,
                attachments: dbPicture.attachments
            }
        }

        const fileMedia = {
            attachType: scanType,
            href: backendBaseURL + "/files/" + uploadFile.id
        }

        if(uploadValue.picture.attachments){
            let objAdd = true
            for(let i=0;i<uploadValue.picture.attachments.length;i++){
                if(uploadValue.picture.attachments[i].attachType==fileMedia.attachType){
                    uploadValue.picture.attachments[i] = fileMedia
                    objAdd = false
                    break
                }
            }
            if(objAdd) uploadValue.picture.attachments.push(fileMedia)
        } else {
            uploadValue.picture.attachments = [fileMedia]
        }
        this.props.goUploadImageOk(this.props.lang, this.props.session, uploadValue, "attachments")
    }
    handleEditUpload = () => {
        this.props.goUploadImage(this.props.lang, this.handleEditUploadCancel, this.handleEditUploadSubmit)
    }
    getProfileFileId = () => {
        const {dbValues, scanType} = this.props
        if (dbValues && dbValues.listPicture[0].attachments && dbValues.listPicture[0].attachments.length>0) {
            if (scanType == "imgFront") {
                return dbValues.listPicture[0].attachments[0]
            } else if (scanType == "imgBack") {
                for(let i=0;i<dbValues.listPicture[0].attachments.length;i++){
                    if(dbValues.listPicture[0].attachments[i].attachType && dbValues.listPicture[0].attachments[i].attachType=='imgBack'){
                        return dbValues.listPicture[0].attachments[i]
                    }
                }
            }
        }
        return undefined
    }
    getSummaryValue = () => {
        const {intl} = this.props
        let fileMedia = this.getProfileFileId()
        if (fileMedia) {
            return (
                <a href={fileMedia.href} target="_blank">
                    {intl.formatMessage({id: 'FileMedia.notEmpty'})}
                </a>
            )
        } else {
            return intl.formatMessage({id: 'FileMedia.empty'})
        }
    }

    getDetailValue = () => {
        let fileMedia = this.getProfileFileId()
        if (fileMedia) {
            return (
                <div><a href={fileMedia.href} target="_blank"><img src={fileMedia.href+'?imgsize=1000'}
                                                                   style={{height: 400, width: 'auto'}}/></a></div>
            )
        } else {
            return (
                <div/>
            )
        }
    }

    render() {
        const {classes, intl, user, profile, scanType} = this.props;
        return (
            <ExpansionPanel expanded={this.state.expansionPanelOpen} style={{marginBottom: 10}}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon onClick={() => {
                    this.setState({
                        expansionPanelOpen: !this.state.expansionPanelOpen
                    });
                }}/>}>
                    <table><tbody><tr>
                        <td className={classes.fieldSummaryName} style={{width: 300}}>
                            <b>{intl.formatMessage({id: 'ProfilePictureImages.' + scanType + '.label'})}:</b>
                        </td>
                        <td className={classes.fieldSummaryValue}>
                            {this.getSummaryValue()}
                        </td>
                    </tr></tbody></table>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.fieldDetails}>
                    {this.getDetailValue()}
                </ExpansionPanelDetails>
                <Divider/>
                <PanelUploadAction disabledSave={false} goCancel={this.handleEditCancel}
                                   goUpload={this.handleEditUpload}/>
            </ExpansionPanel>
        )
    }
}

class ProfilePictureImages extends React.Component {
    componentDidMount() {
        const {lang} = this.props;
    }

    render() {
        const {classes, intl, lang, user, profile} = this.props;
        return (
            <div className={classes.root} style={{marginTop: 10}}>
                <PanelFile scanType="imgFront" {...this.props}/>
                <PanelFile scanType="imgBack" {...this.props}/>
            </div>
        );
    }
}

ProfilePictureImages.propTypes = {
    classes: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired
};

export default injectIntl(withStyles(profileGeneral)(ProfilePictureImages));
