import eventModel from '../../../models/event/event';
import dbConnect from 'utils/dbConnect'
import initMiddleware from 'lib/init-middleware'
import validateMiddleware from 'lib/validate-middleware'
import {check, validationResult} from 'express-validator'
import Return405 from "../../../models/Return405";
import Return500 from "../../../models/Return500";
import auth from "../../../utils/authentication";
import dateChecker from "../../../utils/dateChecker";
import {unstable_getServerSession} from "next-auth/next";
import {authOptions} from "../auth/[...nextauth]";


const validateBody = initMiddleware(
    validateMiddleware([
        check('name', "Provide Event Name").trim().isLength({min: 1, max: 40}),
        check('title', "Provide title").trim().isLength({min: 1, max: 80}),
        check('shortDescription', "Provide Description").trim().isLength({min: 1, max: 160}),
        check('mainDescription', "Provide Main Description").trim().isLength({min: 0, max: 500}),
        check('link', "Provide Event Link").trim().isLength({min: 1}),
        check('link', "Provide valid URL").trim().isURL(),
        check('price', "Provide a ticket price or TBA").trim().isLength({min: 1}),
        check('bookingFee', "Provide Booking fees value or 0").isFloat({min: 0}),
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
            case "POST": {
                const session = await unstable_getServerSession(req, res, authOptions)
                if (!session) {
                    // Not Signed in
                    return res.status(401).send({code: 401, msg: "User not authorised"})
                }

                let data = req.body
                await validateBody(req, res)
                let stDate = data.displayEventListingFrom
                let enDate = data.eventDate

                let stDate1 = new Date(stDate)
                let enDate1 = new Date(enDate)

                let eveName = data.name
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

                let dataToCreate = {
                    desktopImage: "",
                    mobileImage: "",
                    desktopImageName: "",
                    mobileImageName: "",
                    name: data.name,
                    title: data.title,
                    shortDescription: data.shortDescription,
                    mainDescription: data.mainDescription,
                    link: data.link,
                    price: data.price,
                    bookingFee: data.bookingFee,
                    age: data.age,
                    eventDate: enDate1,
                    eventType: data.eventType,
                    startTime: data.startTime,
                    doorOpeningTime: data.doorOpeningTime,
                    displayEventListingFrom: stDate1,
                    seoTitle: data.seoTitle,
                    seoDescription: data.seoDescription,
                    seoFriendlyURL: seoFriendly,
                    performer: data.performer,
                    organizer: data.organizer,
                    organizerUrl: data.organizerUrl,
                }
                let createdData = await eventModel.create(dataToCreate)
                return res.status(201).send({
                    code: 201, msg: "Event created successfully", result: {
                        _id: createdData._id,
                        desktopImage: createdData.desktopImage,
                        mobileImage: createdData.mobileImage,
                        name: createdData.name,
                        title: createdData.title,
                        shortDescription: createdData.shortDescription,
                        mainDescription: createdData.mainDescription,
                        link: createdData.link,
                        price: createdData.price,
                        bookingFee: createdData.bookingFee,
                        age: createdData.age,
                        eventDate: enDate,
                        eventType: createdData.eventType,
                        startTime: createdData.startTime,
                        doorOpeningTime: createdData.doorOpeningTime,
                        displayEventListingFrom: stDate,
                        seoTitle: createdData.seoTitle,
                        seoDescription: createdData.seoDescription,
                        performer: createdData.performer,
                        organizer: createdData.organizer,
                        organizerUrl: createdData.organizerUrl,
                    }
                })
            }

            case "GET": {

                let getEvent = await eventModel.find().sort({eventDate: 1})

                if (getEvent.length === 0) {
                    return res.status(200).send({
                        code: 200,
                        msg: "all events",
                        numberOfResults: 0,
                        result: []
                    })  //  fix
                }
                let results = []
                for (let i = 0; i < getEvent.length; i++) {
                    let newObj = {
                        _id: getEvent[i]._id,
                        desktopImage: getEvent[i].desktopImage,
                        mobileImage: getEvent[i].mobileImage,
                        name: getEvent[i].name,
                        title: getEvent[i].title,
                        shortDescription: getEvent[i].shortDescription,
                        mainDescription: getEvent[i].mainDescription,
                        link: getEvent[i].link,
                        price: getEvent[i].price,
                        bookingFee: getEvent[i].bookingFee,
                        age: getEvent[i].age,
                        eventDate: dateChecker(getEvent[i].eventDate),
                        eventType: getEvent[i].eventType,
                        startTime: getEvent[i].startTime,
                        doorOpeningTime: getEvent[i].doorOpeningTime,
                        displayEventListingFrom: dateChecker(getEvent[i].displayEventListingFrom),
                        seoTitle: getEvent[i].seoTitle,
                        seoDescription: getEvent[i].seoDescription,
                        performer: getEvent[i].performer,
                        organizer: getEvent[i].organizer,
                        organizerUrl: getEvent[i].organizerUrl,
                    }
                    results.push(newObj)
                }

                return res.status(200).send({
                    code: 200,
                    msg: "all events",
                    numberOfResults: Object.keys(getEvent).length,
                    result: results
                })
            }
            default:
                res.setHeader("Allow", ["GET", "POST"]);
                return res.status(404).json(new Return405(`Method ${req.method} Not Allowed`)).end(`Method ${req.method} Not Allowed`);
        }
    } catch (err) {
        return res.status(500).json(new Return500(err.message));
    }
}