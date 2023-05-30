import dbConnect from '../../../../utils/dbConnect';
import Return500 from "../../../../models/Return500";
import eventModel from "../../../../models/event/event";
import dateChecker from "../../../../utils/dateChecker";
import getActiveEvents from "../../../../services/activeEvents";

export default async function handler(req, res) {
    try {

        if (req.method === "GET") {
            //  pulls the active events
            const activeEvents = await getActiveEvents();

            if (activeEvents.length === 0) {
                return res.status(404).send({code: 200,msg:"success", numberOfResults: "No Events found", result:[]} )
            }

            return res.status(200).send({
                code:200,
                msg: "success",
                numberOfResults: activeEvents.length,
                result: activeEvents
            })

        }
    } catch (error) {
        return res.status(500).send(new Return500(error.message))
    }
}
    
    