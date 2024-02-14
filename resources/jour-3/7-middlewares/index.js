const mongoose = require("mongoose");
const usersModel = require("./models/users");

async function init() {
  try {
    const connection = await mongoose.connect(
      "mongodb://localhost:27017/store",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    // console.log("Vous vous êtes connecté avec succès ! ", connection.version);

    // const newUser = new usersModel({
    //   firstName: "Michelle",
    //   lastName: "Obama",
    //   birth: new Date(),
    //   address: {
    //     street: "Rue des blancs",
    //     zip: "7000",
    //     city: "Mons",
    //     number: 26,
    //   },
    // });

    // await newUser.save();

    // const george = new usersModel({
    //   firstName: "George",
    //   lastName: "Bush",
    //   birth: new Date(),
    //   address: {
    //     street: "Rue des blancs",
    //     zip: "7000",
    //     city: "Mons",
    //     number: 26,
    //   },
    // });

    // await george.save();

    const users = await usersModel.find({});

    console.log("Utilisateur sauvegardé avec succès");
  } catch (e) {
    console.log("Une erreur est survenue lors de la connexion ! ", e.message);
  }
}

init();
