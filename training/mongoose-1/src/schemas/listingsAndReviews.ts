import { Schema, model } from "mongoose";

const adressSchema = new Schema({
    street: {
        type: String,
        required: true
    },
    suburb: {
        type: String
    },
    government_area: {
        type: String
    },
    market: {
        type: String
    },
    country: {
        type: String
    },
    country_code: {
        type: String
    },
    number: {
        type: Number
    }
});

const schema = new Schema({
    name: {
        type: String,
        required: true,
        max: 255,
        min: 10
    },
    summary: {
        type: String,
        default: 'Description par défaut'
    },
    bedrooms: {
        type: Number
    },
    last_scraped: {
        type: Date
    },
    property_type: {
        type: String,
        enum: ["Apartment", "House", "Condominium", "Townhouse", "Loft", "Guest Suite"], required: true
    },
    price: {
        type: Number,
        required: true
    },
    address: {
        type: adressSchema
    },
    amenities: {
        type: [String]
    }
});

export const ListingAndReviews = model('listingsAndReviews', schema, 'listingsAndReviews');