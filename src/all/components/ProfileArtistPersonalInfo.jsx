import React from 'react'
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import {getDictCountryLabel, getDictLangs, getDictLangsLabel, getDictNationIdTypeLabel} from '../dict/Dicts'
import {change, Field, reduxForm} from 'redux-form'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Divider from '@material-ui/core/Divider'
import {withStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import {injectIntl} from "react-intl"
import {profileGeneral} from "../styles/ThemeDefault";
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import SelectCountry from "./SelectCountry";
import ButtonBorderPrimary from './ButtonBorderPrimary';
import SelectNationIdType from "./SelectNationIdType";

const ReqSymbol = () => {
    return (
        <span style={{color:"#BF0025"}}>&nbsp;*</span>
    )
}

const getListLangForNewCard = (profile) => {
    if (profile && profile.listPersonalInfo && profile.listPersonalInfo.length > 0) {
        let res = []
        getDictLangs().map(langData => {
            if (langData.active) {
                let flPush = true
                profile.listPersonalInfo.map(langPIData => {
                    if (langPIData.l == langData.key) {
                        flPush = false
                    }
                })
                if (flPush) {
                    res.push(langData.key)
                }
            }
        })
        return res
    } else {
        return ['en']
    }
}

const validate = (values, props) => {
    const {intl} = props;
    const errors = {}
    if (!values.firstName) {
        errors.firstName = intl.formatMessage({id: 'Profile.NewCard.firstName.err.empty'})
        if (!errors._error) errors._error = {err: errors.firstName}
    } else if (values.firstName.length < 2 || values.firstName.length > 40) {
        errors.firstName = intl.formatMessage({id: 'Profile.NewCard.firstName.err.bad'})
        if (!errors._error) errors._error = {err: errors.firstName}
    }
    if (values.middleName && values.middleName.length > 40) {
        errors.middleName = intl.formatMessage({id: 'Profile.NewCard.middleName.err.bad'})
        if (!errors._error) errors._error = {err: errors.middleName}
    }
    if (!values.lastName) {
        errors.lastName = intl.formatMessage({id: 'Profile.NewCard.lastName.err.empty'})
        if (!errors._error) errors._error = {err: errors.lastName}
    } else if (values.lastName.length < 2 || values.lastName.length > 80) {
        errors.lastName = intl.formatMessage({id: 'Profile.NewCard.lastName.err.bad'})
        if (!errors._error) errors._error = {err: errors.lastName}
    }
    if (values.birthday) {
        var dCur = new Date()
        if (dCur.getFullYear() - 6 < parseInt(values.birthday.substring(0, 4))) {
            errors.birthday = intl.formatMessage({id: 'ProfileArtistPersonalInfo.NewCard.birthday.err.bad'})
            if (!errors._error) errors._error = {err: errors.birthday}

        }
    }
    if (!values.nationIdType) {
        errors.nationIdType = intl.formatMessage({id: 'ProfileArtistPersonalInfo.NewCard.nationIdType.err.empty'})
        if (!errors._error) errors._error = {err: errors.nationIdType}
    }
    if (!values.nationIdNumber) {
        errors.nationIdNumber = intl.formatMessage({id: 'ProfileArtistPersonalInfo.NewCard.nationIdNumber.err.empty'})
        if (!errors._error) errors._error = {err: errors.nationIdNumber}
    }
    if (!values.country) {
        errors.country = intl.formatMessage({id: 'ProfileArtistPersonalInfo.NewCard.country.err.empty'})
        if (!errors._error) errors._error = {err: errors.country}
    }
    return errors
}


class renderTextFieldWithoutHelper extends React.Component {
    render() {
        const {input, label, meta, classes, fieldWidth, readOnlyComp} = this.props;
        let fieldWidthValue = 400
        if (fieldWidth) {
            fieldWidthValue = fieldWidth
        }
        if (readOnlyComp) {
            return (
                <OutlinedInput id={input.name}   {...input} margin='none' labelWidth={0}
                               style={{width: fieldWidthValue}}
                               inputProps={{style: {paddingTop: 8, paddingBottom: 8}}} readOnly={true}/>
            )
        } else {
            return (
                <OutlinedInput id={input.name}   {...input} margin='none' labelWidth={0}
                               style={{width: fieldWidthValue}}
                               inputProps={{style: {paddingTop: 8, paddingBottom: 8}}}/>
            )
        }
    }
}

class renderDateFieldWithoutHelper extends React.Component {
    render() {
        const {input, label, meta, classes, fieldWidth, readOnlyComp} = this.props;
        let fieldWidthValue = 400
        if (fieldWidth) {
            fieldWidthValue = fieldWidth
        }
        if (readOnlyComp) {
            return (
                <OutlinedInput id={input.name}   {...input} margin='none' labelWidth={0}
                               style={{width: fieldWidthValue}}
                               inputProps={{style: {paddingTop: 8, paddingBottom: 8}}} readOnly={true}/>
            )
        } else {
            return (
                <TextField
                    id={input.name}
                    {...input}
                    type="date"
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{style: {paddingTop: 8, paddingBottom: 8}}}
                />
            )
        }
    }
}

class renderSelectCountry extends React.Component {
    render() {
        const {input, label, meta, classes, lang, selChange, selBlur, fieldWidth, readOnlyComp, defValue} = this.props;
        let fieldWidthValue = 400
        if (fieldWidth) {
            fieldWidthValue = fieldWidth
        }
        if (readOnlyComp) {
            return (
                <OutlinedInput id={input.name}   {...input} margin='none' labelWidth={0}
                               style={{width: fieldWidthValue}}
                               inputProps={{style: {paddingTop: 8, paddingBottom: 8}}} readOnly={true}/>
            )
        } else {
            return (
                <SelectCountry id={input.name} lang={lang} input={input} selChange={selChange} selBlur={selBlur} defValue={defValue}/>
            )
        }
    }
}

class renderSelectNationIdType extends React.Component {
    render() {
        const {input, label, meta, classes, lang, selChange, selBlur, fieldWidth, readOnlyComp, defValue} = this.props;
        let fieldWidthValue = 400
        if (fieldWidth) {
            fieldWidthValue = fieldWidth
        }
        if (readOnlyComp) {
            return (
                <OutlinedInput id={input.name}   {...input} margin='none' labelWidth={0}
                               style={{width: fieldWidthValue}}
                               inputProps={{style: {paddingTop: 8, paddingBottom: 8}}} readOnly={true}/>
            )
        } else {
            return (
                <SelectNationIdType id={input.name} lang={lang} input={input} selChange={selChange} selBlur={selBlur} defValue={defValue}/>
            )
        }
    }
}

class NewCard extends React.Component {
    state = {
        l: '',
        readOnlyComp: false
    }
    handleChangeLang = event => {
        this.setState({
            l: event.target.value
        })
    }
    handleSubmitCreate = values => {
        const {goSubmitCreate, lang, user, profile, session} = this.props;
        let listLangNew = getListLangForNewCard(profile)
        let langSel = this.state.l;
        if (!langSel || langSel.length == 0) {
            langSel = listLangNew[0]
        }
        if (profile && profile.listPersonalInfo && profile.listPersonalInfo.length > 0) {
            values.birthday = profile.listPersonalInfo[0].birthday
            if (profile.listPersonalInfo[0].nationIdType) {
                values.nationIdType = {value: profile.listPersonalInfo[0].nationIdType}
                values.nationIdSeria = profile.listPersonalInfo[0].nationIdSeria
                values.nationIdNumber = profile.listPersonalInfo[0].nationIdNumber
            } else {
                values.nationIdType = undefined
                values.nationIdSeria = undefined
                values.nationIdNumber = undefined
            }
            if (profile.listPersonalInfo[0].country) {
                values.country = {value: profile.listPersonalInfo[0].country}
            } else {
                values.country = undefined
            }
        }
        goSubmitCreate(values, langSel, lang, user, profile, session)
    }

    componentDidMount() {
        const {profile, lang} = this.props;
        if (profile && profile.listPersonalInfo && profile.listPersonalInfo.length > 0) {
            this.setState({
                readOnlyComp: true
            })
            this.props.dispatch(change("ProfileArtistPersonalInfoNewCardForm", "birthday", profile.listPersonalInfo[0].birthday));
            this.props.dispatch(change("ProfileArtistPersonalInfoNewCardForm", "nationIdType", getDictNationIdTypeLabel(lang, profile.listPersonalInfo[0].nationIdType)));
            this.props.dispatch(change("ProfileArtistPersonalInfoNewCardForm", "nationIdSeria", profile.listPersonalInfo[0].nationIdSeria));
            this.props.dispatch(change("ProfileArtistPersonalInfoNewCardForm", "nationIdNumber", profile.listPersonalInfo[0].nationIdNumber));
            this.props.dispatch(change("ProfileArtistPersonalInfoNewCardForm", "country", getDictCountryLabel(lang, profile.listPersonalInfo[0].country)));
        }
    }

    changeLang(lang) {
        this.setState({
            l: lang
        })
    }

    handleReset() {

    }

    render() {
        const {classes, intl, lang, user, profile, pristine, invalid, submitting, handleSubmit, error} = this.props;
        let listLangNew = getListLangForNewCard(profile)
        let langSel = this.state.l;
        if (!langSel || langSel.length == 0) {
            langSel = listLangNew[0]
        }
        let firstCard = true
        if (profile && profile.listPersonalInfo && profile.listPersonalInfo.length > 0) {
            firstCard = false
        }
        return (
            <Paper style={{marginTop: 10, padding: 10, backgroundColor: '#fbfbfb'}}>
                <form className={classes.container} onSubmit={handleSubmit(this.handleSubmitCreate)}>
                    <table style={{width: '100%'}}>
                        <tbody>
                        <tr>
                            <td style={{width: '5%', padding: 5, whiteSpace: "nowrap"}}>
                                <b>{intl.formatMessage({id: 'Profile.NewCard.l.label'})}</b></td>
                            <td style={{width: '5%', padding: 5}}>
                                <Select value={langSel} onChange={this.handleChangeLang} displayEmpty name="l"
                                        className={classes.selectLang}>
                                    {listLangNew.map((langKey, index) => {
                                        return (<MenuItem key={index}
                                                          value={langKey}>{getDictLangsLabel(langKey)}</MenuItem>)
                                    })}
                                </Select>
                            </td>
                            <td style={{width: '90%'}}>
                                <div/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}><Divider/></td>
                        </tr>
                        <tr>
                            <td colSpan={3}>
                                <div style={{marginTop: 15, marginLeft:30, color: "#7b7b7b"}}>{intl.formatMessage({id: 'ProfileArtistPersonalInfo.NewCard.block.personalInfo.label'})}</div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}><Divider/></td>
                        </tr>
                        <tr>
                            <td style={{width: '5%', padding: 5, whiteSpace: "nowrap"}}>
                                <b>{intl.formatMessage({id: 'Profile.NewCard.firstName.label'})}<ReqSymbol/></b></td>
                            <td style={{width: '5%', padding: 5}}><Field name="firstName"
                                                                         component={renderTextFieldWithoutHelper}/></td>
                            <td style={{width: '90%'}}>
                                <div/>
                            </td>
                        </tr>
                        <tr>
                            <td style={{padding: 5, whiteSpace: "nowrap"}}>
                                <b>{intl.formatMessage({id: 'Profile.NewCard.middleName.label'})}</b>
                            </td>
                            <td style={{padding: 5}}><Field name="middleName" component={renderTextFieldWithoutHelper}/>
                            </td>
                            <td>
                                <div/>
                            </td>
                        </tr>
                        <tr>
                            <td style={{padding: 5, whiteSpace: "nowrap"}}>
                                <b>{intl.formatMessage({id: 'Profile.NewCard.lastName.label'})}<ReqSymbol/></b>
                            </td>
                            <td style={{padding: 5}}><Field name="lastName" component={renderTextFieldWithoutHelper}/>
                            </td>
                            <td>
                                <div/>
                            </td>
                        </tr>
                        <tr>
                            <td style={{padding: 5, whiteSpace: "nowrap"}}>
                                <b>{intl.formatMessage({id: 'ProfileArtistPersonalInfo.NewCard.birthday.label'})}<ReqSymbol/></b>
                            </td>
                            <td style={{padding: 5}}><Field name="birthday" component={renderDateFieldWithoutHelper}
                                                            readOnlyComp={this.state.readOnlyComp}/></td>
                            <td>
                                <div/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}>
                                <div style={{marginTop: 15, marginLeft:30, color: "#7b7b7b"}}>{intl.formatMessage({id: 'ProfileArtistPersonalInfo.NewCard.block.nationId.label'})}</div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}><Divider/></td>
                        </tr>
                        <tr>
                            <td style={{padding: 5, whiteSpace: "nowrap"}}>
                                <b>{intl.formatMessage({id: 'ProfileArtistPersonalInfo.NewCard.nationIdType.label'})}<ReqSymbol/></b>
                            </td>
                            <td style={{padding: 5}}><Field name="nationIdType" component={renderSelectNationIdType}
                                                            lang={lang} selChange={value => {
                                this.props.dispatch(change("ProfileArtistPersonalInfoNewCardForm", "nationIdType", value))
                            }} selBlur={value => {
                                this.props.dispatch(change("ProfileArtistPersonalInfoNewCardForm", "nationIdType", value))
                            }} readOnlyComp={this.state.readOnlyComp}/></td>
                            <td>
                                <div/>
                            </td>
                        </tr>
                        <tr>
                            <td style={{padding: 5, whiteSpace: "nowrap"}}>
                                <b>{intl.formatMessage({id: 'ProfileArtistPersonalInfo.NewCard.nationIdSeria.label'})}</b>
                            </td>
                            <td style={{padding: 5}}><Field name="nationIdSeria"
                                                            component={renderTextFieldWithoutHelper} fieldWidth={200}
                                                            readOnlyComp={this.state.readOnlyComp}/></td>
                            <td>
                                <div/>
                            </td>
                        </tr>
                        <tr>
                            <td style={{padding: 5, whiteSpace: "nowrap"}}>
                                <b>{intl.formatMessage({id: 'ProfileArtistPersonalInfo.NewCard.nationIdNumber.label'})}<ReqSymbol/></b>
                            </td>
                            <td style={{padding: 5}}><Field name="nationIdNumber"
                                                            component={renderTextFieldWithoutHelper} fieldWidth={200}
                                                            readOnlyComp={this.state.readOnlyComp}/></td>
                            <td>
                                <div/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}>
                                <div style={{marginTop: 15, marginLeft:30, color: "#7b7b7b"}}>{intl.formatMessage({id: 'ProfileArtistPersonalInfo.NewCard.block.addr.label'})}</div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}><Divider/></td>
                        </tr>
                        <tr>
                            <td style={{padding: 5, whiteSpace: "nowrap"}}>
                                <b>{intl.formatMessage({id: 'ProfileArtistPersonalInfo.NewCard.country.label'})}<ReqSymbol/></b>
                            </td>
                            <td style={{padding: 5}}><Field name="country" component={renderSelectCountry} lang={lang}
                                                            selChange={value => {
                                                                this.props.dispatch(change("ProfileArtistPersonalInfoNewCardForm", "country", value))
                                                            }}
                                                            selBlur={value => {
                                                                this.props.dispatch(change("ProfileArtistPersonalInfoNewCardForm", "country", value))
                                                            }}
                                                            readOnlyComp={this.state.readOnlyComp}/></td>
                            <td>
                                <div/>
                            </td>
                        </tr>
                        <tr>
                            <td style={{padding: 5, whiteSpace: "nowrap"}}>
                                <b>{intl.formatMessage({id: 'ProfileArtistPersonalInfo.NewCard.addr.label'})}</b></td>
                            <td style={{padding: 5}}><Field name="addr" component={renderTextFieldWithoutHelper}
                                                            fieldWidth={600}/></td>
                            <td>
                                <div/>
                            </td>
                        </tr>
                        <tr>
                            <td style={{padding: 5, whiteSpace: "nowrap"}}>
                                <b>{intl.formatMessage({id: 'ProfileArtistPersonalInfo.NewCard.billingAddr.label'})}</b>
                            </td>
                            <td style={{padding: 5}}><Field name="billingAddr" component={renderTextFieldWithoutHelper}
                                                            fieldWidth={600}/></td>
                            <td>
                                <div/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}>
                                <div style={{marginTop: 15, marginLeft:30, color: "#7b7b7b"}}>{intl.formatMessage({id: 'ProfileArtistPersonalInfo.NewCard.block.addInfo.label'})}</div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}><Divider/></td>
                        </tr>
                        <tr>
                            <td style={{padding: 5, whiteSpace: "nowrap"}}>
                                <b>{intl.formatMessage({id: 'ProfileArtistPersonalInfo.NewCard.infoUrl.label'})}</b>
                            </td>
                            <td style={{padding: 5}}><Field name="infoUrl" component={renderTextFieldWithoutHelper}/>
                            </td>
                            <td>
                                <div/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3} style={{paddingBottom: 20}}><Divider/></td>
                        </tr>
                        {
                            (error && error.err) && (<tr>
                                <td colSpan={3} style={{color:"#69000C", fontSize: "12px"}}>{error.err}</td>
                            </tr>)
                        }
                        <tr>
                            <td colSpan={3}>
                                <ButtonBorderPrimary type="button" style={{width: 220}} onClick={this.handleReset}>
                                    {intl.formatMessage({id: 'Profile.NewCard.btnClear'})}
                                </ButtonBorderPrimary>&nbsp;&nbsp;&nbsp;
                                <ButtonBorderPrimary type="submit" disabled={invalid || pristine || submitting}
                                                     style={{width: 220}}>
                                    {intl.formatMessage({id: 'Profile.NewCard.btnCreate'})}
                                </ButtonBorderPrimary>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </Paper>
        )
    }
}

NewCard = reduxForm({
    form: 'ProfileArtistPersonalInfoNewCardForm',
    validate
})(NewCard)

injectIntl(withStyles(profileGeneral)(NewCard))


class EditCard extends React.Component {
    state = {
        l: '',
        readOnlyComp: false
    }
    handleChangeLang = event => {
        this.setState({
            l: event.target.value
        })
    }
    handleSubmitUpdate = values => {
        const {goSubmitUpdate, lang, user, profile, session, indexCard} = this.props;
        let langSel = profile.listPersonalInfo[indexCard].l;
        goSubmitUpdate(values, langSel, lang, user, profile, session)
    }

    componentDidMount() {
        const {profile, lang, indexCard} = this.props;
        if (profile && profile.listPersonalInfo && profile.listPersonalInfo.length > indexCard) {
            let nationIdTypeValue = {
                value: profile.listPersonalInfo[indexCard].nationIdType,
                label: getDictNationIdTypeLabel(lang, profile.listPersonalInfo[indexCard].nationIdType)
            }
            let countryValue = {
                value: profile.listPersonalInfo[indexCard].country,
                label: getDictCountryLabel(lang, profile.listPersonalInfo[indexCard].country)
            }
            this.props.dispatch(change("ProfileArtistPersonalInfoEditCardForm", "firstName", profile.listPersonalInfo[indexCard].firstName));
            this.props.dispatch(change("ProfileArtistPersonalInfoEditCardForm", "middleName", profile.listPersonalInfo[indexCard].middleName));
            this.props.dispatch(change("ProfileArtistPersonalInfoEditCardForm", "lastName", profile.listPersonalInfo[indexCard].lastName));
            this.props.dispatch(change("ProfileArtistPersonalInfoEditCardForm", "birthday", profile.listPersonalInfo[indexCard].birthday));
            this.props.dispatch(change("ProfileArtistPersonalInfoEditCardForm", "nationIdType", nationIdTypeValue));
            this.props.dispatch(change("ProfileArtistPersonalInfoEditCardForm", "nationIdSeria", profile.listPersonalInfo[indexCard].nationIdSeria));
            this.props.dispatch(change("ProfileArtistPersonalInfoEditCardForm", "nationIdNumber", profile.listPersonalInfo[indexCard].nationIdNumber));
            this.props.dispatch(change("ProfileArtistPersonalInfoEditCardForm", "country", countryValue));
            this.props.dispatch(change("ProfileArtistPersonalInfoEditCardForm", "addr", profile.listPersonalInfo[indexCard].addr));
            this.props.dispatch(change("ProfileArtistPersonalInfoEditCardForm", "billingAddr", profile.listPersonalInfo[indexCard].billingAddr));
            this.props.dispatch(change("ProfileArtistPersonalInfoEditCardForm", "infoUrl", profile.listPersonalInfo[indexCard].infoUrl));
        }
    }

    handleReset() {

    }

    render() {
        const {classes, intl, lang, user, profile, pristine, invalid, submitting, handleSubmit, error, indexCard} = this.props;
        let nationIdTypeValue = {
            value: profile.listPersonalInfo[indexCard].nationIdType,
            label: getDictNationIdTypeLabel(lang, profile.listPersonalInfo[indexCard].nationIdType)
        }
        let countryValue = {
            value: profile.listPersonalInfo[indexCard].country,
            label: getDictCountryLabel(lang, profile.listPersonalInfo[indexCard].country)
        }
        return (
            <Paper style={{marginTop: 10, padding: 10, backgroundColor: '#fbfbfb'}}>
                <form className={classes.container} onSubmit={handleSubmit(this.handleSubmitUpdate)}>
                    <table style={{width: '100%'}}>
                        <tbody>
                        <tr>
                            <td style={{width: '5%', padding: 5, whiteSpace: "nowrap"}}>
                                <b>{intl.formatMessage({id: 'Profile.EditCard.l.label'})}</b></td>
                            <td style={{width: '5%', padding: 5}}>
                                <div>{profile.listPersonalInfo[indexCard].l}</div>
                            </td>
                            <td style={{width: '90%'}}>
                                <div/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}><Divider/></td>
                        </tr>
                        <tr>
                            <td colSpan={3}>
                                <div style={{marginTop: 15, marginLeft:30, color: "#7b7b7b"}}>{intl.formatMessage({id: 'ProfileArtistPersonalInfo.EditCard.block.personalInfo.label'})}</div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}><Divider/></td>
                        </tr>
                        <tr>
                            <td style={{width: '5%', padding: 5, whiteSpace: "nowrap"}}>
                                <b>{intl.formatMessage({id: 'Profile.EditCard.firstName.label'})}<ReqSymbol/></b></td>
                            <td style={{width: '5%', padding: 5}}><Field name="firstName"
                                                                         component={renderTextFieldWithoutHelper}/></td>
                            <td style={{width: '90%'}}>
                                <div/>
                            </td>
                        </tr>
                        <tr>
                            <td style={{padding: 5, whiteSpace: "nowrap"}}>
                                <b>{intl.formatMessage({id: 'Profile.EditCard.middleName.label'})}</b>
                            </td>
                            <td style={{padding: 5}}><Field name="middleName" component={renderTextFieldWithoutHelper}/>
                            </td>
                            <td>
                                <div/>
                            </td>
                        </tr>
                        <tr>
                            <td style={{padding: 5, whiteSpace: "nowrap"}}>
                                <b>{intl.formatMessage({id: 'Profile.EditCard.lastName.label'})}<ReqSymbol/></b>
                            </td>
                            <td style={{padding: 5}}><Field name="lastName" component={renderTextFieldWithoutHelper}/>
                            </td>
                            <td>
                                <div/>
                            </td>
                        </tr>
                        <tr>
                            <td style={{padding: 5, whiteSpace: "nowrap"}}>
                                <b>{intl.formatMessage({id: 'ProfileArtistPersonalInfo.EditCard.birthday.label'})}<ReqSymbol/></b>
                            </td>
                            <td style={{padding: 5}}><Field name="birthday" component={renderDateFieldWithoutHelper}/></td>
                            <td>
                                <div/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}>
                                <div style={{marginTop: 15, marginLeft:30, color: "#7b7b7b"}}>{intl.formatMessage({id: 'ProfileArtistPersonalInfo.EditCard.block.nationId.label'})}</div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}><Divider/></td>
                        </tr>
                        <tr>
                            <td style={{padding: 5, whiteSpace: "nowrap"}}>
                                <b>{intl.formatMessage({id: 'ProfileArtistPersonalInfo.EditCard.nationIdType.label'})}<ReqSymbol/></b>
                            </td>
                            <td style={{padding: 5}}><Field name="nationIdType" component={renderSelectNationIdType}
                                                            lang={lang} defValue={nationIdTypeValue} selChange={value => {
                                this.props.dispatch(change("ProfileArtistPersonalInfoEditCardForm", "nationIdType", value))
                            }} selBlur={value => {
                                this.props.dispatch(change("ProfileArtistPersonalInfoEditCardForm", "nationIdType", value))
                            }} readOnlyComp={this.state.readOnlyComp}/></td>
                            <td>
                                <div/>
                            </td>
                        </tr>
                        <tr>
                            <td style={{padding: 5, whiteSpace: "nowrap"}}>
                                <b>{intl.formatMessage({id: 'ProfileArtistPersonalInfo.EditCard.nationIdSeria.label'})}</b>
                            </td>
                            <td style={{padding: 5}}><Field name="nationIdSeria"
                                                            component={renderTextFieldWithoutHelper} fieldWidth={200}/></td>
                            <td>
                                <div/>
                            </td>
                        </tr>
                        <tr>
                            <td style={{padding: 5, whiteSpace: "nowrap"}}>
                                <b>{intl.formatMessage({id: 'ProfileArtistPersonalInfo.EditCard.nationIdNumber.label'})}<ReqSymbol/></b>
                            </td>
                            <td style={{padding: 5}}><Field name="nationIdNumber"
                                                            component={renderTextFieldWithoutHelper} fieldWidth={200}/></td>
                            <td>
                                <div/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}>
                                <div style={{marginTop: 15, marginLeft:30, color: "#7b7b7b"}}>{intl.formatMessage({id: 'ProfileArtistPersonalInfo.EditCard.block.addr.label'})}</div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}><Divider/></td>
                        </tr>
                        <tr>
                            <td style={{padding: 5, whiteSpace: "nowrap"}}>
                                <b>{intl.formatMessage({id: 'ProfileArtistPersonalInfo.EditCard.country.label'})}<ReqSymbol/></b>
                            </td>
                            <td style={{padding: 5}}><Field name="country" component={renderSelectCountry} lang={lang}
                                                            defValue={countryValue}
                                                            selChange={value => {
                                                                this.props.dispatch(change("ProfileArtistPersonalInfoEditCardForm", "country", value))
                                                            }} selBlur={value => {
                                this.props.dispatch(change("ProfileArtistPersonalInfoEditCardForm", "country", value))
                            }}/></td>
                            <td>
                                <div/>
                            </td>
                        </tr>
                        <tr>
                            <td style={{padding: 5, whiteSpace: "nowrap"}}>
                                <b>{intl.formatMessage({id: 'ProfileArtistPersonalInfo.EditCard.addr.label'})}</b></td>
                            <td style={{padding: 5}}><Field name="addr" component={renderTextFieldWithoutHelper}
                                                            fieldWidth={600}/></td>
                            <td>
                                <div/>
                            </td>
                        </tr>
                        <tr>
                            <td style={{padding: 5, whiteSpace: "nowrap"}}>
                                <b>{intl.formatMessage({id: 'ProfileArtistPersonalInfo.EditCard.billingAddr.label'})}</b>
                            </td>
                            <td style={{padding: 5}}><Field name="billingAddr" component={renderTextFieldWithoutHelper}
                                                            fieldWidth={600}/></td>
                            <td>
                                <div/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}>
                                <div style={{marginTop: 15, marginLeft:30, color: "#7b7b7b"}}>{intl.formatMessage({id: 'ProfileArtistPersonalInfo.EditCard.block.addInfo.label'})}</div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}><Divider/></td>
                        </tr>
                        <tr>
                            <td style={{padding: 5, whiteSpace: "nowrap"}}>
                                <b>{intl.formatMessage({id: 'ProfileArtistPersonalInfo.EditCard.infoUrl.label'})}</b>
                            </td>
                            <td style={{padding: 5}}><Field name="infoUrl" component={renderTextFieldWithoutHelper}/>
                            </td>
                            <td>
                                <div/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3} style={{paddingBottom: 20}}><Divider/></td>
                        </tr>
                        {
                            (error && error.err) && (<tr>
                                <td colSpan={3} style={{color:"#69000C", fontSize: "12px"}}>{error.err}</td>
                            </tr>)
                        }
                        <tr>
                            <td colSpan={3}>
                                <ButtonBorderPrimary type="button" style={{width: 220}} onClick={this.handleReset}>
                                    {intl.formatMessage({id: 'Profile.EditCard.btnClear'})}
                                </ButtonBorderPrimary>&nbsp;&nbsp;&nbsp;
                                <ButtonBorderPrimary type="submit" disabled={invalid || pristine || submitting}
                                                     style={{width: 220}}>
                                    {intl.formatMessage({id: 'Profile.EditCard.btnCreate'})}
                                </ButtonBorderPrimary>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </Paper>
        )
    }
}

EditCard = reduxForm({
    form: 'ProfileArtistPersonalInfoEditCardForm',
    validate
})(EditCard)

injectIntl(withStyles(profileGeneral)(EditCard))





class ProfileArtistPersonalInfo extends React.Component {
    state = {
        value: 0,
    }

    handleChange = (event, value) => {
        this.setState({value});
    }

    componentDidMount() {
        const {lang} = this.props;
    }

    render() {
        const {classes, intl, lang, user, profile} = this.props;
        const {value} = this.state;
        let listLangNew = getListLangForNewCard(profile)
        let tabCount = listLangNew.length;
        if (profile && profile.listPersonalInfo) {
            tabCount = tabCount + profile.listPersonalInfo.length
        }
        return (
            <div className={classes.root}>
                <Paper style={{backgroundColor: '#ebebeb'}}>
                    <Tabs value={value} onChange={this.handleChange} variant='scrollable'>
                        {tabCount > 1 && profile.listPersonalInfo.map((personalInfoData, index) => (
                            <Tab key={index} label={getDictLangsLabel(personalInfoData.l)}/>
                        ))}
                        {listLangNew.length > 0 && <Tab key={tabCount + 1} label={intl.formatMessage({id: 'Profile.NewCard.tab'})}/>}
                    </Tabs>
                </Paper>
                {(listLangNew.length > 0 && value === tabCount - 1) &&
                <NewCard {...this.props} submitCreate={() => console.log("Create")}/>}
                {(value < tabCount - 1 || listLangNew.length == 0) &&
                <EditCard {...this.props} indexCard={value} submitCreate={() => console.log("Edit")}/>}
            </div>
        );
    }
}

ProfileArtistPersonalInfo.propTypes = {
    classes: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired
};

export default injectIntl(withStyles(profileGeneral)(ProfileArtistPersonalInfo));
