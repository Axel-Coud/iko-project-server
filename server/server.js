import express from "express";
import cors from "cors";
import config from "./config/config";
import usersRoutes from "./routes/usersRoute";
import authRoutes from "./routes/authRoute";
import articlesRoutes from "./routes/articlesRoute";

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cors());

server.use("/", authRoutes);
server.use("/", usersRoutes);
server.use("/", articlesRoutes);

server.listen(config.port, () => {
  console.log(`Started on port ${config.port}`);
});

// catch 404 and forward to error handler
server.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
server.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.server.get("env") === "development" ? err : {}
  });
});

module.exports = server;
