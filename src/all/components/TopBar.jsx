import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LanguageSelect from './LanguageSelect';
import ButtonPrimary from './ButtonPrimary'
import {injectIntl} from "react-intl";

const styles = theme => ({
    bar: {
        backgroundColor: "#fff",
        border: "1px solid #cbcbcb"
    },
    grow: {
        flexGrow: 1,
        color: '#6b6b6b'
    },
});

const showHome = (intl, visibleHome, goRegister, goLogin, lang) => {
    if (visibleHome) {
        return (
            <div>
                <ButtonPrimary style={{width:150}} variant="outlined" onClick={() => goRegister(lang)}>{intl.formatMessage({id: 'TopBar.register.label'})}</ButtonPrimary>
                <ButtonPrimary style={{width:150}} variant="outlined" onClick={() => goLogin(lang)}>{intl.formatMessage({id: 'TopBar.login.label'})}</ButtonPrimary>
                &nbsp;&nbsp;&nbsp;&nbsp;
            </div>
        )
    } else {
        return (
            <div/>
        )
    }
}

function TopBar(props) {
    const {classes, intl, lang, visibleHome, goRegister, goLogin} = props;
    return (
        <AppBar position="static" className={classes.bar}>
            <Toolbar>
                <Typography variant="h4" className={classes.grow}>
                    <b>&nbsp;&nbsp;&nbsp;&nbsp;LOGO</b>
                </Typography>
                {showHome(intl, visibleHome, goRegister, goLogin,lang)}
                <LanguageSelect lang={lang}/>
            </Toolbar>
        </AppBar>
    );
}

TopBar.propTypes = {
    classes: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired,
    visibleHome: PropTypes.bool,

};

export default injectIntl(withStyles(styles)(TopBar));
