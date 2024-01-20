require("dotenv").config({ path: "./config.env" });
const express = require("express");

const cors = require("cors");

interface ResponseError extends Error {
  status?: string;
  statusCode?: number;
}

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors({ credentials: true }));

app.use(express.json());
app.use(require("./routes/transaction.ts"));

const conn = require("./db/conn.ts");
conn();

const routes = require("./routes/router.ts");

app.use("/api", routes);
app.all("*", (req, res, next) => {
  const err: ResponseError = new Error(
    `Can't find ${req.originalUrl} on the server!`
  );
  err.status = "fail";
  err.statusCode = 404;

  next(err);
});

app.use((error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
