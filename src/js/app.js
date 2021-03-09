import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Page from './page';

export const App = () => {
  return (
    <Page />
  );
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
);
