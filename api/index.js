import express from "express";
import { config } from "dotenv";
import connect from "./config/db.js";
import AuthRoute from "./routes/auth.js"
import cors from "cors"

//set .env
config();

const app = express();

//cors
app.use(cors({origin:"*"}))

//connect db
connect();

//to parse as json req and res
app.use(express.json());

// app.use("/", (req, res) => {
//     res.send("server running");
//   });
  
//routes
app.use("/api/auth", AuthRoute);

//set up port
const PORT = process.env.PORT || 5000;

//listen on port
app.listen(PORT, console.log(`running on http://localhost:${PORT}`));
