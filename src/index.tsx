import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {Provider} from "react-redux";
import store from "./store/store";
import PubNub from 'pubnub';
import { PubNubProvider } from 'pubnub-react';

const pubnub = new PubNub({
    subscribeKey: 'sub-c-683608c2-5d64-11ec-a2d9-0639f9732331',
    publishKey: 'pub-c-9e472495-b9cd-4ddf-906b-f272aac1e7d4',
    uuid: 'admin'
  });

ReactDOM.render(
    <Provider store={store}>
        <PubNubProvider client={pubnub}>
            <App />
        </PubNubProvider>
    </Provider>,
document.getElementById('root'));

// f you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
