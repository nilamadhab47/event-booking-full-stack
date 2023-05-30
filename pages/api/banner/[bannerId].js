import mongoose from 'mongoose';
import bannerModel from '../../../models/banner/banners';
import dbConnect from 'utils/dbConnect';
import initMiddleware from 'lib/init-middleware';
import validateMiddleware from 'lib/validate-middleware';
import {check, validationResult} from 'express-validator';
import Return422 from "models/Return422";
import Return404 from "../../../models/Return404";
import Return400 from "../../../models/Return400";
import Return500 from '../../../models/Return500';
import Return405 from "../../../models/Return405";
import {unstable_getServerSession} from "next-auth/next";
import {authOptions} from "../auth/[...nextauth]";


let isValidObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}

const validateBody = initMiddleware(
    validateMiddleware([
        check('name', "Provide Banner Name").trim().isLength({min: 1, max: 30}),
        check('link', "Provide Banner link").trim().isLength({min: 1, max: 160}),
        check('link', "Provide valid banner link").trim().isURL(),
        check('eventType', "Provide a valid Event Type in: Live, Sold Out, Cancelled, Private Booking").trim().isIn(["Live", "Sold Out", "Cancelled", "Private Booking"]),
        check('startDate', "Provide Banner Start Date").trim().isLength({min: 1}),
        check('startDate', "Provide Banner Start Date in format").trim().isDate(),
        check('endDate', "Provide Banner End Date").trim().isLength({min: 1}),
        check('endDate', "Provide Banner End Date in format").trim().isDate(),
    ], validationResult)
)

export default async function handler(req, res) {
    try {
        await dbConnect();
        switch (req.method) {
            case "GET": {
                let obj = req.query
                if (!(obj) && (Object.keys(obj).length > 1)) {
                    return res.status(422).send(new Return422([{
                        msg: "Provide a valid objectID",
                        param: "bannerId",
                        location: "path"
                    }]))
                }

                let id = Object.values(obj)[0]

                if (!isValidObjectId(id)) {
                    return res.status(422).send(new Return422([{
                        msg: "Provide a valid objectID",
                        param: "bannerId",
                        location: "path"
                    }]))
                }

                const getBanner = await bannerModel.findOne({_id: id}).select({
                    _id: 1,
                    desktopImage: 1,
                    mobileImage: 1,
                    name: 1,
                    link: 1,
                    eventType: 1,
                    startDate: 1,
                    endDate: 1
                })
                if (!getBanner) {
                    return res.status(404).send(new Return404("Banner not found"))
                }

                const resultObj = {}
                resultObj._id = getBanner._id
                resultObj.desktopImage = getBanner.desktopImage
                resultObj.mobileImage = getBanner.mobileImage
                resultObj.name = getBanner.name
                resultObj.link = getBanner.link
                resultObj.eventType = getBanner.eventType
                let a = (getBanner.startDate)
                let b = (getBanner.endDate)
                let stDate = a.toISOString().split("T")
                let edDate = b.toISOString().split("T")
                resultObj.startDate = stDate[0]
                resultObj.endDate = edDate[0]

                return res.status(200).send({code: 200, msg: "success", result: resultObj});
            }

            case "PUT": {
                const session = await unstable_getServerSession(req, res, authOptions)
                if (!session) {
                    // Not Signed in
                    return res.status(401).send({code:401, msg:"User not authorised"})
                }

                let obj = req.query
                let id = Object.values(obj)[0]
                let updateData = req.body
                if (!isValidObjectId(id)) {
                    return res.status(422).send(new Return422([{
                        msg: "Provide a valid objectID",
                        param: "bannerId",
                        location: "path"
                    }]))
                }
                await validateBody(req, res)

                let stDate = updateData.startDate
                let edDate = updateData.endDate

                let stDate1 = new Date(stDate)
                let edDate1 = new Date(edDate)
                let dataToCreate = {
                    "name": updateData.name,
                    "link": updateData.link,
                    "eventType": updateData.eventType,
                    "startDate": stDate1,
                    "endDate": edDate1,
                }

                const getBanner = await bannerModel.findOne({_id: id});
                if (!getBanner) {
                    return res.status(404).send(new Return404("Banner not found"))
                }
                if (!(updateData))
                    return res.status(400).send(new Return400("No data found to update"))

                if (!(Object.keys(updateData).length > 0)) {
                    return res.status(400).send(new Return404("No data found to update"))
                }

                let updatedData = await bannerModel.findByIdAndUpdate(id, dataToCreate, {new: true}).select({
                    _id: 1,
                    name: 1,
                    link: 1,
                    eventType: 1,
                    startDate: 1,
                    endDate: 1,
                    desktopImage: 1,
                    mobileImage: 1,
                })

                const resultObj = {

                    _id : updatedData._id,
                    name : updatedData.name,
                    link : updatedData.link,
                    eventType : updatedData.eventType,
                    startDate : stDate,
                    endDate : edDate,
                    desktopImage: updatedData.desktopImage,
                    mobileImage: updatedData.mobileImage,
                }
                return res.status(200).send({code: 200, msg: "updated successfully", result: resultObj})
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
                    return res.status(422).send(new Return422([{
                        msg: "Provide a valid objectID",
                        param: "bannerId",
                        location: "path"
                    }]))
                }

                const getBanner = await bannerModel.findById(id);
                if (!getBanner) {
                    return res.status(404).send(new Return404("Banner not found"))
                }
                await bannerModel.deleteOne({_id: id}, {new: true})
                return res.status(200).send({code: 200, msg: "Successfully Deleted"});
            }

            default:
                res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
                return res.status(405).json(new Return405(`Method ${req.method} Not Allowed`)).end(`Method ${req.method} Not Allowed`);
        }
    } catch (err) {
        return res.status(500).send(new Return500(err.message))
    }
}