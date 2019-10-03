import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { I18nProvider } from './components/I18n';
import en from './locales/en.json';
import fr from './locales/fr.json';

ReactDOM.render(
  <I18nProvider translations={{ en, fr }} defaultLocale="en">
    <App />
  </I18nProvider>,

  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
