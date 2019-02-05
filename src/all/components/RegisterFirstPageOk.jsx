import React from 'react'
import {withStyles} from "@material-ui/core/styles/index";
import ButtonPrimary from './ButtonPrimary'
import {FormattedHTMLMessage, injectIntl} from 'react-intl'
import TopBarFunc from '../containers/TopBarFunc'
import BottomBar from './BottomBar'
import Typography from '@material-ui/core/Typography'


const styles = theme => ({
    root: {
        backgroundColor: '#fbfbfb',
        width: '100vw',
        height: '100vh',
    },
    title: {
        color: '#6b6b6b',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    subtitle: {
        color: '#6b6b6b',
        textAlign: 'center'
    },
    remark: {
        color: '#6b6b6b',
        textAlign: 'center'
    },
    linkLogin: {
        color: '#6b6b6b'
    },
    info: {
        backgroundColor: '#fbfbfb',
        display: 'flex',
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        height: '80vh'
    },
    infoCenter: {
        backgroundColor: '#fbfbfb',
    },
    infoBtnPanel: {
        display: 'flex',
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
    },
});

class RegisterFirstPageOk extends React.Component {
    render() {
        const {classes, intl, lang, goHome, user} = this.props;
        console.log("OSW-email=", JSON.stringify(user, 0, 2))
        const values = {
            email: user.email
        }
        return (
            <div className={classes.root}>
                <TopBarFunc visibleHome={false}/>
                <div className={classes.info}>
                    <div className={classes.infoCenter}>
                        <Typography variant="h4" color="inherit" className={classes.title}>
                            {intl.formatMessage({id: 'RegisterFirstPageOk.title'})}
                        </Typography>
                        <Typography variant="h6" color="inherit" className={classes.subtitle}>
                            <br/>
                            <FormattedHTMLMessage id="RegisterFirstPageOk.subtitle" values={values}/>
                            <br/><br/>
                        </Typography>
                        <div className={classes.infoBtnPanel}>
                            <ButtonPrimary variant="outlined" onClick={() => goHome(lang)} style={{width: 170}}>
                                {intl.formatMessage({id: 'RegisterFirstPageOk.ok.label'})}
                            </ButtonPrimary>
                        </div>
                    </div>
                </div>
                <BottomBar/>
            </div>
        );
    }
}

export default injectIntl(withStyles(styles)(RegisterFirstPageOk));