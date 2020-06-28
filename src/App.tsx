import React from "react";
import { Switch, Route } from "react-router";
import Home from "./views/Home";
import Demo from "./views/Demo";
import MarkdownEditor from "./views/MarkdownEditor";
import Loading from "./utils/PrivateRoute/components/Loading";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Home} />
      <Route exact path="/demo" component={Demo} />
      <Route path="/loading" component={Loading} />
      <Route path="/:slug" component={MarkdownEditor} />
    </Switch>
  );
}

export default App;
