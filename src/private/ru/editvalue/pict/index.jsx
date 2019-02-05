import React from 'react'
import ReactDOM from 'react-dom'
import '../../../../index.css'
import Root from './Root'
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles'
import ConfigureStore from "../../../../all/store/ConfigureStore"
import {langChange} from '../../../../all/actions/LangChange'
import {sessionRefresh} from '../../../../all/actions/SessionRefresh'
import {profileRefresh} from '../../../../all/actions/ProfileRefresh'
import {addLocaleData, IntlProvider} from 'react-intl'
import ru from 'react-intl/locale-data/ru'
import axios from "../../../../all/axios/axios"
import createHistory from 'history/createBrowserHistory'
import Cookies from 'universal-cookie'
import axiosBackendApi from "../../../../all/axios/axiosBackendApi";
import {GetRequestParam} from "../../../../all/Utils";
import {catalogGetOne} from "../../../../all/actions/CatalogGetOne";

const cookies = new Cookies();

if (cookies.get('jwt') === null || cookies.get('jwt') === undefined) {
    document.location.href = '/public/ru/?signin=1'
}

cookies.set('l', 'ru', {path: '/', maxAge: 5 * 365 * 24 * 60 * 60})
addLocaleData([...ru])
const locale = "ru"

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#888888',
            main: '#6b6b6b',
            dark: '#4a4a4a',
            contrastText: '#fff',
        },
        secondary: {
            light: '#888888',
            main: '#6b6b6b',
            dark: '#4a4a4a',
            contrastText: '#fff',
        },
    },
    typography: {
        useNextVariants: true,
    }
})

const history = createHistory()
const store = ConfigureStore(history);
store.dispatch(langChange(locale));

function loadArtist(userSession, locale, store, history){
    axiosBackendApi.get('users/'+userSession.user.id+'/artists', {
        headers: {
            "x-lang": locale,
            "Authorization": "Bearer "+userSession.jwt,
            "X-ResponseFull": "true"
        }
    })
        .then(result => {
            store.dispatch(profileRefresh(result.data))
        })
        .catch((error) => {
            if (error.response && error.response.data && error.response.data.errorCode==2) {
                document.location.href = '/private/'+locale+'/profile/artist'
            }
        })
}

function loadCollector(userSession, locale, store, history){
}

function indexStartup(locale, theme, store, history, userSession) {
    axios.get('/private/assets/editvalue/pict/' + locale + '.json')
        .then(result => {
            if (result.status >= 400) {
                throw new Error('World Art Registry временно недоступна.')
            }
            return result.data;
        })
        .then(localeData => {
            ReactDOM.render(
                <IntlProvider locale={locale} messages={localeData}>
                    <MuiThemeProvider theme={theme}>
                        <Root store={store} history={history}/>
                    </MuiThemeProvider>
                </IntlProvider>,
                document.getElementById('root')
            )
        })
        .then(() => {
            if(userSession.user.userType==='artist'){
                loadArtist(userSession, locale, store, history)
            } else if(userSession.user.userType==='collector'){
                loadCollector(userSession, locale, store, history)
            }
        })
}

const jwt  = cookies.get("jwt")
axiosBackendApi.get('auth/int/session?jwt='+jwt, {
    headers: {
        "x-lang": locale
    }
})
    .then(result => {
        const userSession = result.data
        store.dispatch(sessionRefresh(userSession))
        store.dispatch(catalogGetOne(locale, GetRequestParam('valueid'), "1"))
        indexStartup(locale, theme, store, history, userSession)
    })
    .catch((error) => {
        cookies.remove('jwt',{path: '/'})
        document.location.href = '/public/'+locale+'/?signin=1'
    })


