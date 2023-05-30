import mongoose from 'mongoose'


const subscriber = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true
    },
    date: {
        type: Date
    }
}, {timestamps: true})
export default mongoose.models.subscriber || mongoose.model("subscriber", subscriber)