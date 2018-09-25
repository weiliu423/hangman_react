import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import registerServiceWorker from './registerServiceWorker';
import {main} from './App';


ReactDOM.render((
    <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route path="/main" component={main} />
        </div>
    </Router>
), document.getElementById('root'));
//ReactDOM.render(<App />, document.getElementById('root'));



registerServiceWorker();
