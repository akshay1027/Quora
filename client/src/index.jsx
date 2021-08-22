import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import AppProviders from './appProviders';
import store from './redux/store';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <AppProviders />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
