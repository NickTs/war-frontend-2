import React from 'react'
import {Provider} from 'react-redux'
import PropTypes from 'prop-types'
import HomePagePublicFunc from '../../all/containers/HomePagePublicFunc'
import LoginPageFunc from '../../all/containers/LoginPageFunc'
import RegisterFirstPageFunc from '../../all/containers/RegisterFirstPageFunc'
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router'
import RegisterFirstPageOkFunc from "../../all/containers/RegisterFirstPageOkFunc";
import AlertErrApiFunc from "../../all/containers/AlertErrApiFunc";
import RegisterTwoPageFunc from "../../all/containers/RegisterTwoPageFunc";
import AboutPageFunc from "../../all/containers/AboutPageFunc";
import RegisterTwoPageOkFunc from "../../all/containers/RegisterTwoPageOkFunc";
import AlertInfoFunc from "../../all/containers/AlertInfoFunc";
import LoginDialogFunc from "../../all/containers/LoginDialogFunc";
import RegisterDialog1Func from "../../all/containers/RegisterDialog1Func";
import RegisterDialog2Func from "../../all/containers/RegisterDialog2Func";
import RegisterDialog2OkFunc from "../../all/containers/RegisterDialog2OkFunc";
import RegisterDialog3Func from "../../all/containers/RegisterDialog3Func";
import TmpHomePagePublicFunc from '../../all/containers/TmpHomePagePublicFunc'
import TmpLanguageSelectDialogFunc from "../../all/containers/TmpLanguageSelectDialogFunc";
import TmpLoginPageFunc from "../../all/containers/TmpLoginPageFunc";
import TmpAlertInfoFunc from "../../all/containers/TmpAlertInfoFunc";
import TmpRegister1PageFunc from "../../all/containers/TmpRegister1PageFunc";
import CatalogPagePublicFunc from "../../all/containers/CatalogPagePublicFunc";
import ServicesPagePublicFunc from "../../all/containers/ServicesPagePublicFunc";
import ContactsPagePublicFunc from "../../all/containers/ContactsPagePublicFunc";
import RegisterReqDialog2Func from "../../all/containers/RegisterReqDialog2Func";
import RegisterReqDialog2OkFunc from "../../all/containers/RegisterReqDialog2OkFunc";


const Root = ({store, history}) => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <Switch>
                    <Route exact path="/public/en" render={(props) => {
                        if (props && props.location && props.location.search){
                            if(props.location.search=='?go=catalog') {
                                return (<CatalogPagePublicFunc/>)
                            } else if(props.location.search=='?go=services') {
                                return (<ServicesPagePublicFunc/>)
                            } else if(props.location.search=='?go=contacts') {
                                return (<ContactsPagePublicFunc/>)
                            } else {
                                return (<HomePagePublicFunc/>)
                            }
                        } else {
                            return (<HomePagePublicFunc/>)
                        }
                    }
                    }/>
                    <Route exact path="/public/en/about" component={AboutPageFunc} />
                    <Route exact path="/public/en/register" component={TmpRegister1PageFunc} />
                    <Route exact path="/public/en/register/ok" component={RegisterFirstPageOkFunc} />
                    <Route exact path="/public/en/register2" component={RegisterTwoPageFunc} />
                    <Route exact path="/public/en/register2/ok" component={RegisterTwoPageOkFunc} />
                    <Route exact path="/public/en/login" component={TmpLoginPageFunc} />
                    <Route render={() => (<div>Page not found</div>)} />
                </Switch>
                <AlertErrApiFunc/>
                <AlertInfoFunc/>
                <LoginDialogFunc/>
                <RegisterDialog1Func/>
                <RegisterDialog2Func/>
                <RegisterDialog2OkFunc/>
                <RegisterDialog3Func/>
                <RegisterReqDialog2Func/>
                <RegisterReqDialog2OkFunc/>
                <TmpAlertInfoFunc/>
                <TmpLanguageSelectDialogFunc/>
            </div>
        </ConnectedRouter>
    </Provider>
)

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
}

export default Root;