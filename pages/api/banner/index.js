import bannerModel from '../../../models/banner/banners';
import dbConnect from 'utils/dbConnect';
import initMiddleware from 'lib/init-middleware';
import validateMiddleware from 'lib/validate-middleware';
import {check, validationResult} from 'express-validator';
import Return500 from '../../../models/Return500';
import Return405 from "../../../models/Return405";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import getBanners from "../../../services/getBanner";


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


export default async (req, res) => {
    try {
        let method = req.method
        switch (method) {
            case "GET": {
                const getBanner = await getBanners()
                if (getBanner.length === 0) {
                    return res.status(200).send({
                        code: 200,
                        msg: "No banner found",
                        numberOfResults: Object.keys(getBanner).length,
                        result: []
                    })  //  fix
                }
                return res.status(200).send({
                    code: 200,
                    msg: "all banners",
                    numberOfResults: Object.keys(getBanner).length,
                    result: getBanner
                })
            }

            case "POST" : {
                await dbConnect()
                const session = await unstable_getServerSession(req, res, authOptions)
                if (!session) {
                    // Not Signed in
                    return res.status(401).send({code:401, msg:"User not authorised"})
                }

                let data = req.body
                let stDate = data.startDate
                let edDate = data.endDate

                let stDate1 = new Date(stDate)
                let edDate1 = new Date(edDate)
                let dataToCreate = {
                    desktopImage : "",
                    mobileImage : "",
                    name: data.name,
                    link: data.link,
                    eventType: data.eventType,
                    startDate: stDate1,
                    endDate: edDate1
                }
                await validateBody(req, res)

                let createdData = await bannerModel.create(dataToCreate)

                return res.status(201).send({
                    code: 201, msg: "Banner created successfully", result: {
                        _id: createdData._id,
                        desktopImage: createdData.desktopImage,
                        mobileImage: createdData.mobileImage,
                        name: createdData.name,
                        link: createdData.link,
                        eventType: createdData.eventType,
                        startDate: stDate,
                        endDate: edDate
                    }
                })
            }

            default:
                res.setHeader("Allow", ["GET", "POST"]);
                return res.status(405).json(new Return405(`Method ${method} Not Allowed`)).end(`Method ${method} Not Allowed`);
        }
    } catch (err) {
        return res.status(500).send(new Return500(err.msg))
    }
}