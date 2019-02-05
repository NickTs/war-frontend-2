import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import LanguageSelect from './LanguageSelect';
import {injectIntl} from "react-intl";
import {topBarPublic} from "../styles/ThemeDefault";
import Person from '@material-ui/icons/PermIdentity'
import Search from '@material-ui/icons/Search'
import Close from '@material-ui/icons/Close'
import {GetRequestParam} from "../Utils";
import TextField from '@material-ui/core/TextField'

const renderMenuButton = (label, classes, goClick) => {
    return (
        <Button className={classes.menuButton} onClick={goClick}>
            {label}
        </Button>
    )
}

class TopBarPublic extends React.Component {
    state = {
        showSearch: false,
        textSearch: ""
    };

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
            document.location.href = "/public/" + lang + "/catalog/?find=" + textSearch
        }
    }

    componentDidMount() {
        const {goRegister2, goLogin, lang} = this.props;
        var tkn = GetRequestParam('tkn')
        if (tkn) {
            goRegister2(lang, tkn)
        }
        var signin = GetRequestParam('signin')
        if (signin) {
            this.props.goLogin(lang, signin)
        }
    }

    render() {
        const {classes, intl, lang, visibleHome, visibleLogin, goRegister, goLogin, goHome, goCatalog, goServices, goContacts} = this.props;
        if (this.state.showSearch) {
            return (
                <AppBar position="static" className={classes.bar}>
                    <Toolbar>
                        &nbsp;&nbsp;&nbsp;&nbsp;<img src="/static/logo.png" width="67" height="48"/>
                        <div style={{flexGrow: 1}}/>
                        {visibleHome && renderMenuButton(intl.formatMessage({id: 'TopBarPublic.home.label'}), classes, () => goHome(lang))}
                        {renderMenuButton(intl.formatMessage({id: 'TopBarPublic.catalog.label'}), classes, () => goCatalog(lang))}
                        {renderMenuButton(intl.formatMessage({id: 'TopBarPublic.services.label'}), classes, () => goServices(lang))}
                        {renderMenuButton(intl.formatMessage({id: 'TopBarPublic.contacts.label'}), classes, () => goContacts(lang))}
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
                                                   document.location.href = "/public/" + lang + "/catalog/?find=" + this.state.textSearch
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
            );
        } else {
            return (
                <AppBar position="static" className={classes.bar}>
                    <Toolbar>
                        &nbsp;&nbsp;&nbsp;&nbsp;<img src="/static/logo.png" width="67" height="48"/>
                        <div style={{flexGrow: 1}}/>
                        {visibleHome && renderMenuButton(intl.formatMessage({id: 'TopBarPublic.home.label'}), classes, () => goHome(lang))}
                        {renderMenuButton(intl.formatMessage({id: 'TopBarPublic.catalog.label'}), classes, () => goCatalog(lang))}
                        {renderMenuButton(intl.formatMessage({id: 'TopBarPublic.services.label'}), classes, () => goServices(lang))}
                        {renderMenuButton(intl.formatMessage({id: 'TopBarPublic.contacts.label'}), classes, () => goContacts(lang))}
                        <div style={{flexGrow: 1}}/>
                        {visibleLogin &&
                        <IconButton className={classes.iconButton} onClick={() => goLogin(lang)}>
                            <Person className={classes.icon}/>
                        </IconButton>
                        }
                        <IconButton className={classes.iconButton} onClick={this.handleShowSearch}>
                            <Search className={classes.icon}/>
                        </IconButton>
                        <LanguageSelect lang={lang}/>
                    </Toolbar>
                </AppBar>
            );
        }
    }
}

TopBarPublic.propTypes = {
    classes: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired,
    visibleHome: PropTypes.bool,

};

export default injectIntl(withStyles(topBarPublic)(TopBarPublic));
