import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({

    desktopImage: {},

    mobileImage: {},

    name: {type: String,trim:true },

    title: {type: String,trim:true},

    shortDescription: {type: String,trim:true},

    mainDescription: {type: String,trim:true},

    link: {type: String,trim:true},
 
    price: {type: String,trim:true},
    
    bookingFee:{type: Number , trim :true, default:0},
    
    age:{type:String , enum:["18+", "all ages", "don't show"]},

    eventDate: {type: Date,trim:true},

    eventType:{type:String, trim:true},

    startTime : {type: String,trim:true,},

    doorOpeningTime : {type: String,trim:true},

    desktopImageName:{},

    mobileImageName:{},

    displayEventListingFrom: {type: Date,trim:true},

    seoTitle : {type: String,trim:true},

    seoDescription : {type: String,trim:true},

    seoFriendlyURL : {type: String,trim:true},

    performer : {type: String,trim:true},

    organizer : {type: String,trim:true},

    organizerUrl : {type: String,trim:true},

 },{timestamps:true})
 export default mongoose.models.event || mongoose.model("event", eventSchema)