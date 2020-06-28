import React from "react";
import { Route } from "react-router-dom";

import { useQuery } from "@apollo/react-hooks";

import Loading from "./components/Loading";
import LandingPage from "./components/LandingPage";
import { isAuthQuery } from "../../graphql";

const PrivateRoute = ({ component: RouteComponent, ...rest }: any) => {
  const { data, loading } = useQuery(isAuthQuery);

  const isAuth = data?.isAuth;

  return (
    <Route
      {...rest}
      render={(routeProps) => {
        return isAuth ? (
          <RouteComponent {...routeProps} />
        ) : !loading && !isAuth ? (
          <LandingPage />
        ) : (
          <Loading />
        );
      }}
    />
  );
};

export default PrivateRoute;
