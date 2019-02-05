import React from 'react'
import TopBarPrivateFunc from '../containers/TopBarPrivateFunc'
import {withStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import {injectIntl} from "react-intl"
import {GetElementById} from "../Utils";
import {pageDefault} from "../styles/ThemeDefault";
import BottomBarPrivate from "./BottomBarPrivate";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import axiosBackendApi from "../axios/axiosBackendApi";
import ProfilePictureGeneralFunc from "../containers/ProfilePictureGeneralFunc";
import ProfilePictureImagesFunc from "../containers/ProfilePictureImagesFunc";
import IconButton from '@material-ui/core/IconButton';
import BackIcon from '@material-ui/icons/Reply';


const getSteps = (intl) => {
    return [
        {
            "key": "general",
            "label": intl.formatMessage({id: 'ProfilePicture.general.label'}),
            "stepNum": 0
        },
        {
            "key": "images",
            "label": intl.formatMessage({id: 'ProfilePicture.images.label'}),
            "stepNum": 1
        },
        {
            "key": "prevOwners",
            "label": intl.formatMessage({id: 'ProfilePicture.prevOwners.label'}),
            "stepNum": 2
        },
        {
            "key": "references",
            "label": intl.formatMessage({id: 'ProfilePicture.references.label'}),
            "stepNum": 3
        },
        {
            "key": "attachments",
            "label": intl.formatMessage({id: 'ProfilePicture.attachments.label'}),
            "stepNum": 4
        },
        {
            "key": "permissions",
            "label": intl.formatMessage({id: 'ProfilePicture.permissions.label'}),
            "stepNum": 5
        }
    ]
}

class PanelInfo extends React.Component {
    render() {
        const {stepNum} = this.props;
        switch (stepNum) {
            case 1:
                return (
                    <div>
                        <ProfilePictureImagesFunc/>
                    </div>
                )
            default:
                return (
                    <ProfilePictureGeneralFunc/>
                )
        }
    }
}

class ProfilePicture extends React.Component {
    state = {
        activeStep: 0
    }

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    handleShowStep = (newActiveStep) => {
        const {classes, intl, lang, session, user, goPictureRefresh, dbValues} = this.props;
        axiosBackendApi.get('catalog/' + dbValues.listValue[0].id + '?owner=1', null, {
            headers: {
                "x-lang": lang,
                "Authorization": "Bearer " + session.jwt,
                "X-ResponseFull": "true"
            }
        })
            .then(result => {
                goPictureRefresh(result.data)
                this.setState(state => ({
                    activeStep: newActiveStep,
                }))
            })
            .catch((error) => {
                console.log('error=', error)
            })
    };

    componentDidMount() {
        const {goRegister2, lang} = this.props;
    }

    render() {
        const {classes, intl, lang, dbValues} = this.props;
        const steps = getSteps(intl);
        const {activeStep} = this.state;
        if (!dbValues) {
            return (
                <div className={classes.root}>
                    <TopBarPrivateFunc visibleHome={true} lang={lang}/>
                    <div style={{width: 20, height: 20}}></div>
                    <BottomBarPrivate lang={lang}/>
                </div>
            )
        }
        const dbValue = dbValues.listValue[0]
        const dbPicture = dbValues.listPicture[0]
        return (
            <div className={classes.root}>
                <TopBarPrivateFunc visibleHome={true} lang={lang}/>
                <div style={{width: '100%', margin: 0, backgroundColor: '#F7F7F7'}}>
                    <Typography variant="h4" className={classes.title}
                                style={{marginLeft: 30, paddingTop: 20, marginBottom: 10, paddingLeft: 10}}>
                        <IconButton onClick={() => this.props.goBack(lang, dbValues)}>
                            <BackIcon style={{fontSize: 45, color: '#000000'}} />
                        </IconButton>&nbsp;
                        {GetElementById(dbValues.listValue, dbPicture.valueId).info[0].name}
                    </Typography>
                    <div style={{minHeight: 600, width: '95%'}}>
                        <table>
                            <tbody>
                            <tr>
                                <td style={{
                                    width: '10%',
                                    marginLeft: 10,
                                    marginRight: 30,
                                    verticalAlign: 'top',
                                    paddingLeft: 40,
                                    paddingRight: 20
                                }}>
                                    <table>
                                        <tbody>
                                        {steps.map((stepData, index) => {
                                            if (stepData.stepNum == activeStep) {
                                                return (
                                                    <tr key={index}>
                                                        <td>
                                                            <Button style={{
                                                                whiteSpace: "nowrap",
                                                                textTransform: 'none',
                                                                fontWeight: 'bold',
                                                                fontSize: '18px'
                                                            }} onClick={() => this.handleShowStep(stepData.stepNum)}>
                                                                <Icon>
                                                                    <img src="/static/menusel.png" alt="" width="4"
                                                                         height="30"/>
                                                                </Icon>
                                                                {stepData.label}</Button>
                                                        </td>
                                                    </tr>
                                                )
                                            } else {
                                                return (
                                                    <tr key={index}>
                                                        <td>
                                                            <Button style={{
                                                                whiteSpace: "nowrap",
                                                                textTransform: 'none',
                                                                fontSize: '18px'
                                                            }}
                                                                    onClick={() => this.handleShowStep(stepData.stepNum)}>{stepData.label}</Button>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        })}
                                        </tbody>
                                    </table>
                                </td>
                                <td style={{width: '90%', verticalAlign: 'top'}}>
                                    <PanelInfo stepNum={activeStep}/>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div style={{width: 20, height: 20}}></div>
                </div>
                <BottomBarPrivate lang={lang}/>
            </div>
        );
    }
}

ProfilePicture.propTypes = {
    classes: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired
};

export default injectIntl(withStyles(pageDefault)(ProfilePicture));