import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {homePagePublicBlock} from '../styles/ThemeDefault'
import {injectIntl} from "react-intl";
import ButtonBorderPrimary from "./ButtonBorderPrimary";
import ArrowRightAlt from '@material-ui/icons/ArrowRightAlt';


class HomePagePublicDocuments extends React.Component {
    render() {
        const {classes, lang, intl, goServices} = this.props;

        return (
            <div className={classes.gridRoot}>
                <div className={classes.title}>
                    {intl.formatMessage({id: 'HomePagePublicDocuments.title'})}
                </div>
                <div className={classes.subtitle}>
                    {intl.formatMessage({id: 'HomePagePublicDocuments.subtitle'})}
                </div>

                <table style={{width: '100%'}}><tbody>
                <tr>
                    <td style={{width: '40%'}}/>
                    <td style={{width: '20%'}}>
                <table>
                    <tbody>
                    <tr>
                        <td style={{width: 10}}>
                            <div style={{padding: '20px 40px'}}><img src="/static/doc_cert_auth_s.png"/></div>
                        </td>
                        <td style={{paddingTop: '25px', verticalAlign: 'top'}}>
                            <table>
                                <tbody>
                                <tr>
                                    <td style={{color: '#BF0025', fontSize: '24px', whiteSpace: 'nowrap'}}><b>{intl.formatMessage({id: 'HomePagePublicDocuments.doc1.title'})}</b></td>
                                </tr>
                                <tr>
                                    <td>{intl.formatMessage({id: 'HomePagePublicDocuments.doc1.info'})}</td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style={{width: 10}}>
                            <div style={{padding: '20px 40px'}}><img src="/static/doc_ownership_s.png"/></div>
                        </td>
                        <td style={{paddingTop: '25px', verticalAlign: 'top'}}>
                            <table>
                                <tbody>
                                <tr>
                                    <td style={{color: '#BF0025', fontSize: '24px', whiteSpace: 'nowrap'}}><b>{intl.formatMessage({id: 'HomePagePublicDocuments.doc2.title'})}</b></td>
                                </tr>
                                <tr>
                                    <td>{intl.formatMessage({id: 'HomePagePublicDocuments.doc2.info'})}</td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    </tbody>
                </table>
                    </td>
                    <td style={{width: '40%'}}/>
                </tr>
                </tbody></table>

                <div className={classes.bottomPanel}>
                    <ButtonBorderPrimary style={{minWidth: 350}} onClick={() => goServices(lang)}>
                        {intl.formatMessage({id: 'HomePagePublicDocuments.btnAll'})}
                        <ArrowRightAlt style={{paddingLeft: 10}}/>
                    </ButtonBorderPrimary>
                </div>
            </div>
        );
    }
}

HomePagePublicDocuments.propTypes = {
    classes: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired,
};

export default injectIntl(withStyles(homePagePublicBlock)(HomePagePublicDocuments));