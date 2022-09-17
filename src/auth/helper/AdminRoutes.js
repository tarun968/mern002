import React from "react";
import { Route,Navigate } from "react-router-dom";
import { isAuthenticated } from "./index";
const AdminRoute = ({ component:Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
        isAuthenticated() && isAuthenticated().user.role === 1 ? (
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

export default AdminRoute