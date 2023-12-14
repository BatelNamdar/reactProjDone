import axios from "axios";
import { createContext, useContext, useState } from "react";
import userServices from "../services/userServices";

const fn_err_context_must_be_used = () => {
  throw new Error("must use auth provider for consumer to work.");
};

export const authContext = createContext({
  user: null,
  login: fn_err_context_must_be_used,
  signUp: fn_err_context_must_be_used,
  logOut: fn_err_context_must_be_used,
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(userServices.getUser());
  axios.defaults.headers.common["x-auth-token"] = userServices.getJwt();

  const refreshUser = () => setUser(userServices.getUser());

  const login = async (email_password) => {
    const response = await userServices.login(email_password);
    refreshUser();

    return response;
  };

  const logout = () => {
    userServices.logout();
    refreshUser();
  };

  return (
    <authContext.Provider
      value={{
        user,
        login,
        logout,
        signUp: userServices.signUp,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => useContext(authContext);
