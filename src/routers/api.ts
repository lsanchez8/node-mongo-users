import * as express from "express";
import { User } from "../models/user";


import UserController from "../controllers/user";

import { WELCOME_MESSAGE } from "../constants/apollo.constants";

const userController = new UserController(User);

class ApiRouter {
  public Router: express.Router;

  constructor() {
    this.Router = express.Router({ mergeParams: true });

    this.Router.get("/", (req, res) => {
      res.json({
        message: WELCOME_MESSAGE,
      });
    });

    //Users endpoints
    this.Router.get("/user/:id", userController.get);
    this.Router.get("/user", userController.getAll);
    this.Router.post("/user", userController.registerUser);
    this.Router.put("/user/:id", userController.update);
    this.Router.delete("/user/:id", userController.delete);
  }
}
export default new ApiRouter();
