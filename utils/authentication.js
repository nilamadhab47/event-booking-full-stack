// JWT
import jwt from "jsonwebtoken";
import admin from "../models/admin/admin";

export default async function auth(req,res) {
    // let token = req.cookies.token
    // if (!token) {
    //     return res.status(400).send({code: 400, msg: "Authentication Required"});
    // }
    // if (token === "notoken") {
    //     return res.status(400).send({code: 400, msg: "Authentication Required"});
    // }
    // let decode = await jwt.decode(token)
    // if (decode === null) {
    //     return res.status(403).send({code: 403, msg: "Not authorised"})
    // }
    // let verifyEmail = await admin.findOne({email: decode.email})
    // if (!verifyEmail) {
    //     return res.status(403).send({code: 403, msg: "Not authorised"})
    // }
    // if (verifyEmail.password !== decode.password) {
    //     return res.status(403).send({code: 403, msg: "Not enough permissions"})
    //
    // }
}