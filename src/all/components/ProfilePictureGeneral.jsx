import React from 'react'
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import {
    getDictCountryLabel,
    getDictLangs,
    getDictLangsLabel,
    getDictNationIdTypeLabel,
    getPictureCreationTechKey,
    getMetricLengthTypes
} from '../dict/Dicts'
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
import SelectPictureCreationTech from "./SelectPictureCreationTech";

const ReqSymbol = () => {
    return (
        <span style={{color:"#BF0025"}}>&nbsp;*</span>
    )
}

const getListLangForNewCard = (dbValues) => {
    if (dbValues && dbValues.listValue[0].info && dbValues.listValue[0].info.length > 0) {
        let res = []
        getDictLangs().map(langData => {
            if (langData.active) {
                let flPush = true
                dbValues.listValue[0].info.map(langPIData => {
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
    if (!values) return errors
    if (!values.name) {
        errors.name = intl.formatMessage({id: 'ProfilePictureGeneral.EditCard.name.err.empty'})
        if (!errors._error) errors._error = {err: errors.name}
    } else if (values.name.length < 2 || values.name.length > 100) {
        errors.name = intl.formatMessage({id: 'ProfilePictureGeneral.EditCard.name.err.bad'})
        if (!errors._error) errors._error = {err: errors.name}
    }
    if (!values.author) {
        errors.author = intl.formatMessage({id: 'ProfilePictureGeneral.EditCard.author.err.empty'})
        if (!errors._error) errors._error = {err: errors.author}
    } else if (values.author.length < 2 || values.author.length > 100) {
        errors.author = intl.formatMessage({id: 'ProfilePictureGeneral.EditCard.author.err.bad'})
        if (!errors._error) errors._error = {err: errors.author}
    }
    if (!values.description) {
        errors.description = intl.formatMessage({id: 'ProfilePictureGeneral.EditCard.description.err.empty'})
        if (!errors._error) errors._error = {err: errors.description}
    } else if (values.description.length < 20 || values.description.length > 1000) {
        errors.description = intl.formatMessage({id: 'ProfilePictureGeneral.EditCard.description.err.bad'})
        if (!errors._error) errors._error = {err: errors.description}
    }
    return errors
}

const saveChangedFlag = {
    _warning: {warn: 'Change'}
}

const warn = (values, props) => {
    const {intl,dbValues,indexCard} = props;
    const warnings = {}
    if (!values || !values.name) return warnings
    if(dbValues) {
        const dbValue = dbValues.listValue[0]
        const dbPicture = dbValues.listPicture[0]
        if(values.name!=dbValue.info[indexCard].name){
            return saveChangedFlag
        }
        if(values.dateCreate!=dbPicture.dateCreate){
            return saveChangedFlag
        }
        if(values.description!=dbPicture.info[indexCard].description){
            return saveChangedFlag
        }
        if(dbPicture.info[indexCard].creationTech){
            if(!values.creationTech || values.creationTech==null) {
                return saveChangedFlag
            } else if(values.creationTech.label!=dbPicture.info[indexCard].creationTech){
                return saveChangedFlag
            }
        } else {
            if(values.creationTech && values.creationTech!=null){
                return saveChangedFlag
            }
        }
        if(values.concept!=dbPicture.info[indexCard].concept){
            return saveChangedFlag
        }
        if(values.resume!=dbPicture.info[indexCard].resume){
            return saveChangedFlag
        }
        if(dbPicture.dimension && dbPicture.dimension.length>0){
            if(!values.dimensionH || !values.dimensionW){
                return saveChangedFlag
            } else {
                if(dbPicture.dimension[0].w!=values.dimensionW || dbPicture.dimension[0].h!=values.dimensionH){
                    return saveChangedFlag
                }
            }
        } else {
            if(values.dimensionH && values.dimensionW){
                return saveChangedFlag
            }
        }
        if(values.count!=dbPicture.count){
            return saveChangedFlag
        }
    }
    return warnings
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

class renderTextMultilineFieldWithoutHelper extends React.Component {
    render() {
        const {input, label, meta, classes, fieldWidth, readOnlyComp, rowsMaxValue} = this.props;
        let fieldWidthValue = 400
        if (fieldWidth) {
            fieldWidthValue = fieldWidth
        }
        let rowsMaxReal = 10
        if(rowsMaxValue){
            rowsMaxReal =  rowsMaxValue
        }
        if (readOnlyComp) {
            return (
                <OutlinedInput id={input.name}   {...input} margin='none' labelWidth={0}
                               style={{width: fieldWidthValue}} multiline rowsMax={rowsMaxReal}
                               inputProps={{style: {paddingTop: 8, paddingBottom: 8}}} readOnly={true}/>
            )
        } else {
            return (
                <OutlinedInput id={input.name}   {...input} margin='none' labelWidth={0}
                               style={{width: fieldWidthValue}} multiline rowsMax={rowsMaxReal}
                               inputProps={{style: {paddingTop: 8, paddingBottom: 8}}}/>
            )
        }
    }
}

class renderSelectPictureCreationTech extends React.Component {
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
                <SelectPictureCreationTech id={input.name} lang={lang} input={input} selChange={selChange} selBlur={selBlur}
                                           defValue={defValue}/>
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
    handleChangeDimensionMetric = event => {
        this.setState({
            dimensionMetricValue: event.target.value
        })
    }
    handleSubmitUpdate = values => {
        const {goSubmitUpdate, lang, user, profile, session, indexCard, dbValues} = this.props;
        let langSel = dbValues.listValue[0].info[indexCard].l;
        let dimensionMetricSel = this.state.dimensionMetricValue;
        if (!dimensionMetricSel || dimensionMetricSel.length == 0) {
            dimensionMetricSel = getMetricLengthTypes(lang)[0].key
        }
        goSubmitUpdate(values, langSel, lang, user, profile, session, dbValues, dimensionMetricSel)
    }

    componentDidMount() {
        const {dbValues, lang, indexCard} = this.props;
        if (dbValues && dbValues.listValue[0].info.length > indexCard) {
            const dbValue = dbValues.listValue[0]
            const dbPicture = dbValues.listPicture[0]
            let creationTechValue = {
                value: dbPicture.info[indexCard].creationTech,
                label: getPictureCreationTechKey(lang, dbPicture.info[indexCard].creationTech)
            }
            this.props.dispatch(change("ProfilePictureGeneralEditCardForm", "name", dbValue.info[indexCard].name));
            this.props.dispatch(change("ProfilePictureGeneralEditCardForm", "author", dbPicture.info[indexCard].author));
            if(dbPicture.dateCreate) this.props.dispatch(change("ProfilePictureGeneralEditCardForm", "dateCreate", dbPicture.dateCreate));
            if(dbPicture.info[indexCard].description) this.props.dispatch(change("ProfilePictureGeneralEditCardForm", "description", dbPicture.info[indexCard].description));
            this.props.dispatch(change("ProfilePictureGeneralEditCardForm", "creationTech", creationTechValue));
            if(dbPicture.info[indexCard].concept) this.props.dispatch(change("ProfilePictureGeneralEditCardForm", "concept", dbPicture.info[indexCard].concept));
            if(dbPicture.info[indexCard].resume) this.props.dispatch(change("ProfilePictureGeneralEditCardForm", "resume", dbPicture.info[indexCard].resume));
            if(dbPicture.dimension && dbPicture.dimension.length>0){
                this.props.dispatch(change("ProfilePictureGeneralEditCardForm", "dimensionH", dbPicture.dimension[0].h));
                this.props.dispatch(change("ProfilePictureGeneralEditCardForm", "dimensionW", dbPicture.dimension[0].w));
                this.setState({dimensionMetricValue: dbPicture.dimension[0].metric})
            }
            if(dbPicture.count && dbPicture.count>0) this.props.dispatch(change("ProfilePictureGeneralEditCardForm", "count", dbPicture.count));
        }
    }

    handleReset() {

    }

    render() {
        const {classes, intl, lang, user, profile, pristine, invalid, submitting, handleSubmit, error, warning, indexCard, dbValues} = this.props;
        let dimensionMetricSel = this.state.dimensionMetricValue;
        if (!dimensionMetricSel || dimensionMetricSel.length == 0) {
            dimensionMetricSel = getMetricLengthTypes(lang)[0].key
        }

        const dbValue = dbValues.listValue[0]
        const dbPicture = dbValues.listPicture[0]
        let creationTechValue = {
            value: dbPicture.info[indexCard].creationTech,
            label: getPictureCreationTechKey(lang, dbPicture.info[indexCard].creationTech)
        }
        let disableSaveChanged = true
        if(warning && warning.warn){
            disableSaveChanged = false
        } else if(dbPicture.dimension && dbPicture.dimension.length>0 && dbPicture.dimension[0].metric!=dimensionMetricSel){
            disableSaveChanged = false
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
                                <div>{dbValue.info[indexCard].l}</div>
                            </td>
                            <td style={{width: '90%'}}>
                                <div/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}><Divider/></td>
                        </tr>
                        <tr>
                            <td style={{width: '5%', padding: 5, whiteSpace: "nowrap"}}>
                                <b>{intl.formatMessage({id: 'ProfilePictureGeneral.EditCard.name.label'})}<ReqSymbol/></b></td>
                            <td style={{width: '5%', padding: 5}}><Field name="name"
                                                                         component={renderTextFieldWithoutHelper}
                                                                         fieldWidth={600}/></td>
                            <td style={{width: '90%'}}>
                                <div/>
                            </td>
                        </tr>
                        <tr>
                            <td style={{padding: 5, whiteSpace: "nowrap"}}>
                                <b>{intl.formatMessage({id: 'ProfilePictureGeneral.EditCard.author.label'})}<ReqSymbol/></b>
                            </td>
                            <td style={{padding: 5}}><Field name="author" component={renderTextFieldWithoutHelper} readOnlyComp={true}/>
                            </td>
                            <td>
                                <div/>
                            </td>
                        </tr>
                        <tr>
                            <td style={{padding: 5, whiteSpace: "nowrap"}}>
                                <b>{intl.formatMessage({id: 'ProfilePictureGeneral.EditCard.dateCreate.label'})}</b>
                            </td>
                            <td style={{padding: 5}}><Field name="dateCreate" component={renderTextFieldWithoutHelper}
                                                            fieldWidth={200}/>
                            </td>
                            <td>
                                <div/>
                            </td>
                        </tr>
                        <tr>
                            <td style={{padding: 5, whiteSpace: "nowrap", verticalAlign: "top"}}>
                                <b>{intl.formatMessage({id: 'ProfilePictureGeneral.EditCard.description.label'})}<ReqSymbol/></b>
                            </td>
                            <td style={{padding: 5}}><Field name="description" component={renderTextMultilineFieldWithoutHelper} fieldWidth={600}/>
                            </td>
                            <td>
                                <div/>
                            </td>
                        </tr>
                        <tr>
                            <td style={{padding: 5, whiteSpace: "nowrap"}}>
                                <b>{intl.formatMessage({id: 'ProfilePictureGeneral.EditCard.creationTech.label'})}</b>
                            </td>
                            <td style={{padding: 5}}><Field name="creationTech"
                                                            component={renderSelectPictureCreationTech}
                                                            lang={lang} defValue={creationTechValue} selChange={value => {
                                this.props.dispatch(change("ProfilePictureGeneralEditCardForm", "creationTech", value))
                            }} selBlur={value => {
                                this.props.dispatch(change("ProfilePictureGeneralEditCardForm", "creationTech", value))
                            }} readOnlyComp={this.state.readOnlyComp}/>
                            </td>
                            <td>
                                <div/>
                            </td>
                        </tr>
                        <tr>
                            <td style={{padding: 5, whiteSpace: "nowrap", verticalAlign: "top"}}>
                                <b>{intl.formatMessage({id: 'ProfilePictureGeneral.EditCard.concept.label'})}</b>
                            </td>
                            <td style={{padding: 5}}><Field name="concept" component={renderTextMultilineFieldWithoutHelper}
                                                            fieldWidth={600}/>
                            </td>
                            <td>
                                <div/>
                            </td>
                        </tr>
                        <tr>
                            <td style={{padding: 5, whiteSpace: "nowrap", verticalAlign: "top"}}>
                                <b>{intl.formatMessage({id: 'ProfilePictureGeneral.EditCard.resume.label'})}</b>
                            </td>
                            <td style={{padding: 5}}><Field name="resume" component={renderTextMultilineFieldWithoutHelper} fieldWidth={600}/>
                            </td>
                            <td>
                                <div/>
                            </td>
                        </tr>
                        <tr>
                            <td style={{padding: 5, whiteSpace: "nowrap"}}>
                                <b>{intl.formatMessage({id: 'ProfilePictureGeneral.EditCard.dimension.label'})}</b>
                            </td>
                            <td style={{padding: 5}}>
                                <table>
                                    <tbody>
                                    <tr>
                                        <td><Field name="dimensionH" component={renderTextFieldWithoutHelper}
                                                   fieldWidth={100}/></td>
                                        <td>&nbsp;&nbsp;X&nbsp;&nbsp;</td>
                                        <td><Field name="dimensionW" component={renderTextFieldWithoutHelper}
                                                   fieldWidth={100}/></td>
                                        <td>&nbsp;&nbsp;</td>
                                        <td><Select value={dimensionMetricSel}
                                                    onChange={this.handleChangeDimensionMetric} displayEmpty
                                                    name="dimensionMetric"
                                                    className={classes.selectDimensionMetric}>
                                            {getMetricLengthTypes(lang).map((arrElement, index) => {
                                                return (<MenuItem key={index}
                                                                  value={arrElement.key}>{arrElement.label}</MenuItem>)
                                            })}
                                        </Select>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td>
                                <div/>
                            </td>
                        </tr>
                        <tr>
                            <td style={{padding: 5, whiteSpace: "nowrap"}}>
                                <b>{intl.formatMessage({id: 'ProfilePictureGeneral.EditCard.count.label'})}</b>
                            </td>
                            <td style={{padding: 5}}><Field name="count" component={renderTextFieldWithoutHelper}
                                                            fieldWidth={100}/>
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
                                <ButtonBorderPrimary type="submit" disabled={invalid || pristine || submitting || disableSaveChanged}
                                                     style={{width: 220}}>
                                    {intl.formatMessage({id: 'ProfilePictureGeneral.EditCard.btnSave'})}
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
    form: 'ProfilePictureGeneralEditCardForm',
    validate,
    warn
})(EditCard)

injectIntl(withStyles(profileGeneral)(EditCard))





class ProfilePictureGeneral extends React.Component {
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
        const {classes, intl, lang, user, profile, dbValues} = this.props;
        const {value} = this.state;
        let listLangNew = getListLangForNewCard(dbValues)
        listLangNew = []
        let tabCount = listLangNew.length;
        let tabEditFlag = false
        if (dbValues && dbValues.listValue[0].info.length>0) {
            tabCount = tabCount + dbValues.listValue[0].info.length
            tabEditFlag = true
        }
        return (
            <div className={classes.root}>
                <Paper style={{backgroundColor: '#ebebeb'}}>
                    <Tabs value={value} onChange={this.handleChange} variant='scrollable'>
                        {tabEditFlag && dbValues.listValue[0].info.map((valueInfoData, index) => (
                            <Tab key={index} label={getDictLangsLabel(valueInfoData.l)}/>
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

ProfilePictureGeneral.propTypes = {
    classes: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired
};

export default injectIntl(withStyles(profileGeneral)(ProfilePictureGeneral));
