import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import "./style.css";
import registerServiceWorker from "./registerServiceWorker";

import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";

import reducer from "./reducers";
import { watcherSaga } from "./sagas/permissionsSaga";

const sagaMiddleware = createSagaMiddleware();

// Store
const store = createStore(
  reducer,
  compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

// run the saga
sagaMiddleware.run(watcherSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
registerServiceWorker();
