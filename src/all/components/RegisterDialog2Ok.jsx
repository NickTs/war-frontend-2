import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {FormattedHTMLMessage, injectIntl} from "react-intl";
import {registerDialog2Ok} from '../styles/ThemeDefault'
import ButtonBorderPrimary from "./ButtonBorderPrimary";


class RegisterDialog2Ok extends React.Component {
    handleClose = () => {
        const {lang, dlgData, goCancel} = this.props
        if (dlgData && dlgData.show) {
            goCancel(lang)
        }
    }

    componentDidMount() {
    }

    render() {
        const {classes, lang, intl, dlgData, goCancel} = this.props;
        if (dlgData && dlgData.show) {
            const values = {
                email: dlgData.userData.email
            }
            console.log('dlgData', dlgData)
            return (
                <Dialog onClose={this.handleClose} open={true} maxWidth={false}>
                    <DialogTitle disableTypography className={classes.titleRoot}>
                        <Typography
                            className={classes.titleLabel}>{intl.formatMessage({id: 'RegisterDialog2Ok.title'})}</Typography>
                        <IconButton className={classes.titleCloseButton} onClick={this.handleClose}>
                            <CloseIcon/>
                        </IconButton>
                    </DialogTitle>
                    <DialogContent className={classes.contentRoot}>
                        <div className={classes.info}>
                            <div className={classes.infoCenter} style={{textAlign:'center'}}>
                                <div>
                                    <img className={classes.img}
                                         src={'/static/' + dlgData.userData.userType + '.png'}/>
                                </div>
                                <Typography variant="h6" color="inherit" className={classes.subtitle}>
                                    <br/>
                                    <FormattedHTMLMessage id="RegisterDialog2Ok.subtitle"
                                                          values={values}/>
                                    <br/><br/>
                                </Typography>
                                <div className={classes.infoBtnPanel}>
                                    <ButtonBorderPrimary className={classes.btnMore}
                                                         onClick={() => goCancel(lang)}>
                                        {intl.formatMessage({id: 'RegisterDialog2Ok.ok.label'})}
                                    </ButtonBorderPrimary>
                                </div>
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

export default injectIntl(withStyles(registerDialog2Ok)(RegisterDialog2Ok));