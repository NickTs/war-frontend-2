import React from 'react'
import TopBarPrivateFunc from '../containers/TopBarPrivateFunc'
import {withStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import {injectIntl} from "react-intl"
import {profileGeneral} from "../styles/ThemeDefault";
import BottomBarPrivate from "./BottomBarPrivate";
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import PanelEditAction from "./PanelEditAction";
import ReactDOM from "react-dom";
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import {getElementByLang} from '../dict/Dicts'

const getVerifyState = (classes, intl, lang, user, profile) => {
    if(profile){
        let personalInfo = getElementByLang(profile.listPersonalInfo, lang)
        return (
            <div>
                <table><tbody>
                <tr><td><div style={{color: '#69000C', fontSize: '32px', fontWeight: 'bold'}}>{personalInfo.firstName}&nbsp;{personalInfo.lastName}</div></td></tr>
                <tr><td><div style={{fontSize: '18px', fontWeight: 'bold'}}>{intl.formatMessage({id: 'ProfileArtistGeneral.userType.label'})} ({intl.formatMessage({id: 'VerifyStateType.'+profile.verifyState+'.label'})})</div></td></tr>
                <tr><td><div style={{color: '#7b7b7b', fontSize: '12px'}}>{profile.verifyMsg}</div></td></tr>
                </tbody></table>
            </div>
        )
    } else {
        return (
            <div>
                <table><tbody>
                <tr><td><div style={{color: '#69000C', fontSize: '32px', fontWeight: 'bold'}}>No&nbsp;Name</div></td></tr>
                <tr><td><div style={{fontSize: '18px', fontWeight: 'bold'}}>{intl.formatMessage({id: 'ProfileArtistGeneral.userType.label'})} ({intl.formatMessage({id: 'VerifyStateType.none.label'})})</div></td></tr>
                <tr><td><div style={{color: '#7b7b7b', fontSize: '12px'}}>{intl.formatMessage({id: 'VerifyStateType.none.msg'})}</div></td></tr>
                </tbody></table>
            </div>
        )
    }
}


class PanelEmail extends React.Component {
    state = {
        expansionPanelOpen: false,
        disabledSave: true,
        editNewValue: ""
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
    handleEditSave= () => {
        this.props.goTrap(this.props.lang,"Запрос отправлен администратору системы.")
        this.setState({
            expansionPanelOpen: false
        });
    }
    handleEditChange= (event) => {
        let disabledSaveValue = true
        if(event.target.value){
            if(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(event.target.value)){
                if(event.target.value!=this.props.user.email){
                    disabledSaveValue = false
                }
            }
        }
        this.setState({
            editNewValue: event.target.value,
            disabledSave: disabledSaveValue
        });
    }
    render() {
        const {classes, intl, user} = this.props;
        return (
            <ExpansionPanel expanded={this.state.expansionPanelOpen}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon onClick={() => {
                    this.setState({
                        expansionPanelOpen: !this.state.expansionPanelOpen
                    });
                }}/>}>
                    <table><tbody><tr>
                    <td className={classes.fieldSummaryName} style={{width: 200}}>
                        <b>{intl.formatMessage({id: 'ProfileArtistGeneral.email.label'})}:</b>
                    </td>
                    <td className={classes.fieldSummaryValue}>
                        {user.email}
                    </td>
                    </tr></tbody></table>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.fieldDetails}>
                    <div>
                        {intl.formatMessage({id: 'PanelEdit.newValue.label'})}: <TextField variant="outlined" style={{width:400}} onChange={(event)=>this.handleEditChange(event)}/>
                    </div>
                </ExpansionPanelDetails>
                <Divider />
                <PanelEditAction disabledSave={this.state.disabledSave} goCancel={()=>this.handleEditCancel()} goSave={()=>this.handleEditSave()}/>
            </ExpansionPanel>
        )
    }
}

class PanelPhone extends React.Component {
    state = {
        expansionPanelOpen: false,
        disabledSave: true,
        editNewValue: ""
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
    handleEditSave= () => {
        this.props.goTrap(this.props.lang,"Запрос отправлен администратору системы.")
        this.setState({
            expansionPanelOpen: false
        });
    }
    handleEditChange= (event) => {
        let disabledSaveValue = true
        if(event.target.value){
            if(event.target.value.length>=12 && event.target.value.replace(/\D+/g, "").length == 12){
                if(event.target.value!=this.props.user.phone){
                    disabledSaveValue = false
                }
            }
        }
        this.setState({
            editNewValue: event.target.value,
            disabledSave: disabledSaveValue
        });
    }
    render() {
        const {classes, intl, user} = this.props;
        return (
            <ExpansionPanel expanded={this.state.expansionPanelOpen}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon onClick={() => {
                    this.setState({
                        expansionPanelOpen: !this.state.expansionPanelOpen
                    });
                }}/>}>
                    <table><tbody><tr>
                        <td className={classes.fieldSummaryName} style={{width: 200}}>
                        <b>{intl.formatMessage({id: 'ProfileArtistGeneral.phone.label'})}:</b>
                    </td>
                    <td className={classes.fieldSummaryValue}>
                        {user.phone}
                    </td>
                    </tr></tbody></table>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.fieldDetails}>
                    <div>
                        {intl.formatMessage({id: 'PanelEdit.newValue.label'})}: <TextField variant="outlined" style={{width:400}} onChange={(event)=>this.handleEditChange(event)}/>
                    </div>
                </ExpansionPanelDetails>
                <Divider />
                <PanelEditAction disabledSave={this.state.disabledSave} goCancel={()=>this.handleEditCancel()} goSave={()=>this.handleEditSave()}/>
            </ExpansionPanel>
        )
    }
}

class PanelPassword extends React.Component {
    state = {
        expansionPanelOpen: false,
        disabledSave: true,
        editCurValue: "",
        editNewValue: "",
        editVerValue: ""
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
    handleEditSave= () => {
        this.props.goTrap(this.props.lang,"Запрос отправлен администратору системы.")
        this.setState({
            expansionPanelOpen: false
        });
    }
    checkValid= (editCurValue,editNewValue,editVerValue) => {
        let disabledSaveValue = true
        if(editCurValue && editNewValue && editVerValue && editCurValue.length>=8 && editNewValue.length>=8){
                if(editNewValue==editVerValue && editNewValue!=editCurValue){
                    disabledSaveValue = false
                }
        }
        this.setState({
            disabledSave: disabledSaveValue
        });
    }
    handleEditChangeCur= (event) => {
        this.setState({
            editCurValue: event.target.value,
        });
        this.checkValid(event.target.value, this.state.editNewValue, this.state.editVerValue)
    }
    handleEditChangeNew= (event) => {
        this.setState({
            editNewValue: event.target.value,
        });
        this.checkValid(this.state.editCurValue, event.target.value, this.state.editVerValue)
    }
    handleEditChangeVer= (event) => {
        this.setState({
            editVerValue: event.target.value,
        });
        this.checkValid(this.state.editCurValue, this.state.editNewValue, event.target.value)
    }

    render() {
        const {classes, intl, user} = this.props;
        return (
            <ExpansionPanel expanded={this.state.expansionPanelOpen}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon onClick={() => {
                    this.setState({
                        expansionPanelOpen: !this.state.expansionPanelOpen
                    });
                }}/>}>
                    <table><tbody><tr>
                        <td className={classes.fieldSummaryName} style={{width: 200}}>
                        <b>{intl.formatMessage({id: 'ProfileArtistGeneral.password.label'})}</b>
                    </td>
                    </tr></tbody></table>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.fieldDetails}>
                    <table><tbody>
                    <tr><td>
                        {intl.formatMessage({id: 'ProfileArtistGeneral.passwordCur.label'})}: <TextField variant="outlined" style={{width:400}} onChange={(event)=>this.handleEditChangeCur(event)}/>
                    </td></tr>
                    <tr><td>
                        {intl.formatMessage({id: 'ProfileArtistGeneral.passwordNew.label'})}: <TextField variant="outlined" style={{width:400}} onChange={(event)=>this.handleEditChangeNew(event)}/>
                    </td></tr>
                    <tr><td>
                        {intl.formatMessage({id: 'ProfileArtistGeneral.passwordVer.label'})}: <TextField variant="outlined" style={{width:400}} onChange={(event)=>this.handleEditChangeVer(event)}/>
                    </td></tr>
                    </tbody></table>
                </ExpansionPanelDetails>
                <Divider />
                <PanelEditAction disabledSave={this.state.disabledSave} goCancel={()=>this.handleEditCancel()} goSave={()=>this.handleEditSave()}/>
            </ExpansionPanel>
        )
    }
}


class PanelLang extends React.Component {
    state = {
        expansionPanelOpen: false,
        disabledSave: true,
        editNewValue: ""
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
    handleEditSave= () => {
        this.props.goTrap(this.props.lang,"Запрос отправлен администратору системы.")
        this.setState({
            expansionPanelOpen: false
        });
    }
    handleEditChange= (event) => {
        let disabledSaveValue = true
        if(event.target.value){
            if(event.target.value.length>=12 && event.target.value.replace(/\D+/g, "").length == 12){
                if(event.target.value!=this.props.user.phone){
                    disabledSaveValue = false
                }
            }
        }
        this.setState({
            editNewValue: event.target.value,
            disabledSave: disabledSaveValue
        });
    }
    render() {
        const {classes, intl, user} = this.props;
        return (
            <ExpansionPanel expanded={this.state.expansionPanelOpen}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon onClick={() => {
                    this.setState({
                        expansionPanelOpen: !this.state.expansionPanelOpen
                    });
                }}/>}>
                    <div className={classes.fieldSummaryName}>
                        {intl.formatMessage({id: 'ProfileArtistGeneral.phone.label'})}:
                    </div>
                    <div className={classes.fieldSummaryValue}>
                        {user.phone}
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.fieldDetails}>
                    <div>
                        {intl.formatMessage({id: 'ProfileArtistGeneral.lang.newValue.label'})}: <TextField variant="outlined" style={{width:400}} onChange={(event)=>this.handleEditChange(event)}/>
                    </div>
                </ExpansionPanelDetails>
                <Divider />
                <PanelEditAction disabledSave={this.state.disabledSave} goCancel={()=>this.handleEditCancel()} goSave={()=>this.handleEditSave()}/>
            </ExpansionPanel>
        )
    }
}


class ProfileArtistGeneral extends React.Component {
    componentDidMount() {
        const {lang} = this.props;
    }

    render() {
        const {classes, intl, lang, user, profile} = this.props;
        return (
            <div className={classes.root}>
                <Paper>
                <table><tbody><tr>
                    <td><div style={{margin: 15}}>
                        <img className={classes.img}
                             src={'/static/' + user.userType + '.png'}/>
                        </div>
                    </td>
                    <td>
                        {getVerifyState(classes, intl, lang, user, profile)}
                    </td>
                </tr></tbody></table>
                </Paper>
                <PanelEmail {...this.props}/>
                <PanelPhone {...this.props}/>
                <PanelPassword {...this.props}/>
            </div>
        );
    }
}

ProfileArtistGeneral.propTypes = {
    classes: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired
};

export default injectIntl(withStyles(profileGeneral)(ProfileArtistGeneral));
