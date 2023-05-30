import Return422 from "../models/Return422";
import ValidationError from "../models/ValidationError";

export async function validateCaptcha(req, res) {
    let body = req.body

    // If email or captcha are missing return an error
    if (!body.captcha) {
        return res.status(422).json(new Return422([new ValidationError(
            "Captcha validation failed","captcha","validateCaptcha"
        )]))
    }

    try {
        // Ping google recaptcha verify API to verify the captcha code you received
        const response = await fetch(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${body.captcha}`,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
                },
                method: "POST",
            }
        );
        const captchaValidation = await response.json();
        /**
         * The structure of response from the verify API is
         * {
         *  "success": true|false,
         *  "challenge_ts": timestamp,  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
         *  "hostname": string,         // the hostname of the site where the reCAPTCHA was solved
         *  "error-codes": [...]        // optional
        }
         */
        if (captchaValidation.success) {
            // Replace this with the API that will save the data received
            // to your backend
            return;
            // Return 200 if everything is successful
            return res.status(200).send("OK");
        }

        return res.status(422).json(new Return422([new ValidationError(
            "Captcha validation failed","captcha","validateCaptcha"
        )]))
    } catch (error) {
        return res.status(422).json(new Return422([new ValidationError(
            "Captcha validation failed","captcha","validateCaptcha"
        )]))
    }
}