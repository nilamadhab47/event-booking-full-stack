// eslint-disable-next-line no-undef
import {unstable_getServerSession} from "next-auth/next";
// eslint-disable-next-line no-undef
let data_exporter = require("json2csv").Parser;
import subscriber from "../../../models/subscriber/subscriber";
import dbConnect from "../../../utils/dbConnect";
import {authOptions} from "../auth/[...nextauth]";


export default async function handler(req, res) {
    if (req.method === "GET") {

        const session = await unstable_getServerSession(req, res, authOptions)
        if (!session) {
            // Not Signed in
            return res.status(401).send({code:401, msg:"User not authorised"})
        }

        await dbConnect()
        await subscriber.find({}).then((data) => {
            let subscriberData = JSON.parse(JSON.stringify(data))
            let subscriberDataFiltered = subscriberData.map((data) => ({
                email: data.email,
                date: (data.date).substring(0, 10),
            }));
            // convert JSON to CSV
            let file_header = ["email", "date"];
            let json_data = new data_exporter({file_header});
            let csv_data = json_data.parse(subscriberDataFiltered);
            res.setHeader("Content-Type", "text/csv");
            res.setHeader(
                "Content-Disposition",
                "attachment; filename=subscriber_data.csv"
            );
            res.status(200).send(csv_data);
        })
            .catch((err) => {
                res.status(500).json({message: err.message});
            });
    }
}