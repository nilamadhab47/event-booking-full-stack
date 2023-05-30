import nodemailer from 'nodemailer'
const mail = async function(resultData) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.dreamhost.com',
        port: 465,
        auth: {
            user: "email@superminds.store",
            pass: "fYc88G^544kI"
        },
        secure: true,
        logger: true,
        debug: true,
    })

    //  some tidy up
    resultData.requireFood = (resultData.requireFood === "Yes-Food" ? "Yes" : "No");
    resultData.dietaryOrAllergiesRequirements = (resultData.requireFood === "Yes-Allergies" ? "Yes" : "No");
    resultData.entertainmentProvidedByUs = (resultData.entertainmentProvidedByUs === "Yes-Entertainment" ? "Yes" : "No");

    //  optional fields
    let occasionOtherDescriptionHTML = "";
    if (resultData.occasionOtherDescription.length > 0) {
        occasionOtherDescriptionHTML = `<b>Occasion - Other Notes:</b> ${resultData.occasionOtherDescription} <br/>`
    }

    let preferredDateOtherNotesHTML = "";
    if (resultData.preferredDateOtherNotes.length > 0) {
        preferredDateOtherNotesHTML = `<b>Preferred Date - Other Notes:</b> ${resultData.preferredDateOtherNotes} <br/>`
    }

    let dietaryOrAllergiesRequirementsDescriptionHTML = "";
    if (resultData.dietaryOrAllergiesRequirementsDescription.length > 0) {
        dietaryOrAllergiesRequirementsDescriptionHTML = `<b>Dietary Or Allergies Requirements Notes:</b> ${resultData.dietaryOrAllergiesRequirementsDescription}<br/>`
    }

    let message;
    message = {
        from: "email@superminds.store",
        to: process.env.EMAIL,
        subject: "18 Candleriggs Book Venue Request",
        html:`<h1 style=color:#741485>18-Candleriggs</h1> `+
            `<h3 style=color:#741485><u>Book Venue</u></h3> `+
            `<b>Full Name:</b> ${resultData.name}<br/> `+
            `<b>Contact Email:</b> ${resultData.email}<br/> `+
            `<b>Phone Number:</b> ${resultData.contactNumber}<br/> `+
            `<b>Number Of Guests:</b> ${resultData.numberOfGuests} <br/> `+
            `<b>Occasion:</b> ${resultData.occasion}<br/> `+
            `${occasionOtherDescriptionHTML}`+
            `<b>Preferred Date:</b> ${resultData.preferredDate}<br/>`+
            `${preferredDateOtherNotesHTML}`+

            `<b>Would you require food?:</b> ${resultData.requireFood}<br/>`+
            `<b>If ‘Yes’, what food are you looking for?</b> ${resultData.foodLookingFor}<br/>`+
            `<b>What type of food is preferred?</b> ${resultData.whatTypeOfFoodPreferred}<br/> `+

            `<b>Do you have any dietary requirements and/or allergies in your party?</b> ${resultData.dietaryOrAllergiesRequirements}<br/>`+
            `${dietaryOrAllergiesRequirementsDescriptionHTML}`+

            `<b>How would you like drinks served?</b> ${resultData.drinksServed}<br/>`+
            `<b>Drinks on Arrival:</b> ${resultData.drinksOnArrival}<br/>`+
            `<b>Are you looking for alcohol packages?</b> ${resultData.alcoholPackages} <br/>` +

            `<b>Are you looking to bring in external companies to decorate?</b> ${resultData.externalCompaniesToDecorate}<br/>` +

            `<b>Are you looking for entertainment to be provided by us?</b> ${resultData.entertainmentProvidedByUs}<br/>`+
            `<b>If ‘Yes’, what are you looking for?</b> ${resultData.whatTypeOfEntertainmentProvidedByUs}<br/>`
            }
    await transporter.sendMail(message, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log(info);
        }
    });
}
export default mail;