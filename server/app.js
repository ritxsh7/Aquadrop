import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Connection from "./configs/db.js";
import Router from "./routes/route.js";
import { cloudConnect } from "./configs/cloud.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const url = process.env.MONGODB_URL;

app.use(cors());
app.use(express.json());
app.use("/api/v1", Router);

//===========connections==============
Connection(url);
cloudConnect();

//==========server=========================

const msg = () => {
  console.log(`Server runnning on my port ${PORT}`);
};

app.listen(PORT, msg);
