import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
  token: "",
  userID: "",
  isLoggedIn: false,
  username: "",
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
  const [username, setUsername] = useState("");
  const userIsLoggedIn = !!token;

  if (token !== null) {
    AuthContext.isLoggedIn = true;
  } else {
    console.log(true);
  }

  const loginHandler = (obj) => {
    // setUserID(id);
    // setUsername(username);
    // AuthContext.isLoggedIn = true;
    // setToken(accessToken);
    // localStorage.setItem("loginToken", token);
    console.log(obj.accessToken);
    setToken(obj.accessToken);
    setUsername(obj.username);
    setUserID(obj.id);
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
