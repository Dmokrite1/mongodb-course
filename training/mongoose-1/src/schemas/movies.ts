import { Schema, model, Types } from "mongoose";

const awards = new Schema({
    wins: {
        type: Number
    },
    nominations: {
        type: Number
    },
    text: {
        type: String
    }
});

const imdb = new Schema({
    rating: Types.Decimal128,
    votes: {
        type: Number
    },
    id: {
        type: Number
    }
});

const viewer = new Schema({
    rating: Types.Decimal128,
    numReviews: {
        type: Number
    },
    meter: {
        type: Number
    }
});

const critic = new Schema({
    rating: Types.Decimal128,
    numReviews: {
        type: Number
    },
    meter: {
        type: Number
    }
});

const tomatoes = new Schema({
    viewer: {
        type: viewer,
    },
    fresh: {
        type: Number,
    },
    critic: {
        type: critic,
    },
    rotten: {
        type: Number,
    },
    lastUpdated: {
        type: Date,
    },
});


const movies = new Schema({
    plot: {
        type: String
    },
    genres: {
        type: [String]
    },
    runtime: {
        type: Number
    },
    cast: {
        type: [String]
    },
    poster: {
        type: String
    },
    title: {
        type: String
    },
    fullplot: {
        type: String
    },
    languages: {
        type: [String]
    },
    released: {
        type: Date
    },
    directors: {
        type: [String]
    },
    rated: {
        type: String,
        enum: ["UNRATED", "R", "PG-13", "RATED", "PG", "G", "APPROVED", "PASSED"]
    },
    awards: {
        type: awards
    },
    lastupdated: {
        type: Date
    },
    year: {
        type: Number
    },
    imdb: {
        type: imdb
    },
    countries: {
        type: [String]
    },
    type: {
        type: String,
        enum: ["movie", "series"]
    },
    tomatoes : {
        type: tomatoes
    } 
});

export const MovieModel = model('movies', movies, 'movies');