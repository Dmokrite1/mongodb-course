const mongoose = require("mongoose");
const inventoryModel = require("./models/inventory");

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

    // const agg = await inventoryModel.aggregate([
    //   {
    //     $match: {
    //       instock: {
    //         $gt: 60,
    //       },
    //     },
    //   },
    // ]);
    // console.log(agg);

    const inventory = await inventoryModel
      .find({
        sku: {
          $in: ["almonds"],
        },
      })
      .select({
        sku: 1,
        instock: 1,
      })
      .sort({
        instock: -1,
      })
      .limit(1);

    console.log("tous les nouveaux items : ", inventory);

    const newInventory = new inventoryModel({
      _id: mongoose.Types.ObjectId("60d09df5c1924122e4fe0bd9"),
      sku: "Nouvel item 3",
      type: "meat",
      description: "Ceci est un nouvel item 2",
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

    // ajoute une donnée en base de données
    // await newInventory.save();

    // on va rechercher notre modèle
    const itemFromInventory = await inventoryModel.findOne({
      _id: mongoose.Types.ObjectId("60d09df5c1924122e4fe0bd9"),
    });

    // on change la description
    itemFromInventory.description = "Ma nouvelle description";

    // le .save() va synchroniser nos changements avec le document
    await itemFromInventory.save();

    //remove l'utilisateur
    await itemFromInventory.delete();
  } catch (e) {
    console.log("Une erreur est survenue lors de la connexion ! ", e.message);
  }
}

init();
