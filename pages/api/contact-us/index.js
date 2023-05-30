import dbConnect from "../../../utils/dbConnect";
import initMiddleware from "../../../lib/init-middleware";
import validateMiddleware from "../../../lib/validate-middleware";
import {check, validationResult} from "express-validator";
import contactUs from "../../../models/contactUs/contactUs";
import Return500 from "../../../models/Return500";
import contactEmail from "../../../utils/contactEmail";
import {validateCaptcha} from "../../../utils/validateCaptcha";


const validateBody = initMiddleware(
    validateMiddleware([
        check('name', "Provide Event Name").trim().isLength({min: 1, max: 40}),
        check('email', "Provide Email").trim().isEmail(),
        check('contactNumber', "Provide a valid Contact number").trim().isLength({min: 8, max:15}),
        check('additionalRequest', "Provide additional Request").trim().isLength({min:1}),
    ], validationResult)
)

export default async function handler(req,res){
    try{
    await dbConnect()
    if(req.method === "POST"){

        //  validate captcha
        await validateCaptcha(req, res)

        //  validate form required fields
        await validateBody(req,res)

        let data = req.body
        let createdData = await contactUs.create(data)

        let resultData= {
            name : createdData.name,
            email : createdData.email,
            contactNumber : createdData.contactNumber,
            additionalRequest : createdData.additionalRequest
        }
        await contactEmail(resultData)
        return res.status(201).send({code:201, msg: "CREATED", result : resultData})
    }
    }
catch(err){
    return res.status(500).send(new Return500(err.message()))
}
}