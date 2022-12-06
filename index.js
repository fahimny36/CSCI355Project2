// database used is mongoDb

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { registerUser } from "./userControll.js";

// initialize express
const URL ="mongodb+srv://fahimny36:Fahim5938@cluster0.zjmcxbd.mongodb.net/?retryWrites=true&w=majority"

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //   useFindAndModify: true,
    });
    console.log(`MongoDb Connected ${conn.connection.host} `);
    console.log("http://localhost:3001/index.html")
  } catch (error) {
    console.log(`error:, ${error.message}`);
    process.exit();
  }
};
connectDb()

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// URL for saving data to database





// const static_path=path.join(__dirname,'.../public')
// app.use(express.static())
app.use("/booking", registerUser);

app
  .get("/", (req, res) => {
    res.set({
      "Allow-access-Allow-Origin": "*",
    });
    return res.redirect("index.html");
    //staring will be the index.html
  })
  .listen(3001);
const errorHandle = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
app.use(errorHandle);
//if their is any error then this path will use.

console.log("listening on PORT 3001");
