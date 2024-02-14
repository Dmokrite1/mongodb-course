const moviesController = require("./controllers/movies.controller");
const notFound = require("./utils/not-found");

const routes = [
  {
    path: "/movies",
    method: "GET",
    action: moviesController.list,
  },
  {
    path: "/movies/paginate",
    method: "GET",
    action: moviesController.paginate,
  },
  {
    path: "/movies",
    method: "POST",
    action: moviesController.create,
  },
  {
    path: "/movies",
    method: "PATCH",
    action: moviesController.update,
  },
  {
    path: "/movies",
    method: "DELETE",
    action: moviesController.delete,
  },
];

// notre module router et sa fonction de routing
module.exports = async (req, res) => {
  const url = new URL(req.url, "http://localhost:8000");
  const method = req.method;

  const route = routes.find(
    (e) => e.path === url.pathname && e.method === method
  );

  console.log("route : ", route);

  if (route) {
    await route.action(req, res, url);
  } else {
    notFound(res);
  }
};
