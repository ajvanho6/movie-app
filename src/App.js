import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import routes from './routes';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Page from './components/Page/Page';
import SearchView from './views/SearchView/SearchView';

const components = {
    navigation: Header,
    footer: Footer,
};

const App = () => (
    <Router key={new Date()} history={browserHistory}>
        <Route path={routes.ROOT} component={Page}>
            <IndexRoute components={{...components, content: SearchView}} />
        </Route>
    </Router>
);

export default App;
