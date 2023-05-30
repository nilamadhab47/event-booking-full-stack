import dbConnect from "../../../utils/dbConnect";
import Return500 from "../../../models/Return500";
import setting from "../../../models/setting";

export default async function handler(req, res) {
    try {
        if (req.method === "GET") {
            await dbConnect()
            let records = await setting.find()

            return res.status(200).send({code: 200, msg: "success", result: records})
        }

        if (req.method === "POST") {
            await dbConnect()

            const filter = { key: req.body.key };
            const update = { value: req.body.value };

            await setting.findOneAndUpdate(filter, update, {
                new: true
            });
        }
    } catch (err) {
        return res.status(500).send(new Return500(err.message))
    }
}
