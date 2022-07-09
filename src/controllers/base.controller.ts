import { Router, Request, Response } from "express";
import { Model } from "mongoose";
import { ObjectId } from 'bson';

class BaseController {

    _model: Model<any>;

    constructor(model: Model<any>) {
        this._model = model;
        this.get = this.get.bind(this);
        this.getAll = this.getAll.bind(this);
        this.create = this.create.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
    }

    get(req: Request, res: Response) {

        let id = new ObjectId(req.params.id);

        this._model.findById(id, (err: any, result: any) => {
            if (err) {
                return res.status(200).json({ responseCode: 400, response: err });
            } else if (result) {
                return res.status(200).json({ responseCode: 200, response: result });
            } else {
                return res.status(200).json({ responseCode: 404, response: err });
            }
        });

    }

    getAll(req: Request, res: Response) {

        let limitSize = req.query.limit as string;
        if (limitSize) {
            let sizeLimit = parseInt(limitSize);
            let pageNo = req.query.page != null ? parseInt(req.query.page as string) : 1;
            let skip = sizeLimit * (pageNo - 1);

            this._model.find({})
                .limit(sizeLimit)
                .skip(skip)
                .then((result: any) => {
                    if (result.length === 0) {
                        return res.status(200).json({ responseCode: 404, response: "Not Found" });
                    } else {
                        res.status(200).json({ responseCode: 200, response: result });
                    }
                }).catch(err => {
                    res.status(200).json({ responseCode: 400, response: err })
                });
        } else {

            this._model.find({})
                .then((result: any) => {
                    if (result.length === 0) {
                        return res.status(200).json({ responseCode: 404, response: "Not Found" });
                    } else {
                        res.status(200).json({ responseCode: 200, response: result });
                    }
                }).catch(err => {
                    res.status(200).json({ responseCode: 400, response: err })
                });
        }
    }

    create(req: Request, res: Response) {

        let obj = req.body;

        let object = new this._model(obj);

        object.save()
            .then((savedObject: any) => {
                return res.status(200).json(savedObject);
            }, (err: any) => {
                return res.status(200).json({ errCode: 400, errMessage: err });
            });

    };

    delete(req: Request, res: Response) {

        let id = new ObjectId(req.params.id);
        let status: Number = 0;

        this._model.findByIdAndUpdate({ _id: id }, { "$set": { "status": status } }, { new: true })
            .then((data: any) => {
                if (data == null) {
                    res.status(200).json({ errCode: 404, errMessage: "Not found" });
                } else {
                    res.status(200).json({ responseCode: 200, response: data });
                }
            }).catch((err: any) => {
                res.status(200).json({ errCode: 400, errMessage: err })
            });

    }

    update(req: Request, res: Response) {

        let id = new ObjectId(req.params.id);

        let obj = req.body;
        let object = new this._model(obj);

        this._model.findOneAndUpdate({ _id: id }, obj, { new: true })
            .then((data: any) => {
                if (data === null) {
                    res.status(200).json({ errCode: 404, errMessage: "Not Found" });
                }
                else {
                    res.status(200).json(data);
                }
            }).catch((err: any) => {
                res.status(200).json({ errCode: 400, errMessage: err });
            });
    }

    uploadImages(req: Request, res: Response) {
        let id = new ObjectId(req.params.id);
        let files: any = req.files;
        let imagesArray: any = [];
        console.log("User images", req);
        files.forEach((file: any) => {
            imagesArray.push({ public_id: file.public_id, url: file.url });
        });
        this._model.findOneAndUpdate({ _id: id }, { images: imagesArray }, { new: true })
            .then((data: any) => {
                if (data) {
                    res.status(200).json({ responseCode: 200, response: data });
                } else {
                    res.status(200).json({ responseCode: 400, response: "Not Found" });
                }
            }).catch((err: any) => {
                res.status(200).json({ responseCode: 400, response: err });
            });
    }
}

export default BaseController;