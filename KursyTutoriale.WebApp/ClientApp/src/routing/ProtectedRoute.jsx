import React, {useState} from "react";
import { Route, Redirect } from "react-router-dom";
import { InitialUserContext} from '../contexts/UserContext';


const ProtectedRoute = ({ component: Component, ...rest }) => {

    const [userContext] = useState(JSON.parse(localStorage.getItem('user')) || InitialUserContext);
  
return (
    <Route
      {...rest}
      render={props => {
        return userContext.authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location }
            }}
          />
        );
      }}
    />
  );
};

export default ProtectedRoute;
