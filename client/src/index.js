import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./index.css";
import App from "./App";
//import registerServiceWorker from "./registerServiceWorker";
import Signin from "./Components/Admin/Signin";
import EditPage from "./Components/Admin/EditPage";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/admin/signin" component={Signin} />
      <Route exact path="/admin/maytheu/resume" component={EditPage} />
      <Route exact path="/" component={App} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
//registerServiceWorker();
