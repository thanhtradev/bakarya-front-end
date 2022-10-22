import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
  token: "",
  userID: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});
const initToken = null;
export const AuthContextProvider = (props) => {
  if (typeof window !== "undefined") {
    // Perform localStorage action
    initToken = localStorage.getItem("loginToken");
  }
  const [token, setToken] = useState(initToken);
  const [userID, setUserID] = useState("");
  const userIsLoggedIn = !!token;

  if (token !== null) {
    AuthContext.isLoggedIn = true;
  } else {
    console.log(true);
  }

  const loginHandler = (token, userID) => {
    setUserID(userID);
    AuthContext.isLoggedIn = true;
    localStorage.setItem("loginToken", token);
    setToken(token);
  };
  const logoutHandler = () => {
    setUserID("");
    setToken(null);
    AuthContext.isLoggedIn = false;
    localStorage.removeItem("loginToken");
  };

  const contextValue = {
    token: token,
    userID: userID,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
