import mongoose from 'mongoose'

const gallery = new mongoose.Schema({
    smallWebImage: {
        type: String,
        trim: true,
    },
    bigWebImage: {
        type: String,
        trim: true,
    },
    smallMobileImage: {
        type: String,
        trim: true,
    },
    bigMobileImage: {
        type: String,
        trim: true,
    },
    smallWebImageName: {
        type: String,
        trim: true,
    },
    bigWebImageName: {
        type: String,
        trim: true,
    },
    smallMobileImageName: {
        type: String,
        trim: true,
    },
    bigMobileImageName: {
        type: String,
        trim: true,
    },
    category: {
        type: String,
        trim: true
    },
    name: {
        type: String,
        trim: true
    },
    order: {
        type: Number,
        trim: true,
        default: 0
    },
    altText: {
        type: String,
        trim: true
    },

}, {timestamps: true})
export default mongoose.models.gallery || mongoose.model("gallery", gallery)