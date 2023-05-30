import Return422 from "../../../models/Return422";
import Return404 from "../../../models/Return404";
import mongoose from "mongoose";
import gallery from "../../../models/gallery/gallery";
import auth from "../../../utils/authentication";
import Return500 from "../../../models/Return500";
import dbConnect from "../../../utils/dbConnect";
import Return400 from "../../../models/Return400";
import initMiddleware from "../../../lib/init-middleware";
import validateMiddleware from "../../../lib/validate-middleware";
import {check, validationResult} from "express-validator";
import {unstable_getServerSession} from "next-auth/next";
import {authOptions} from "../auth/[...nextauth]";

let isValidObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}

const validateBody = initMiddleware(
    validateMiddleware([
        check('category', "Provide a category in: Venue, Events, Food").trim().isIn(["Venue", "Events", "Food"]),
        check('order', "Provide an order number or 0").isInt({min: 0})
    ], validationResult)
)

// delete collection
export default async function handler(req, res) {
    try {
        await dbConnect()
        if (req.method === "DELETE") {
            const session = await unstable_getServerSession(req, res, authOptions)
            if (!session) {
                // Not Signed in
                return res.status(401).send({code:401, msg:"User not authorised"})
            }

            let obj = req.query
            let id = Object.values(obj)[0]

            if (!id) {

                return res.status(422).send(new Return422([{
                    msg: "Provide a objectID",
                    param: "collectionId",
                    location: "path"
                }]))
            }
            if (!isValidObjectId(id)) {
                return res.status(422).send(new Return422([{
                    msg: "Provide a valid objectID",
                    param: "collectionId",
                    location: "path"
                }]))
            }

            const getEvent = await gallery.findById(id);
            if (!getEvent) {
                return res.status(404).send(new Return404("No Event found"))
            }
            await gallery.deleteOne({_id: id}, {new: true});
            return res.status(200).send({code: 200, msg: "Successfully Deleted"});
        }

        else if (req.method === "GET") {

            // const session = await unstable_getServerSession(req, res, authOptions)
            // if (!session) {
            //     // Not Signed in
            //     return res.status(401).send({code:401, msg:"User not authorised"})
            // }

            let obj = req.query
            let id = Object.values(obj)[0]
            if (!(obj)) {
                return res.status(422).send(new Return422([{
                    msg: "Provide a objectID",
                    param: "collectionId",
                    location: "path"
                }]))
            }

            if (!Object.values(obj).length > 1) {
                return res.status(422).send(new Return422([{
                    msg: "Provide a objectID",
                    param: "collectionId",
                    location: "path"
                }]))
            }

            if (!isValidObjectId(id)) {
                return res.status(422).send(new Return422([{
                    msg: "Provide a valid objectID",
                    param: "collectionId",
                    location: "path"
                }]))
            }

            const getCollection = await gallery.findOne({_id: id});
            if (!getCollection) {
                return res.status(404).send(new Return404("No collection found"))
            }

            return res.status(200).send({
                code: 200, msg: "success", result: {
                    _id: getCollection._id,
                    category: getCollection.category,
                    name: getCollection.name,
                    uploadedDate: getCollection.createdAt.toISOString().substring(0, 10),
                    order: getCollection.order,
                    altText: getCollection.altText,
                    smallWebImage: getCollection.smallWebImage,
                    bigWebImage: getCollection.bigWebImage,
                    smallMobileImage: getCollection.smallMobileImage,
                    bigMobileImage: getCollection.bigMobileImage,
                }
            });
        }

        else if (req.method === "PUT") {
            await dbConnect();
            const session = await unstable_getServerSession(req, res, authOptions)
            if (!session) {
                // Not Signed in
                return res.status(401).send({code:401, msg:"User not authorised"})
            }
            await validateBody(req, res)
            let obj = req.query
            let id = Object.values(obj)[0]
            let updateData = req.body
            if (!updateData)
                return res.status(400).send(new Return400("Provide data to update"))

            if (!isValidObjectId(id)) {
                return res.status(422).send(new Return422([{
                    msg: "Provide a objectID",
                    param: "collectionId",
                    location: "path"
                }]))
            }
            const getCollection = await gallery.findOne({_id: id});
            if (!getCollection) {
                return res.status(404).send(new Return404("No collection found"))
            }

            let updatedData = await gallery.findByIdAndUpdate(id, updateData, {new: true})

            return res.status(200).send({
                code: 200, msg: "successfully updated", result: {
                    _id: updatedData._id,
                    category: updatedData.category,
                    name: updatedData.name,
                    order: updatedData.order,
                    altText: updatedData.altText,
                    smallWebImage: updatedData.smallWebImage,
                    bigWebImage: updatedData.bigWebImage,
                    smallMobileImage: updatedData.smallMobileImage,
                    bigMobileImage: updatedData.bigMobileImage
                }
            })
        }

    } catch (err) {
        return res.status(500).send(new Return500(err.message()))
    }
}