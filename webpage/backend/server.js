import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import detailRoute from "./routes/details.js";

dotenv.config();

const app = express();

mongoose
  .connect(process.env.dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) =>
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Running and db success`)
    )
  )
  .catch((err) => console.log(err));

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.json());

app.use("/details", detailRoute);

app.get("/", (req, res) => res.send("Homepage"));
