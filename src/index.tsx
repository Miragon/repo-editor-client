import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {Provider} from "react-redux";
import {HashRouter} from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import App from "./components/Layout/App";
import store from "./store/store";
import {I18nextProvider} from "react-i18next";
import i18next from "i18next";
import common_custom from "./translations/custom/common.json";


i18next.init({
    interpolation: { escapeValue: false },
    lng: "custom",
    resources: {
        custom: {
            common: common_custom
        },
    }
});

ReactDOM.render((
    <Provider store={store}>
        <HashRouter>
            <I18nextProvider i18n={i18next}>
                <App />
            </I18nextProvider>
        </HashRouter>
    </Provider>
),
document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
