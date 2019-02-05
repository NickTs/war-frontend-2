import React from 'react'
import {Link} from 'react-router-dom'
import ReactDOM from 'react-dom'
import {withStyles} from "@material-ui/core/styles/index";
import MenuItem from '@material-ui/core/MenuItem'
import ButtonPrimary from './ButtonPrimary'
import {change, Field, reduxForm} from 'redux-form'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Grid from '@material-ui/core/Grid'
import {injectIntl} from 'react-intl'
import TopBarFunc from '../containers/TopBarFunc'
import BottomBar from './BottomBar'
import Typography from '@material-ui/core/Typography'


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
    btnForm: {}
});


const validate = (values, props) => {
    const {intl} = props;
    const errors = {}
    if (!values.email) {
        errors.email = intl.formatMessage({id: 'RegisterFirstPage.email.required'})
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = intl.formatMessage({id: 'RegisterFirstPage.email.noValid'})
    }
    if (!values.phone) {
        errors.phone = intl.formatMessage({id: 'RegisterFirstPage.phone.required'})
    } else if (values.phone.length < 12 || values.phone.replace(/\D+/g, "").length != 12) {
        errors.phone = intl.formatMessage({id: 'RegisterFirstPage.phone.noValid'})
    }
    if (!values.userType) {
        errors.userType = intl.formatMessage({id: 'RegisterFirstPage.userType.required'})
    }
    return errors
}


class renderTextField extends React.Component {
    render() {
        const {input, label, meta, classes} = this.props;
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
            </div>
        );
    }
}


class renderSelectField extends React.Component {
    render() {
        const {input, label, meta, children} = this.props;
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
                    <Select
                        children={children}
                        input={
                            <OutlinedInput
                                labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                                name={label}
                                id={input.name}
                                {...input}
                            />
                        }
                    >
                    </Select>
                    <FormHelperText id="component-error-text">{meta.error}</FormHelperText>
                </FormControl>
            </div>
        );
    }
}


class RegisterFirstPage extends React.Component {
    componentDidMount() {
        const {lang} = this.props;
        this.props.dispatch(change("RegisterFirstForm", "lang", lang));
    }

    render() {
        const {classes, intl, pristine, invalid, submitting, handleSubmit, submitUserCreate, lang, goHome} = this.props;
        return (
            <div className={classes.root}>
                <TopBarFunc visibleHome={false}/>
                <div className={classes.info}>
                    <div className={classes.infoCenter}>
                        <Grid container className={classes.grid} spacing={0} direction="row">
                            <form className={classes.container} onSubmit={handleSubmit(submitUserCreate)}>
                                <Field name="lang" component="input" type="hidden"/>
                                <Grid item xs={12} className={classes.paperField}>
                                    <Typography variant="h4" className={classes.title}>
                                        {intl.formatMessage({id: 'RegisterFirstPage.title'})}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} className={classes.paperField}>
                                    <Typography variant="h6" className={classes.subtitle}>
                                        {intl.formatMessage({id: 'RegisterFirstPage.subtitle'})}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} className={classes.paperField}>
                                    <Field name="email" component={renderTextField} classes={classes}
                                           label={intl.formatMessage({id: 'RegisterFirstPage.email.label'})}/>
                                </Grid>
                                <Grid item xs={12} className={classes.paperField}>
                                    <Field name="phone" component={renderTextField} classes={classes}
                                           label={intl.formatMessage({id: 'RegisterFirstPage.phone.label'})}/>
                                </Grid>
                                <Grid item xs={12} className={classes.paperField}>
                                    <Field name="userType" component={renderSelectField}
                                           label={intl.formatMessage({id: 'RegisterFirstPage.userType.label'})}>
                                        <MenuItem
                                            value="artist">{intl.formatMessage({id: 'RegisterFirstPage.userType.artist'})}</MenuItem>
                                        <MenuItem
                                            value="collector">{intl.formatMessage({id: 'RegisterFirstPage.userType.collector'})}</MenuItem>
                                        <MenuItem
                                            value="gallery">{intl.formatMessage({id: 'RegisterFirstPage.userType.gallery'})}</MenuItem>
                                    </Field>
                                </Grid>
                                <Grid item xs={12} className={classes.paperField}>
                                    <ButtonPrimary variant="outlined" onClick={() => goHome(lang)} style={{width: 170}}>
                                        {intl.formatMessage({id: 'RegisterFirstPage.cancel'})}
                                    </ButtonPrimary>
                                    <ButtonPrimary type="submit" disabled={invalid || pristine || submitting}
                                                   variant="outlined" style={{width: 170}}>
                                        {intl.formatMessage({id: 'RegisterFirstPage.submit'})}
                                    </ButtonPrimary>
                                </Grid>
                                <Grid item xs={12} className={classes.paperField}>
                                    <Typography variant="body2" className={classes.remark}>
                                        {intl.formatMessage({id: 'RegisterFirstPage.remark'})} <Link
                                        to={'/public/' + lang + '/login'}
                                        className={classes.linkLogin}>{intl.formatMessage({id: 'RegisterFirstPage.remark.login'})}</Link>
                                    </Typography>
                                </Grid>
                            </form>
                        </Grid>
                    </div>
                </div>
                <BottomBar/>
            </div>
        );
    }
}

RegisterFirstPage = reduxForm({
    form: 'RegisterFirstForm',
    validate
})(RegisterFirstPage)

export default injectIntl(withStyles(styles)(RegisterFirstPage));