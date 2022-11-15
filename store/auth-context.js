import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import { CookiesProvider } from "react-cookie";

const AuthContext = React.createContext({
  token: "",
  userID: "",
  isLoggedIn: false,
  username: "",
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [cookie, setCookie, removeCookie] = useCookies();

  const [token, setToken] = useState(cookie.accessToken);
  const [userID, setUserID] = useState(cookie.userID);
  const [username, setUsername] = useState(cookie.username);
  const userIsLoggedIn = !!token;

  if (token !== null) {
    AuthContext.isLoggedIn = true;
  }

  const loginHandler = (obj) => {
    const usernameCookieValue = obj.username;
    const accessTokenCookieValue = obj.accessToken;
    const userIDCookieValue = obj.id;

    setCookieValue("username", usernameCookieValue);
    setCookieValue("accessToken", accessTokenCookieValue);
    setCookieValue("userID", userIDCookieValue);

    console.log(obj);

    setToken(obj.accessToken);
    setUsername(obj.username);
    setUserID(obj.id);
    AuthContext.isLoggedIn = true;
  };

  const setCookieValue = (cookieKey, cookieValue) => {
    setCookie(cookieKey, cookieValue, {
      path: "/",
      maxAge: 3600, // Expires after 1hr
      sameSite: true,
    });
  };

  const logoutHandler = () => {
    setUserID("");
    setToken(null);
    AuthContext.isLoggedIn = false;
    removeCookie("userID");
    removeCookie("accessToken");
    removeCookie("username");
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
    <CookiesProvider>
      <AuthContext.Provider value={contextValue}>
        {props.children}
      </AuthContext.Provider>
    </CookiesProvider>
  );
};

export default AuthContext;
