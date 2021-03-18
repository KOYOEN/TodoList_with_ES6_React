import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  BrowserRouter as Router
} from "react-router-dom";
import "../less/base.less";
import "../less/index.less";




ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);