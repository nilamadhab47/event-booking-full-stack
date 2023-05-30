import mongoose from 'mongoose';
import eventModel from '../../../models/event/event';
import dbConnect from 'utils/dbConnect';
import initMiddleware from 'lib/init-middleware';
import validateMiddleware from 'lib/validate-middleware';
import {check, validationResult} from 'express-validator';
import Return422 from "../../../models/Return422";
import Return400 from "../../../models/Return400";
import Return405 from "../../../models/Return405";
import Return500 from "../../../models/Return500";
import Return404 from "../../../models/Return404";
import auth from "../../../utils/authentication";
import mustSee from "../../../models/mustSee/mustSee";
import aws from "aws-sdk";
import dateChecker from "../../../utils/dateChecker";
import {unstable_getServerSession} from "next-auth/next";
import {authOptions} from "../auth/[...nextauth]";


let isValidObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}

const spacesEndpoint = new aws.Endpoint("fra1.digitaloceanspaces.com");

const s3Client = new aws.S3({
    endpoint: spacesEndpoint,
    region: "ap-southeast-1",
    credentials: {
        accessKeyId: "DO007JMJHRK4LWNUBBBE",
        secretAccessKey: "GjXG9G2sll8x5g5/s1mVwE9U9pamw+OgPk46u6aoY7Q",
    },
});

const validateBody = initMiddleware(
    validateMiddleware([
        check('name', "Provide Event Name").trim().isLength({min: 1, max: 40}),
        check('title', "Provide title").trim().isLength({min: 1, max: 80}),
        check('shortDescription', "Provide Description").trim().isLength({min: 1, max: 160}),
        check('mainDescription', "Provide Main Description").trim().isLength({min: 0, max: 500}),
        check('link', "Provide Event Link").trim().isLength({min: 1}),
        check('link', "Provide valid URL").trim().isURL(),
        check('price', "Provide an event price or TBA").trim().isLength({min: 1}),
        check('bookingFee', "Provide Booking fees or 0").isFloat({min: 0}),
        check('age', "Provide Select Age").trim().isLength({min: 1}),
        check('age', "Provide Select Age").trim().isIn(["18+", "all ages", "don't show"]),
        check('eventDate', "Provide date").trim().isLength({min: 1}),
        check('eventDate', "Provide date in format").trim().isDate(),
        check('eventType', "Provide Event type").trim().isLength({min: 1}),
        check('eventType', "Provide Event type").trim().isIn(["Live", "Sold Out", "Private Booking", "Cancelled",]),
        check('startTime', "Provide start time").trim().isLength({min: 1}),
        check('doorOpeningTime', "Provide door opening time").trim().isLength({min: 1}),
        check('displayEventListingFrom', "Provide Event Start Date").trim().isLength({min: 1}),
        check('displayEventListingFrom', "Provide Event Start Date in format").trim().isDate(),
        check('seoTitle', "Provide seo-friendly-url title").trim().isLength({min: 0, max: 60}),
        check('seoDescription', "Provide seo-friendly-url description").trim().isLength({min: 0, max: 155}),
        check('performer', "Provide performer name").trim().isLength({min: 0}),
        check('organizer', "Provide organizer").trim().isLength({min: 0}),
        check('organizerUrl', "Provide organizer page url").trim().isLength({min: 0}),
    ], validationResult)
)

export default async function handler(req, res) {
    try {
        await dbConnect();
        switch (req.method) {
            case "GET": {
                let obj = req.query
                let id = Object.values(obj)[0]
                if (!(obj)) {
                    return res.status(422).send(new Return422([{
                        msg: "Provide a objectID",
                        param: "eventId",
                        location: "path"
                    }]))
                }

                if (!Object.values(obj).length > 1) {
                    return res.status(422).send(new Return422([{
                        msg: "Provide a objectID",
                        param: "eventId",
                        location: "path"
                    }]))
                }

                if (!isValidObjectId(id)) {
                    return res.status(422).send(new Return422([{
                        msg: "Provide a valid objectID",
                        param: "eventId",
                        location: "path"
                    }]))
                }

                const getEvent = await eventModel.findOne({_id: id});
                if (!getEvent) {
                    return res.status(404).send(new Return404("No Event found"))
                }
                let enDate = (getEvent.eventDate).toISOString().substring(0, 10)
                console.log(getEvent.displayEventListingFrom)
                return res.status(200).send({
                    code: 200, msg: "success", result: {
                        _id: getEvent._id,
                        desktopImage: getEvent.desktopImage,
                        mobileImage: getEvent.mobileImage,
                        name: getEvent.name,
                        title: getEvent.title,
                        shortDescription: getEvent.shortDescription,
                        mainDescription: getEvent.mainDescription,
                        link: getEvent.link,
                        price: getEvent.price,
                        bookingFee: getEvent.bookingFee,
                        age: getEvent.age,
                        eventDate: enDate,
                        eventType: getEvent.eventType,
                        startTime: getEvent.startTime,
                        doorOpeningTime: getEvent.doorOpeningTime,
                        displayEventListingFrom: dateChecker(getEvent.displayEventListingFrom),
                        seoTitle: getEvent.seoTitle,
                        seoDescription: getEvent.seoDescription,
                        performer: getEvent.performer,
                        organizer: getEvent.organizer,
                        organizerUrl: getEvent.organizerUrl,
                    }
                });
            }

            case "PUT": {
                const session = await unstable_getServerSession(req, res, authOptions)
                if (!session) {
                    // Not Signed in
                    return res.status(401).send({code: 401, msg: "User not authorised"})
                }

                let obj = req.query
                let id = Object.values(obj)[0]
                let updateData = req.body

                await validateBody(req, res)

                if (!isValidObjectId(id)) {
                    return res.status(422).send(new Return422([{
                        msg: "Provide a objectID",
                        param: "bannerId",
                        location: "path"
                    }]))
                }
                const getEvent = await eventModel.findOne({_id: id});
                if (!getEvent) {
                    return res.status(404).send(new Return404("No Event found"))
                }
                if (!updateData)
                    return res.status(400).send(new Return400("Provide data to update"))

                let updatedData = await eventModel.findByIdAndUpdate(id, updateData, {new: true})
                // let stDate = (updatedData.displayEventListingFrom).toISOString().substring(0, 10)
                let enDate = (updatedData.eventDate).toISOString().substring(0, 10)

                let eveName = updateData.name
                let cleanString = eveName.replace(/[^a-zA-Z0-9 ]/g, '')
                let arr = []
                for (let i = 0; i < cleanString.length; i++) {
                    if (cleanString[i] === ' ') {
                        arr.push('-')
                    } else arr.push(cleanString[i])
                }
                let a = arr.join('')
                let nameWithDate = a + "-" + enDate
                let seoFriendly = nameWithDate.toLowerCase()

                await eventModel.findByIdAndUpdate(id, {seoFriendlyURL: seoFriendly}, {new: true})

                return res.status(200).send({
                    code: 200, msg: "successfully updated", result: {
                        _id: updatedData._id,
                        desktopImage: updatedData.desktopImage,
                        mobileImage: updatedData.mobileImage,
                        name: updatedData.name,
                        title: updatedData.title,
                        shortDescription: updatedData.shortDescription,
                        mainDescription: updatedData.mainDescription,
                        link: updatedData.link,
                        price: updatedData.price,
                        bookingFee: updatedData.bookingFee,
                        age: updatedData.age,
                        eventDate: enDate,
                        eventType: updatedData.eventType,
                        startTime: updatedData.startTime,
                        doorOpeningTime: updatedData.doorOpeningTime,
                        displayEventListingFrom: dateChecker(updatedData.displayEventListingFrom),
                        seoTitle: updatedData.seoTitle,
                        seoDescription: updatedData.seoDescription,
                        performer: updatedData.performer,
                        organizer: updatedData.organizer,
                        organizerUrl: updatedData.organizerUrl,
                    }
                })
            }

            case "DELETE": {
                const session = await unstable_getServerSession(req, res, authOptions)
                if (!session) {
                    // Not Signed in
                    return res.status(401).send({code: 401, msg: "User not authorised"})
                }

                let obj = req.query
                let id = Object.values(obj)[0]

                if (!isValidObjectId(id)) {
                    return res.status(422).send(new Return422([{
                        msg: "Provide a valid objectID",
                        param: "eventId",
                        location: "path"
                    }]))
                }

                const getEvent = await eventModel.findById(id);
                if (!getEvent) {
                    return res.status(404).send(new Return404("No Event found"))
                }


                let findMustSee = await mustSee.findOne({eventId: id})
                if (findMustSee) {
                    await mustSee.findByIdAndDelete({_id: findMustSee._id}, {new: true});
                    if ((findMustSee.desktopImageName).length > 5) {
                        s3Client.deleteObject({
                            Bucket: '18-candleriggs',
                            Key: findMustSee.desktopImageName
                        }, (err, data) => {
                            console.error(err);
                            console.log(data);
                        })
                    }
                    if ((findMustSee.mobileImageName).length > 5) {
                        s3Client.deleteObject({
                            Bucket: '18-candleriggs',
                            Key: findMustSee.mobileImageName
                        }, (err, data) => {
                            console.error(err);
                            console.log(data);
                        })
                    }
                }
                await eventModel.deleteOne({_id: id}, {new: true});
                return res.status(200).send({
                    code: 200, msg: "Successfully Deleted", result: {
                        _id: id
                    }
                });
            }
            default:
                res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
                return res.status(404).json(new Return405(`Method ${req.method} Not Allowed`)).end(`Method ${req.method} Not Allowed`);
        }
    } catch (err) {
        return res.status(500).json(new Return500(err.message));
    }
}