import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route,Switch } from 'react-router-dom';
import './Style/background.css';
import './Style/Buttons.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {main} from './main';

ReactDOM.render((

    <Router>
        <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/main" component={main} />
        </Switch>
    </Router>
), document.getElementById('root'));
//ReactDOM.render(<App />, document.getElementById('root'));


registerServiceWorker();
