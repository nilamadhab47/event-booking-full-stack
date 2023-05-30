import dbConnect from "../../../utils/dbConnect";
import mustSeeModel from "../../../models/mustSee/mustSee";
import eventModel from "../../../models/event/event";
import Return422 from "../../../models/Return422";
import mongoose from "mongoose";
import initMiddleware from "../../../lib/init-middleware";
import validateMiddleware from "../../../lib/validate-middleware";
import {check, validationResult} from "express-validator";
import auth from "../../../utils/authentication";
import Return500 from "../../../models/Return500";
import getMustSeeEvents from "../../../services/getMustSeeEvents";
import {unstable_getServerSession} from "next-auth/next";
import {authOptions} from "../auth/[...nextauth]";

const validateBody = initMiddleware(
    validateMiddleware([
        check('eventId', "Provide a  valid eventID").trim().isLength({min: 8}),
    ], validationResult)
)
let isValidObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}

export default async function handler(req, res) {
    try {
        if (req.method === "POST") {
            await dbConnect()
            const session = await unstable_getServerSession(req, res, authOptions)
            if (!session) {
                // Not Signed in
                return res.status(401).send({code:401, msg:"User not authorised"})
            }

            await validateBody(req, res)
            let id = req.body.eventId

            if (!isValidObjectId(id)) {
                return res.status(422).send(new Return422([{
                    code: 422,
                    msg: "Provide a valid objectID",
                    param: "eventId",
                    location: "body"
                }]))
            }
            const getEvent = await eventModel.findById(id)
            if (!getEvent) {
                return res.status(404).send({code: 404, msg: "No events found by this objectID"})
            }
            let dataToCreate = {
                eventId: id,
                order: req.body.order,
                desktopImage: "",
                mobileImage: "",
                desktopImageName: "",
                mobileImageName: "",
                showEventDetails: false,
            }
            let createData = await mustSeeModel.create(dataToCreate)
            let result = {
                _id: createData._id,
                order: createData.order,
                eventId: createData.eventId,
                desktopImage: createData.desktopImage,
                mobileImage: createData.mobileImage,
                showEventDetails: createData.showEventDetails
            }
            return res.status(201).send({code: 201, msg: "Must See Event created successfully", result: result})
        }

        else if (req.method === "GET") {
             const getMustSee =    await getMustSeeEvents()
            if (getMustSee.length === 0) {
                return res.status(200).send({
                    code: 200,
                    msg: "success",
                    numberOfResults: 0,
                    result: []
                })
            }
            return res.status(200).send({
                code: 200,
                msg: "success",
                numberOfResults: Object.keys(getMustSee).length,
                result: getMustSee
            })
        }
    } catch (err) {
        return res.status(500).send(new Return500(err.message))
    }
}
