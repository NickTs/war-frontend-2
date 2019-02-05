import React from 'react'
import TopBarFunc from '../containers/TopBarFunc'
import BottomBar from './BottomBar'
import {withStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import ButtonInverse from './ButtonInverse'
import {injectIntl} from "react-intl"
import {GetBaseUrl, GetRequestParam} from "../Utils";
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import {styles2} from "../styles/ThemeDefault";

const styles = theme => ({
    root: {
        backgroundColor: '#6b6b6b',
        width: '100vw',
        height: '100vh',
    },
    title: {
        color: '#ffffff',
        fontWeight: 'bold'
    },
    resume: {
        color: '#ffffff',
        width: '50vw'
    },
    info: {
        backgroundColor: '#6b6b6b',
        display: 'flex',
        textAlign: 'left',
        height: '80vh'
    },
    infoCenter: {
        backgroundColor: '#6b6b6b',
        marginLeft: '50px',
        marginTop: 'auto',
        marginBottom: 'auto',
    }
});


class HomePage extends React.Component {
    componentDidMount(){
        const {goRegister2, lang} = this.props;
        var tkn = GetRequestParam('tkn')
        if(tkn){
            goRegister2(lang,tkn)
        }
    }
    render() {
        const {classes, intl, goRegister, goLogin, goAbout, goRegister2, lang} = this.props;
        return (
            <div className={classes.root}>
                <TopBarFunc visibleHome={true} goRegister={goRegister} goLogin={goLogin} lang={lang}/>
                <div className={classes.info}>
                    <div className={classes.infoCenter}>
                        <Typography variant="h2" color="inherit" className={classes.title}>
                            {intl.formatMessage({id: 'app.name'})}
                        </Typography>
                        <Typography variant="h5" color="inherit" className={classes.resume}>
                            <br/>
                            {intl.formatMessage({id: 'app.info'})}
                            <br/><br/>
                        </Typography>
                        <ButtonInverse variant="contained" onClick={() => goAbout(lang)}>{intl.formatMessage({id: 'HomePage.learnMore.label'})}</ButtonInverse>
                    </div>
                </div>
                <BottomBar/>
            </div>
        );
    }
}

HomePage.propTypes = {
    classes: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired
};

export default injectIntl(withStyles(styles)(HomePage));