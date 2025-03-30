
import React from "react";
import { Navigate } from "react-router-dom";

const Index = () => {
  // Redirect from home page to the chamadas page
  return <Navigate to="/chamadas" replace />;
};

export default Index;
