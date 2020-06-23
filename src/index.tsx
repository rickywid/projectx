import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import 'antd/dist/antd.css';
import './styles/global.scss';
import App from './App';
import history from './lib/history';

// dotenv.config();

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
