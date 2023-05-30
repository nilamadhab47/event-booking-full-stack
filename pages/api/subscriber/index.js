import subscriberModel from 'models/subscriber/subscriber'
import dbConnect from 'utils/dbConnect'
import initMiddleware from 'lib/init-middleware'
import validateMiddleware from 'lib/validate-middleware'
import {check, validationResult} from 'express-validator'
import Return500 from "../../../models/Return500";
import {unstable_getServerSession} from "next-auth/next";
import {authOptions} from "../auth/[...nextauth]";

const validateBody = initMiddleware(
    validateMiddleware([
        check('email', "Provide user email").trim().isLength({min: 1}),
        check('email', "Provide valid email").trim().isEmail(),
        check('date', "Provide Date").trim().isLength({min: 1}),
        check('date', "Provide Date in format").trim().isDate()
    ], validationResult)
)

export default async function handler(req, res) {

    try {
        switch (req.method) {
            case 'POST': {
                await dbConnect();

                let requestBody = req.body
                let d = requestBody.date
                await validateBody(req, res)

                const createData = {
                    email: requestBody.email,
                    date: new Date(d)
                }
                let createdData = await subscriberModel.create(createData)
                return res.status(201).send({
                    code: 201,
                    msg: "Subscriber created",
                    result: {_id: createdData._id, email: createdData.email, date: requestBody.date}
                })
            }

            case "GET": {
                await dbConnect();

                // const session = await unstable_getServerSession(req, res, authOptions)
                // if (!session) {
                //     // Not Signed in
                //     return res.status(401).send({code:401, msg:"User not authorised"})
                // }

                let getSubscriber = await subscriberModel.find()

                if (getSubscriber.length === 0) {
                    //return res.status(200).send({ code: 200, msg: "Success" ,noOfResult:0, result: {}})
                    return res.status(200).send({
                        code: 200,
                        msg: "Success",
                        noOfResults: 0,
                        result: []
                    }) //  fix
                }

                let results = []
                for (let i = 0; i < getSubscriber.length; i++) {
                    let newObj = {
                        _id: getSubscriber[i]._id,
                        email: getSubscriber[i].email,
                        date: getSubscriber[i].date.toISOString().substring(0, 10)
                    }
                    results.push(newObj)
                }

                return res.status(200).send({
                    code: 200,
                    msg: "success",
                    numberOfResults: Object.keys(getSubscriber).length,
                    result: results
                })
            }
            default:
                res.setHeader("Allow", ["GET", "POST"]);
                return res.status(405).json({code: 405, success: false}).end(`Method ${req.method} Not Allowed`);
        }
    } catch (err) {
        return res.status(500).json(new Return500(err.message));
    }
}