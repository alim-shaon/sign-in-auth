import React from "react";

import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

const PrivateRouter = ({ children }) => {
  const { user, isLoading } = useAuth();
  // console.log(user.email);
  // console.log(isLoading);
  const location = useLocation();

  if (isLoading) {
    return <div>is loading</div>;
  }
  if (!user.email) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};

export default PrivateRouter;
