import { createContext, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router";

const StudentContext = createContext();
export default StudentContext;

export const StudentProvider = ({ children }) => {
  const navigate = useNavigate();
  
  const contextData = {

  };
  return (
    <StudentContext.Provider value={contextData}>{children}</StudentContext.Provider>
  );
};