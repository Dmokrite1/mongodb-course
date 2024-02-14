import { connect } from 'mongoose';
import { MovieModel } from "./schemas/movies"

async function init() {
    // Connexion à la base de données
    const mongo = await connect('mongodb://root:test123@127.0.0.1:27017/sample_mflix?authSource=admin');
    console.log('Congratulations, you are connected to the DB', mongo.connection.db.databaseName);

    // Création de deux films
    const movie1 = new MovieModel({
        title: "Inception",
        genres: "Science Fiction",
        releaseYear: 2010,
    });

    const movie2 = new MovieModel({
        title: "The Shawshank Redemption",
        genres: "Drama",
        releaseYear: 1994,
    });

/*
* faire des envois en db un par un
    // Persiste les films vers la base de données
    await movie1.save();
    await movie2.save();
*/
    
    await MovieModel.bulkSave([movie1, movie2]);  // Pour envoyer plusieurs films en même temps plutot que de faire 1 par 1
    

    // Recherche du film "Matrix" dans la collection "Movies"
    const matrixMovie = await MovieModel.findOne({ title: "The Matrix" });

    if (matrixMovie) {
        console.log("Film Matrix trouvé :", matrixMovie);
    } else {
        console.log("Film Matrix non trouvé.");
    }

    const updatedMovie = await MovieModel.findOneAndUpdate(
        { title: "Matrique" }, // Condition de recherche
        { $set: { title: "The Matrix" } }, // Nouveau titre
        { new: true } // Option pour renvoyer le document mis à jour
    );

    if (updatedMovie) {
        console.log("Film mis à jour :", updatedMovie);
    } else {
        console.log("Film non trouvé.");
    }

    // Suppression du film "Jurassic Park" de la collection "Movies" Jurassic Park avait était modifié de ce fait la recherche se fait par ID
    const deletedMovie = await MovieModel.findOneAndDelete({ _id: "573a1399f29313caabcedc5d" });

    if (deletedMovie) {
            console.log("Film supprimé :", deletedMovie);
    } else {
            console.log("Film non trouvé.");
    }
}

init();
