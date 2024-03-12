import axios from "axios";
import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  //login
  const login = async (formData) => {
    const data = await axios.post("/auth/login", formData);
    console.log("Daataa", data.data.token);
    const userData = data.data.user.email;
    setUser(userData);
    localStorage.setItem("token", data.data.token);
  };

  //register
  const register = async (formData) => {
    try{
    const data = await axios.post("/auth/register", formData);
    console.log("Daataa", data.data.token);
    const userData = data.data.user.email;
    setUser(userData);
    localStorage.setItem("token", data.data.token);
    }catch(err){
      console.log(err);
    }
  };

  //refresh page to make persist login
  const reUser = async (token) => {
    const data = await axios.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);

    const userData = data.data.user.email;
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, reUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
