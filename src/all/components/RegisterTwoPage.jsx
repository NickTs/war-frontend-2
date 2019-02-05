import React from 'react'
import {withStyles} from "@material-ui/core/styles/index";
import {injectIntl} from 'react-intl'
import TopBarFunc from '../containers/TopBarFunc'
import BottomBar from './BottomBar'
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import RegisterTerms from "./RegisterTerms";
import RegisterPassword from "./RegisterPassword";
import {GetRequestParam} from "../Utils";
import RegisterKeys from "./RegisterKeys";


const styles = theme => ({
    root: {
        backgroundColor: '#fbfbfb',
        width: '100vw',
        height: '100vh',
    },
    title: {
        color: '#6b6b6b',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    subtitle: {
        color: '#6b6b6b',
        textAlign: 'center'
    },
    remark: {
        color: '#6b6b6b',
        textAlign: 'center'
    },
    linkLogin: {
        color: '#6b6b6b'
    },
    info: {
        backgroundColor: '#fbfbfb',
        display: 'flex',
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center"
    },
    infoTable: {
        backgroundColor: '#fbfbfb',
        width: '100vw'
    },
    infoCenter: {
        backgroundColor: '#fbfbfb',
        width: 400
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    paperField: {
        padding: theme.spacing.unit,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
    formControl: {
        margin: theme.spacing.unit,
    },
    grid: {},
    btnForm: {}
});

const getSteps = (intl) => {
    return [
        {
            "key": "terms",
            "label": intl.formatMessage({id: 'RegisterTwoPage.terms.label'})
        },
        {
            "key": "keys",
            "label": intl.formatMessage({id: 'RegisterTwoPage.keys.label'})
        },
        {
            "key": "password",
            "label": intl.formatMessage({id: 'RegisterTwoPage.password.label'})
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

class RegisterTwoPage extends React.Component {
    state = {
        activeStep: 0,
        userKeyPublic: "",
        userKeyPrivate: "",
        userPassword: ""
    }

    handleNext = (values) => {
        switch (this.state.activeStep) {
            case 2:
                this.setState(state => ({
                    userPassword: values.password
                }))
                console.log("user=",this.props.user)
                const valuesData = {
                    userId: this.props.user.id,
                    alg: "BASE64",
                    salt: "dhuH357fs12",
                    psw: values.password,
                    lang: this.props.lang,
                    tkn: GetRequestParam('tkn')
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
        const {classes, intl, lang, goHome} = this.props;
        const steps = getSteps(intl);
        const {activeStep} = this.state;
        return (
            <div className={classes.root}>
                <TopBarFunc visibleHome={false}/>
                <div className={classes.info}>
                    <table className={classes.infoTable}>
                        <tbody>
                        <tr>
                            <td style={{verticalAlign: "top", border: "1px solid #cbcbcb"}}>
                                <div>
                                    <br/><br/><br/>
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
                                <div><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p></div>
                            </td>
                            <td style={{width: "100%"}}>
                                <div>
                                    {showStep(activeStep, lang, () => goHome(lang), this.handleBack, this.handleNext)}
                                </div>
                            </td>
                            <td>
                                <div><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p></div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <BottomBar/>
            </div>
        );
    }
}

export default injectIntl(withStyles(styles)(RegisterTwoPage));