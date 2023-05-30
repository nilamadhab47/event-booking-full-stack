import mongoose from 'mongoose'

const setting = new mongoose.Schema({
    key: {type: String},
    value: {type: String},

}, {timestamps: true})
export default mongoose.models.setting || mongoose.model("setting", setting)