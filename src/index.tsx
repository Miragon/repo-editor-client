import React, {Suspense} from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {Provider} from "react-redux";
import {HashRouter} from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import App from "./components/Layout/App";
import store from "./store/store";
import {I18nextProvider, initReactI18next} from "react-i18next";
import i18next from "i18next";
import common_de from "./translations/custom/common.json";
import common_en from "./translations/default/common.json";
import Fetch from "i18next-fetch-backend";


/*
fetch("../../public/translations/common"
    ,{
        headers : {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }
).then(
    function(res){
        console.log(res)

        return res.json()
    }).then(function(data){
    console.log(data)
    // store Data in State Data Variable
}).catch(
    function(err){
        console.log(err)
    }
)

 */
const language = window.localStorage.getItem("language") ? window.localStorage.getItem("language") : "default";

i18next
    .use(Fetch)
    .use(initReactI18next)
    .init({
        interpolation: { escapeValue: false },
        lng: language ? language : "language" ,
        backend: {
            //TODO: Does not load automatically
            loadPath: "translations/custom/common.json"
        },
        resources: {
            default: {
                common: common_en
            },
            custom: {
                common: common_de
            },
        }
    });


ReactDOM.render((
    <Provider store={store}>
        <HashRouter>
            <Suspense fallback="loading">
                <I18nextProvider i18n={i18next}>
                    <App />
                </I18nextProvider>
            </Suspense>
        </HashRouter>
    </Provider>
),
document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
