import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

export function PrivateRouteStudent({ children }) {
  const { user } = useContext(AuthContext);
  if (user === null) {
    return <Navigate to="/signin" />
  } else if (user.position === "Student") {
    return children;
  } else if (user.position === "Admin") {
    return <Navigate to="/admin" />
  } else if (user.position === "Advisor") {
    return <Navigate to="/advisor" />
  } else if(user.position === "Lead"){
    return <Navigate to="/Lead" />;
  } else if(user.position === "Communication"){
    return <Navigate to="/communication" />;
  } else if(user.position === "Finance"){
    return <Navigate to="/finance" />;
  } else if(user.position === "Placement"){
    return <Navigate to="/placement" />;
  }
}

export function PrivateRouteAdvisor({ children }) {
  const { user } = useContext(AuthContext);
  if (user === null) {
    return <Navigate to="/signin" />
  } else if (user.position === "Advisor") {
    return children;
  } else if (user.position === "Admin") {
    return <Navigate to="/admin" />
  } else if(user.position === "Student"){
    return <Navigate to="/" />;
  } else if(user.position === "Lead"){
    return <Navigate to="/Lead" />;
  } else if(user.position === "Communication"){
    return <Navigate to="/communication" />;
  } else if(user.position === "Finance"){
    return <Navigate to="/finance" />;
  }
}

export function PrivateRouteLead({ children }) {
  const { user } = useContext(AuthContext);
  if (user === null) {
    return <Navigate to="/signin" />
  } else if (user.position === "Lead") {
    return children
  } else if (user.position === "Admin") {
    return children
  } else if (user.position === "Advisor") {
    return <Navigate to="/advisor" />
  } else if (user.position === "Student") {
    return <Navigate to="/" />
  } else if (user.position === "Communication") {
    return <Navigate to="/communication" />
  } else if (user.position === "Finance") {
    return <Navigate to="/finance" />
  } else if (user.position === "Placement") {
    return <Navigate to="/placement" />
  }
}

export function PrivateRouteCommunication({ children }) {
  const { user } = useContext(AuthContext);
  if (user === null) {
    return <Navigate to="/signin" />
  } else if (user.position === "Communication") {
    return children
  } else if (user.position === "Admin") {
    return <Navigate to="/admin" />
  } else if (user.position === "Advisor") {
    return <Navigate to="/advisor" />
  } else if (user.position === "Student") {
    return <Navigate to="/" />
  } else if (user.position === "Lead") {
    return <Navigate to="/lead" />
  } else if (user.position === "Finance") {
    return <Navigate to="/finance" />
  } else if (user.position === "Placement") {
    return <Navigate to="/placement" />
  }
}

export function PrivateRouteFinance({ children }) {
  const { user } = useContext(AuthContext);
  if (user === null) {
    return <Navigate to="/signin" />
  } else if (user.position === "Finance") {
    return children
  } else if (user.position === "Admin") {
    return <Navigate to="/admin" />
  } else if (user.position === "Advisor") {
    return <Navigate to="/advisor" />
  } else if (user.position === "Student") { 
    return <Navigate to="/" />
  } else if (user.position === "Lead") {
    return <Navigate to="/lead" />
  } else if (user.position === "Communication") {
    return <Navigate to="/communication" />
  } else if (user.position === "Placement") {
    return <Navigate to="/placement" />
  }
}

export function PrivateRoutePlacement({ children }) {
  const { user } = useContext(AuthContext);
  if (user === null) {
    return <Navigate to="/signin" />
  } else if (user.position === "Placement") {
    return children
  } else if (user.position === "Admin") {
    return <Navigate to="/admin" />
  } else if (user.position === "Advisor") {
    return <Navigate to="/advisor" />
  } else if (user.position === "Student") {
    return <Navigate to="/" />
  } else if (user.position === "Lead") {
    return <Navigate to="/lead" />
  } else if (user.position === "Communication") {
    return <Navigate to="/communication" />
  } else if (user.position === "Finance") {
    return <Navigate to="/finance" />
  }
}

export function PrivateRouteAdmin({ children }) {
  const { user } = useContext(AuthContext);
  if (user === null) {
    return <Navigate to="/signin" />
  } else if (user.position === "Admin") {
    return children
  } else if (user.position === "Advisor") {
    return <Navigate to="/advisor" />
  } else if (user.position === "Student") {
    return <Navigate to="/" />
  } else if (user.position === "Lead") {
    return <Navigate to="/lead" />
  } else if (user.position === "Communication") {
    return <Navigate to="/communication" />
  } else if (user.position === "Finance") {
    return <Navigate to="/finance" />
  } else if (user.position === "Placement") {
    return <Navigate to="/placement" />
  }
}
