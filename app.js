import express from "express";
import cors from "cors";
import { port } from "./config/index.js";
import routes from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { requestLogger } from "./middleware/morganWinstonHandler.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// Middlewares globales
app.use(cors());
app.use(requestLogger); // Registrar todas las solicitudes HTTP
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas - montamos bajo /api
app.use("/api", routes);

// Manejo de errores global
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
