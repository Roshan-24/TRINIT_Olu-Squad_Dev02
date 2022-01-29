import { createContext, useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const userContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [isLoggedIn, setLoggedIn] = useState(!!localStorage.getItem("accessToken"));
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));

  const navigate = useNavigate();

  const parseJwt = useCallback(token => {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  }, []);

  const login = useCallback(jwt => {
    setAccessToken(jwt);
    localStorage.setItem("accessToken", jwt);
    const user = parseJwt(jwt);
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    setLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setAccessToken(null);
    localStorage.removeItem("accessToken");
    setUser(null);
    localStorage.removeItem("user");
    setLoggedIn(false);
    navigate("/");
  }, []);

  return (
    <userContext.Provider value={{ user, isLoggedIn, accessToken, login, logout }}>
      {children}
    </userContext.Provider>
  );
};

export const useUserContext = () => useContext(userContext);

export default UserProvider;
