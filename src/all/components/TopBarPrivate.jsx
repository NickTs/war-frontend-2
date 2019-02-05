import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import LanguageSelect from './LanguageSelect';
import {injectIntl} from "react-intl";
import {languageSelect, topBarPrivate} from "../styles/ThemeDefault";
import ExpandMore from '@material-ui/icons/ExpandMore'
import Person from '@material-ui/icons/PermIdentity'
import Search from '@material-ui/icons/Search'
import {getDictLangs} from "../dict/Dicts";
import Cookies from "universal-cookie";
import axiosBackendApi from "../axios/axiosBackendApi";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonOutline from '@material-ui/icons/PersonOutline'
import DirectionsRun from '@material-ui/icons/DirectionsRun'
import Close from '@material-ui/icons/Close'
import TextField from '@material-ui/core/TextField'

const renderMenuButton = (label, classes, goClick) => {
    return (
        <Button className={classes.menuButton} onClick={goClick}>
            {label}
        </Button>
    )
}

class TopBarPrivate extends React.Component {
    state = {
        anchorMenuPerson: null,
        showSearch: false,
        textSearch: ""
    }

    handleMenuPersonOpen = event => {
        this.setState({ anchorMenuPerson: event.currentTarget });
    };

    handleMenuPersonClose = () => {
        this.setState({ anchorMenuPerson: null });
    }

    handleMenuPersonProfile = () => {
        const {lang, user, goProfile} = this.props;
        this.setState({ anchorMenuPerson: null });
        goProfile(lang, user);
    }

    handleMenuPersonLogout = () => {
        const {lang, session} = this.props;
        this.setState({ anchorMenuPerson: null });
        const cookies = new Cookies();
        cookies.remove('jwt',{path: '/'})
        axiosBackendApi.get('auth/int/signout?jwt='+session.jwt, {
            headers: {
                "x-lang": lang,
                "Authorization": "Bearer "+session.jwt,
            }
        })
            .then(result => {
                document.location.href = '/public/'+lang
            })
            .catch((error) => {
                document.location.href = '/public/'+lang
            })
    }

    handleShowSearch = () => {
        this.setState(prevState => ({
            showSearch: true,
        }))
    }

    handleHiddenSearch = () => {
        this.setState(prevState => ({
            showSearch: false,
        }))
    }

    handleOnChangeSearch = event => {
        if (event && event.target && event.target.value) {
            this.setState({
                textSearch: event.target.value,
            })
        }
    }

    handleExecSearch(lang, textSearch) {
        if (textSearch && textSearch.length > 2) {
            document.location.href = "/private/" + lang + "/catalog/?find=" + textSearch
        }
    }


    render() {
        const {classes, intl, lang, user, profile, session, goHome, goUserValues, goOperations, goServices, goCatalog, goProfile, goSetting, goLogout} = this.props;
        if (this.state.showSearch) {
            return (
                <AppBar position="static" className={classes.bar}>
                    <Toolbar>
                        &nbsp;&nbsp;&nbsp;&nbsp;<img src="/static/logo.png" width="67" height="48"/>
                        <div style={{flexGrow: 1}}/>
                        {renderMenuButton(intl.formatMessage({id: 'TopBarPrivate.home.label'}), classes, () => goHome(lang))}
                        {renderMenuButton(intl.formatMessage({id: 'TopBarPrivate.userValues.label'}), classes, () => goUserValues(lang, user, profile, session))}
                        {renderMenuButton(intl.formatMessage({id: 'TopBarPrivate.services.label'}), classes, () => goServices(lang, user, profile))}
                        {renderMenuButton(intl.formatMessage({id: 'TopBarPrivate.values.label'}), classes, () => goCatalog(lang, user, profile))}
                        <div style={{flexGrow: 1}}/>
                        <div
                            style={{
                                padding: '3px 3px 3px 10px',
                                backgroundColor: '#FFFFFF',
                                borderRadius: 30,
                                border: '1px solid',
                                borderColor: '#000000',
                                fontSize: '16px',
                                whiteSpace: 'nowrap',
                                width: '250',
                                minWidth: '250',
                            }}>
                            <IconButton style={{margin: '3px 10px 0px 0px', padding: 0}}
                                        onClick={() => this.handleExecSearch(lang, this.state.textSearch)}>
                                <Search className={classes.icon}/>
                            </IconButton>
                            <TextField id="textSearch" style={{paddingTop: '3px', minWidth: '20px', flexGrow: 1}}
                                       InputProps={{disableUnderline: true}} onChange={(event) => this.handleOnChangeSearch(event)}
                                       onKeyPress={(ev) => {
                                           if (ev.key === 'Enter') {
                                               if (this.state.textSearch && this.state.textSearch.length > 2) {
                                                   document.location.href = "/private/" + lang + "/catalog/?find=" + this.state.textSearch
                                               }
                                               ev.preventDefault();
                                           }
                                       }}
                            />
                            <IconButton style={{margin: '3px 0px 0px 10px', padding: 0}}
                                        onClick={this.handleHiddenSearch}>
                                <Close className={classes.icon}/>
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
            )
        } else {
            return (
                <AppBar position="static" className={classes.bar}>
                    <Toolbar>
                        &nbsp;&nbsp;&nbsp;&nbsp;<img src="/static/logo.png" width="67" height="48"/>
                        <div style={{flexGrow: 1}}/>
                        {renderMenuButton(intl.formatMessage({id: 'TopBarPrivate.home.label'}), classes, () => goHome(lang))}
                        {renderMenuButton(intl.formatMessage({id: 'TopBarPrivate.userValues.label'}), classes, () => goUserValues(lang, user, profile, session))}
                        {renderMenuButton(intl.formatMessage({id: 'TopBarPrivate.services.label'}), classes, () => goServices(lang, user, profile))}
                        {renderMenuButton(intl.formatMessage({id: 'TopBarPrivate.values.label'}), classes, () => goCatalog(lang, user, profile))}
                        <div style={{flexGrow: 1}}/>
                        <IconButton className={classes.iconButton} onClick={this.handleShowSearch}>
                            <Search className={classes.icon}/>
                        </IconButton>
                        <div>
                            <IconButton className={classes.iconButton} onClick={this.handleMenuPersonOpen}>
                                <Person className={classes.icon}/>
                            </IconButton>
                            <Menu
                                id="person-menu"
                                anchorEl={this.state.anchorMenuPerson}
                                open={Boolean(this.state.anchorMenuPerson)}
                                onClose={this.handleMenuPersonClose}
                            >
                                <MenuItem onClick={this.handleMenuPersonProfile}>
                                    <ListItemIcon className={classes.icon}>
                                        <PersonOutline />
                                    </ListItemIcon>
                                    <ListItemText classes={{ primary: classes.primary }} inset primary={intl.formatMessage({id: 'TopBarPrivate.Person.Profile.label'})} />
                                </MenuItem>
                                <MenuItem onClick={this.handleMenuPersonLogout}>
                                    <ListItemIcon className={classes.icon}>
                                        <DirectionsRun />
                                    </ListItemIcon>
                                    <ListItemText classes={{ primary: classes.primary }} inset primary={intl.formatMessage({id: 'TopBarPrivate.Person.Logout.label'})} />

                                </MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
            )
        }
    }
}

TopBarPrivate.propTypes = {
    classes: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired,
    visibleHome: PropTypes.bool,

};

export default injectIntl(withStyles(topBarPrivate)(TopBarPrivate));
