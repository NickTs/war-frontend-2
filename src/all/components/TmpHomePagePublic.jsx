import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import {injectIntl} from "react-intl"
import {pageDefault} from "../styles/ThemeDefault";
import TmpButton from "./TmpButton";
import {Link} from "react-router-dom";
import TmpButton2 from "./TmpButton2";
import {getDictLangsLabel} from "../dict/Dicts";
import {GetRequestParam} from "../Utils";

class TmpHomePagePublic extends React.Component {
    componentDidMount() {
        const {goRegister2, goLanguageSelect, lang} = this.props;
        var tkn = GetRequestParam('tkn')
        if (tkn) {
            goRegister2(lang, tkn)
        }
        var signin = GetRequestParam('signin')
        if(signin){
            this.props.goLogin(lang, signin)
        }
    }

    render() {
        const {classes, intl, goLanguageSelect, goRegister, goLogin, goAbout, goRegister2, goValues, goArtists, goGalleries, goInfoMore, goAllSales, lang} = this.props;
        return (
            <div style={{position: 'relative', width: '1366px', height: '768px', backgroundColor: '#FFFFFF'}}>
                <div style={{
                    position: 'absolute',
                    width: '1366px',
                    height: '100px',
                    left: '0',
                    top: '0',
                    backgroundColor: '#ffffff'
                }}>
                </div>
                <div style={{position: 'absolute', left: '8.05%', right: '87.11%', top: '3.39%', bottom: '90.43%'}}>
                    <img src="/static/tmp/logo.png"/>
                </div>
                <TmpButton style={{
                    position: 'absolute',
                    left: '1050px',
                    top: '31px',
                    height: '38px'
                }}
                           component={Link} to={"/public/"+lang+"/login"}>{intl.formatMessage({id: 'TopBar.login.label'})}</TmpButton>
                <TmpButton style={{
                    position: 'absolute',
                    left: '1154px',
                    top: '31px',
                    height: '38px'
                }}
                           component={Link} to={"/public/"+lang+"/register"}>{intl.formatMessage({id: 'TopBar.register.label'})}</TmpButton>
                <div style={{
                    position: 'absolute',
                    left: '8.05%',
                    right: '50.88%',
                    top: '95.31%',
                    bottom: '1.82%',
                    fontFamily: 'Noto Sans',
                    fontSize: '12px',
                    color: '#1B2125'
                }}>© 2018 World Art Registry. All rights reserved.
                </div>
                <Link to={"/public/"+lang+"/"} onClick={goLanguageSelect}>
                    <div style={{
                        position: 'absolute',
                        left: '1191px',
                        top: '737px',
                        width: '65px',
                        height: '20px',
                        fontFamily: 'Noto Sans',
                        fontSize: '12px',
                        textAlign: 'right',
                        color: '#000000'
                    }}>{getDictLangsLabel(lang)}
                    </div>
                    <div
                        style={{position: 'absolute', left: '87.26%', right: '11.71%', top: '95.83%', bottom: '2.34%'}}>
                        <img src="/static/tmp/lang.png"/></div>
                </Link>
                <div style={{
                    position: 'absolute',
                    left: '-0px',
                    top: '100px',
                    width: '1608px',
                    height: '618px',
                    background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), url(/static/tmp/bg.jpg)'
                }}>
                    <div style={{
                        position: 'absolute',
                        left: '8.05%',
                        right: '19.25%',
                        top: '38.28%',
                        bottom: '50.26%',
                        fontFamily: 'Noto Sans ExtraBold',
                        fontSize: '70px',
                        lineHeight: '76px',
                        color: '#000000'
                    }}>
                        World Art Registry
                    </div>
                    <div style={{
                        position: 'absolute',
                        left: '7.98%',
                        right: '47.29%',
                        top: '51.56%',
                        bottom: '40.76%',
                        fontFamily: 'Noto Sans',
                        fontSize: '18px',
                        lineHeight: '30px',
                        color: '#000000'
                    }}>
                        {intl.formatMessage({id: 'tmp.TmpHomePagePublic.info'})}
                    </div>
                    <TmpButton2 style={{
                        position: 'absolute',
                        left: '8.05%',
                        top: '61.85%',
                        right: '78.48%',
                        bottom: '31.64%'
                    }} onClick={()=>this.props.goStarted(lang)}>{intl.formatMessage({id: 'tmp.TmpHomePagePublic.getStarted'})}</TmpButton2>
                </div>
            </div>

        );
    }
}

TmpHomePagePublic.propTypes = {
    classes: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired
};

export default injectIntl(withStyles(pageDefault)(TmpHomePagePublic));