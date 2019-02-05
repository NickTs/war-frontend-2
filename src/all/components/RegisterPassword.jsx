import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import ButtonPrimary from './ButtonPrimary'
import {injectIntl} from "react-intl";
import {Field, reduxForm} from "redux-form";
import ReactDOM from "react-dom";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import ButtonBorderPrimary from "./ButtonBorderPrimary";

const styles = theme => ({
    bar: {
        backgroundColor: "#fff"
    },
    grow: {
        flexGrow: 1,
        color: '#6b6b6b'
    },
    info: {
        maxHeight: "50vh",
        overflow: "auto"
    }
});

const validate = (values, props) => {
    const {intl} = props;
    const errors = {}
    if (!values.password) {
        errors.password = intl.formatMessage({id: 'RegisterPassword.password.noValid'})
    }
    else if (values.password.length < 8 || values.password.length > 64) {
        errors.password = intl.formatMessage({id: 'RegisterPassword.password.noValid'})
    }
    if (values.password) {
        if (!values.passwordVerify) {
            errors.passwordVerify = intl.formatMessage({id: 'RegisterPassword.passwordVerify.noValid'})
        } else if (values.password != values.passwordVerify) {
            errors.passwordVerify = intl.formatMessage({id: 'RegisterPassword.passwordVerify.noValid'})
        }
    } else {
        errors.passwordVerify = intl.formatMessage({id: 'RegisterPassword.passwordVerify.noValid'})
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


class RegisterPassword extends React.Component {
    state = {
    }
    handleChange = name => event => {
        this.setState({[name]: event.target.checked});
    }

    render() {
        const {classes, intl, pristine, invalid, submitting, handleSubmit, lang, goCancel, goSubmit} = this.props;
        return (
            <form className={classes.container} onSubmit={handleSubmit(goSubmit)}>
                <table style={{width: '100%'}}>
                    <tbody>
                    <tr>
                        <td colSpan={3}>
                            <Typography variant="h4" className={classes.title}>
                                <br/>
                                {intl.formatMessage({id: 'RegisterPassword.title'})}
                                <br/><br/>
                            </Typography>
                        </td>
                        <td style={{width: "20%"}}>
                            <div><p>&nbsp;</p></div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <Field name="password" component={renderPasswordField}
                                   label={intl.formatMessage({id: 'RegisterPassword.password.label'})}
                                   classes={classes}
                            /><br/>
                        </td>
                        <td style={{width: "20%"}}>
                            <div><p>&nbsp;</p></div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <Field name="passwordVerify" component={renderPasswordField}
                                   label={intl.formatMessage({id: 'RegisterPassword.passwordVerify.label'})}
                                   classes={classes}
                            /><br/>
                        </td>
                        <td style={{width: "20%"}}>
                            <div><p>&nbsp;</p></div>
                        </td>
                    </tr>
                    <tr>
                        <td style={{width: "80%"}}>
                            <div><p>&nbsp;</p></div>
                        </td>
                        <td>
                            <ButtonBorderPrimary onClick={() => goCancel()} style={{width: 140}}>
                                {intl.formatMessage({id: 'RegisterPassword.cancel'})}
                            </ButtonBorderPrimary>
                        </td>
                        <td>
                            <ButtonBorderPrimary type="submit" disabled={invalid || pristine || submitting}
                                           variant="outlined" style={{width: 170}}>
                                {intl.formatMessage({id: 'RegisterPassword.ok'})}
                            </ButtonBorderPrimary>
                        </td>
                        <td style={{width: "20%"}}>
                            <div><p>&nbsp;</p></div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        )
    }
}

RegisterPassword = reduxForm({
    form: 'RegisterPasswordForm',
    validate
})(RegisterPassword)

RegisterPassword.propTypes = {
    classes: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired,
    goCancel: PropTypes.func.isRequired,
    goSubmit: PropTypes.func.isRequired

};

export default injectIntl(withStyles(styles)(RegisterPassword));
