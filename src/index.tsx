import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { AppWrapper } from "sriracha-ui";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";

import firebase from "./config/firebase";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { applyMiddleware, createStore } from "redux";
import { createFirestoreInstance } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import thunk from "redux-thunk";

import "./styles.css";
import "sriracha-ui/css/main.css";
import "cropperjs/dist/cropper.min.css";

const link = createHttpLink({
  uri: process.env.REACT_APP_GQL_URL,
  credentials: "include",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

const store = createStore(firebaseReducer, applyMiddleware(thunk));

const reactReduxFirebaseConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
  attachAuthIsReady: true,
};

const reactReduxFirebaseProps = {
  firebase,
  config: reactReduxFirebaseConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...reactReduxFirebaseProps}>
        <Router>
          <ApolloProvider client={client}>
            <AppWrapper>
              <App />
            </AppWrapper>
          </ApolloProvider>
        </Router>
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
