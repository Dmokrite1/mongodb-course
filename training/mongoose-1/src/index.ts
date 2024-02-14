import mongoose from 'mongoose';
import { ListingAndReviews } from "./schemas/listingsAndReviews"

async function init() {
    const mongo = await mongoose.connect('mongodb://root:test123@127.0.0.1:27017/sample_airbnb?authSource=admin');
    console.log('Congratulations you are connected to the DB', mongo.connection.db.databaseName);

    const newAirbnb = new ListingAndReviews({
        name: "metropolitan e-campus",
        property_type: 'Condominium',
        price: 500,
        forbidden: false,
    })
    
    //persiste vers la db
    await newAirbnb.save();

    const ecampus = await ListingAndReviews.findOne({
        _id: newAirbnb.id
    })
    if (!ecampus) {
        throw new Error("non trouvé");
    }
    ecampus.name = "Airbnb c'est cool";

    await ecampus.save()
}

init();