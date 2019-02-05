import React from 'react'
import {Provider} from 'react-redux'
import PropTypes from 'prop-types'
import {ConnectedRouter} from 'connected-react-router'
import {Route, Switch} from 'react-router'
import AlertErrApiFunc from "../../../all/containers/AlertErrApiFunc";
import AlertInfoFunc from "../../../all/containers/AlertInfoFunc";
import LoginDialogFunc from "../../../all/containers/LoginDialogFunc";
import RegisterDialog1Func from "../../../all/containers/RegisterDialog1Func";
import RegisterDialog2Func from "../../../all/containers/RegisterDialog2Func";
import RegisterDialog2OkFunc from "../../../all/containers/RegisterDialog2OkFunc";
import RegisterDialog3Func from "../../../all/containers/RegisterDialog3Func";
import CatalogPagePublicFunc from '../../../all/containers/CatalogPagePublicFunc'
import TmpLanguageSelectDialogFunc from "../../../all/containers/TmpLanguageSelectDialogFunc";
import TmpAlertInfoFunc from "../../../all/containers/TmpAlertInfoFunc";

const Root = ({store, history}) => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <Switch>
                    <Route exact path="/public/ru/catalog" render={(props) => {
                        if (props && props.location && props.location.search) {
                            return (<CatalogPagePublicFunc/>)
                        } else {
                            return (<CatalogPagePublicFunc/>)
                        }
                    }
                    }/>

                    <Route render={() => (<div>Страница не найдена</div>)}/>
                </Switch>
                <AlertErrApiFunc/>
                <AlertInfoFunc/>
                <LoginDialogFunc/>
                <RegisterDialog1Func/>
                <RegisterDialog2Func/>
                <RegisterDialog2OkFunc/>
                <RegisterDialog3Func/>
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