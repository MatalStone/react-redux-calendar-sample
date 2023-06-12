import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { Provider } from "react-redux";
import store from "./store/index";

const root = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store as any}>
      <App />
    </Provider>
  </React.StrictMode>,
  root
);
