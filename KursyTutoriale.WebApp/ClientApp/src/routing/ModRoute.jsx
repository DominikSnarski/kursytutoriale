import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { InitialUserContext } from '../contexts/UserContext';

const ModRoute = ({ component: Component, layout: Layout, ...rest }) => {
  const [userContext] = useState(
    JSON.parse(localStorage.getItem('user')) || InitialUserContext,
  );

  return (
    <Route
      {...rest}
      render={(props) =>
        userContext.authenticated &&
        (userContext.userRoles.includes('Moderator') ||
          userContext.userRoles.includes('Admin')) ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default ModRoute;
