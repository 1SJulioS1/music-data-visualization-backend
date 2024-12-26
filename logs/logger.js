/**
 * Ejemplo de logger con Winston (opcional).
 * Si deseas usarlo, instala: npm install winston
 */
const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console()
    // Puedes agregar un archivo o base de datos, p.e.: new transports.File({ filename: "logs/app.log" })
  ]
});

module.exports = logger;
