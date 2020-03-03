import React from 'react';
import { Route } from 'react-router-dom';

const AppRoute = (props) => {
  const { component: Component, layout: Layout, ...routeProps } = props;

  return (
    <Route
      {...routeProps}
      render={(componentProps) => (
        <Layout>
          <Component {...componentProps} />
        </Layout>
      )}
    />
  );
};

export default AppRoute;
