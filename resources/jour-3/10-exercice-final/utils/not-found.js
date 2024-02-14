module.exports = function notFound(res, message = "not found") {
  // 404 est égal au code HTTP de NOT FOUND
  res.writeHead(404, { "Content-Type": "application/json" });
  res.write(JSON.stringify({ message }));
  res.end();
};
