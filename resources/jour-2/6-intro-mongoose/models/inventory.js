const { Schema, model } = require("mongoose");

// on déclare un schéma
const inventorySchema = new Schema({
  sku: {
    type: String, // le sku est de type String
    unique: true, // unicité de la valeur du champs
    required: function () {
      // validation custom
      if (this.type === "vegetable") {
        if (this.sku === "meat") {
          return false;
        }
      }
      return true;
    },
  },
  type: {
    type: String,
    enum: ["vegetable", "meat", "fruit"],
  },
  description: {
    type: String,
    required: [true, "La description est requise"],
    // ...options autre options
  },
  instock: {
    type: Number,
    default: 0,
    min: [0, "Le nombre minimal de stock est de 0"],
    max: [999, "Vous en avez trop ..."],
  },
});

const inventoryModel = model("inventory", inventorySchema);

module.exports = inventoryModel;
