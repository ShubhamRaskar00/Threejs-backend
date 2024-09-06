const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const router = require("./routers");

dotenv.config();

const app = express();

//cors
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(router)

// test app 
app.use("/test", (req, res) => {
  res.send("Node js is running!");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).json({
    success: false,
    message: "Page not found",
    error: {
      status: 404,
      message: "Page not found"
    }
  })
});

// development error handler
if(app.get("env") === "development") {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    })
  })
}

// production error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  })
});


const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})

module.exports = app;