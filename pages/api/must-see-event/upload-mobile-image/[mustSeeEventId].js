import aws from "aws-sdk";
import fs from "fs";
import formidable from "formidable";
import mongoose from "mongoose";
import dbConnect from "utils/dbConnect";
import sizeOf from "image-size"
import Return400 from "../../../../models/Return400";
import Return404 from "../../../../models/Return404";
import Return422 from "../../../../models/Return422";
import Return500 from "../../../../models/Return500";
import mustSee from "../../../../models/mustSee/mustSee";
import auth from "../../../../utils/authentication";
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
    const imageWidth = 250;
    const imageHeight = 270;
    const imageSizeLimit = 204800;  // 200KB

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
                code: 422,
                msg: "Provide a objectID",
                param: "mustSeeId",
                location: "path"
            }]))
        }
        const findEvent = await mustSee.findOne({_id: id})
        if (!findEvent) {
            return res.status(404).send(new Return404("No must see event found to upload image"))
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
                return res.status(400).send(new Return422([
                    {
                        "msg": "Upload must see event desktop image under 200kb",
                        "param": "file",
                        "location": "body"
                    }
                ]))
            }
            try {
                const t = "2" + Date.now()
                await s3Client.upload({
                    Bucket: "18-candleriggs",
                    Key: t,
                    Body: fs.createReadStream(files.file.filepath),
                    ACL: "public-read"
                }).promise();
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
                    return res.status(400).send(new Return422([
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
                    return res.status(400).send(new Return422([
                        {
                            "msg": `Mobile must see event image height should be ${imageHeight}px`,
                            "param": "file",
                            "location": "body"
                        }
                    ]))
                }
                await mustSee.findByIdAndUpdate(id, {mobileImageName: t}, {new: true})
                await mustSee.findByIdAndUpdate(id, {mobileImage: "https://18-candleriggs.fra1.digitaloceanspaces.com/" + t}, {new: true})

                let findImg = await mustSee.findById(id).select({
                    _id: 1, eventId: 1, desktopImage: 1, mobileImage: 1})

                let result = {}
                result._id = findImg._id
                result.eventId = findImg.eventId
                if (!findImg) {
                    return res.status(404).send(new Return404("No must see event found"))
                }
                if(findImg.desktopImage){
                    result.desktopImage= findImg.desktopImage
                }
                else {
                    result.desktopImage = ""
                }
                if(findImg.mobileImage){
                    result.mobileImage= findImg.mobileImage
                }
                else {
                    result.mobileImage = ""
                }

                return res.status(201).send({code: 201, msg: "Uploaded successfully", result: result});
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
                param: "mustSeeId",
                location: "path"
            }]))
        }
        const findEvent = await mustSee.findOne({_id: id})
        if (!findEvent) {
            return res.status(404).send(new Return404("No image found to delete"))
        }
        if(!findEvent.mobileImageName){
            return res.status(200).send({code: 200, msg: "OK"})
        }
        if(Object.values(findEvent.mobileImageName).length<2){
            return res.status(200).send({code: 200, msg: "OK"})
        }
        let imageToDelete = findEvent.mobileImageName
        s3Client.deleteObject({Bucket: '18-candleriggs', Key: imageToDelete}, (err, data) => {
            console.error(err);
            console.log(data);
        })
        await mustSee.findByIdAndUpdate(id, {mobileImage: ""}, {new: true})
        await mustSee.findByIdAndUpdate(id, {mobileImageName: ""}, {new: true})
        return res.status(200).send({code: 200, msg: "Successfully deleted"})
    }
}
    catch(err){
        return res.status(500).send(new Return500(err.message()))
    }}
