import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import {injectIntl} from "react-intl"
import {pageDefault} from "../styles/ThemeDefault";
import {Link} from "react-router-dom";
import TmpButton2 from "./TmpButton2";
import {change, Field, reduxForm} from 'redux-form'
import TmpTextField from './TmpTextField'
import TmpSelectField from './TmpSelectField'
import MenuItem from '@material-ui/core/MenuItem'

const validate = (values, props) => {
    const {intl} = props;
    const errors = {}
    if (!values.userType) {
        errors.userType = intl.formatMessage({id: 'tmp.TmpRegister1Page.userType.err'})
    }
    if (!values.email) {
        errors.email = intl.formatMessage({id: 'tmp.TmpRegister1Page.email.err'})
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = intl.formatMessage({id: 'tmp.TmpRegister1Page.email.err'})
    }
    if (!values.phone) {
        errors.phone = intl.formatMessage({id: 'tmp.TmpRegister1Page.phone.err'})
    } else if (values.phone.length < 9 || values.phone.replace(/\D+/g, "").length < 9 || values.phone.replace(/\D+/g, "").length > 15) {
        errors.phone = intl.formatMessage({id: 'tmp.TmpRegister1Page.phone.err'})
    }
    return errors
}


class TmpRegister1Page extends React.Component {
    componentDidMount() {
        const {lang} = this.props;
        this.props.dispatch(change("TmpRegister1PageForm", "lang", lang));
    }

    render() {
        const {classes, intl, lang, pristine, invalid, submitting, handleSubmit, submitUserCreate} = this.props;
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
                        top: 'calc(50% - 55px/2 - 208.5px)',
                        height: '55px',
                        fontFamily: 'Noto Sans Bold',
                        fontSize: '40px',
                        color: '#000000'
                    }}>
                        {intl.formatMessage({id: 'tmp.TmpRegister1Page.welcome'})}
                    </div>
                    <div style={{
                        position: 'absolute',
                        left: '8.05%',
                        right: '51.1%',
                        top: '27.21%',
                        bottom: '69.79%',
                        fontFamily: 'Noto Sans',
                        fontSize: '18px',
                        color: '#000000'
                    }}>
                        {intl.formatMessage({id: 'tmp.TmpRegister1Page.info'})}
                    </div>
                    <form onSubmit={handleSubmit(submitUserCreate)}>
                        <Field name="lang" component="input" type="hidden"/>
                        <div style={{
                            position: 'absolute',
                            left: '8.13%',
                            right: '84.17%',
                            top: 'calc(50% - 20px/2 - 114px)',
                            height: '20px',
                            fontFamily: 'Noto Sans',
                            fontSize: '14px',
                            color: '#000000'
                        }}>
                            {intl.formatMessage({id: 'tmp.TmpRegister1Page.userType.label'})}
                        </div>
                        <div style={{
                            position: 'absolute',
                            left: '8.13%',
                            right: '57.98%',
                            top: '38.54%',
                            bottom: '54.95%',
                        }}>
                            <Field name="userType" component={TmpSelectField}>
                                <MenuItem
                                    value="artist">{intl.formatMessage({id: 'RegisterFirstPage.userType.artist'})}</MenuItem>
                                <MenuItem
                                    value="collector">{intl.formatMessage({id: 'RegisterFirstPage.userType.collector'})}</MenuItem>
                                <MenuItem
                                    value="gallery">{intl.formatMessage({id: 'RegisterFirstPage.userType.gallery'})}</MenuItem>
                            </Field>
                        </div>

                        <div style={{
                            position: 'absolute',
                            left: '8.05%',
                            right: '84.24%',
                            top: 'calc(50% - 20px/2 - 8px)',
                            height: '20px',
                            fontFamily: 'Noto Sans',
                            fontSize: '14px',
                            color: '#000000'
                        }}>
                            {intl.formatMessage({id: 'tmp.TmpRegister1Page.email.label'})}
                        </div>
                        <div style={{
                            position: 'absolute',
                            left: '8.05%',
                            right: '57.98%',
                            top: '52.21%',
                            bottom: '41.28%',
                        }}>
                            <Field name="email" component={TmpTextField}/>
                        </div>

                        <div style={{
                            position: 'absolute',
                            left: '8.05%',
                            right: '78.11%',
                            top: 'calc(50% - 20px/2 + 97px)',
                            height: '20px',
                            fontFamily: 'Noto Sans',
                            fontSize: '14px',
                            color: '#000000'
                        }}>
                            {intl.formatMessage({id: 'tmp.TmpRegister1Page.phone.label'})}
                        </div>
                        <div style={{
                            position: 'absolute',
                            left: '8.05%',
                            right: '57.98%',
                            top: '65.89%',
                            bottom: '27.6%',
                        }}>
                            <Field name="phone" component={TmpTextField}/>
                        </div>

                        <TmpButton2 type="submit" disabled={invalid || pristine || submitting} style={{
                            position: 'absolute',
                            left: '8.05%',
                            top: '76.3%',
                            right: '80.38%',
                            bottom: '17.19%'
                        }}>{intl.formatMessage({id: 'tmp.TmpRegister1Page.signup.label'})}</TmpButton2>
                    </form>
                    <div style={{
                        position: 'absolute',
                        left: '8.05%',
                        right: '58.05%',
                        top: 'calc(50% - 22px/2 + 340px)',
                        height: '22px',
                        fontFamily: 'Noto Sans',
                        fontSize: '16px',
                        color: '#000000'
                    }}>
                        {intl.formatMessage({id: 'tmp.TmpRegister1Page.alreadyAccount.label'})}&nbsp;
                        <Link to={"/public/" + lang + "/login"}>
                            <span style={{
                                fontFamily: 'Noto Sans SemiBold',
                                textDecorationLine: 'underline',
                                color: '#000000'
                            }}>
                            {intl.formatMessage({id: 'tmp.TmpRegister1Page.login.label'})}
                            </span>
                        </Link>
                    </div>
                </div>
            </div>

        );
    }
}

TmpRegister1Page = reduxForm({
    form: 'TmpRegister1PageForm',
    validate
})(TmpRegister1Page)

TmpRegister1Page.propTypes = {
    classes: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired
};

export default injectIntl(withStyles(pageDefault)(TmpRegister1Page));