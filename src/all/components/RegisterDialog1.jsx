import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {FormattedHTMLMessage, injectIntl} from "react-intl";
import {registerDialog1} from '../styles/ThemeDefault'
import ButtonBorderPrimary from "./ButtonBorderPrimary";
import SwipeableViews from "react-swipeable-views";
import MobileStepper from '@material-ui/core/MobileStepper';
import {autoPlay} from 'react-swipeable-views-utils';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const userTypeSteps = [
    {
        label: 'step1',
        userType: 'artist',
        imgPath:
            '/static/artist.png',
        disabled: false,
    },
    {
        label: 'step2',
        userType: 'collector',
        imgPath:
            '/static/collector.png',
        disabled: false,
    },
    {
        label: 'step3',
        userType: 'gallery',
        imgPath:
            '/static/gallery.png',
        disabled: false,
    },
    {
        label: 'step4',
        userType: 'museum',
        imgPath:
            '/static/museum.png',
        disabled: false,
    },
];

const showStep = (classes, intl, lang, step, index, activeStep, goSubmit) => {
    if (Math.abs(activeStep - index) <= 2) {
        return (
            <div key={step.label} className={classes.divParent}>
                <table style={{width:'100%'}}>
                    <tbody>
                    <tr>
                        <td align='center'>
                            <img className={classes.img} src={step.imgPath} alt={step.label}/>
                        </td>
                    </tr>
                    <tr>
                        <td style={{textAlign: 'center'}}>
                            <div>
                                <br/>
                                <FormattedHTMLMessage id={'RegisterDialog1.' + step.userType + '.info'}/>
                                <br/><br/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td align='center'>
                            <ButtonBorderPrimary className={classes.btnMore} disabled={step.disabled}
                                                 onClick={() => goSubmit(lang, step.userType)}>
                                {intl.formatMessage({id: 'RegisterDialog1.' + step.userType + '.btn'})}
                            </ButtonBorderPrimary>
                            <br/><br/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    } else {
        return (
            <div key={step.label} className={classes.divParent}/>
        )
    }
}

class RegisterDialog1 extends React.Component {
    state = {
        activeStep: 0,
    };

    handleNext = () => {
        this.setState(prevState => ({
            activeStep: prevState.activeStep + 1,
        }));
    };

    handleBack = () => {
        this.setState(prevState => ({
            activeStep: prevState.activeStep - 1,
        }));
    };

    handleStepChange = activeStep => {
        this.setState({activeStep});
    };
    handleClose = () => {
        const {lang, dlgData, goCancel} = this.props
        if (dlgData && dlgData.show) {
            goCancel(lang)
        }
    }

    componentDidMount() {
    }

    render() {
        const {classes, lang, intl, dlgData, goSubmit} = this.props;
        const {activeStep} = this.state;
        const maxSteps = userTypeSteps.length;
        if (dlgData && dlgData.show) {
            return (
                <Dialog onClose={this.handleClose} open={true}>
                    <DialogTitle disableTypography className={classes.titleRoot}>
                        <Typography
                            className={classes.titleLabel}>{intl.formatMessage({id: 'RegisterDialog1.title'})}</Typography>
                        <IconButton className={classes.titleCloseButton} onClick={this.handleClose}>
                            <CloseIcon/>
                        </IconButton>
                    </DialogTitle>
                    <DialogContent className={classes.contentRoot} style={{width: 400}}>
                        <div className={classes.info}>
                            <AutoPlaySwipeableViews
                                axis={'x'}
                                index={activeStep}
                                onChangeIndex={this.handleStepChange}
                                enableMouseEvents
                                interval={20000}
                            >
                                {userTypeSteps.map((step, index) => (
                                    showStep(classes, intl, lang, step, index, activeStep, goSubmit)
                                ))}
                            </AutoPlaySwipeableViews>
                            <MobileStepper
                                steps={maxSteps}
                                position="static"
                                activeStep={activeStep}
                                className={classes.mobileStepper}
                                nextButton={
                                    <Button size="small" onClick={this.handleNext}
                                            disabled={activeStep === maxSteps - 1}>
                                        {intl.formatMessage({id: 'Slider.next.btn'})}
                                        <KeyboardArrowRight/>
                                    </Button>
                                }
                                backButton={
                                    <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
                                        <KeyboardArrowLeft/>
                                        {intl.formatMessage({id: 'Slider.back.btn'})}
                                    </Button>
                                }
                            />
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


export default injectIntl(withStyles(registerDialog1)(RegisterDialog1));