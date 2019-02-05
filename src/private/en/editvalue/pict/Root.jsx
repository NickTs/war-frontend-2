import React from 'react'
import {Provider} from 'react-redux'
import PropTypes from 'prop-types'
import {ConnectedRouter} from 'connected-react-router'
import {Route, Switch} from 'react-router'
import AlertErrApiFunc from "../../../../all/containers/AlertErrApiFunc";
import AlertInfoFunc from "../../../../all/containers/AlertInfoFunc";
import ProfilePictureFunc from "../../../../all/containers/ProfilePictureFunc";
import UploadImageDialogFunc from "../../../../all/containers/UploadImageDialogFunc";

const Root = ({store, history}) => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <Switch>
                    <Route exact path="/private/en/editvalue/pict" component={ProfilePictureFunc}/>
                    <Route render={() => (<div>Page not found</div>)}/>
                </Switch>
                <AlertErrApiFunc/>
                <AlertInfoFunc/>
                <UploadImageDialogFunc/>
            </div>
        </ConnectedRouter>
    </Provider>
)

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
}

export default Root;