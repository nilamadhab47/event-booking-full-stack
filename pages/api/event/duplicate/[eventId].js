import eventModel from "../../../../models/event/event";
import aws from "aws-sdk";
import mongoose from "mongoose";
import Return422 from "../../../../models/Return422";
import dbConnect from "../../../../utils/dbConnect";
import Return404 from "../../../../models/Return404";
import return500 from "../../../../models/Return500";
import {unstable_getServerSession} from "next-auth/next";
import {authOptions} from "../../auth/[...nextauth]";
import dateChecker from "../../../../utils/dateChecker";

// VALIDATIONS
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

export default async function handler(req, res) {
    try {
        await dbConnect()

        const session = await unstable_getServerSession(req, res, authOptions)
        if (!session) {
            // Not Signed in
            return res.status(401).send({code: 401, msg: "User not authorised"})
        }

        let obj1 = req.query
        let id = Object.values(obj1)[0]
        if (!isValidObjectId(id)) {
            return res.status(422).send(new Return422([{
                msg: "Provide a valid objectID",
                param: "eventId",
                location: "path"
            }]))
        }
        const findEvent = await eventModel.findOne({_id: id})
        if (!findEvent) {
            return res.status(404).send(new Return404("Event not found to duplicate"))
        }
        if (Object.keys(findEvent).length < 1) {
            return res.status(404).send(new Return404("Event not found to duplicate"))
        }
        let obj = {
            desktopImage: findEvent.desktopImage,
            mobileImage: findEvent.mobileImage,
            name: findEvent.name + "  copy",
            title: findEvent.title,
            shortDescription: findEvent.shortDescription,
            mainDescription: findEvent.mainDescription,
            link: findEvent.link,
            price: findEvent.price,
            bookingFee: findEvent.bookingFee,
            age: findEvent.age,
            eventDate: findEvent.eventDate,
            eventType: findEvent.eventType,
            startTime: findEvent.startTime,
            doorOpeningTime: findEvent.doorOpeningTime,
            displayEventListingFrom: "",
            seoTitle: findEvent.seoTitle,
            seoDescription: findEvent.seoDescription,
            seoFriendlyURL: findEvent.seoFriendlyURL,
            performer: findEvent.performer,
            organizer: findEvent.organizer,
            organizerUrl: findEvent.organizerUrl,
        }
        // let d = Date.now()
        let k = findEvent.desktopImageName
        let k2 = findEvent.mobileImageName

        if (k.length > 1) {
            let key = Date.now() + k
            await s3Client.copyObject({
                Bucket: "18-candleriggs", CopySource: "18-candleriggs/" + k, Key: key,
                ACL: "public-read",
            }).promise();
            obj.desktopImage = "https://18-candleriggs.fra1.digitaloceanspaces.com/" + key
            obj.desktopImageName = key
        }
        if (k2.length > 1) {
            let key2 = Date.now() + k2
            await s3Client.copyObject({
                Bucket: "18-candleriggs", CopySource: "18-candleriggs/" + k, Key: key2,
                ACL: "public-read",
            }).promise();
            obj.mobileImage = "https://18-candleriggs.fra1.digitaloceanspaces.com/" + key2
            obj.mobileImageName = key2
        }
        let createdData = await eventModel.create(obj)
        let resultObj = {
            _id: createdData._id,
            name: createdData.name,
            title: createdData.title,
            shortDescription: createdData.shortDescription,
            mainDescription: createdData.mainDescription,
            link: createdData.link,
            price: createdData.price,
            bookingFee: createdData.bookingFee,
            age: createdData.age,
            eventDate: dateChecker(createdData.eventDate),
            eventType: createdData.eventType,
            startTime: createdData.startTime,
            doorOpeningTime: createdData.doorOpeningTime,
            displayEventListingFrom: "",
            desktopImage: createdData.desktopImage,
            mobileImage: createdData.mobileImage,
            seoTitle: createdData.seoTitle,
            seoDescription: createdData.seoDescription,
            performer: createdData.performer,
            organizer: createdData.organizer,
            organizerUrl: createdData.organizerUrl,
        }
        res.status(200).send({code: 200, msg: "success", result: resultObj})
    } catch (err) {
        return res.status(500).send(new return500(err.message))
    }
}
