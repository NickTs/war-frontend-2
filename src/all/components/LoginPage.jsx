import React from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router-dom'
import {withStyles} from "@material-ui/core/styles/index";
import ButtonPrimary from './ButtonPrimary'
import {change, focus, Field, reduxForm} from 'redux-form'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Grid from '@material-ui/core/Grid'
import {injectIntl} from 'react-intl'
import TopBarFunc from '../containers/TopBarFunc'
import BottomBar from './BottomBar'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import {GetRequestParam} from "../Utils";


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
        justifyContent: "center",
        height: '80vh'
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
});


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


class LoginPage extends React.Component {
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

    render() {
        const {classes, intl, pristine, invalid, submitting, handleSubmit, submitLogin, lang, goHome} = this.props;
        return (
            <div className={classes.root}>
                <TopBarFunc visibleHome={false}/>
                <div className={classes.info}>
                    <div className={classes.infoCenter}>
                        <Grid container className={classes.grid} spacing={0} direction="row">
                            <form className={classes.container} onSubmit={handleSubmit(submitLogin)}>
                                <Field name="lang" component="input" type="hidden"/>
                                <Grid item xs={12} className={classes.paperField}>
                                    <Typography variant="h4" className={classes.title}>
                                        {intl.formatMessage({id: 'LoginPage.title'})}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} className={classes.paperField}>
                                    <Typography variant="h6" className={classes.subtitle}>
                                        {intl.formatMessage({id: 'LoginPage.subtitle'})}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} className={classes.paperField}>
                                    <Field name="login" component={renderTextField}
                                           label={intl.formatMessage({id: 'LoginPage.login.label'})}/>
                                </Grid>
                                <Grid item xs={12} className={classes.paperField}>
                                    <Field name="password" component={renderPasswordField}
                                           label={intl.formatMessage({id: 'LoginPage.password.label'})}
                                           classes={classes}
                                    />
                                </Grid>
                                <Grid item xs={12} className={classes.paperField}>
                                    <ButtonPrimary variant="outlined" onClick={() => goHome(lang)} style={{width: 170}}>
                                        {intl.formatMessage({id: 'LoginPage.cancel'})}
                                    </ButtonPrimary>
                                    <ButtonPrimary type="submit" disabled={invalid || pristine || submitting}
                                                   variant="outlined" style={{width: 170}}>
                                        {intl.formatMessage({id: 'LoginPage.submit'})}
                                    </ButtonPrimary>
                                </Grid>
                                <Grid item xs={12} className={classes.paperField}>
                                    <Typography variant="body2" className={classes.remark}>
                                        {intl.formatMessage({id: 'LoginPage.remark'})} <Link
                                        to={'/public/' + lang + '/register'}
                                        className={classes.linkLogin}>{intl.formatMessage({id: 'LoginPage.remark.register'})}</Link>
                                    </Typography>
                                </Grid>
                            </form>
                        </Grid>
                    </div>
                </div>
                <BottomBar/>
            </div>
        )
    }
}

LoginPage = reduxForm({
    form: 'LoginForm',
    validate
})(LoginPage)

export default injectIntl(withStyles(styles)(LoginPage));