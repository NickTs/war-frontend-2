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
import {stdDialog} from '../styles/ThemeDefault'
import ButtonBorderPrimary from "./ButtonBorderPrimary";
import SwipeableViews from "react-swipeable-views";
import MobileStepper from '@material-ui/core/MobileStepper';
import {autoPlay} from 'react-swipeable-views-utils';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import DropzoneWithPreview from "./DropzoneWithPreview";


class UploadImageDialog extends React.Component {
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
            let goCancelCallback = dlgData.goCancel
            goCancel(lang)
            if(goCancelCallback){
                goCancelCallback()
            }
        }
    }

    handleSubmit = (uploadFile) => {
        const {lang, dlgData, goSubmit} = this.props
        if (dlgData && dlgData.show) {
            let goSubmitCallback = dlgData.goSubmit
            goSubmit(lang)
            if(goSubmitCallback){
                goSubmitCallback(uploadFile)
            }
        }
    }

    componentDidMount() {
    }

    render() {
        const {classes, lang, intl, dlgData, goError} = this.props;
        console.log("renderUpload", dlgData)
        if (dlgData && dlgData.show) {
            return (
                <Dialog onClose={this.handleClose} open={true}>
                    <DialogTitle disableTypography className={classes.titleRoot}>
                        <Typography
                            className={classes.titleLabel}>{intl.formatMessage({id: 'UploadImageDialog.title'})}</Typography>
                        <IconButton className={classes.titleCloseButton} onClick={this.handleClose}>
                            <CloseIcon/>
                        </IconButton>
                    </DialogTitle>
                    <DialogContent className={classes.contentRoot}>
                        <div className={classes.info}>
                            <div>
                                <DropzoneWithPreview goCancel={this.handleClose} goSubmit={this.handleSubmit} goError={goError}/>
                            </div>
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


export default injectIntl(withStyles(stdDialog)(UploadImageDialog));