import express from "express";
import path from "path";
import type { Request, Response, NextFunction } from "express";
import { fileURLToPath } from "url";

import router from "./router.js";

const { PORT = 3000 } = process.env;
const app = express();

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.group(`${req.method} ${req.originalUrl}`);
  console.info("Time:", new Date().toISOString());
  console.info("IP:", req.ip);
  console.groupEnd();

  next();
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(logger);
app.use(express.static(path.join(__dirname, 'public'))); // теперь клиент имеет доступ только к публичным файлам
app.use(express.json()); // для собирания JSON-формата
app.use(express.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса 
app.use("/", router);

app.listen(+PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
