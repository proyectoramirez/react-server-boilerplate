import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import App from "./app";
import 'sanitize.css/sanitize.css';

const MOUNT_NODE = document.getElementById("app");

const render = () => ReactDOM.render(
    <BrowserRouter basename="/app">
        <App />
    </BrowserRouter>,
    MOUNT_NODE
);

render();

if (module.hot) {
    module.hot.accept('./app', () => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        render();
    });
}