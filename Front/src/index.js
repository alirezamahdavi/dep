import React from 'react';
import ReactDOM from 'react-dom';
import './CSSFiles/index.css';
//////////////////////////////////////////////
import registerServiceWorker from './registerServiceWorker';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

import App from './App'
import About from './static/about'
import Home from './main/main'
import Dataprocessing from './main/dataprocessingforfitbit'
import FitBit from './main/fitBit'


ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
             <IndexRoute component={Home}/>      
            <Route path="about" component={About}/>
            <Route path="home" component={Home}/>
            <Route path="passed" component={Dataprocessing}/>
            <Route path="fit" component={FitBit}/>
        </Route>
    </Router>
    , document.getElementById('root'));


//ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
