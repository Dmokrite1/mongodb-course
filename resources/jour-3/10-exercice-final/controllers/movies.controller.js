const moviesModel = require("../models/movies");
const notFound = require("../utils/not-found");
const readRequestData = require("../utils/read-request-data");

// req , res sont passés en paramètres par notre routeur
exports.list = async (req, res, url) => {
  const id = url.searchParams.get("id"); // on va récupérer si il ya un id dans l'url

  let result;

  // si on trouve l'id dans l'url c'est pour trouver un élement, si pas  on renvoie tout
  if (id) {
    // si l'URL contient withComments
    if (url.searchParams.get("withComments")) {
      // on charge les commentaires avec le findOne
      result = await moviesModel.findOne({ _id: id }).populate("comments");
    } else {
      result = await moviesModel.findOne({ _id: id });
    }
  } else {
    result = await moviesModel.find().limit(10);
  }

  if (result === null) {
    notFound(res);
    return;
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(result)); // on stringifie la liste des films en JSON
  res.end(); //termine la réponse et l'envoie au client
};

exports.paginate = async (req, res, url) => {
  const page = parseInt(url.searchParams.get("page"));
  const size = parseInt(url.searchParams.get("size"));

  const result = await moviesModel
    .find()
    .skip(page * size)
    .limit(size);

  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(result)); // on stringifie la liste des films en JSON
  res.end(); //termine la réponse et l'envoie au client
};

exports.create = async (req, res) => {
  // on parse le JSON du body envoyé
  const body = JSON.parse(await readRequestData(req));

  const newMovie = new moviesModel(body);

  // on sauvegarde en DB
  const saved = await newMovie.save();

  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(saved)); // on stringifie le film sauvegardé en JSON
  res.end(); //termine la réponse et l'envoie au client
};
exports.update = async (req, res, url) => {
  // on parse le JSON du body envoyé
  const body = JSON.parse(await readRequestData(req));
  const id = url.searchParams.get("id");

  const result = await moviesModel.findOneAndUpdate({ _id: id }, body, {
    new: true, // cette option permet de renvoyer le document mis à jour, si pas il renvoie l'ancien
  });

  if (result === null) {
    notFound(res);
    return;
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(result)); // on stringifie le film sauvegardé en JSON
  res.end(); //termine la réponse et l'envoie au client
};
exports.delete = async (req, res, url) => {
  const id = url.searchParams.get("id");

  const found = await moviesModel.findOne({ _id: id });

  if (!found) {
    notFound(res);
    return;
  }

  await found.remove();

  res.writeHead(204, { "Content-Type": "application/json" });
  res.end();
};
