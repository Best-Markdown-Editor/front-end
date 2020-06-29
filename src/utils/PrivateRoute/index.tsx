import React, { useState } from "react";
import { Route } from "react-router-dom";

import { useSelector } from "react-redux";

import Loading from "./components/Loading";
import LandingPage from "./components/LandingPage";

const PrivateRoute = ({ component: RouteComponent, ...rest }: any) => {
  const [token, setToken] = useState("");

  useSelector(
    async (state: any) =>
      (await state.auth.stsTokenManager) &&
      state.auth.stsTokenManager.accessToken
  ).then((res) => setToken(res));

  const loaded = useSelector((state: any) => state.profile.isLoaded);

  return (
    <Route
      {...rest}
      render={(routeProps) => {
        return token ? (
          <RouteComponent {...routeProps} />
        ) : loaded && !token ? (
          <LandingPage />
        ) : (
          <Loading />
        );
      }}
    />
  );
};

export default PrivateRoute;
