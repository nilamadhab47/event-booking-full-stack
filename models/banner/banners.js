import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({

    desktopImage: { type: String, trim: true, default: "" },

    mobileImage: { type: String, trim: true, default: "" },

    name: { type: String, trim: true, default: "" },

    link: { type: String, trim: true, default: "" },

    eventType: { type: String, default: "Live", trim: true,enum: ["Live", "Sold Out","Cancelled","Private Booking"] },

    startDate: { },

    endDate: {  },

    desktopImageName: { type: String, trim: true, default: "" },

    mobileImageName: { type: String, trim: true, default: "" },

}, { timestamps: true })


export default mongoose.models.banner || mongoose.model("banner", bannerSchema);