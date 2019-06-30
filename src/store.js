import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import createRootReducer from './reducer';

/**
 * Creates Redux store from seed state and root reducer.
 * Then configures it by applying middleware and attaching helper methods
 *
 * @param {Object} initialState
 * @param {Object} history
 * @returns {Object}
 */
export default function configureStore(initialState, history) {
    const sagaMiddleware = createSagaMiddleware();

    let middleware = [
        sagaMiddleware,
    ];

    // if in development and in browser log redux actions
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
        middleware = [
            ...middleware,
            createLogger({
                diff: true,
            }),
        ];
    }

    const store = createStore(
        createRootReducer(history),
        initialState,
        composeWithDevTools(
            applyMiddleware(...middleware),
        ),
    );

    // webpack hot module replacement for reducers
    if (module.hot) {
        module.hot.accept('./reducer', () => {
            const nextCreateRootReducer = require('./reducer').default;
            store.replaceReducer(nextCreateRootReducer(history));
        });
    }

    store.run = sagaMiddleware.run;

    return store;
}
