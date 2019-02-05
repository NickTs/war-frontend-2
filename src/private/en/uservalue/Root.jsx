import React from 'react'
import {Provider} from 'react-redux'
import PropTypes from 'prop-types'
import {ConnectedRouter} from 'connected-react-router'
import {Route, Switch} from 'react-router'
import AlertErrApiFunc from "../../../all/containers/AlertErrApiFunc";
import AlertInfoFunc from "../../../all/containers/AlertInfoFunc";
import UserValuePagePrivateFunc from "../../../all/containers/UserValuePagePrivateFunc";

const Root = ({store, history}) => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <Switch>
                    <Route exact path="/private/en/uservalue" component={UserValuePagePrivateFunc}/>
                    <Route render={() => (<div>Page not found</div>)}/>
                </Switch>
                <AlertErrApiFunc/>
                <AlertInfoFunc/>
            </div>
        </ConnectedRouter>
    </Provider>
)

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
}

export default Root;