
import React from "react";
import { Navigate } from "react-router-dom";

const Index = () => {
  // Redirect from home page to the dashboard page
  return <Navigate to="/dashboard" replace />;
};

export default Index;
