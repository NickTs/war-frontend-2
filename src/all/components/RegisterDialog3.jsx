import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {injectIntl} from "react-intl";
import {registerDialog3} from '../styles/ThemeDefault'
import {change} from 'redux-form'
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import RegisterTerms from "./RegisterTerms";
import RegisterPassword from "./RegisterPassword";
import {GetRequestParam} from "../Utils";
import RegisterKeys from "./RegisterKeys";


const getSteps = (intl) => {
    return [
        {
            "key": "terms",
            "label": intl.formatMessage({id: 'RegisterDialog3.terms.label'})
        },
        {
            "key": "keys",
            "label": intl.formatMessage({id: 'RegisterDialog3.keys.label'})
        },
        {
            "key": "password",
            "label": intl.formatMessage({id: 'RegisterDialog3.password.label'})
        }
    ]
}

const showTerms = (lang, goCancel, goSubmit) => {
    return (
        <RegisterTerms lang={lang} goCancel={goCancel} goSubmit={goSubmit}/>
    )
}

const showKeys = (lang, goCancel, goSubmit) => {
    return (
        <RegisterKeys lang={lang} goCancel={goCancel} goSubmit={goSubmit}/>
    )
}

const showPassword = (lang, goCancel, goSubmit) => {
    return (
        <RegisterPassword lang={lang} goCancel={goCancel} goSubmit={goSubmit}/>
    )
}

const showStep = (activeStep, lang, goHome, handleBack, handleNext) => {
    switch (activeStep) {
        case 2:
            return showPassword(lang, handleBack, handleNext);
        case 1:
            return showKeys(lang, handleBack, handleNext);
        default:
            return showTerms(lang, goHome, handleNext);
    }
}


class RegisterDialog3 extends React.Component {
    state = {
        activeStep: 0,
        userKeyPublic: "",
        userKeyPrivate: "",
        userPassword: ""
    }


    handleClose = () => {
        const {lang, dlgData, goCancel} = this.props
        if (dlgData && dlgData.show) {
            goCancel(lang)
        }
    }
    handleNext = (values) => {
        switch (this.state.activeStep) {
            case 2:
                this.setState(state => ({
                    userPassword: values.password
                }))
                const valuesData = {
                    userId: this.props.user.id,
                    alg: "BASE64",
                    salt: "dhuH357fs12",
                    psw: values.password,
                    lang: this.props.lang,
                    tkn: this.props.dlgData.tkn
                }
                this.props.submitUserSignUp(valuesData)
                break
            case 1:
                this.setState(state => ({
                    activeStep: state.activeStep + 1,
                }))
                break
            default:
                this.setState(state => ({
                    activeStep: state.activeStep + 1,
                }))
                break
        }
    };
    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };
    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    componentDidMount() {
        const {lang} = this.props;
    }


    render() {
        const {classes, lang, intl, dlgData, user} = this.props;
        if (dlgData && dlgData.show) {
            const steps = getSteps(intl);
            const {activeStep} = this.state;
            return (
                <Dialog onClose={this.handleClose} open={true} maxWidth={false}>
                    <DialogTitle disableTypography className={classes.titleRoot}>
                        <Typography
                            className={classes.titleLabel}>{intl.formatMessage({id: 'RegisterDialog3.title'})}</Typography>
                        <IconButton className={classes.titleCloseButton} onClick={this.handleClose}>
                            <CloseIcon/>
                        </IconButton>
                    </DialogTitle>
                    <DialogContent className={classes.contentRoot} style={{width: 1000}}>
                        <div className={classes.info}>
                            <table className={classes.infoTable}>
                                <tbody>
                                <tr>
                                    <td style={{verticalAlign: "top", border: "1px solid #cbcbcb"}}>
                                        <div>
                                            <br/>
                                            <div style={{width:'100%', textAlign: 'center'}}>
                                                <img className={classes.img}
                                                     src={'/static/' + user.userType + '.png'}/>
                                            </div>
                                            <br/><br/>
                                            <Stepper activeStep={activeStep} orientation="vertical">
                                                {steps.map(stepData => {
                                                    return (
                                                        <Step key={stepData.key}>
                                                            <StepLabel
                                                                style={{whiteSpace: "nowrap"}}>{stepData.label}</StepLabel>
                                                        </Step>
                                                    );
                                                })}
                                            </Stepper>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                                        </div>
                                    </td>
                                    <td style={{width: "100%"}}>
                                        <div>
                                            {showStep(activeStep, lang, () => goHome(lang), this.handleBack, this.handleNext)}
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <p>&nbsp;&nbsp;&nbsp;</p>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </DialogContent>

                </Dialog>
            )
        } else {
            return (
                <Dialog onClose={this.handleClose} open={false}>
                    <div/>
                </Dialog>
            )
        }
    }
}


export default injectIntl(withStyles(registerDialog3)(RegisterDialog3));