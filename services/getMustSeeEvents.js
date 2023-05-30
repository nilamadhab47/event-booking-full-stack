import mustSeeModel from "../models/mustSee/mustSee";
import eventModel from "../models/event/event";
import dbConnect from "../utils/dbConnect";
import dateChecker from "../utils/dateChecker";

export default async function getMustSeeEvents() {
    await dbConnect()
    let getMustSee = await mustSeeModel.find().sort({order: 1})

    let results = []
    for (let i = 0; i < getMustSee.length; i++) {
        let getEve = await eventModel.findOne({_id: getMustSee[i].eventId})

        let newObj = {
            _id: getMustSee[i]._id,
            order: getMustSee[i].order,
            eventData: {
                name: getEve.name,
                title: getEve.title,
                shortDescription: getEve.shortDescription,
                mainDescription: getEve.mainDescription,
                link: getEve.link,
                price: getEve.price,
                bookingFee: getEve.bookingFee,
                age: getEve.age,
                eventDate: dateChecker(getEve.eventDate),
                eventType: getEve.eventType,
                startTime: getEve.startTime,
                doorOpeningTime: getEve.doorOpeningTime,
                displayEventListingFrom: dateChecker(getEve.displayEventListingFrom),
                seoTitle: getEve.seoTitle,
                seoDescription: getEve.seoDescription,
                desktopImage: getEve.desktopImage,
                mobileImage: getEve.mobileImage,
                seoFriendlyURL: getEve.seoFriendlyURL
            },
            eventId: getMustSee[i].eventId,
            desktopImage: getMustSee[i].desktopImage,
            mobileImage: getMustSee[i].mobileImage,
            showEventDetails: getMustSee[i].showEventDetails
        }
        results.push(newObj)
    }
    return results
}