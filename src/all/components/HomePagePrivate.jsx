import React from 'react'
import TopBarPrivateFunc from '../containers/TopBarPrivateFunc'
import {withStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import {injectIntl} from "react-intl"
import {GetRequestParam} from "../Utils";
import {pageDefault} from "../styles/ThemeDefault";
import BottomBarPrivate from "./BottomBarPrivate";
import DropzoneWithPreview from "./DropzoneWithPreview";


class HomePagePrivate extends React.Component {
    componentDidMount() {
        const {goRegister2, lang} = this.props;
    }

    render() {
        const {classes, intl, lang, goHome, goUserValues, goOperations, goServices, goValues} = this.props;
        return (
            <div className={classes.root}>
                <TopBarPrivateFunc visibleHome={true} lang={lang}/>
                <div style={{width: '900wv', height: 600, position: 'relative', margin: 50, borderStyle: 'dashed', backgroundColor:'#cbcbcb'}}><div  style={{position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '100%',
                    textAlign: 'center'}}>Необходимо описать.<br/>Здесь должны находиться новости о предстоящих выставках, личные предложения для пользователя и т.д.</div></div>
                <div style={{width:20,height:20}}></div>
                <BottomBarPrivate lang={lang}/>
            </div>
        );
    }
}

HomePagePrivate.propTypes = {
    classes: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired
};

export default injectIntl(withStyles(pageDefault)(HomePagePrivate));