import dbConnect from "../../../utils/dbConnect";
import venue from "../../../models/venue/venue";
import initMiddleware from "../../../lib/init-middleware";
import validateMiddleware from "../../../lib/validate-middleware";
import {check, validationResult} from "express-validator";
import Return500 from "../../../models/Return500";
import venueEmail from "../../../utils/venueEmail";
import {validateCaptcha} from "../../../utils/validateCaptcha";


const validateBody = initMiddleware(
    validateMiddleware([
        check('name', "Provide Event Name").trim().isLength({min: 1, max: 40}),
        check('email', "Provide Email").trim().isEmail(),
        check('contactNumber', "Provide a valid Contact number").trim().isLength({min: 8, max: 15}),
        check('numberOfGuests', "Provide number of guest").trim().isFloat(),
        check('occasion', "Provide occasion").trim().isString(),
        check('occasionOtherDescription', "Provide occasion Other Description").trim().isString(),
        //check('preferredDate', "Provide a valid date").trim().isDate(),
        check('requireFood', "Provide required Food").trim().isString(),
        check('foodLookingFor', "Provide food Looking For").trim().isString(),
        check('preferredDateOtherNotes', "Preferred Date Other Notes").trim().isString(),
        check('whatTypeOfFoodPreferred', "Provide what Type Of Food Preferred").trim().isString(),
        check('dietaryOrAllergiesRequirements', "Provide dietary Or Allergies Requirements").trim().isString(),
        check('dietaryOrAllergiesRequirementsDescription', "Provide dietary Or Allergies Requirements Description").trim().isString(),
        check('drinksServed', "Provide drinks want to be Served").trim().isString(),
        check('drinksOnArrival', "Provide drinks On Arrival").trim().isString(),
        check('entertainmentProvidedByUs', "Provide entertainment Provided By Us").trim().isString(),
        check('whatTypeOfEntertainmentProvidedByUs', "Provide what Type Of Entertainment Provided By Us").trim().isString(),
        check('externalCompaniesToDecorate', "Provide external Companies To Decorate").trim().isString(),
        check('alcoholPackages', "Provide alcohol Packages").trim().isString(),
    ], validationResult)
)

export default async function handler(req, res) {
    try {
        await dbConnect()
        if (req.method === "POST") {
            try {

                //  validate captcha
                await validateCaptcha(req, res)

                //  validate form required fields
                await validateBody(req, res)

                let data = req.body;
                let createdData = await venue.create(data)

                let resultData = {
                    name: createdData.name,
                    email: createdData.email,
                    contactNumber: createdData.contactNumber,
                    numberOfGuests: createdData.numberOfGuests,
                    occasion: createdData.occasion,
                    occasionOtherDescription: createdData.occasionOtherDescription,
                    preferredDate: data.preferredDate,
                    preferredDateOtherNotes: createdData.preferredDateOtherNotes,
                    requireFood: createdData.requireFood,
                    foodLookingFor: createdData.foodLookingFor,
                    whatTypeOfFoodPreferred: createdData.whatTypeOfFoodPreferred,
                    dietaryOrAllergiesRequirements: createdData.dietaryOrAllergiesRequirements,
                    dietaryOrAllergiesRequirementsDescription: createdData.dietaryOrAllergiesRequirementsDescription,
                    drinksServed: createdData.drinksServed,
                    drinksOnArrival: createdData.drinksOnArrival,
                    entertainmentProvidedByUs: createdData.entertainmentProvidedByUs,
                    whatTypeOfEntertainmentProvidedByUs: createdData.whatTypeOfEntertainmentProvidedByUs,
                    externalCompaniesToDecorate: createdData.externalCompaniesToDecorate,
                    alcoholPackages: createdData.alcoholPackages
                }
                await venueEmail(resultData)
                return res.status(201).send({code: 201, msg: "CREATED", result: resultData})
            } catch (err) {
                res.status(500).send(new Return500(err.message))
            }
        }
    } catch (err) {
        return res.status(500).send(new Return500(err.message()))
    }
}