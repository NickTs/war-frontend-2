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
        const {profile, scanType} = this.props
        const fileMedia = {
            href: backendBaseURL + "/files/" + uploadFile.id
        }
        const profileNew = {
            id: this.props.profile.id,
        }
        if (scanType == "scanNationalId") {
            profileNew.scanNationalId = fileMedia;
        } else if (scanType == "scanBill") {
            profileNew.scanBill = fileMedia;

        } else if (scanType == "scanPhoto") {
            profileNew.scanPhoto = fileMedia;
        }
        this.props.goUploadImageOk(this.props.lang, this.props.session, profileNew, scanType)
    }
    handleEditUpload = () => {
        this.props.goUploadImage(this.props.lang, this.handleEditUploadCancel, this.handleEditUploadSubmit)
    }
    getProfileFileId = () => {
        const {profile, scanType} = this.props
        if (profile) {
            if (scanType == "scanNationalId") {
                return profile.scanNationalId
            } else if (scanType == "scanBill") {
                return profile.scanBill

            } else if (scanType == "scanPhoto") {
                return profile.scanPhoto
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
                <div><a href={fileMedia.href} target="_blank"><img src={fileMedia.href}
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
            <ExpansionPanel expanded={this.state.expansionPanelOpen}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon onClick={() => {
                    this.setState({
                        expansionPanelOpen: !this.state.expansionPanelOpen
                    });
                }}/>}>
                    <table><tbody><tr>
                        <td className={classes.fieldSummaryName} style={{width: 300}}>
                            <b>{intl.formatMessage({id: 'ProfileArtistScans.' + scanType + '.label'})}:</b>
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

class ProfileArtistScans extends React.Component {
    componentDidMount() {
        const {lang} = this.props;
    }

    render() {
        const {classes, intl, lang, user, profile} = this.props;
        return (
            <div className={classes.root}>
                <PanelFile scanType="scanPhoto" {...this.props}/>
                <PanelFile scanType="scanNationalId" {...this.props}/>
                <PanelFile scanType="scanBill" {...this.props}/>
            </div>
        );
    }
}

ProfileArtistScans.propTypes = {
    classes: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired
};

export default injectIntl(withStyles(profileGeneral)(ProfileArtistScans));
