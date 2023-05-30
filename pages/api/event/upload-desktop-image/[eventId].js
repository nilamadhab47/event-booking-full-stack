import aws from "aws-sdk";
import fs from "fs";
import formidable from "formidable";
import mongoose from "mongoose";
import eventModel from "../../../../models/event/event"
import dbConnect from "utils/dbConnect";
import sizeOf from "image-size"
import Return400 from "../../../../models/Return400";
import Return404 from "../../../../models/Return404";
import Return422 from "../../../../models/Return422";
import Return500 from "../../../../models/Return500";
import auth from "../../../../utils/authentication";
import dateChecker from "../../../../utils/dateChecker";
import {unstable_getServerSession} from "next-auth/next";
import {authOptions} from "../../auth/[...nextauth]";


const spacesEndpoint = new aws.Endpoint("fra1.digitaloceanspaces.com");

const s3Client = new aws.S3({
    endpoint: spacesEndpoint,
    region: "ap-southeast-1",
    credentials: {
        accessKeyId: "DO007JMJHRK4LWNUBBBE",
        secretAccessKey: "GjXG9G2sll8x5g5/s1mVwE9U9pamw+OgPk46u6aoY7Q",
    },
});

let isValidObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}

export const config = {
    api: {
        bodyParser: false
    },
}

export default async function handler(req, res) {
    try{
    const imageWidth = 333;
    const imageHeight = 450;
    const imageSizeLimit = 512000;

    if(req.method==="POST"){
    await dbConnect()

        const session = await unstable_getServerSession(req, res, authOptions)
        if (!session) {
            // Not Signed in
            return res.status(401).send({code:401, msg:"User not authorised"})
        }

    let obj = req.query
    let id = Object.values(obj)[0]
    if (!isValidObjectId(id)) {
        return res.status(422).send(new Return422([{
            msg: "Provide a objectID",
            param: "bannerId",
            location: "path"
        }]))
    }
    const findEvent = await eventModel.findOne({_id: id})
    if (!findEvent) {
        return res.status(404).send(new Return404("No event found to update"))
    }

    const form = formidable();
    form.parse(req, async (err, fields, files) => {
        if (Object.keys(files).length < 1) {
            return res.status(400).send(new Return400("No image found to update"))
        }
        if (!files) {
            return res.status(400).send(new Return400("No files uploaded"))
        }
        if (files.file.size > imageSizeLimit) {
            return res.status(422).send(new Return422([
                {
                    "msg": "Upload event desktop image under 500kb",
                    "param": "file",
                    "location": "body"
                }
            ]))
        }
        try {
            const t = "2" + Date.now()
            let uploadedData = await s3Client.upload({
                Bucket: "18-candleriggs",
                Key: t,
                Body: fs.createReadStream(files.file.filepath),
                ACL: "public-read"
            }).promise()

            const downloadParams = {
                Bucket: "18-candleriggs",
                Key: t,
            }
            const downloadedObject = await s3Client.getObject(downloadParams).promise()

            const dimension = (sizeOf(downloadedObject.Body))
            switch (dimension.type) {
                case 'png':
                case "jpeg":
                case "jpg":
                    break;
                //ok
                default:
                    return res.status(400).send(new Return400("Invalid image format"))
            }
            if (dimension.width !== imageWidth) {
                s3Client.deleteObject({Bucket: '18-candleriggs', Key: t}, (err, data) => {
                    console.error(err);
                    console.log(data);
                })
                return res.status(422).send(new Return422([
                    {
                        "msg": `Desktop event image width should be ${imageWidth}px`,
                        "param": "file",
                        "location": "body"
                    }
                ]))
            }
            if (dimension.height !== imageHeight) {
                s3Client.deleteObject({Bucket: '18-candleriggs', Key: t}, (err, data) => {
                    console.error(err);
                    console.log(data);
                })
                return res.status(422).send(new Return422([
                    {
                        "msg": `Desktop event image height should be ${imageHeight}px`,
                        "param": "file",
                        "location": "body"
                    }
                ]))
            }
            await eventModel.findByIdAndUpdate(id, {desktopImageName: t}, {new: true})
            await eventModel.findByIdAndUpdate(id, {desktopImage: "https://18-candleriggs.fra1.digitaloceanspaces.com/" + t}, {new: true})

            let result = await eventModel.findById(id).select({
                _id: 1, desktopImage: 1, mobileImage: 1, name: 1,
                title: 1, shortDescription: 1, mainDescription: 1, link: 1, price: 1, bookingFee: 1,
                age: 1, eventDate: 1, eventType: 1, showStartTime: 1, doorOpeningTime: 1, displayEventListingFrom: 1,seoTitle:1,
                seoDescription:1,performer:1,organizer:1})

            const resultObj = {}
            resultObj._id = result._id
            resultObj.desktopImage = result.desktopImage
            resultObj.mobileImage = result.mobileImage
            resultObj.name = result.name
            resultObj.title = result.title
            resultObj.shortDescription = result.shortDescription
            resultObj.mainDescription = result.mainDescription
            resultObj.link = result.link
            resultObj.price = result.price
            resultObj.bookingFee = result.bookingFee
            resultObj.age = result.bookingFee

            let a = (result.displayEventListingFrom)
            let b = (result.eventDate)
            let edDate = b.toISOString().split("T")
            resultObj.eventDate = edDate[0]
            resultObj.eventType = result.eventType
            resultObj.showStartTime = result.showStartTime
            resultObj.doorOpeningTime = result.doorOpeningTime
            resultObj.displayEventListingFrom = dateChecker(result.displayEventListingFrom)
            resultObj.seoTitle=result.seoTitle
            resultObj.seoDescription=result.seoDescription
            resultObj.performer=result.performer
            resultObj.organizer=result.organizer

            return res.status(201).send({code: 201, msg: "Uploaded successfully", result: resultObj});
        } catch (e) {
            console.log(e)
            return res.status(500).send(new Return500(e.message))
        }
    })
}
    else if(req.method === "DELETE"){
        await dbConnect()

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
                param: "eventId",
                location: "path"
            }]))
        }
        const findEvent = await eventModel.findOne({_id: id})
        if (!findEvent) {
            return res.status(404).send(new Return404("No Event found with that ObjectID"))
        }
        if(!findEvent.desktopImageName){
            return res.status(200).send({code: 200, msg: "OK"})
        }
        if(Object.values(findEvent.desktopImageName).length<1){
            return res.status(200).send({code: 200, msg: "OK"})
        }
        let imageToDelete = findEvent.desktopImageName
        s3Client.deleteObject({Bucket: '18-candleriggs', Key: imageToDelete}, (err, data) => {
            console.error(err);
            console.log(data);
        })
        await eventModel.findByIdAndUpdate(id, {desktopImage: ""}, {new: true})
        await eventModel.findByIdAndUpdate(id, {desktopImageName: ""}, {new: true})
        return res.status(200).send({code: 200, msg: "Deleted successfully"})
    }
}
    catch(err){
        return res.status(500).send(new Return500(err.message()))
    }}

 

