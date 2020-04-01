import React from 'react';

export const InitialUserContext = {
  authenticated: false,
  username: null,
  userid: null,
  roles: [],
};

export const UserContext = React.createContext();
