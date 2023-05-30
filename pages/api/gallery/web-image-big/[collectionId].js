import aws from "aws-sdk";
import fs from "fs";
import formidable from "formidable";
import mongoose from "mongoose";
import galleryModel from "../../../../models/gallery/gallery"
import dbConnect from "utils/dbConnect";
import sizeOf from "image-size"
import Return404 from "../../../../models/Return404";
import Return422 from "../../../../models/Return422";
import Return400 from "../../../../models/Return400";
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
    const imageWidth = 630;
    const imageHeight = 600;
    const imageSizeLimit = 1000000; //1MB
    try{
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
            msg: "Provide a valid objectID",
            param: "collectionId",
            location: "path"
        }]))
    }
    const findGallery = await galleryModel.findOne({_id: id})
    if (!findGallery) {
        return res.status(404).send(new Return404("No collection found to update"))
    }

    const form = formidable();
    form.parse(req, async (err, fields, files) => {
        if (Object.keys(files).length < 1) {
            return res.status(400).send(new Return400("No image found to update"))
        }
        if (!files) {
            return res.status(400).send(new Return400("No image found to update"))
        }
        console.log(files.file.size)
        if (files.file.size > imageSizeLimit) {
            return res.status(400).send(new Return422([
                {
                    "msg": "Upload web big image under 2mb",
                    "param": "file",
                    "location": "body"
                }
            ]))
        }

        try {
            const t = "1" + Date.now()
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
            if (dimension.width > imageWidth) {
                s3Client.deleteObject({Bucket: '18-candleriggs', Key: t}, (err, data) => {
                    console.error(err);
                    console.log(data);
                })
                return res.status(400).send(new Return422([
                    {
                        "msg": `Web big image width should be ${imageWidth}px`,
                        "param": "file",
                        "location": "body"
                    }
                ]))
            }
            if (dimension.height > imageHeight) {
                s3Client.deleteObject({Bucket: '18-candleriggs', Key: t}, (err, data) => {
                    console.error(err);
                    console.log(data);
                })
                return res.status(400).send(new Return422([
                    {
                        "msg": `Web big image height should be ${imageHeight}px`,
                        "param": "file",
                        "location": "body"
                    }
                ]))
            }
            await galleryModel.findByIdAndUpdate(id, {bigWebImage: "https://18-candleriggs.fra1.digitaloceanspaces.com/" + t}, {new: true})
            await galleryModel.findByIdAndUpdate(id, {bigWebImageName: t}, {new: true})


            let test = await galleryModel.findById(id).select({_id:1,category:1, smallWebImage:1,bigWebImage:1,smallMobileImage:1,bigMobileImage:1,order:1,
                altText:1})

            let finalResult ={}
            finalResult._id = test._id
            finalResult.category = test.category
            finalResult.order = test.order
            finalResult.altText = test.altText
            if(test.smallWebImage){
                finalResult.smallWebImage = test.smallWebImage
            }
            else {
                finalResult.smallWebImage = "https://18-candleriggs.fra1.digitaloceanspaces.com/image1"
            }

            if(test.bigWebImage){
                finalResult.bigWebImage = test.bigWebImage
            }
            else {
                finalResult.bigWebImage = "https://18-candleriggs.fra1.digitaloceanspaces.com/image2"
            }
            if(test.smallMobileImage){
                finalResult.smallMobileImage = test.smallMobileImage
            }
            else {
                finalResult.smallMobileImage = "https://18-candleriggs.fra1.digitaloceanspaces.com/image3"
            }
            if(test.bigMobileImage){
                finalResult.bigMobileImage = test.bigMobileImage
            }
            else {
                finalResult.bigMobileImage = "https://18-candleriggs.fra1.digitaloceanspaces.com/image4"
            }
            return res.status(201).send({code: 201, msg: "Uploaded successfully", result: finalResult});
        } catch (e) {
            console.log(e)
            return res.status(500).send(new Return500(err.msg))
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
                param: "bannerId",
                location: "path"
            }]))
        }
        const findGallery = await galleryModel.findOne({_id: id})
        if (!findGallery) {
            return res.status(404).send(new Return404("No image found to delete"))
        }
        if(!findGallery.bigWebImageName){
            return res.status(404).send(new Return404("No image found to delete"))
        }
        if(Object.values(findGallery.bigWebImageName).length<1){
            return res.status(404).send(new Return404("No image found to delete"))
        }
        let imageToDelete = findGallery.bigWebImageName
        s3Client.deleteObject({Bucket: '18-candleriggs', Key: imageToDelete}, (err, data) => {
            console.error(err);
            console.log(data);
        })
        await galleryModel.findByIdAndUpdate(id, {bigWebImage: ""}, {new: true})
        await galleryModel.findByIdAndUpdate(id, {bigWebImageName: ""}, {new: true})
        return res.status(200).send({code: 200, msg: "Deleted successfully"})
    }
}
    catch(err){
        return res.status(500).send(new Return500(err.message()))
    }}



