const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { port } = require("./config");
const routes = require("./routes");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();

// Middlewares globales
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas - montamos bajo /api
app.use("/api", routes);

// Manejo de errores global
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
