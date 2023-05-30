import event from "../models/event/event";
import dbConnect from "../utils/dbConnect";

export default async function eventFriendlyUrl(str) {
    await dbConnect()
    let eventNameWithHyphen = str.substring(0, str.length - 11);
    let arr = []
    for (let i = 0; i < eventNameWithHyphen.length; i++) {
        if (eventNameWithHyphen[i] === ' ') {
            arr.push('-')
        } else arr.push(eventNameWithHyphen[i])
    }
    let a = arr.join('')

    // dateToFind
    let d = str.substring(str.length - 10)

    let seoToFind = a + "-" + d

    let findEvent = await event.find({seoFriendlyURL: seoToFind}).collation({locale: "en", strength: 2}).select({
        __v: 0,
        createdAt: 0,
        updatedAt: 0
    })
    return findEvent[0]
}