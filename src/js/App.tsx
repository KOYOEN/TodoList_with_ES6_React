import React from 'react';
import Page from './Page';
import {
  Switch,
  Route
} from "react-router-dom";



class App extends React.Component{
  render() {
    return (
        <Switch>
          <Route path="/" component={Page}/>
          <Route path="/active" component={Page}/>
          <Route path="/completed" component={Page}/>
        </Switch>
    );
  }
}

export default App;
