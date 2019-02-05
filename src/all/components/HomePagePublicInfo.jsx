import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import {autoPlay} from 'react-swipeable-views-utils';
import {homePagePublicInfo} from '../styles/ThemeDefault'
import {injectIntl} from "react-intl";
import ButtonBorderPrimary from "./ButtonBorderPrimary";




const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
    {
        label: 'step1',
        imgPath:
            '/static/home_slider_1.jpg',
    },
    {
        label: 'step2',
        imgPath:
            '/static/home_slider_2.jpg',
    },
    {
        label: 'step3',
        imgPath:
            '/static/home_slider_3.jpg',
    },
];

const showStep = (classes, intl, lang, step, index, activeStep, goInfoMore) => {
    if (Math.abs(activeStep - index) <= 2) {
        return (
            <div key={step.label} className={classes.divParent}>
                <img className={classes.img} src={step.imgPath} alt={step.label}/>
                <div className={classes.block}>
                    <div>
                        <div className={classes.spanTitle}>
                            {intl.formatMessage({id: 'HomePagePublicInfo.' + step.label + '.title'})}
                        </div>
                    </div>
                    <div style={{paddingTop: '10px', paddingBottom: '10px', textAlign: 'center'}}>
                        {intl.formatMessage({id: 'HomePagePublicInfo.' + step.label + '.text'})}
                    </div>
                    <div>
                        <div style={{
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            marginBottom: '-50px',
                            width: '50%,',
                            textAlign: 'center'
                        }}>
                            <ButtonBorderPrimary className={classes.btnMore} onClick={() => goInfoMore(lang,step.label)}>
                                {intl.formatMessage({id: 'HomePagePublicInfo.' + step.label + '.btn'})}
                            </ButtonBorderPrimary>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div key={step.label} className={classes.divParent}/>
        )
    }
}


class HomePagePublicInfo extends React.Component {
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

    render() {
        const {classes, lang, intl, goInfoMore} = this.props;
        const {activeStep} = this.state;
        const maxSteps = tutorialSteps.length;

        return (
            <div className={classes.root}>
                <AutoPlaySwipeableViews
                    axis={'x'}
                    index={activeStep}
                    onChangeIndex={this.handleStepChange}
                    enableMouseEvents
                    interval={10000}
                >
                    {tutorialSteps.map((step, index) => (
                        showStep(classes, intl, lang, step, index, activeStep, goInfoMore)
                    ))}
                </AutoPlaySwipeableViews>
                <MobileStepper
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    className={classes.mobileStepper}
                    nextButton={
                        <Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
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
        );
    }
}

HomePagePublicInfo.propTypes = {
    classes: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired,
};

export default injectIntl(withStyles(homePagePublicInfo)(HomePagePublicInfo));