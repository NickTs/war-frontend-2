import React from 'react'
import TopBarPublicFunc from '../containers/TopBarPublicFunc'
import {withStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import {injectIntl} from "react-intl"
import {GetRequestParam} from "../Utils";
import {pageDefault} from "../styles/ThemeDefault";
import HomePagePublicInfo from "./HomePagePublicInfo";
import BottomBarPublic from "./BottomBarPublic";
import HomePagePublicDocuments from "./HomePagePublicDocuments";
import TmpHomePagePublicInfo from "./TmpHomePagePublicInfo";
import TmpHomePagePublicInfoFunc from "../containers/TmpHomePagePublicInfoFunc";


class HomePagePublic extends React.Component {
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
        const {classes, intl, goRegister, goRegister2, goLogin, goServices, goInfoMore, lang} = this.props;
        return (
            <div className={classes.root}>
                <TopBarPublicFunc visibleHome={true} visibleLogin={true} goRegister={goRegister} goRegister2={goRegister2}  goLogin={goLogin} lang={lang}/>
                <TmpHomePagePublicInfoFunc lang={lang} goInfoMore={goInfoMore}/>
                <div style={{width: 20, height: 20}}></div>
                <BottomBarPublic lang={lang}/>
            </div>
        );
    }
}

HomePagePublic.propTypes = {
    classes: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired
};

export default injectIntl(withStyles(pageDefault)(HomePagePublic));