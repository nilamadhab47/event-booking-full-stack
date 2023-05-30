import mongoose from 'mongoose'
import subscriberModel from 'models/subscriber/subscriber'
import dbConnect from 'utils/dbConnect'
import {unstable_getServerSession} from "next-auth/next";
import {authOptions} from "../auth/[...nextauth]";

let isValidObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}

  export default async function handler(req, res) {
    try {
        await dbConnect();

        switch (req.method) {
            case "GET": {

                const session = await unstable_getServerSession(req, res, authOptions)
                if (!session) {
                    // Not Signed in
                    return res.status(401).send({code:401, msg:"User not authorised"})
                }

                let obj = req.query
                let id = Object.values(obj)[0]
                

                if (!isValidObjectId(id)) {
                    return res.status(422).send({ code: 422, msg: "Invalid ObjectID" })
                }

                const getSubscriber = await subscriberModel.findOne({ _id: id });
                if (!getSubscriber) {
                    return res.status(404).send({ code: 404, msg: "No subscriber found" })
                }
                return res.status(200).send({ code: 200, subscriber: getSubscriber });
            }

            case "DELETE": {

                const session = await unstable_getServerSession(req, res, authOptions)
                if (!session) {
                    // Not Signed in
                    return res.status(401).send({code:401, msg:"User not authorised"})
                }

                let obj = req.query
                let id = Object.values(obj)[0]

                if (!isValidObjectId(id)) {
                    return res.status(422).send({ code: 422, msg: "Invalid ObjectID" })
                }

                const getSubscriber = await subscriberModel.findById(id);
                if (!getSubscriber) {
                    return res.status(404).send({ code: 404, msg: "No subscriber found" })
                }
                await subscriberModel.deleteOne({ _id: id }, { new: true });
                return res.status(200).send({ code: 200, msg: "Successfully Deleted" });
            }
            default:
                res.setHeader("Allow", ["GET", "DELETE"]);
                return res
                    .status(404)
                    .json({code:404, success: false })
                    .end(`Method ${req.method} Not Allowed`);
        }
    }

    catch (err) {
        return res.status(500).json({ msg: err.toString() });
    }
}