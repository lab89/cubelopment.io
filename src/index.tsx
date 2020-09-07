import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer  from './stores/reducers'
import rootSaga from "./sagas/saga";
import createSagaMiddleware from "redux-saga";


import 'bootstrap/dist/css/bootstrap.min.css';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

async function main(){  
  ReactDOM.render(    
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>,
    </React.StrictMode>,
    document.getElementById('root')
  );
}
main()


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
