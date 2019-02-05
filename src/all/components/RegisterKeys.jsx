import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ButtonPrimary from './ButtonPrimary'
import {injectIntl} from "react-intl";
import {change, Field, reduxForm} from "redux-form";
import ReactDOM from "react-dom";
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import OutlinedInput from '@material-ui/core/OutlinedInput'
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
        overflow: "auto"
    }
});

const validate = (values, props) => {
    const {intl} = props;
    const errors = {}
    if (!values.keyId) {
        errors.keyId = intl.formatMessage({id: 'RegisterKeys.keyId.noValid'})
    }
    if (values.keyId) {
        if (!values.keyDir) {
            errors.keyDir = intl.formatMessage({id: 'RegisterKeys.keyDir.noValid'})
        }
    } else {
        errors.keyFile = '_'
    }
    return errors
}


const makeRandomFull = (resultLength) => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < resultLength; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

const makeRandom = (resultLength) => {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < resultLength; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
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
                                   disabled={true} style={{color:"#4b4b4b"}}
                    />
                    <FormHelperText id="component-error-text">{meta.error}</FormHelperText>
                </FormControl>
            </div>
        );
    }
}

class RegisterKeys extends React.Component {
    state = {
        keyId: "",
        keyData: "",
        keyFile: "",
        keyDir: "",
        disabledBtnGenerate: false,
        disabledBtnDownload: true,
    }


    generateKey = () => {
        const keyIdData = makeRandom(40);
        const keyDataData = '{"address":"' + keyIdData + '","crypto":{"cipher":"aes-128-ctr","ciphertext":"' + makeRandom(64) + '","cipherparams":{"iv":"' + makeRandom(32) + '"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"' + makeRandom(64) + '"},"mac":"' + makeRandom(64) + '"},"id":"' + makeRandom(8) + '-'+ makeRandom(4) + '-'+ makeRandom(4) + '-'+ makeRandom(4) + '-'+ makeRandom(12) + '","version":3}'
        this.setState({
            keyId: keyIdData,
            keyData: keyDataData,
            keyFile: keyIdData,
            keyDir: "",
            disabledBtnGenerate: false,
            disabledBtnDownload: false,
        })
        this.props.dispatch(change("RegisterKeysForm","keyId",keyIdData))
        this.props.dispatch(change("RegisterKeysForm","keyDir",""))

    }

    downloadKey = () => {
        this.setState({
            keyDir: "C:/",
            disabledBtnGenerate: false,
            disabledBtnDownload: false,
        })
        this.props.dispatch(change("RegisterKeysForm","keyDir","C:/"))
    }

    render() {
        const {classes, intl, pristine, invalid, submitting, handleSubmit, lang, goCancel, goSubmit} = this.props;
        return (
            <form className={classes.container} onSubmit={handleSubmit(goSubmit)}>
                <table>
                    <tbody>
                    <tr>
                        <td colSpan={3}>
                            <Typography variant="h4" className={classes.title}>
                                <br/>
                                {intl.formatMessage({id: 'RegisterKeys.title'})}
                                <br/>
                            </Typography>
                        </td>
                        <td style={{width: "5%"}}>
                            <div><p>&nbsp;</p></div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <Typography variant="body1" className={classes.subtitle}>
                                <br/>
                                {intl.formatMessage({id: 'RegisterKeys.subtitle'})}
                                <br/><br/>
                            </Typography>
                        </td>
                        <td style={{width: "5%"}}>
                            <div><p>&nbsp;</p></div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <Field name="keyId" component={renderTextField}
                                   label={intl.formatMessage({id: 'RegisterKeys.keyId.label'})}
                                   classes={classes}
                                   value={this.state.keyId}
                            /><br/>
                        </td>
                        <td style={{verticalAlign:"top"}}>
                            <ButtonBorderPrimary onClick={() => this.generateKey()} style={{width: 170, marginTop: 5}} disabled={this.state.disabledBtnGenerate}>
                                {intl.formatMessage({id: 'RegisterKeys.generateKey'})}
                            </ButtonBorderPrimary>
                        </td>
                        <td style={{width: "5%"}}>
                            <div><p>&nbsp;</p></div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <Field name="keyDir" component={renderTextField}
                                   label={intl.formatMessage({id: 'RegisterKeys.keyDir.label'})}
                                   classes={classes}
                                   value={this.state.keyPath}
                            /><br/>
                        </td>
                        <td style={{verticalAlign:"top"}}>
                            <ButtonBorderPrimary onClick={() => this.downloadKey()} style={{width: 170, marginTop: 5}} disabled={this.state.disabledBtnDownload}>
                                {intl.formatMessage({id: 'RegisterKeys.downloadKey'})}
                            </ButtonBorderPrimary>
                        </td>
                        <td style={{width: "5%"}}>
                            <div><p>&nbsp;</p></div>
                        </td>
                    </tr>
                    <tr>
                        <td style={{width: "95%"}}>
                            <div><p>&nbsp;</p></div>
                        </td>
                        <td>
                            <ButtonBorderPrimary onClick={() => goCancel()} style={{width: 140}}>
                                {intl.formatMessage({id: 'RegisterKeys.cancel'})}
                            </ButtonBorderPrimary>
                        </td>
                        <td>
                            <ButtonBorderPrimary type="submit" disabled={invalid || pristine || submitting} style={{width: 170}}>
                                {intl.formatMessage({id: 'RegisterKeys.ok'})}
                            </ButtonBorderPrimary>
                        </td>
                        <td style={{width: "5%"}}>
                            <div><p>&nbsp;</p></div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        )
    }
}

RegisterKeys = reduxForm({
    form: 'RegisterKeysForm',
    validate
})(RegisterKeys)

RegisterKeys.propTypes = {
    classes: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired,
    goCancel: PropTypes.func.isRequired,
    goSubmit: PropTypes.func.isRequired

};

export default injectIntl(withStyles(styles)(RegisterKeys));
