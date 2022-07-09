import { Router, Request, Response } from "express";
import { Model } from "mongoose";
import BaseController from "./base.controller";
import { User } from "../models/user";
import bcrypt from "bcrypt";

class UserController extends BaseController {
    constructor(model: Model<any>) {
        super(model);
    }

    registerUser(req: Request, res: Response) {
        // Check if user exists
        User.findOne({
            email: req.body.email
        }).then((user: any) => {
            if (user) {
                res.json({
                    responseCode: 400,
                    message: "User already registered with this email",
                    response: "User already registered with this email"
                });
            } else {
                        // Create the new user
                        User.create({
                            name: req.body.name,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            gender: req.body.gender,
                            phoneNumber: req.body.phoneNumber,
                            address: req.body.address,
                            status: req.body.status
                        })
                            .then(result => {
                                if (result) {
                                    res.json({
                                        responseCode: 200,
                                        message: "User has been created",
                                        response: result
                                    });
                                }
                            })
                            .catch(err => {
                                return res.status(200).json({
                                    responseCode: 500,
                                    action: "Creation",
                                    response: err
                                });
                            });
                    
            }
        });
    }
}

export default UserController; 
