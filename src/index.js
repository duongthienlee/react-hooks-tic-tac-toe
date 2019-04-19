import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './Game';
import 'bootstrap/dist/css/bootstrap.css';
import * as serviceWorker from './serviceWorker';
import { HashRouter, Route } from "react-router-dom"
ReactDOM.render(<HashRouter><Route exact path="/" component={Game} /></HashRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
