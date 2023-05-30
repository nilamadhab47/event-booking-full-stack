import dbConnect from "../../../utils/dbConnect";
import Return422 from "../../../models/Return422";
import eventModel from "../../../models/event/event";
import Return404 from "../../../models/Return404";
import mongoose from "mongoose";
import mustSee from "../../../models/mustSee/mustSee";
import Return400 from "../../../models/Return400";
import initMiddleware from "../../../lib/init-middleware";
import validateMiddleware from "../../../lib/validate-middleware";
import {check, validationResult} from "express-validator";
import Return500 from "../../../models/Return500";
import {unstable_getServerSession} from "next-auth/next";
import {authOptions} from "../auth/[...nextauth]";

let isValidObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}

const validateBody = initMiddleware(
    validateMiddleware([
        check('eventId', "Provide a  valid eventID").trim().isLength({min: 8}),
    ], validationResult)
)


export default async function handler(req, res) {
    try {
        await dbConnect()
        if (req.method === "GET") {
            let obj = req.query
            let id = Object.values(obj)[0]
            if (!(obj)) {
                return res.status(422).send(new Return422([{
                    code: 422,
                    msg: "Provide a objectID",
                    param: "eventId",
                    location: "path"
                }]))
            }

            if (!Object.values(obj).length > 1) {
                return res.status(422).send(new Return422([{
                    code: 422,
                    msg: "Provide a objectID",
                    param: "bannerId",
                    location: "path"
                }]))
            }

            if (!isValidObjectId(id)) {
                return res.status(422).send(new Return422([{
                    code: 422,
                    msg: "Provide a valid objectID",
                    param: "eventId",
                    location: "path"
                }]))
            }

            const getMustSee = await mustSee.findOne({_id: id});
            if (!getMustSee) {
                return res.status(404).send(new Return404("No must see event found"))
            }
            let result = {
                _id: getMustSee._id,
                order: getMustSee.order,
                eventId: getMustSee.eventId,
                desktopImage: getMustSee.desktopImage,
                mobileImage: getMustSee.mobileImage,
                showEventDetails: getMustSee.showEventDetails
            }
            return res.status(200).send({code: 200, msg: "success", result: result});
        }

        else if (req.method === "PUT") {

            const session = await unstable_getServerSession(req, res, authOptions)
            if (!session) {
                // Not Signed in
                return res.status(401).send({code:401, msg:"User not authorised"})
            }

            let obj = req.query
            let id = Object.values(obj)[0]
            let updateData = req.body

            await validateBody(req, res)

            if (!isValidObjectId(id)) {
                return res.status(422).send(new Return422([{
                    code: 422,
                    msg: "Provide a objectID",
                    param: "mustSeeId",
                    location: "path"
                }]))
            }
            const getMustSee = await mustSee.findOne({_id: id});
            if (!getMustSee) {
                return res.status(404).send(new Return404("No must see event found"))
            }
            if (!updateData)
                return res.status(400).send(new Return400("Provide data to update"))

            let checkEvent = await eventModel.findById(updateData.eventId);
            if (!checkEvent) {
                return res.status(404).send(new Return404("No related event found"))
            }
            let updatedData = await mustSee.findByIdAndUpdate(id, updateData, {new: true})
            // await mustSee.findByIdAndUpdate(id,{eventName:checkEvent.name} , {new: true})
            let result = {}
            result._id = updatedData._id
            result.eventId = updatedData.eventId
            result.order = updatedData.order
            result.showEventDetails = updatedData.showEventDetails

            if (updatedData.desktopImage) {
                result.desktopImage = updatedData.desktopImage
            } else {
                result.desktopImage = ""
            }
            if (updatedData.mobileImage) {
                result.mobileImage = updatedData.mobileImage
            } else {
                result.mobileImage = ""
            }


            return res.status(200).send({code: 200, msg: "Updated successfully", result: result})
        }

        else if (req.method === "DELETE") {
            const session = await unstable_getServerSession(req, res, authOptions)
            if (!session) {
                // Not Signed in
                return res.status(401).send({code:401, msg:"User not authorised"})
            }

            let obj = req.query
            let id = Object.values(obj)[0]

            if (!isValidObjectId(id)) {
                return res.status(422).send(new Return422([{
                    code: 422,
                    msg: "Provide a valid objectID",
                    param: "mustSeeId",
                    location: "path"
                }]))
            }
            const getEvent = await mustSee.findById(id);
            if (!getEvent) {
                return res.status(404).send(new Return404("No Must see found to delete"))
            }
            await mustSee.deleteOne({_id: id}, {new: true});
            return res.status(200).send({code: 200, msg: "Successfully Deleted"});
        }
    } catch (err) {
        return res.status(500).send(new Return500(err.message()))
    }
}