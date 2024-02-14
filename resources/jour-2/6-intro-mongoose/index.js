const mongoose = require("mongoose");
const inventoryModel = require("./models/inventory");

async function init() {
  try {
    const connection = await mongoose.connect("mongodb://localhost:27017", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Vous vous êtes connecté avec succès ! ", connection.version);

    const newInventory = new inventoryModel({
      sku: "Nouvel item",
      type: "ptato",
    });

    let errors = newInventory.validateSync();

    /*
    const object = {
      key1: "Clé",
      key2: "Clé 2",
    };

    // forin permet d'itérer sur toutes les propriétés d'un objet
    for (const key in object) {
      console.log(
        "Je suis à la clé : ",
        key,
        " avec une valeur de ",
        object[key]
      );
    }

    const errors = {
      errors: {
        sku: {
          // desc erreur
        },
        description: {
          // desc erreur
        },
      },
    };*/

    if (errors) {
      for (const key in errors.errors) {
        console.log(
          `Vous avez une erreur pour le champ ${key} : ${errors.errors[key].properties.message}`
        );
      }
    }
  } catch (e) {
    console.log("Une erreur est survenue lors de la connexion ! ", e.message);
  }
}

init();
