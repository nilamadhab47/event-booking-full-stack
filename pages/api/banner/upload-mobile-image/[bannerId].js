import aws from "aws-sdk";
import fs from "fs";
import formidable from "formidable";
import mongoose from "mongoose";
import bannerModel from "../../../../models/banner/banners";
import dbConnect from "utils/dbConnect";
import sizeOf from 'image-size'
import Return404 from "../../../../models/Return404";
import Return400 from "../../../../models/Return400";
import Return422 from "../../../../models/Return422";
import Return500 from "../../../../models/Return500";
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
    try {
        const imageWidth = 640;
        const imageHeight = 360;
        const imageSizeLimit = 512000;  // 500KB
        if (req.method === "POST") {
            const session = await unstable_getServerSession(req, res, authOptions)
            if (!session) {
                // Not Signed in
                return res.status(401).send({code:401, msg:"User not authorised"})
            }
            await dbConnect()
            let obj = req.query
            let id = Object.values(obj)[0]

            if (!isValidObjectId(id)) {
                return res.status(422).send(new Return422([{
                    msg: "Provide a valid objectID",
                    param: "bannerId",
                    location: "path"
                }]))
            }
            const findBanner = await bannerModel.findOne({_id: id})
            if (!findBanner) {
                return res.status(404).send(new Return404("No banner found to update"))
            }

            const form = formidable();
            form.parse(req, async (err, fields, files) => {
                if (Object.keys(files).length < 1) {
                    return res.status(400).send(new Return400("No image found to update"))
                }
                if (!files) {
                    return res.status(400).send(new Return400("No image found to update"))
                }
                if (files.file.size > imageSizeLimit) {
                    return res.status(422).send(new Return422([
                        {
                            "msg": "Upload mobile banner image under 500kb",
                            "param": "file",
                            "location": "body"
                        }
                    ]))
                }
                let originalName = files.file.originalFilename
                console.log(originalName)
                try {
                    const t = "1" + Date.now()
                    console.log(t)
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
                                "msg": `Mobile banner image width should be ${imageWidth}px`,
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
                                "msg": `Mobile banner image width should be ${imageHeight}px`,
                                "param": "file",
                                "location": "body"
                            }
                        ]))
                    }
                    await bannerModel.findByIdAndUpdate(id, {mobileImage: "https://18-candleriggs.fra1.digitaloceanspaces.com/" + t}, {new: true})
                    await bannerModel.findByIdAndUpdate(id, {mobileImageName: t}, {new: true})

                    let result = await bannerModel.findById(id).select({
                        _id: 1,
                        desktopImage: 1,
                        mobileImage: 1,
                        name: 1,
                        link: 1,
                        eventType: 1,
                        startDate: 1,
                        endDate: 1
                    })
                    const resultObj = {}
                    resultObj._id = result._id
                    resultObj.desktopImage = result.desktopImage
                    resultObj.mobileImage = result.mobileImage
                    resultObj.name = result.name
                    resultObj.link = result.link
                    resultObj.eventType = result.eventType
                    let a = (result.startDate)
                    let b = (result.endDate)
                    let stDate = a.toISOString().split("T")
                    let edDate = b.toISOString().split("T")
                    resultObj.startDate = stDate[0]
                    resultObj.endDate = edDate[0]
                    return res.status(201).send({code: 201, msg: "Uploaded successfully", result: resultObj});
                } catch (e) {
                    console.log(e)
                    return res.status(500).send(new Return500(e.msg))
                }
            })
        }
        else if (req.method === "DELETE") {
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
                    param: "bannerId",
                    location: "path"
                }]))
            }
            const findBanner = await bannerModel.findOne({_id: id})
            if (!findBanner) {
                return res.status(404).send(new Return404("No image found to delete"))
            }
            if (!findBanner.mobileImageName) {
                return res.status(200).send({code: 200, msg: "OK"})
            }
            if (Object.values(findBanner.mobileImageName).length < 1) {
                return res.status(200).send({code: 200, msg: "OK"})
            }
            let imageToDelete = findBanner.mobileImageName
            s3Client.deleteObject({Bucket: '18-candleriggs', Key: imageToDelete}, (err, data) => {
                console.error(err);
                console.log(data);
            })
            await bannerModel.findByIdAndUpdate(id, {mobileImage: ""}, {new: true})
            await bannerModel.findByIdAndUpdate(id, {mobileImageName: ""}, {new: true})
            return res.status(200).send({code: 200, msg: "Deleted successfully"})
        }
    }
    catch(err){
        return res.status(500).send(new Return500(err.message()))
    }
}


 

