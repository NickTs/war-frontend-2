import React from 'react';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import {withStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {FormattedHTMLMessage, injectIntl} from "react-intl";
import {registerDialog2} from '../styles/ThemeDefault'
import {change, Field, focus, reduxForm, formValueSelector} from 'redux-form'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Grid from '@material-ui/core/Grid'
import ButtonBorderPrimary from "./ButtonBorderPrimary";


const validate = (values, props) => {
    const {intl} = props;
    const errors = {}
    if (!values.email) {
        errors.email = intl.formatMessage({id: 'RegisterDialog2.email.required'})
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = intl.formatMessage({id: 'RegisterDialog2.email.noValid'})
    }
    if (!values.phone) {
        errors.phone = intl.formatMessage({id: 'RegisterDialog2.phone.required'})
    } else if (values.phone.length < 9 || values.phone.replace(/\D+/g, "").length > 15) {
        errors.phone = intl.formatMessage({id: 'RegisterDialog2.phone.noValid'})
    }
    return errors
}

class renderTextField extends React.Component {
    render() {
        const {input, label, meta} = this.props;
        console.log('props=',this.props)
        return (
            <div>
                <FormControl variant="outlined" fullWidth={true}>
                    <InputLabel ref={ref => {
                        this.labelRef = ReactDOM.findDOMNode(ref);
                    }}
                                htmlFor={input.name}
                    >
                        {label}
                    </InputLabel>
                    <OutlinedInput id={input.name}
                                   {...input}
                                   labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                    />
                    <FormHelperText id="component-error-text">{meta.error}</FormHelperText>
                </FormControl>
            </div>)
    }
}


class RegisterDialog2 extends React.Component {
    handleClose = () => {
        const {lang, dlgData, goCancel} = this.props
        if (dlgData && dlgData.show) {
            goCancel(lang)
        }
    }

    componentDidMount() {
        const {lang, dlgData} = this.props;
        this.props.dispatch(change("Register2Form", "lang", lang));
        this.props.dispatch(focus("Register2Form", "email"));
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.dlgData && nextProps.dlgData.userType){
            if(!this.props.dlgData || !this.props.dlgData.userType || nextProps.dlgData.userType!=this.props.dlgData.userType){
                this.props.dispatch(change("Register2Form", "userType", nextProps.dlgData.userType));
            }
        }
    }

    render() {
        const {classes, lang, intl, dlgData, pristine, invalid, submitting, handleSubmit, submitUserCreate} = this.props;
        if (dlgData && dlgData.show) {
            return (
                <Dialog onClose={this.handleClose} open={true}>
                    <DialogTitle disableTypography className={classes.titleRoot}>
                        <Typography
                            className={classes.titleLabel}>{intl.formatMessage({id: 'RegisterDialog2.title'})}</Typography>
                        <IconButton className={classes.titleCloseButton} onClick={this.handleClose}>
                            <CloseIcon/>
                        </IconButton>
                    </DialogTitle>
                    <DialogContent className={classes.contentRoot} style={{width: 400}}>
                        <div className={classes.info}>
                            <div className={classes.infoCenter}>
                                <Grid container className={classes.grid} spacing={0} direction="row">
                                    <form className={classes.container} onSubmit={handleSubmit(submitUserCreate)}>
                                        <Field name="lang" component="input" type="hidden"/>
                                        <Field name="userType2" component="input" type="hidden"/>
                                        <Grid item xs={12} className={classes.paperField}
                                              style={{textAlign: 'center'}}>
                                            <div>
                                                <img className={classes.img}
                                                     src={'/static/' + dlgData.userType + '.png'}/>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} className={classes.paperField}
                                              style={{textAlign: 'center', marginBottom:10}}>
                                            <div style={{textAlign: 'center'}}>
                                                <FormattedHTMLMessage id={'RegisterDialog2.subtitle'}/>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} className={classes.paperField} style={{marginBottom:10}}>
                                            <Field name="email" component={renderTextField}
                                                   label={intl.formatMessage({id: 'RegisterDialog2.email.label'})}/>
                                        </Grid>
                                        <Grid item xs={12} className={classes.paperField}  style={{marginBottom:10}}>
                                            <Field name="phone" component={renderTextField}
                                                   label={intl.formatMessage({id: 'RegisterDialog2.phone.label'})}
                                                   classes={classes}
                                            />
                                        </Grid>
                                        <Grid item xs={12} className={classes.paperField} style={{textAlign: 'center'}}>
                                            <ButtonBorderPrimary type="submit"
                                                                 disabled={invalid || pristine || submitting}
                                                                 >
                                                {intl.formatMessage({id: 'RegisterDialog2.submit'})}
                                            </ButtonBorderPrimary>
                                        </Grid>
                                    </form>
                                </Grid>
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

RegisterDialog2 = reduxForm({
    form: 'Register2Form',
    validate
})(RegisterDialog2)



export default injectIntl(withStyles(registerDialog2)(RegisterDialog2));