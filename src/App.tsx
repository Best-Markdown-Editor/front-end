import React from "react";
import { Switch, Route } from "react-router";
import Home from "./views/Home";
import Demo from "./views/Demo";
import MarkdownEditor from "./views/MarkdownEditor";
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
  faFolder,
  faUpload,
  faFileAlt,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import Success from "./views/PaymentSuccess";
import Cancel from "./views/PaymentCancel";
import PubPreview from "./views/PubPreview";

library.add(
  fab,
  faSignOutAlt,
  faWindowClose,
  faFileDownload,
  faTrash,
  faEdit,
  faUserCog,
  faSpinner,
  faFilePowerpoint,
  faFolder,
  faUpload,
  faFileAlt,
  faCopy
);

function App() {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Home} />
      <Route exact path="/demo" component={Demo} />
      <PrivateRoute path="/success" component={Success} />
      <PrivateRoute path="/cancel" component={Cancel} />
      <PrivateRoute path="/file/:slug" component={MarkdownEditor} />
      <PrivateRoute exact path="/preview/:slug" component={PubPreview} />
    </Switch>
  );
}

export default App;
