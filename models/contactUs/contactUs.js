import mongoose from 'mongoose'

const contactUs = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    contactNumber:{
        type: String,
        trim: true
    },
    additionalRequest: {
        type: String,
        trim: true
    }

}, { timestamps: true })
export default mongoose.models.contactUs || mongoose.model("contactUs", contactUs)