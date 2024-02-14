const { Schema, model } = require("mongoose");

/*
  {
    name : "bonjour",
    birth : "20-21-2020",
    address : {
      street : "Rue du jardin",
      zip : "7000",
      city : "Mons",
      number : 26
    }
  }
*/

const addressSchema = new Schema(
  {
    street: String,
    zip: String,
    city: String,
    number: Number,
  },
  {
    // ne génère pas l'id à ce sous-schéma
    _id: false,
  }
);

const usersSchema = new Schema({
  firstName: {
    required: [true, "Un prénom est requis"],
    type: String,
  },
  lastName: {
    type: String,
    required: [true, "Un nom est requis"],
  },
  birth: Date,
  address: addressSchema, // notre sous schéma déclaré au dessus
});

// méthode d'instance
usersSchema.methods.debug = function () {
  console.log(JSON.stringify(this, null, 4));
};

// méthode statique
// méthode custom statique pour votre modèle et non pour une instance d'un modèle
usersSchema.statics.findByName = function (name, limit = 5) {
  // this est égal à usersModel dans cette fonction
  return this.find({
    firstName: name,
  }).limit(limit);
};

// propriétés virtuelles, c'est à dire qui existent que du côté application mais qui n'existe pas vraiment dans votre base de données MongoDB
usersSchema
  .virtual("fullName")
  .get(function () {
    // this fait référence à l'instance du modèle actuel (un document quoi)
    return `${this.firstName} ${this.lastName}`;
  })
  // fullName => 'Barack Obama'
  .set(function (newFullName) {
    //     V index 0  V index 1
    const [firstName, lastName] = newFullName.split(" "); // => ["Barack","Obama"]
    this.firstName = firstName;
    this.lastName = lastName;
  });

/*
const usersSchemaAlt = new Schema({
  name: String,
  birth: Date,
  address: {
    // alternative
    street: String,
    zip: String,
    city: String,
    number: Number,
  }, // notre sous schéma déclaré au dessus
});
*/

const usersModel = model("users", usersSchema);

module.exports = usersModel;
