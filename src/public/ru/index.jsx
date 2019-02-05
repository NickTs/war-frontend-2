import React from 'react'
import ReactDOM from 'react-dom'
import '../../index.css'
import Root from './Root'
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles'
import ConfigureStore from "../../all/store/ConfigureStore"
import {langChange} from '../../all/actions/LangChange'
import {addLocaleData, IntlProvider} from 'react-intl'
import ru from 'react-intl/locale-data/ru'
import axios from "../../all/axios/axios"
import createHistory from 'history/createBrowserHistory'
import Cookies from 'universal-cookie'

const cookies = new Cookies();
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

axios.get('/public/assets/' + locale + '.json')
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


