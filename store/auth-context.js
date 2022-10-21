import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
  token: "",
  userId: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [userID, setUserID] = useState("");
  const userIsLoggedIn = !!token;

  const loginHandler = (token, userID) => {
    setUserID(userID);
    setToken(token);
    AuthContext.isLoggedIn = true;
    localStorage.setItem("loginToken", token);
  };
  const logoutHandler = () => {
    setUserID("");
    setToken(null);
    AuthContext.isLoggedIn = false;
    localStorage.removeItem("loginToken");
  };

  const contextValue = {
    token: token,
    useID: userID,
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
