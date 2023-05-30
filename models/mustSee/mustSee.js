import mongoose from 'mongoose'

const mustSee = new mongoose.Schema({
    eventId: {
        type: String,
        trim: true
    },
    desktopImage: {
        type: String,
        trim: true
    },
    mobileImage:{
        type: String,
        trim: true
    },
    desktopImageName: {
        type: String,
        trim: true
    },
    mobileImageName:{
        type: String,
        trim: true
    },
    order: {
        type: Number,
        trim: true,
        default: 0
    },
    showEventDetails: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })
export default mongoose.models.mustSee || mongoose.model("mustSee", mustSee)