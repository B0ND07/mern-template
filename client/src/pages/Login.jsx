import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/Contextapi";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, register, user,reUser } = useContext(AuthContext);
  const navigate = useNavigate();

  //check token when refresh page
  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
    reUser(token);
    }},[reUser])

//   redirect to home if user logged and token exist
  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  //login
  const handleSubmit = async (e) => {
    e.preventDefault();
    login({ email: email, password: password });
  };
  //register
  const handleSubmit2 = async (e) => {
    e.preventDefault();
    register({ email: email, password: password });
  };

  return (
    <div className="App">
      <form>
        <label>Email</label>
        <br />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          required
        />
        <br />
        <label>password</label>
        <br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          required
        />
        <br />
        <button onClick={handleSubmit}>login</button>
        <button onClick={handleSubmit2}>register</button>
      </form>
    </div>
  );
};

export default Login;
