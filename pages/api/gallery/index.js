import galleryModel from "../../../models/gallery/gallery"
import Return400 from "../../../models/Return400";
import initMiddleware from "../../../lib/init-middleware";
import validateMiddleware from "../../../lib/validate-middleware";
import {check, validationResult} from "express-validator";
import auth from "../../../utils/authentication";
import Return500 from "../../../models/Return500";
import dbConnect from "../../../utils/dbConnect";
import dateChecker from "../../../utils/dateChecker";
import {unstable_getServerSession} from "next-auth/next";
import {authOptions} from "../auth/[...nextauth]";

const validateBody = initMiddleware(
    validateMiddleware([
        check('category', "Provide a category in: Venue, Events, Food").trim().isIn(["Venue", "Events", "Food"]),
        check('order', "Provide an order number or 0").isInt({min: 0})
    ], validationResult)
)

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            await dbConnect();
            const session = await unstable_getServerSession(req, res, authOptions)
            if (!session) {
                // Not Signed in
                return res.status(401).send({code:401, msg:"User not authorised"})
            }
            await validateBody(req, res)

            let category = req.body.category
            let newObj = {
                smallWebImage: "",
                bigWebImage: "",
                smallMobileImage: "",
                bigMobileImage: "",
                smallWebImageName: "",
                bigWebImageName: "",
                smallMobileImageName: "",
                bigMobileImageName: "",
                category: req.body.category,
                name: req.body.name,
                order: req.body.order
            }
            if(req.body.altText){
            newObj.altText= req.body.altText
            }
            else newObj.altText= ""
            if (!category) {
                return res.status(400).send(new Return400("Fill category"))
            }
            if (Object.keys(category) < 1) {
                return res.status(400).send(new Return400("Fill category"))
            }
            let createData = await galleryModel.create(newObj)
            return res.status(201).send({
                code: 201, msg: "Gallery's collection created", result: {
                    _id: createData._id,
                    category: createData.category,
                    name: createData.name,
                    uploadedDate: dateChecker(createData.createdAt),
                    order: createData.order,
                    altText: createData.altText,
                    smallWebImage: createData.smallWebImage,
                    bigWebImage: createData.bigWebImage,
                    smallMobileImage: createData.smallMobileImage,
                    bigMobileImage: createData.bigMobileImage,
                }
            })
        } catch (err) {
            return res.status(500).send(new Return500(err.message))
        }
    }
    else if (req.method === "GET") {
        try {
            await dbConnect();

            let getGallery = await galleryModel.find().select({
                _id: 1,
                category: 1,
                name: 1,
                smallWebImage: 1,
                bigWebImage: 1,
                smallMobileImage: 1,
                bigMobileImage: 1,
                updatedAt: 1,
                order: 1,
                altText:1
            }).sort({order: 1})

            if (getGallery.length === 0) {
                //return res.status(200).send({code: 200, msg: "No Image found"})
                return res.status(200).send({
                    code: 200,
                    msg: "all images",
                    numberOfResults: 0,
                    result: []
                })  //  fix
            }
            let results = []
            for (let i = 0; i < getGallery.length; i++) {
                let newObj = {
                    _id: getGallery[i]._id,
                    category: getGallery[i].category,
                    name: getGallery[i].name,
                    uploadedDate: getGallery[i].updatedAt.toISOString().substring(0, 10),
                    order: getGallery[i].order,
                    altText: getGallery[i].altText,
                    smallWebImage: getGallery[i].smallWebImage,
                    bigWebImage: getGallery[i].bigWebImage,
                    smallMobileImage: getGallery[i].smallMobileImage,
                    bigMobileImage: getGallery[i].bigMobileImage
                }
                results.push(newObj)
            }

            return res.status(200).send({
                code: 200, msg: "success", numberOfResults: Object.keys(results).length, result: results
            })
        } catch (err) {
            return res.status(500).send(new Return500(err.message))
        }
    }
}