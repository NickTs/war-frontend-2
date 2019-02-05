import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {homePagePublicInfo} from '../styles/ThemeDefault'
import {FormattedHTMLMessage, injectIntl} from "react-intl";
import TmpButton2 from "./TmpButton2";


class TmpHomePagePublicInfo extends React.Component {

    render() {
        const {classes, lang, intl, goInfoMore} = this.props;

        return (
            <div style={{margin: 0, width: '100vw', height: '638px'}}>
                <div style={{
                    width: '100%',
                    height: '638px',
                    background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), url(/static/tmp/bg.jpg) no-repeat right'
                }}>
                    <div style={{
                        position: 'relative',
                        top: '30%',
                        left: '8%',
                        marginLeft: '100',
                        paddingLeft: '40',
                        paddingTop: '200',
                        fontSize: '70px',
                        fontWeight: '900',
                        color: '#000000'
                    }}>
                        <b>World Art Registry</b>
                    </div>
                    <div style={{
                        position: 'relative',
                        left: '8%',
                        top: '35%',
                        fontSize: '18px',
                        lineHeight: '30px',
                        color: '#000000'
                    }}>
                        <FormattedHTMLMessage id="tmp.TmpHomePagePublic.info"/>
                    </div>
                    <div style={{
                        position: 'relative',
                        left: '8%',
                        top: '40%',
                    }}>
                    <TmpButton2  onClick={()=>this.props.goRegister(lang)}><b>{intl.formatMessage({id: 'tmp.TmpHomePagePublic.getStarted'})}</b></TmpButton2>
                        </div>
                </div>
            </div>
        );
    }
}

TmpHomePagePublicInfo.propTypes = {
    classes: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired,
};

export default injectIntl(withStyles(homePagePublicInfo)(TmpHomePagePublicInfo));