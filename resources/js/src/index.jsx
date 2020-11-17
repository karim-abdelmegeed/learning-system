/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {createBrowserHistory} from "history";
import {Router, Route, Switch, Redirect} from "react-router-dom";

// core components
import Admin from "./layouts/Admin.js";
import RTL from "./layouts/RTL.js";

import "./assets/css/material-dashboard-react.css?v=1.9.0";
import Login from "./views/login";
import Register from "./views/register";


function App() {
    const hist = createBrowserHistory();
    const isAuthenticated = localStorage.getItem('access_token');

    console.log("test vultr");
    return (
        <div className="app">
            <Router history={hist}>
                <Switch>
                    <Route path="/" exact>
                        {isAuthenticated ? (
                            <Redirect to="/admin"/>
                        ) : (
                            <Redirect to="/login"/>
                        )}
                    </Route>
                    <Route path="/admin" component={Admin}/>
                    <Route path="/rtl" component={RTL}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/login" component={Login}/>
                </Switch>
            </Router>
        </div>
    )
}


ReactDOM.render(
    <App/>
    ,
    document.getElementById("root")
);
