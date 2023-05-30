import bannerModel from "../models/banner/banners";
import dbConnect from "../utils/dbConnect";
import dateChecker from "../utils/dateChecker";

export default async function getBanners(){
    await dbConnect()
    let getBanner = await bannerModel.find().select({
        _id: 1,
        desktopImage: 1,
        mobileImage: 1,
        name: 1,
        link: 1,
        eventType: 1,
        startDate: 1,
        endDate: 1
    }).sort({date: 1})
    let results = []
    for (let i = 0; i < getBanner.length; i++) {
        let newObj = {
            _id : getBanner[i]._id,
            name : getBanner[i].name,
            link : getBanner[i].link,
            eventType : getBanner[i].eventType,
            startDate : dateChecker(getBanner[i].startDate),
            endDate : dateChecker(getBanner[i].endDate),
            desktopImage : getBanner[i].desktopImage,
            mobileImage : getBanner[i].mobileImage
        }
        results.push(newObj)
    }
        return results
}