import { createContext, useState, useEffect } from "react";

export const AuthData = createContext();

function Context({ children }) {
  let auth = localStorage.getItem("auth");

  const [message, setMessage] = useState("test");
  const [isLogin, setIsLogin] = useState(auth || "nologin");
  console.log(auth)
  return (
    <AuthData.Provider value={{ message, setMessage, isLogin, setIsLogin,auth }}>
      {children}
    </AuthData.Provider>
  );
}

export default Context;
