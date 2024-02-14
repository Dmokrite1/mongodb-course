let db = connect("mongodb://root:test123@localhost")
// equivalent de "use technocite" ou en version verbeuse db = db.getSiblingDB("technocite")
.getSiblingDB("sample_mflix");

/*
* insertOne insére un par un
const newStudent = db.student.insertOne({name:"sebastian gauguin"});
console.log(newStudent);
*/

/*
* insertMany insére plusieurs à la fois
const newStudent = db.student.insertMany([
    {
        name : "Amaury Stone"
    },
    {
        name : "Armand Amand"
    }
]);
console.log(newStudent);
*/

/* 
* liste des base de données (show db)
let dbList = db.adminCommand("listDatabases");
console.log(dbList);
*/

/*
* eviter les maj à tout prix pour débuter un nom sauf dans le cas des camelCase
db.createCollection("Formateurs");
* un par un (One)
const newFormateur = db.Formateurs.insertOne({name:"Amaury maisL'autre"});
console.log(newFormateur);
* plusieurs à la fois (Many)
const newFormateur = db.Formateurs.insertMany([
    {name:"Amaury maisL'autre"},
    {name:"Pillipe", adress:"rue du puit"},
    {name:"Jacques", CP:"7500"}]);
console.log(newFormateur);
* afficher les données de la collections dans la database
const formateurs = db.Formateurs.find();
console.log(formateurs);
*/

/*
//SELECT * FROM Formateurs WHERE name="Pillipe"
const formateurs = db.Formateurs.find({
    name : "Pillipe"
});
console.log(formateurs);
*/

/*
let jurassic = db.movies.find({
    title : "Jurassic Park"
});
console.log(jurassic);
*/

/*
* manière de faire avec les opérateurs
let jurassic2 = db.movies.find({
    title: {
        $eq: 'Jurassic Park'
    }
});
console.log(jurassic2);
*/

/*
*find dans les sous champs
let sousChamp = db.movies.find({
    'tomatoes.viewer.numReviews': {
        $gt: 500
    }
});
console.log(sousChamp);
*/

/*
* chercher par director
let georgeLucasFilms = db.movies.find({
    directors: {
        $in: ['George Lucas']
    }
});
console.log(georgeLucasFilms);
*/

/*
let duo = db.movies.find({
    cast: {
        $all : ['Ewan McGregor', 'Natalie Portman']
    }
});
console.log(duo);

// sort => trier
const moviesTriésParOrdreAlpha = db.movies
.find({
    directors: {
        $in: ['George Lucas']
    }
})
.projection({
    title: 1,
    released: 1,
    _id: 0
})
.sort({
    // ASC => 1
    // DESC => -1
    title: 1
})
// on limite les résultats à 2 éléments
.limit(2);

// console.log(moviesTriésParOrdreAlpha);

// countDocuments => compter le nombre de documents qui correspondent à la condition
const nombredeFilmRéalisésParGeorgeLucas = db.movies.countDocuments({
    directors: "George Lucas"
});

console.log(nombredeFilmRéalisésParGeorgeLucas);

// console.log(":( ",georgeAndSpielberg);

let movies = db.movies
    .find({
        title: {
            $regex: /^Amistad$/i
        }
});

// SELECT <colonnes> FROM <table> ...
// projection => sélectionne certaines <colonnes>

const moviesAvecSeulementLesTitres = db.movies
// WHERE 
.find({
    directors: {
        $in: ['George Lucas']
    }
})
// SELECT <colonnes>
// 1 => récupérer
// 0 => ne pas récupérer
.projection({
    title: 1,
    released: 1,
    _id: 0
});

console.log(moviesAvecSeulementLesTitres);

const conditionOu = db.movies.find({
    $or: [
        {
            genres: "action"
        },
        {
          title: "The Perils of Pauline"  
        }
    ]
})
//console.log(conditionOu);

const conditionEt = db.movies.find({
    //le genre est action ET le titre du film est les périls de Pauline
    $and: [
        {
            genres: "action"
        },
        {
          title: "The Perils of Pauline"  
        }
    ]
})
//console.log(conditionEt);

const conditionETOU = db.movies.find({
    $and: [
        {
            $or: [
                {
                    countries: {
                        $in: ['USA']
                    },
                },
                {
                    languages: {
                        $in: ['English']
                    }
                }
            ]
        },
        {
            year: {
                $gt: 2000
            }
        }
    ]
});
// équivalent sql = SELECT * FROM movies WHERE (
//     (countries IN ('USA') OR languages IN ('English'))
//     AND
//     year > 2000
// );

/*
* pagination
const pagination = db.movies.find({
//on démarre à 20 et on prend 10 éléments
}).limit(10).skip(20);
console.log(pagination);
*/

/*
* prend tous les films avec Keanu Reeves
const keanu = db.movies.find({
    cast: { $in: ['Keanu Reeves'] }
});
//console.log(keanu);
*/

/*
* prend toutes les comédies
const comedies = db.movies.find({
    genres: "Comedy"
});
//console.log(comedies);
*/

/*
* prend les films entre 2002 et 2008
const moviesBetween = db.movies.find({
    year: { $gte: 2002, $lte: 2008 }
});
//console.log(moviesBetween);
*/

/*
* prend les films dont O'Donnell, Damon jouent ensemble
let duo = db.movies.find({
    cast: {
        $all : ["Chris O'Donnell", 'Matt Damon']
    }
});
//console.log(duo);
*/

/*
* prend tous les films dont le réalisateur et Burger ou Furman
const director = db.movies.find({
    $or: [
        {
            directors: "Neil Burger"
        },
        {
          directors: "Brad Furman"  
        }
    ]
})
//console.log(director);
*/

/*
* prend le film le plus ancien en triant par année
const oldest = db.movies.find().sort({ year: 1 }).limit(1);
//console.log(oldest);
*/

/*
* prend les films avec une note supérieur à 8
const rating = db.movies.find({
    "imdb.rating": { $gt: 8.0 },
    "tomatoes.critic.rating": { $gt: 8 }
});
//console.log(rating);
*/

/*
* vérifie si le film est sorti
 const unreleased = db.movies.find({
    released: { $exists: false }
});
//console.log(unreleased);
*/

/*
* film aléatoire
const randomNumber = Math.floor(Math.random() * 100);
const randomMovie = db.movies.find().limit(1).skip(randomNumber);
console.log(randomMovie);
*/

/*
* UPDATE
*/
/*
const modification = db.movies.updateOne({
    title: "The Italian"
}, {
    $set: {
        genres: ["Documentary", "Comedy"]
    }
});
//console.log(modification);

/*
* Test pour voir si les données ont bien étaient modifiées
let movies = db.movies
    .find({
        title: {
            $regex: /^The Italian$/i
        }
});
console.log(movies);
// équivalent sql = UPDATE <table> SET <...>
*/

/*
const movie = db.movies.updateOne({
    title: "The Italian"
},{
    // rename
    $rename: {
        released: 'release'
    },
    // supprime le champ
    $unset: {
        genres: ''
    },
    // incrémente de 1
    $inc: {
        metacritic: 1
    }
});
*/

/*
* mise à jour de tableau
*/

/*
const maj = db.movies.updateOne({
    title: "The Italian"
},{
    $push: {
        languages: "French"
    }, 
        $pull: {
        countries: "USA"
        }
});
*/

/*
* upsert si existe met à jour si pas le crée
*/
/*
db.movies.updateOne({
    title: "Bruno"
}, {
    $set: {
        genres: ['comedy', 'Dramatique']
    }
}, {
    upsert: true
});
*/

/*
* find and modify, cherche l'élément; le modifie et le récupère
*/
/*
const findAndModify = db.movies.findAndModify({
    query: {
        title: "Bruno"
    },
    update: {
        $set: {
            runtime: 90
        }
    }, new: true
});
//console.log(findAndModify);
*/

/*
* replace Bruno par Redha
const replaced = db.movies.replaceOne({
    title: 'Bruno'
},{
    title: 'RedhOne',
    genres: ['Family', 'Comedy'],
    runtime: 90
});
//console.log(replaced);
*/

/*
* supprimer Redha
*/

/*
const deleted = db.movies.deleteOne({
    title: "RedhOne"
});
//console.log(deleted);
*/

/*
* incrémente le rating
const charlie = db.movies.updateMany(
    { cast:  {
        $in: ["Charlize Theron"] },
    { $inc: { "imdb.rating": 5 } }
);
//console.log(charlie);
*/

/*
* delete tous les films de Zwart
const kill = db.movies.deleteMany({ directors: "Harald Zwart" });
//console.log(kill);
*/

/*
* ajoute key-key: SET = array de valeurs uniques; Array => peut avoir des valeurs dupliqués
const key = db.movies.update(
    { "title": { $in: ["Anamorph"] } },
    { $push: { "cast": ["Key Key"] } }  //  <====== $addToSet
);
//console.log(key);
*/

/*
* enléve Keanu Reeves et rajoute Keanu Reeves 
const bye = db.movies.update(
    { "title": "The Matrix" },
    { $pull: { "cast": "Keanu Reeves" } }
);
//console.log(bye);

const welcome = db.movies.update(
    { "title": "The Matrix" },
    { $push: { "cast": "Keanu Reeves" } }
);
console.log(welcome);
*/

/*
* change le titre jurassic park par le titre matrix
const Mtrx = db.movies.findOne(
    { "title": "The Matrix" }
);

// on supprime l'id sinon on se retrouve avec 2 docs du même id et ça crash
delete Mtrx._id;

const updateJurassic = db.movies.replaceOne({
    title: "Jurassic Park"
}, Mtrx);
//console.log(Mtrx);
*/

/*
* Aggregations
*/

/*
const transactions = db.comments.aggregate([
    {
        $match: {
            name: "Andrea Le",
        },
    }, {
        $project: {
            name: 1,
            movie_id: 1
        }
    }, 
    {
        $group: {
            _id: "$movie_id",
            count: {
                $count: {}
            }
        }
    },
]);
//console.log(transactions);
*/

/*
* $unwind déconstruire un tableau (array) présent dans un document et produire un document pour chaque élément du tableau.
*/

/*
db = db.getSiblingDB("sample_analytics");
const clients = db.customers.aggregate([
    {
        $match: {
            name: 'Brad Cardenas'
        }
    },
    {
        $unwind: '$accounts'  // Utilisez une chaîne pour spécifier le chemin du tableau
    }
]);
//console.log(clients);
*/

/*
* $out
*/

/*
db = db.getSiblingDB("sample_mflix");
const recentMovies = db.movies.aggregate([
    {
        $match: {
            year: {
                $gt: 2010
            }
        }
    }, {
        $limit: 5
    }, {
        $out: {
            db: "sample_mflix",
            coll: "recent_movies"
        }
    }
]);
// console.log(recentMovies);
*/

/*
const lameDirector = db.movies.aggregate([
    {
        $match: {
            "imdb.rating": { $lt: 5 }
        }
    },
    {
        $group: {
            _id: "$directors",
            totalMovies: { $sum: 1 }
        }
    }, {
        $sort: {
            totalMovies: 1
        }
    },
    {
        $limit: 10
    },
    {
        $out: "lame_directors"
    }
]);
*/

/*
* Exercice
const lameDirector = db.movies.aggregate([
    {
        $match: {
            "imdb.rating": { $lt: 5 }
        }
    },
    {
        $unwind: "$directors"
    },
    {
        $group: {
            _id: "$directors",
            totalMovies: { $sum: 1 }
        }
    },
    {
        $sort: {
            totalMovies: -1
        }
    },
    {
        $limit: 10
    },
    {
        $out: {
            db: "sample_mflix",
            coll: "lame_directors"
        }
    }
]);
console.log(lameDirector);
*/