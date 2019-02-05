import React from 'react'
import TopBarPrivateFunc from '../containers/TopBarPrivateFunc'
import {withStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import {injectIntl} from "react-intl"
import {pageDefault} from "../styles/ThemeDefault";
import BottomBarPrivate from "./BottomBarPrivate";
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {getDictCountryLabel, getDictLangsLabel, getDictNationIdTypeLabel, getMetricLengthTypes, getElementByLang} from "../dict/Dicts";

import {change, Field, reduxForm} from 'redux-form'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Divider from '@material-ui/core/Divider'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import ButtonBorderPrimary from './ButtonBorderPrimary';
import {backendBaseURL} from "../Utils";

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PanelUploadAction from "./PanelUploadAction";
import SelectPictureCreationTech from "./SelectPictureCreationTech";


const ReqSymbol = () => {
        return (
            <span style={{color:"#BF0025"}}>&nbsp;*</span>
        )
}

class PanelFile extends React.Component {
    state = {
        expansionPanelOpen: false,
        editNewValue: "",
        fileMediaValue: undefined
    }

    handleReset = () => {
        this.setState({
            expansionPanelOpen: false,
            disabledSave: true,
        });
    };
    handleEditCancel = () => {
        this.setState({
            expansionPanelOpen: false,
            disabledSave: true,
        });
    }
    handleEditUploadCancel = () => {
    }
    handleEditUploadSubmit = (uploadFile) => {
        const {profile, fieldName, fileMediaAttachType, input} = this.props
        const fileMedia = {
            attachType: fileMediaAttachType,
            href: backendBaseURL + "/files/" + uploadFile.id
        }
        this.setState({
            fileMediaValue: fileMedia
        })
        if (input && input.onChange) {
            input.onChange(fileMedia)
        }
    }
    handleEditUpload = () => {
        this.props.goUploadImage(this.props.lang, this.handleEditUploadCancel, this.handleEditUploadSubmit)
    }

    getSummaryValue = () => {
        const {intl} = this.props
        let fileMedia = this.state.fileMediaValue
        if (fileMedia) {
            return (
                <a href={fileMedia.href} target="_blank">
                    {intl.formatMessage({id: 'FileMedia.notEmpty'})}
                </a>
            )
        } else {
            return intl.formatMessage({id: 'FileMedia.empty'})
        }
    }

    getDetailValue = () => {
        let fileMedia = this.state.fileMediaValue
        if (fileMedia) {
            return (
                <div><a href={fileMedia.href} target="_blank"><img src={fileMedia.href}
                                                                   style={{height: 400, width: 'auto'}}/></a></div>
            )
        } else {
            return (
                <div/>
            )
        }
    }

    render() {
        const {classes, intl, user, profile, fieldLabel, fieldReq} = this.props;
        return (
            <ExpansionPanel expanded={this.state.expansionPanelOpen}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon onClick={() => {
                    this.setState({
                        expansionPanelOpen: !this.state.expansionPanelOpen
                    });
                }}/>}>
                    <table>
                        <tbody>
                        <tr>
                            <td className={classes.fieldSummaryName} style={{width: 300}}>
                                <b>{fieldLabel}{fieldReq && <ReqSymbol/>}</b>
                            </td>
                            <td className={classes.fieldSummaryValue}>
                                {this.getSummaryValue()}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.fieldDetails}>
                    {this.getDetailValue()}
                </ExpansionPanelDetails>
                <Divider/>
                <PanelUploadAction disabledSave={false} goCancel={this.handleEditCancel}
                                   goUpload={this.handleEditUpload}/>
            </ExpansionPanel>
        )
    }
}

PanelFile = injectIntl(withStyles(pageDefault)(PanelFile))

const getListLangForNewCard = (profile) => {
    return ['en']
}

const validate = (values, props) => {
    const {intl} = props;
    const errors = {}
    if (!values) return errors
    if (!values.name) {
        errors.name = intl.formatMessage({id: 'Picture.NewCard.name.err.empty'})
        if (!errors._error) errors._error = {err: errors.name}
    } else if (values.name.length < 2 || values.name.length > 100) {
        errors.name = intl.formatMessage({id: 'Picture.NewCard.name.err.bad'})
        if (!errors._error) errors._error = {err: errors.name}
    }
    if (!values.author) {
        errors.author = intl.formatMessage({id: 'Picture.NewCard.author.err.empty'})
        if (!errors._error) errors._error = {err: errors.author}
    } else if (values.author.length < 2 || values.author.length > 100) {
        errors.author = intl.formatMessage({id: 'Picture.NewCard.author.err.bad'})
        if (!errors._error) errors._error = {err: errors.author}
    }
    if (!values.description) {
        errors.description = intl.formatMessage({id: 'Picture.NewCard.description.err.empty'})
        if (!errors._error) errors._error = {err: errors.description}
    } else if (values.description.length < 20 || values.description.length > 1000) {
        errors.description = intl.formatMessage({id: 'Picture.NewCard.description.err.bad'})
        if (!errors._error) errors._error = {err: errors.description}
    }
    if (!values.imgFront) {
        errors.imgFront = intl.formatMessage({id: 'Picture.NewCard.imgFront.err.empty'})
        if (!errors._error) errors._error = {err: errors.imgFront}
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
        const {input, label, meta, classes, lang, selChange, fieldWidth, readOnlyComp, defValue} = this.props;
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
                <SelectPictureCreationTech id={input.name} lang={lang} input={input} selChange={selChange}
                                           defValue={defValue}/>
            )
        }
    }
}

class renderPanelFile extends React.Component {
    render() {
        const {input, label, meta, classes, lang, selChange, fieldWidth, readOnlyComp, defValue, fieldLabel, fileMediaAttachType, fieldReq} = this.props;
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
                <PanelFile {...input} id={input.name} lang={lang} input={input} selChange={selChange}
                           defValue={defValue} fieldLabel={fieldLabel} fileMediaAttachType={fileMediaAttachType}
                           goUploadImage={this.props.goUploadImage} fieldReq={fieldReq}/>
            )
        }
    }
}

class NewCard extends React.Component {
    state = {
        l: '',
        dimensionMetricValue: '',
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
    handleSubmitCreate = values => {
        const {goSubmitCreate, lang, user, profile, session} = this.props;
        let listLangNew = getListLangForNewCard(profile)
        let langSel = this.state.l;
        if (!langSel || langSel.length == 0) {
            langSel = listLangNew[0]
        }
        let dimensionMetricSel = this.state.dimensionMetricValue;
        if (!dimensionMetricSel || dimensionMetricSel.length == 0) {
            dimensionMetricSel = getMetricLengthTypes(lang)[0].key
        }
        goSubmitCreate(values, langSel, dimensionMetricSel, lang, user, profile, session)
    }

    componentDidMount() {
        const {profile, lang} = this.props;
        if (profile && profile.listPersonalInfo && profile.listPersonalInfo.length > 0) {
            let personalInfo = getElementByLang(profile.listPersonalInfo, lang)
            this.props.dispatch(change("PictureNewCardForm", "author", personalInfo.firstName+" "+personalInfo.lastName));
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
        let dimensionMetricSel = this.state.dimensionMetricValue;
        if (!dimensionMetricSel || dimensionMetricSel.length == 0) {
            dimensionMetricSel = getMetricLengthTypes(lang)[0].key
        }

        return (
            <Paper style={{margin: 30, padding: 30, backgroundColor: '#fbfbfb'}}>
                <form className={classes.container} onSubmit={handleSubmit(this.handleSubmitCreate)}>
                    <table style={{width: '100%'}}>
                        <tbody>
                        <tr>
                            <td style={{width: '5%', padding: 5, whiteSpace: "nowrap"}}>
                                <div style={{width: 300}}><b>{intl.formatMessage({id: 'Picture.NewCard.l.label'})}</b>
                                </div>
                            </td>
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
                                <div style={{marginTop: 15, marginLeft:30, color: "#7b7b7b"}}>{intl.formatMessage({id: 'Picture.NewCard.block.main.label'})}</div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}><Divider/></td>
                        </tr>
                        <tr>
                            <td style={{width: '5%', padding: 5, whiteSpace: "nowrap"}}>
                                <b>{intl.formatMessage({id: 'Picture.NewCard.name.label'})}<ReqSymbol/></b></td>
                            <td style={{width: '5%', padding: 5}}><Field name="name"
                                                                         component={renderTextFieldWithoutHelper}
                                                                         fieldWidth={600}/></td>
                            <td style={{width: '90%'}}>
                                <div/>
                            </td>
                        </tr>
                        <tr>
                            <td style={{padding: 5, whiteSpace: "nowrap"}}>
                                <b>{intl.formatMessage({id: 'Picture.NewCard.author.label'})}<ReqSymbol/></b>
                            </td>
                            <td style={{padding: 5}}><Field name="author" component={renderTextFieldWithoutHelper} readOnlyComp={true}/>
                            </td>
                            <td>
                                <div/>
                            </td>
                        </tr>
                        <tr>
                            <td style={{padding: 5, whiteSpace: "nowrap"}}>
                                <b>{intl.formatMessage({id: 'Picture.NewCard.dateCreate.label'})}</b>
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
                                <b>{intl.formatMessage({id: 'Picture.NewCard.description.label'})}<ReqSymbol/></b>
                            </td>
                            <td style={{padding: 5}}><Field name="description" component={renderTextMultilineFieldWithoutHelper} fieldWidth={600}/>
                            </td>
                            <td>
                                <div/>
                            </td>
                        </tr>
                        <tr>
                            <td style={{padding: 5, whiteSpace: "nowrap"}}>
                                <b>{intl.formatMessage({id: 'Picture.NewCard.creationTech.label'})}</b>
                            </td>
                            <td style={{padding: 5}}><Field name="creationTech"
                                                            component={renderSelectPictureCreationTech}
                                                            lang={lang} selChange={value => {
                                this.props.dispatch(change("PictureNewCardForm", "creationTech", value))
                            }} readOnlyComp={this.state.readOnlyComp}/>
                            </td>
                            <td>
                                <div/>
                            </td>
                        </tr>
                        <tr>
                            <td style={{padding: 5, whiteSpace: "nowrap", verticalAlign: "top"}}>
                                <b>{intl.formatMessage({id: 'Picture.NewCard.concept.label'})}</b>
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
                                <b>{intl.formatMessage({id: 'Picture.NewCard.resume.label'})}</b>
                            </td>
                            <td style={{padding: 5}}><Field name="resume" component={renderTextMultilineFieldWithoutHelper} fieldWidth={600}/>
                            </td>
                            <td>
                                <div/>
                            </td>
                        </tr>
                        <tr>
                            <td style={{padding: 5, whiteSpace: "nowrap"}}>
                                <b>{intl.formatMessage({id: 'Picture.NewCard.dimension.label'})}</b>
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
                                <b>{intl.formatMessage({id: 'Picture.NewCard.count.label'})}</b>
                            </td>
                            <td style={{padding: 5}}><Field name="count" component={renderTextFieldWithoutHelper}
                                                            fieldWidth={100}/>
                            </td>
                            <td>
                                <div/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}>
                                <div style={{marginTop: 15, marginLeft:30, color: "#7b7b7b"}}>{intl.formatMessage({id: 'Picture.NewCard.block.photo.label'})}</div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}><Divider/></td>
                        </tr>
                        <tr>
                            <td colSpan={3}><Field name="imgFront" component={renderPanelFile} selChange={value => {
                                this.props.dispatch(change("PictureNewCardForm", "imgFront", value))
                            }} fieldLabel={intl.formatMessage({id: 'Picture.NewCard.imgFront.label'})}
                                                   fileMediaAttachType="imgFront"
                                                   goUploadImage={this.props.goUploadImage} fieldReq={true}/></td>
                        </tr>
                        <tr>
                            <td colSpan={3}><Field name="imgBack" component={renderPanelFile} selChange={value => {
                                this.props.dispatch(change("PictureNewCardForm", "imgBack", value))
                            }} fieldLabel={intl.formatMessage({id: 'Picture.NewCard.imgBack.label'})}
                                                   fileMediaAttachType="imgBack"
                                                   goUploadImage={this.props.goUploadImage}/></td>
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
                                    {intl.formatMessage({id: 'Picture.NewCard.btnClear'})}
                                </ButtonBorderPrimary>&nbsp;&nbsp;&nbsp;
                                <ButtonBorderPrimary type="submit" disabled={invalid || pristine || submitting}
                                                     style={{width: 220}}>
                                    {intl.formatMessage({id: 'Picture.NewCard.btnCreate'})}
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
    form: 'PictureNewCardForm',
    validate
})(NewCard)

injectIntl(withStyles(pageDefault)(NewCard))


class PictureNewPage extends React.Component {

    componentDidMount() {
        const {lang} = this.props;
    }

    render() {
        const {classes, intl, lang} = this.props;
        return (
            <div className={classes.root}>
                <TopBarPrivateFunc visibleHome={true} lang={lang}/>
                <Typography variant="h4" className={classes.title}
                            style={{marginLeft: 30, marginTop: 20, marginBottom: 10}}>
                    {intl.formatMessage({id: 'PictureNewPage.title'})}
                </Typography>
                <NewCard {...this.props}/>
                <div style={{width: 20, height: 20}}></div>
                <BottomBarPrivate lang={lang}/>
            </div>
        );
    }
}

PictureNewPage.propTypes = {
    classes: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired
};

export default injectIntl(withStyles(pageDefault)(PictureNewPage));