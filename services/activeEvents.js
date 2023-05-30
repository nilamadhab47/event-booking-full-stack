import eventModel from "../models/event/event";
import dateChecker from "../utils/dateChecker";
import dbConnect from "../utils/dbConnect";

export default async function getActiveEvents() {
    await dbConnect();

    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    let tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));

    let getEvent = await eventModel.find({
        displayEventListingFrom: {$lt: tomorrow},
        eventDate: {$gt: yesterday}
    }, {isDeleted: false}).sort({eventDate: 1})

    let results = []
    for (let i = 0; i < getEvent.length; i++) {
        let newObj = {
            _id : getEvent[i]._id,
            seoFriendlyURL: getEvent[i].seoFriendlyURL,
            name : getEvent[i].name,
            title : getEvent[i].title,
            shortDescription : getEvent[i].shortDescription,
            mainDescription : getEvent[i].mainDescription,
            link : getEvent[i].link,
            price : getEvent[i].price,
            bookingFee : getEvent[i].bookingFee,
            age : getEvent[i].age,
            eventDate : dateChecker(getEvent[i].eventDate),
            eventType : getEvent[i].eventType,
            startTime : getEvent[i].startTime,
            doorOpeningTime : getEvent[i].doorOpeningTime,
            displayEventListingFrom : dateChecker(getEvent[i].displayEventListingFrom),
            seoTitle  : getEvent[i].seoTitle,
            seoDescription  : getEvent[i].seoDescription,
            desktopImage : getEvent[i].desktopImage,
            mobileImage : getEvent[i].mobileImage,
            performer : getEvent[i].performer,
            organizer : getEvent[i].organizer
        }
        results.push(newObj)
    }

    return results
}