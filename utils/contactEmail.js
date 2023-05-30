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
    let message;
    // let rName = resultData.seo-friendly-url

    message = {
        from: "email@superminds.store",
        to: process.env.EMAIL,
        subject: "18 Candleriggs Contact Us Request",
        html: `<h1 style=color:#741485>18 Candleriggs</h1><br />` +
            `            <h3 style=color:#741485><u>Contact Us Request</u></h3><br />` +
            `           <b> Name:</b> ${resultData.name}<br>\n` +
            `           <b> Email:</b> ${resultData.email} <br>` +
            `           <b> Contact Number:</b> ${resultData.contactNumber} <br>` +
            `           <b> Additional Request:</b> ${resultData.additionalRequest}`
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