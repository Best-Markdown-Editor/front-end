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
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import Success from "./views/PaymentSuccess";
import Cancel from "./views/PaymentCancel";
import PubPreview from "./views/PubPreview";
import { AppContainer, useDarkMode } from "sriracha-ui";
import FourOhFour from "./views/FourOhFour";

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
  faCopy,
  faCog
);

function App() {
  const { themeString, toggleTheme } = useDarkMode();
  return (
    <AppContainer themeString={themeString} toggleTheme={toggleTheme}>
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <Route exact path="/demo" component={Demo} />
        <PrivateRoute path="/success" component={Success} />
        <PrivateRoute path="/cancel" component={Cancel} />
        <PrivateRoute path="/file/:slug" component={MarkdownEditor} />
        <PrivateRoute exact path="/preview/:slug" component={PubPreview} />
        <Route component={FourOhFour} />
      </Switch>
    </AppContainer>
  );
}

export default App;
