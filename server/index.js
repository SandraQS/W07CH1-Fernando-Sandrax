const morgan = require("morgan");
const debug = require("debug")("series:server");
const express = require("express");
const chalk = require("chalk");
// const cors = require("cors");
const usersRoutes = require("./routes/usersRoutes");

const app = express();

const initializerServer = (port) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.yellow(`Escuchando en el puerto ${port}.`));
      resolve(server);
    });

    server.on("error", (error) => {
      debug(chalk.red("Error al iniciar el servidor."));
      if (error.code === "EADDRINUSE") {
        debug(chalk.red(`El puerto ${port} ya está ocupado`));
      }
      reject();
    });

    server.on("close", () => {
      debug(chalk.yellow("El servidor express está desconectado"));
    });
  });

app.use(morgan("dev"));
// app.use(cors());
app.use(express.json());
app.use("/users", usersRoutes);

module.exports = { initializerServer };
