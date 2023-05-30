import adminModel from "../../../models/admin/admin"
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import return500 from "../../../models/Return500";
import return404 from "../../../models/Return404";
import {serialize} from "cookie"
import dbConnect from "../../../utils/dbConnect";
import initMiddleware from "../../../lib/init-middleware";
import validateMiddleware from "../../../lib/validate-middleware";
import {check, validationResult} from "express-validator";

///////////////////// LOGIN ADMIN ////////////////////////

const validateBody = initMiddleware(
    validateMiddleware([
        check('email', "Provide Valid email ID").trim().isEmail(),
        check('password', "Provide Password").trim().isLength({min: 3}),
    ], validationResult)
)

export default async function handler(req,res) {
    try {
        await dbConnect()
        await validateBody(req, res)

        let requestBody = req.body
        const { email, password } = requestBody;

        //==finding userDocument==//
        const user = await adminModel.findOne({ email: email });

        if (!user) {
            res.status(404).send(new return404(`${email} unavailable` ));
            return
        }

        if (password !== user.password) {
            return res.status(404).send(new return404( `Password not correct `))
        }

        // let token = jwt.sign(
        //     {
        //         email: user.email,
        //         password: user.password
        //     },
        //     "18-candleriggs"
        // );
        // const serialized = serialize("token", token, {
        //     httpOnly: true,
        //     sameSite: "strict",
        //     maxAge: 1 * 60 * 24 * 60,
        //     path: "/",
        //     secure: false,
        // });
        // //==sending and settings token==//
        // res.setHeader("Set-Cookie", serialized);
        res.status(200).send({ code: 200, message: `login successful`, data: { user } });

    } catch (error) {
        res.status(500).send(new return500(error.message));
    }
}