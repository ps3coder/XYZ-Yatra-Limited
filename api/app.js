import express from "express";
import "./src/config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { configDotenv } from "dotenv";
import authRoutes from "./src/routes/auth.routes.js";
configDotenv();

const app = express();
const corsOrigin = {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOrigin));
app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT || 3000;
// app.use(bodyParser.json());
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port} at http://localhost:${port}`);
});
