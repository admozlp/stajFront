import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from 'react-redux';
import { configureStore } from './redux/config/configureStore';


const root = ReactDOM.createRoot(document.getElementById("root"));
const store = configureStore()

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
reportWebVitals();
