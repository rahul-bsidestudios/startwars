import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const ProtectedRoute = ({ isLoggedIn, user, ...props }) => {
  return isLoggedIn
  ? (<Route {...props} />)
  : (<Redirect to={"/login"} />)
};