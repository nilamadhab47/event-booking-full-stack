import Return500 from "../../../../models/Return500";
import Return404 from "../../../../models/Return404";
import dateChecker from "../../../../utils/dateChecker";
import eventFriendlyUrl from "../../../../services/eventFriendlyUrl";

export default async function handler(req, res) {

    try {
        let obj = req.query
        let str = Object.values(obj)[0]

        const findEvent = await eventFriendlyUrl(str)

        if (!findEvent) {
            return res.status(404).send(new Return404('No events found on these date'))
        }

        return res.status(200).send({
            code: 200, msg: "success", result: {
                _id: findEvent[0]._id,
                desktopImage: findEvent[0].desktopImage,
                mobileImage: findEvent[0].mobileImage,
                name: findEvent[0].name,
                title: findEvent[0].title,
                shortDescription: findEvent[0].shortDescription,
                mainDescription: findEvent[0].mainDescription,
                link: findEvent[0].link,
                price: findEvent[0].price,
                bookingFee: findEvent[0].bookingFee,
                age: findEvent[0].age,
                eventDate: dateChecker(findEvent[0].eventDate),
                eventType: findEvent[0].eventType,
                startTime: findEvent[0].startTime,
                doorOpeningTime: findEvent[0].doorOpeningTime,
                displayEventListingFrom: dateChecker(findEvent[0].displayEventListingFrom),
                seoTitle: findEvent[0].seoTitle,
                seoDescription: findEvent[0].seoDescription,
                performer: findEvent[0].performer,
                organizer: findEvent[0].organizer,
                organizerUrl: findEvent[0].organizerUrl,
            }
        })
    } catch (err) {
        return res.status(500).send(new Return500(err.message))
    }
}