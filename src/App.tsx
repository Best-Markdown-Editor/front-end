import React from "react";
import { Switch, Route } from "react-router";
import Home from "./views/Home";
import Demo from "./views/Demo";
import MarkdownEditor from "./views/MarkdownEditor";
import Loading from "./utils/PrivateRoute/components/Loading";
import PrivateRoute from "./utils/PrivateRoute";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faSignOutAlt,
  faWindowClose,
  faFileDownload,
  faTrash,
  faEdit,
  faUserCog,
  faSpinner,
  faFilePowerpoint,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  fab,
  faSignOutAlt,
  faWindowClose,
  faFileDownload,
  faTrash,
  faEdit,
  faUserCog,
  faSpinner,
  faFilePowerpoint
);

function App() {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Home} />
      <Route exact path="/demo" component={Demo} />
      <Route path="/loading" component={Loading} />
      <PrivateRoute path="/:slug" component={MarkdownEditor} />
    </Switch>
  );
}

export default App;
