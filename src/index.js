import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";

import orderReducer from "./store/reducers/order";
import reducerBurger from "./store/reducers/burger";
import reducerAuth from "./store/reducers/auth";
import createSagaMiddleware from 'redux-saga';
import {watchAuth} from "./store/sagas";



const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;

const rootReducer = combineReducers({
  burger: reducerBurger,
  order: orderReducer,
  auth: reducerAuth
});

const sagaMiddleware = createSagaMiddleware();

const app = (
  <Provider store={createStore(
    rootReducer, composeEnhancers(applyMiddleware(thunk, sagaMiddleware)))}>
    <BrowserRouter>
      <App/>
     </BrowserRouter>
  </Provider>
);

sagaMiddleware.run(watchAuth);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
