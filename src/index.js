import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import './styles/style.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'typeface-titillium-web'

import configureStore from './store/configureStore'
import App from './application/App'


const store: Store = configureStore();

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)