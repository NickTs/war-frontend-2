import React from 'react';
import ReactDOM from 'react-dom'
import {Link} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {injectIntl} from "react-intl";
import {loginDialog,stdDialog} from '../styles/ThemeDefault'
import {change, focus, Field, reduxForm} from 'redux-form'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Grid from '@material-ui/core/Grid'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import InputAdornment from '@material-ui/core/InputAdornment';
import {GetRequestParam} from "../Utils";
import ButtonBorderPrimary from "./ButtonBorderPrimary";


const validate = (values, props) => {
    const {intl} = props;
    const errors = {}
    if (!values.login || values.login.length > 64) {
        errors.login = intl.formatMessage({id: 'LoginPage.login.required'})
    }
    if (!values.password) {
        errors.password = intl.formatMessage({id: 'LoginPage.password.required'})
    }
    else if (values.password.length < 8 || values.password.length > 64) {
        errors.password = intl.formatMessage({id: 'LoginPage.password.noValid'})
    }
    return errors
}

const iconShowPassword = (showPassword, handleClickShowPassword) => {
    return (
        <InputAdornment position="end">
            <IconButton onClick={handleClickShowPassword}>
                {showPassword ? <VisibilityOff/> : <Visibility/>}
            </IconButton>
        </InputAdornment>
    )
}


class renderPasswordField extends React.Component {
    state = {
        password: '',
        showPassword: false,
    };

    handleClickShowPassword = () => {
        this.setState(state => ({showPassword: !state.showPassword}));
    };

    render() {
        const {input, classes, label, meta} = this.props;

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
                                   type={this.state.showPassword ? 'text' : 'password'}
                                   {...input}
                                   labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                                   endAdornment={
                                       iconShowPassword(this.state.showPassword, this.handleClickShowPassword)
                                   }
                    />
                    <FormHelperText id="component-error-text">{meta.error}</FormHelperText>
                </FormControl>
            </div>
        );
    }
}


class renderTextField extends React.Component {
    render() {
        const {input, label, meta} = this.props;
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




class LoginDialog extends React.Component {
    componentDidMount() {
        const {lang} = this.props;
        this.props.dispatch(change("LoginForm", "lang", lang));
        var login = GetRequestParam('login')
        if(login){
            this.props.dispatch(change("LoginForm", "login", login));
            this.props.dispatch(focus("LoginForm", "password"));
        } else {
            this.props.dispatch(focus("LoginForm", "login"));
        }
    }

    handleClose = () => {
        const {lang, dlgData, goCancel} = this.props
        if(dlgData && dlgData.show){
            goCancel(lang)
        }
    }

    handleRegister = () => {
        const {lang, dlgData, goRegister} = this.props
        if(dlgData && dlgData.show){
            goRegister(lang)
        }
    }

    handleForgot = () => {
        const {lang, dlgData, goForgot} = this.props
        if(dlgData && dlgData.show){
            goForgot(lang)
        }
    }

    render() {
        const {classes, lang, intl, dlgData, pristine, invalid, submitting, handleSubmit, submitLogin} = this.props;
        if (dlgData && dlgData.show) {
            return (
                <Dialog onClose={this.handleClose} open={true}>
                    <DialogTitle disableTypography className={classes.titleRoot}>
                        <Typography className={classes.titleLabel}>{intl.formatMessage({id: 'LoginPage.title'})}</Typography>
                        <IconButton className={classes.titleCloseButton} onClick={this.handleClose}>
                            <CloseIcon/>
                        </IconButton>
                    </DialogTitle>
                    <DialogContent className={classes.contentRoot} style={{width:400}}>
                        <div className={classes.info}>
                            <div className={classes.infoCenter}>
                                <Grid container className={classes.grid} spacing={0} direction="row">
                                    <form className={classes.container} onSubmit={handleSubmit(submitLogin)}>
                                        <Field name="lang" component="input" type="hidden"/>
                                        <Grid item xs={12} className={classes.paperField}  style={{marginBottom:10}}>
                                            <Field name="login" component={renderTextField}
                                                   label={intl.formatMessage({id: 'LoginPage.login.label'})}/>
                                        </Grid>
                                        <Grid item xs={12} className={classes.paperField}  style={{marginBottom:10}}>
                                            <Field name="password" component={renderPasswordField}
                                                   label={intl.formatMessage({id: 'LoginPage.password.label'})}
                                                   classes={classes}
                                            />
                                        </Grid>
                                        <Grid item xs={12} className={classes.paperField} style={{textAlign: 'center'}}>
                                            <ButtonBorderPrimary type="submit" disabled={invalid || pristine || submitting}
                                                                 style={{width: 170}}>
                                                {intl.formatMessage({id: 'LoginPage.submit'})}
                                            </ButtonBorderPrimary>
                                        </Grid>
                                        <Grid item xs={12} className={classes.paperField}>
                                            <Typography variant="body2" className={classes.remark}><Link
                                                to={'/public/' + lang + '/'}
                                                onClick={this.handleForgot}
                                                className={classes.remark} style={{color: '#000000'}}>{intl.formatMessage({id: 'LoginPage.forgot.link'})}</Link>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} className={classes.paperField}>
                                            <Typography variant="body2" className={classes.remark}>
                                                {intl.formatMessage({id: 'LoginPage.remark'})} <Link
                                                to={'/public/' + lang + '/'}
                                                onClick={this.handleRegister}
                                                className={classes.remark} style={{color: '#000000'}}>{intl.formatMessage({id: 'LoginPage.remark.register'})}</Link>
                                            </Typography>
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

LoginDialog = reduxForm({
    form: 'LoginForm',
    validate
})(LoginDialog)

export default injectIntl(withStyles(loginDialog)(LoginDialog));