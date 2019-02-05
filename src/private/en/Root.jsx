import React from 'react'
import {Provider} from 'react-redux'
import PropTypes from 'prop-types'
import {ConnectedRouter} from 'connected-react-router'
import {Route, Switch} from 'react-router'
import AlertErrApiFunc from "../../all/containers/AlertErrApiFunc";
import AlertInfoFunc from "../../all/containers/AlertInfoFunc";
import HomePagePrivateFunc from "../../all/containers/HomePagePrivateFunc";
import ProfileArtistFunc from "../../all/containers/ProfileArtistFunc";
import UploadImageDialogFunc from "../../all/containers/UploadImageDialogFunc";
import UserValuesPagePrivateFunc from "../../all/containers/UserValuesPagePrivateFunc";
import PictureNewPageFunc from "../../all/containers/PictureNewPageFunc";

const Root = ({store, history}) => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <Switch>
                    <Route exact path="/private/en" component={HomePagePrivateFunc}/>
                    <Route exact path="/private/en/profile/artist" component={ProfileArtistFunc}/>
                    <Route exact path="/private/en/uservalues" component={UserValuesPagePrivateFunc}/>
                    <Route exact path="/private/en/picture-new/" component={PictureNewPageFunc}/>
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