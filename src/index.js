import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './Style/background.css';
import './Style/App.css'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {main} from './main';


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
