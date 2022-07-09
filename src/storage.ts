import crypto from "crypto";
import path from "path";

import Grid = require("gridfs-stream");
import GridFsStorage = require("multer-gridfs-storage");
import multer from "multer";
import { RequestHandler, Request } from "express";

export let gfs: Grid.Grid;
export let storage: GridFsStorage;
export let upload: RequestHandler;

export function create(mongoose: any): void {
  let mongoURI = mongoose.connection.client.s.url;

  // Setup gridFS here.
  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection("uploads");

  // Create gridFS storage wrapper
  storage = new GridFsStorage({
    db: mongoose.connection.db,
    file: (req: Request, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename =
            buf.toString("hex") + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: "uploads",
            metadata: req.body.metadata,
          };
          resolve(fileInfo);
        });
      });
    },
  });

  // Create uploader object
  upload = multer({
    storage: storage,
    limits: { fields: 1, fileSize: 6000000, files: 1, parts: 2 },
  }).single("file");
}
