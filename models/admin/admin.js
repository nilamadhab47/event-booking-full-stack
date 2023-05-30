import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({

    email: { type: String },

    password: { type: String }
}, { timestamps: true })

export default mongoose.models.admin || mongoose.model("admin", adminSchema);