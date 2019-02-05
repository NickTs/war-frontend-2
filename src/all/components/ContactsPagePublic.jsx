import React from 'react'
import TopBarPublicFunc from '../containers/TopBarPublicFunc'
import {withStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import {injectIntl} from "react-intl"
import {GetRequestParam} from "../Utils";
import {pageDefault} from "../styles/ThemeDefault";
import BottomBarPublic from "./BottomBarPublic";


class ContactsPagePublic extends React.Component {

    render() {
        const {classes, intl, goRegister, goLogin, lang} = this.props;
        return (
            <div className={classes.root}>
                <TopBarPublicFunc visibleHome={true} goRegister={goRegister} goLogin={goLogin} lang={lang}/>
                <div style={{
                    width: '900wv',
                    height: 600,
                    position: 'relative',
                    margin: 50,
                    borderStyle: 'dashed',
                    backgroundColor: '#cbcbcb'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '100%',
                        textAlign: 'center'
                    }}>В разработке.<br/>Здесь будет располагаться контактная информация о компании World Art Registry.
                    </div>
                </div>
                <div style={{width: 20, height: 20}}></div>
                <BottomBarPublic lang={lang}/>
            </div>
        );
    }
}

ContactsPagePublic.propTypes = {
    classes: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired
};

export default injectIntl(withStyles(pageDefault)(ContactsPagePublic));