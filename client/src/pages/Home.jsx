import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/Contextapi";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user, logout, reUser } = useContext(AuthContext);
  const navigate = useNavigate();

  //check if user exist else navigate to login
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      reUser(token);
    } else {
      navigate("/");
    }
  }, [reUser,navigate]);

  return (
    <div>
      {user && <div>Hello, {user}</div>}
      <button
        onClick={() => {
          logout();
          navigate("/");
        }}
      >
        logout
      </button>
    </div>
  );
};

export default Home;
