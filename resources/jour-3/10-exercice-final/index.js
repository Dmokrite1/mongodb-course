// au lancement de l'application, on lui dit de charger les modèles afin que les relations entre les différents modèles soient bien chargées par mongoose
require("./models/comments");
require("./models/movies");

const mongoose = require("mongoose");
const http = require("http");
const router = require("./router");

const port = 8000;

async function initApp() {
  // connection
  await mongoose.connect("mongodb://localhost/mflix", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const server = http.createServer(router);

  server.listen(port, () => {
    console.log(
      `Je suis un serveur qui écoute sur le port http://localhost:${port}`
    );
  });
}

initApp().catch((e) => {
  console.error("Une erreur critique est survenue : ", e);
});
