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

    console.log("Vous vous êtes connecté avec succès ! ", connection.version);

    const newUser = new usersModel({
      firstName: "Jacques",
      lastName: "Chirac",
      birth: new Date(),
      address: {
        street: "Rue du jardin",
        zip: "7000",
        city: "Mons",
        number: 26,
      },
    });

    await newUser.save();

    const users = await usersModel.find({}).limit(5);

    // for (const user of users) {
    //   console.log("DEBUG  : ", user.debug());
    // }
    for (const user of users) {
      user.fullName = "Jacquy Michel";
      console.log("FULLNAME  : ", user.fullName);
      await user.save();
    }

    const userByName = await usersModel.findByName("Jacques", 1);

    console.log(userByName);

    console.log("Utilisateur sauvegardé avec succès");
  } catch (e) {
    console.log("Une erreur est survenue lors de la connexion ! ", e.message);
  }
}

init();
