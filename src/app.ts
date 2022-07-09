import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import Debug from "debug";
import cookieParser from "cookie-parser";

import { DefaultRouter } from "./routers";

class App {
  public app: express.Application;

  DEBUG = Debug("database");

  constructor() {
    this.app = express();
    this._setConfig();
    this._setMongoConfig();
    this.routingSetup();
  }

  private _setConfig() {
    this.app.use(bodyParser.json({ limit: "50mb" }));
    this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
    this.app.use(cors());
  }

  private _setMongoConfig() {
    mongoose.Promise = global.Promise;
    mongoose.connect("mongodb://localhost:27017/apollo", {
      useNewUrlParser: true
    }).then(mong => {
      this.DEBUG("MongoDB connected");
      return mong;
    }).catch(err => {
      this.DEBUG("MongoDB error. Please make sure MongoDB is up and running, " + err);
    });
  }



  private routingSetup(): void {
    this.app.use(cookieParser());
    this.app.use("/", DefaultRouter);
  }
}
export default new App().app;
