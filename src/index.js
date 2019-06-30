import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
import 'svgxuse'; // fixes IE10/11 issue when using external SVG
import App from './App';
import configureStore from './store';
import './index.scss';
import registerServiceWorker from './registerServiceWorker';
import rootSaga from './saga';

// initialize store
const store = configureStore();

store.run(rootSaga);


// Index component
const Index = () => (
    <AppContainer>
        <Provider store={store}>
            <App />
        </Provider>
    </AppContainer>
);

// render app
ReactDOM.render(
    <Index />,
    document.getElementById('root'),
);


if (module.hot) {
    module.hot.accept('./App', () => {
        ReactDOM.render(
            (
                <AppContainer>
                    <Provider store={store}>
                        <App />
                    </Provider>
                </AppContainer>
            ),
            document.getElementById('root')
        );
    });
}

registerServiceWorker();

