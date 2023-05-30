import mongoose from 'mongoose'


const venue = new mongoose.Schema({
    name: {},
    email: {},
    contactNumber: {},
    numberOfGuests: {},
    occasion: {},
    occasionOtherDescription: {},
    preferredDate: {},
    preferredDateOtherNotes:{},
    requireFood: {},
    foodLookingFor: {}, whatTypeOfFoodPreferred: {},
    dietaryOrAllergiesRequirements: {},
    dietaryOrAllergiesRequirementsDescription: {},
    drinksServed: {},
    drinksOnArrival: {},
    entertainmentProvidedByUs: {},
    whatTypeOfEntertainmentProvidedByUs: {},
    externalCompaniesToDecorate: {},
    alcoholPackages: {}

}, {timestamps: true})
export default mongoose.models.venue || mongoose.model("venue", venue)