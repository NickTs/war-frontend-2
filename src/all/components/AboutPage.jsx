import React from 'react'
import TopBarFunc from '../containers/TopBarFunc'
import BottomBar from './BottomBar'
import {withStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import ButtonInverse from './ButtonInverse'
import {injectIntl} from "react-intl"
import {GetBaseUrl, GetRequestParam} from "../Utils";

const styles = theme => ({
    root: {
        backgroundColor: '#6b6b6b',
        width: '100vw',
        height: '100vh',
    },
    title: {
        color: '#ffffff',
    },
    resume: {
        color: '#ffffff',
        width: '50vw'
    },
    info: {
        backgroundColor: '#6b6b6b',
        display: 'flex',
        textAlign: 'center',
        width: '100vw',
        height: '80vh'
    },
    infoCenter: {
        backgroundColor: '#6b6b6b',
        width: '100vw',
        marginTop: 'auto',
        marginBottom: 'auto',
    }
});

const getAboutTextRU = (classes) => {
    return (
        <div>
            <Typography variant="h4" className={classes.title}>
                Здесь будет размещена информация о компании<br/>
                World Art Registry
            </Typography>
        </div>
    )
}

const getAboutTextEN = (classes) => {
    return (
        <div>
            <Typography variant="h4" className={classes.title}>
                Here will be some information about<br/>
                World Art Registry
            </Typography>
        </div>
    )
}

const getAboutText = (lang, classes) => {
    switch (lang) {
        case 'ru':
            return getAboutTextRU(classes);
        default:
            return getAboutTextEN(classes);
    }
}

class AboutPage extends React.Component {
    componentDidMount(){
        const {goRegister2, lang} = this.props;
        var tkn = GetRequestParam('tkn')
        if(tkn){
            goRegister2(lang,tkn)
        }
    }
    render() {
        const {classes, intl, goRegister, goLogin, lang} = this.props;
        return (
            <div className={classes.root}>
                <TopBarFunc visibleHome={true} goRegister={goRegister} goLogin={goLogin} lang={lang}/>
                <div className={classes.info}>
                    <div className={classes.infoCenter}>
                        {getAboutText(lang, classes)}
                    </div>
                </div>
                <BottomBar/>
            </div>
        );
    }
}

AboutPage.propTypes = {
    classes: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired
};

export default injectIntl(withStyles(styles)(AboutPage));