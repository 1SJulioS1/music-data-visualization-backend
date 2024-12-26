import express from "express";
import cors from "cors";
import morgan from "morgan";
import { port } from "./config/index.js";
import routes from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";

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
