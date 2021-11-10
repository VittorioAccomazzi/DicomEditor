import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import GA4React from 'ga-4-react'

const timeout = 30000 // millisecond.
const ga4react = new GA4React("G-GCL436FGEE", undefined, undefined, timeout);

const main = async ()=>{
  await ga4react.initialize();
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
}

// Start the appliction
main()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
