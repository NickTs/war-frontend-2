import React from 'react'
import TopBarPrivateFunc from '../containers/TopBarPrivateFunc'
import {withStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import {injectIntl} from "react-intl"
import {GetRequestParam} from "../Utils";
import {pageDefault} from "../styles/ThemeDefault";
import BottomBarPrivate from "./BottomBarPrivate";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import ProfileArtistGeneralFunc from "../containers/ProfileArtistGeneralFunc";
import axiosBackendApi from "../axios/axiosBackendApi";
import {profileRefresh} from "../actions/ProfileRefresh";
import ProfileArtistFunc from "../containers/ProfileArtistFunc";
import ProfileArtistPersonalInfoFunc from "../containers/ProfileArtistPersonalInfoFunc";
import ProfileArtistScansFunc from "../containers/ProfileArtistScansFunc";



const getSteps = (intl) => {
    return [
        {
            "key": "general",
            "label": intl.formatMessage({id: 'ProfileArtist.general.label'}),
            "stepNum": 0
        },
        {
            "key": "personalInfo",
            "label": intl.formatMessage({id: 'ProfileArtist.personalInfo.label'}),
            "stepNum": 1
        },
        {
            "key": "scans",
            "label": intl.formatMessage({id: 'ProfileArtist.scans.label'}),
            "stepNum": 2
        }
    ]
}

class PanelInfo extends React.Component {
    render() {
        const {stepNum} = this.props;
        switch(stepNum){
            case 1:
                return (
                    <ProfileArtistPersonalInfoFunc/>
                )
            case 2:
                return (
                    <div>
                        <ProfileArtistScansFunc/>
                    </div>
                )
            default:
                return (
                    <ProfileArtistGeneralFunc/>
                )
        }
    }
}

class ProfileArtist extends React.Component {
    state = {
        activeStep: 0
    }

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    handleShowStep = (newActiveStep) => {
        const {classes, intl, lang, session, user, goProfileRefresh} = this.props;
        axiosBackendApi.get('users/'+user.id+'/artists', {
            headers: {
                "x-lang": lang,
                "Authorization": "Bearer "+session.jwt,
                "X-ResponseFull": "true"
            }
        })
            .then(result => {
                goProfileRefresh(result.data)
                this.setState(state => ({
                    activeStep: newActiveStep,
                }))
            })
            .catch((error) => {
                console.log('error=',error)
                if (error.response && error.response.data && error.response.data.errorCode==2) {
                    this.setState(state => ({
                        activeStep: newActiveStep,
                    }))
                }
            })
    };

    componentDidMount() {
        const {goRegister2, lang} = this.props;
    }

    render() {
        const {classes, intl, lang} = this.props;
        const steps = getSteps(intl);
        const {activeStep} = this.state;
        return (
            <div className={classes.root}>
                <TopBarPrivateFunc visibleHome={true} lang={lang}/>
                <div style={{width: '100%', margin: 0, backgroundColor: '#F7F7F7'}}>
                <Typography variant="h4" className={classes.title} style={{marginLeft:30, paddingTop: 20, marginBottom: 10, paddingLeft: 40}}>
                    {intl.formatMessage({id: 'ProfileArtist.title'})}
                </Typography>
                <div style={{minHeight:600, width: '95%'}}>
                <table><tbody><tr>
                    <td style={{width: '10%',marginLeft: 10, marginRight:30, verticalAlign: 'top', paddingLeft: 40, paddingRight: 20}}>
                        <table><tbody>
                            {steps.map((stepData,index) => {
                                if(stepData.stepNum==activeStep){
                                    return (
                                        <tr key={index}><td>
                                            <Button style={{whiteSpace: "nowrap", textTransform: 'none', fontWeight: 'bold', fontSize: '18px'}} onClick={()=>this.handleShowStep(stepData.stepNum)}>
                                                <Icon>
                                                <img src="/static/menusel.png" alt="" width="4" height="30" />
                                            </Icon>
                                                {stepData.label}</Button>
                                        </td></tr>
                                    )
                                } else {
                                    return (
                                        <tr key={index}><td>
                                            <Button style={{whiteSpace: "nowrap", textTransform: 'none', fontSize: '18px'}} onClick={()=>this.handleShowStep(stepData.stepNum)}>{stepData.label}</Button>
                                        </td></tr>
                                    )
                                }
                            })}
                        </tbody></table>
                    </td>
                    <td style={{width: '90%', verticalAlign: 'top'}}>
                        <PanelInfo stepNum={activeStep}/>
                    </td>
                </tr></tbody></table>
                    </div>
                <div style={{width:20,height:20}}></div>
                    </div>
                <BottomBarPrivate lang={lang}/>
            </div>
        );
    }
}

ProfileArtist.propTypes = {
    classes: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired
};

export default injectIntl(withStyles(pageDefault)(ProfileArtist));