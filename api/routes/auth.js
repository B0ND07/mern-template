import express from "express";
import { login, reUser, register } from "../controllers/auth.js";
import { isAuthenticated } from "../utils/isAuthenticated.js";

const AuthRoute = express.Router();

AuthRoute.post("/register",register);
AuthRoute.post("/login",login);
AuthRoute.get("/me",isAuthenticated,reUser)

export default AuthRoute
