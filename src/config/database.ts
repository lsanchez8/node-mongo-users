// import Debug from "debug";
// import mongoose from "mongoose";
// import { Mockgoose } from "mockgoose";

// const MONGODB_URI: string =
//     process.env.DB_HOST && process.env.DB_NAME
//         ? `${process.env.DB_HOST}/${process.env.DB_NAME}`
//         : "mongodb://localhost:27017/apollo";

// const MONGODB_TEST_URI: string =
//     process.env.DB_HOST_TEST && process.env.DB_NAME_TEST
//         ? `${process.env.DB_HOST_TEST}/${process.env.DB_NAME_TEST}`
//         : "mongodb://localhost:27017/test";
// console.log(MONGODB_URI);
// export default class Database {
//     static connectMongo(): any {
//         const DEBUG = Debug("database");
//         if (process.env.NODE_ENV === "testing") {
//             const mockgoose = new Mockgoose(mongoose);
//             return mockgoose.prepareStorage().then(() => {
//                 return mongoose
//                     .connect(MONGODB_TEST_URI)
//                     .then(mong => {
//                         DEBUG("MongoDB Test connected");
//                         return mong;
//                     })
//                     .catch(err => {
//                         DEBUG("MongoDB Test connection error. Please make sure MongoDB is running, " + err);
//                     });
//             });
//         } else {
//             // mongoose.set("debug", true);
//             return mongoose
//                 .connect(MONGODB_URI, {
//                     user: process.env.MONGO_USER,
//                     pass: process.env.MONGO_PASS,
//                     useNewUrlParser: true,
//                     authSource: "admin"
//                 })
//                 .then(mong => {
//                     DEBUG("MongoDB connected");
//                     return mong;
//                 })
//                 .catch(err => {
//                     DEBUG("MongoDB connection error. Please make sure MongoDB is running, " + err);
//                 });
//         }
//     }
// }
