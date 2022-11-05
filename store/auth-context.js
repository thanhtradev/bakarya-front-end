import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
  token: "",
  userID: "",
  isLoggedIn: false,
  username: "",
  login: (token) => {},
  logout: () => {},
});
let initToken = null;
let userId = null;
let username = null;
export const AuthContextProvider = (props) => {
  if (typeof window !== "undefined") {
    // Perform localStorage action
    initToken = localStorage.getItem("loginToken");
    userId = localStorage.getItem("userID");
    username = localStorage.getItem("username");
  }

  const [token, setToken] = useState(initToken);
  const [userID, setUserID] = useState(userId);
  const [username, setUsername] = useState("");
  const userIsLoggedIn = !!token;

  if (token !== null) {
    AuthContext.isLoggedIn = true;
  }

  const loginHandler = (obj) => {
    setToken(obj.accessToken);
    setUsername(obj.username);
    setUserID(obj.id);
    AuthContext.isLoggedIn = true;
    localStorage.setItem("loginToken", obj.accessToken);
    localStorage.setItem("userID", obj.id);
    localStorage.setItem("username", obj.username);
  };

  const logoutHandler = () => {
    setUserID("");
    setToken(null);
    AuthContext.isLoggedIn = false;
    localStorage.removeItem("loginToken");
    localStorage.removeItem("userID");
    localStorage.removeItem("username");
  };

  const contextValue = {
    token: token,
    userID: userID,
    username: username,
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
