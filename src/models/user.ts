import { model, Schema, Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    lastName: string;
    email: string;
    gender: number;
    phoneNumber: string;
    address?: IAddress[];
    status: number;
    createdAt?: Date;
    updatedAt?: Date;
}

interface IAddress {
    address: string;
}

let AddressSchema: Schema = new Schema({ 
    country: String,
    city: String,
    street: String
 });

let IUserSchema: Schema = new Schema({

    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        default: ""
    },
    address: [{
         type: AddressSchema 
        }],
    status: {
        type: Number,
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
},
    {
        collection: "users"
    });



export const User = model<IUser>("IUser", IUserSchema);
