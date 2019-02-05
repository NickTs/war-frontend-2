import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import {injectIntl} from "react-intl"
import {pageDefault} from "../styles/ThemeDefault";
import {Link} from "react-router-dom";
import TmpButton2 from "./TmpButton2";
import {change, Field, reduxForm} from 'redux-form'
import TmpTextField from './TmpTextField'
import TmpPasswordField from './TmpPasswordField'

const validate = (values, props) => {
    const {intl} = props;
    const errors = {}
    if (!values.login || values.login.length > 64) {
        errors.login = intl.formatMessage({id: 'tmp.TmpLoginPage.login.err'})
    }
    if (!values.password) {
        errors.password = intl.formatMessage({id: 'tmp.TmpLoginPage.password.err'})
    }
    else if (values.password.length < 8 || values.password.length > 64) {
        errors.password = intl.formatMessage({id: 'tmp.TmpLoginPage.password.err'})
    }
    return errors
}


class TmpLoginPage extends React.Component {
    componentDidMount() {
        const {lang} = this.props;
        this.props.dispatch(change("TmpLoginPageForm", "lang", lang));
    }

    render() {
        const {classes, intl, lang, pristine, invalid, submitting, handleSubmit, submitLogin, goForgot} = this.props;
        return (
            <div style={{position: 'relative', width: '1366px', height: '768px', backgroundColor: '#FDFDFD'}}>
                <div style={{
                    position: 'absolute',
                    width: '1366px',
                    height: '100px',
                    left: '0',
                    top: '0',
                    backgroundColor: '#ffffff'
                }}>
                </div>

                <div style={{
                    position: 'absolute',
                    left: '0px',
                    top: '0px',
                    width: '1366px',
                    height: '768px',
                    background: 'url(/static/tmp/bg2.jpg)'
                }}>
                    <div style={{position: 'absolute', left: '8.05%', right: '87.11%', top: '3.39%', bottom: '90.43%'}}>
                        <img src="/static/tmp/logo.png"/>
                    </div>
                    <div style={{
                        position: 'absolute',
                        left: '8.05%',
                        right: '58.05%',
                        top: 'calc(50% - 55px/2 - 154.5px)',
                        height: '55px',
                        fontFamily: 'Noto Sans Bold',
                        fontSize: '40px',
                        color: '#000000'
                    }}>
                        {intl.formatMessage({id: 'tmp.TmpLoginPage.welcome'})}
                    </div>
                    <div style={{
                        position: 'absolute',
                        left: '8.05%',
                        right: '51.1%',
                        top: '34.24%',
                        bottom: '62.76%',
                        fontFamily: 'Noto Sans',
                        fontSize: '18px',
                        color: '#000000'
                    }}>
                        {intl.formatMessage({id: 'tmp.TmpLoginPage.info'})}
                    </div>
                    <form onSubmit={handleSubmit(submitLogin)}>
                        <Field name="lang" component="input" type="hidden"/>
                        <div style={{
                            position: 'absolute',
                            left: '8.05%',
                            right: '77.82%',
                            top: 'calc(50% - 20px/2 - 65px)',
                            height: '20px',
                            fontFamily: 'Noto Sans',
                            fontSize: '14px',
                            color: '#000000'
                        }}>
                            {intl.formatMessage({id: 'tmp.TmpLoginPage.login.label'})}
                        </div>
                        <div style={{
                            position: 'absolute',
                            left: '8.05%',
                            right: '58.05%',
                            top: '44.92%',
                            bottom: '48.57%',
                        }}>
                            <Field name="login" component={TmpTextField}/>
                        </div>

                        <div style={{
                            position: 'absolute',
                            left: '8.05%',
                            right: '77.82%',
                            top: 'calc(50% - 20px/2 + 41px)',
                            height: '20px',
                            fontFamily: 'Noto Sans',
                            fontSize: '14px',
                            color: '#000000'
                        }}>
                            {intl.formatMessage({id: 'tmp.TmpLoginPage.password.label'})}
                        </div>
                        <div style={{
                            position: 'absolute',
                            left: '8.05%',
                            right: '58.05%',
                            top: '58.72%',
                            bottom: '34.77%',
                        }}>
                            <Field name="password" component={TmpPasswordField}/>
                        </div>
                        <TmpButton2 type="submit" disabled={invalid || pristine || submitting} style={{
                            position: 'absolute',
                            left: '8.05%',
                            top: '69.14%',
                            right: '81.7%',
                            bottom: '24.35%'
                        }}>{intl.formatMessage({id: 'tmp.TmpLoginPage.signin.label'})}</TmpButton2>
                    </form>
                    <Link to={"/public/" + lang + "/login"} onClick={() => goForgot(lang)}>
                        <div style={{
                            position: 'absolute',
                            left: '25.7%',
                            top: 'calc(50% - 22px/2 + 172px)',
                            right: '58.05%',
                            height: '22px',
                            fontFamily: 'Noto Sans SemiBold',
                            fontSize: '16px',
                            textAlign: 'right',
                            textDecorationLine: 'underline',
                            color: '#000000'
                        }}>{intl.formatMessage({id: 'tmp.TmpLoginPage.forgot.label'})}
                        </div>
                    </Link>
                    <div style={{
                        position: 'absolute',
                        left: '8.05%',
                        right: '58.05%',
                        top: 'calc(50% - 22px/2 + 340px)',
                        height: '22px',
                        fontFamily: 'Noto Sans',
                        fontSize: '16px',
                        textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                        color: '#000000'
                    }}>
                        {intl.formatMessage({id: 'tmp.TmpLoginPage.notAccount.label'})}&nbsp;
                        <Link to={"/public/" + lang + "/register"}>
                            <span style={{
                                fontFamily: 'Noto Sans SemiBold',
                                textDecorationLine: 'underline',
                                color: '#000000'
                            }}>
                            {intl.formatMessage({id: 'tmp.TmpLoginPage.register.label'})}
                            </span>
                        </Link>
                    </div>
                </div>
            </div>

        );
    }
}

TmpLoginPage = reduxForm({
    form: 'TmpLoginPageForm',
    validate
})(TmpLoginPage)

TmpLoginPage.propTypes = {
    classes: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired
};

export default injectIntl(withStyles(pageDefault)(TmpLoginPage));