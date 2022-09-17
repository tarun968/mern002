import React from "react";
import { Route,Navigate } from "react-router-dom";
import { isAuthenticated } from "./index";

const PrivateRoute = ({ component:Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
        isAuthenticated() ? (
            <Component {...props} />
          ) : (
            // <Redirect
            //   to={{
            //     pathname: "/signin",
            //     state: { from: props.location }
            //   }}
            // />
            <Route path="/" element={<Navigate replace to="/signin" />} />
          )
        }
      />
    );
  }  

export default PrivateRoute