import { Router } from "express";
import type { Response, Request, NextFunction } from "express";

import { users } from "./db.js";

const router = Router();

const doesUserExist = (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);

  if (!users[id]) {
    res.send(`Такого пользователя не существует`);
    return;
  }

  next();
};

const sendUser = (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);

  res.send(`Пользователь ${users[id]?.name}, ${users[id]?.age} лет`);
};

router.get("/users/:id", doesUserExist);
router.get("/users/:id", sendUser);

export default router;
