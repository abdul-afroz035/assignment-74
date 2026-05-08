import { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import { authUser } from "../api";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      authUser(token)
        .then((response) => {
          setUser(response.user || null);
          setLoading(false);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setToken(null);
          setUser(null);
          setLoading(false);
        });
    } else {
     
      setUser(null);
      setLoading(false);
      
    }
  }, [token]);

  const login = (user, token) => {
    localStorage.setItem("token", token || "");
    setToken(token);
    setLoading(true);
    if (user) {
      setUser(user);
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, loading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;