const db = connect("technocite");

db.createUser({
  user: "admin",
  pwd: "admin",
  roles: [
    {
      role: "readWriteAnyDatabase",
      db: "admin",
    },
    {
      role: "userAdminAnyDatabase",
      db: "admin",
    },
  ],
});

db.createUser({
  user: "technocite",
  pwd: "technocite",
  roles: [
    {
      role: "readWrite",
      db: "technocite",
    },
  ],
});

// RESTART LE SERVEUR APRES

// > MACOS : brew services restart mongodb-community@4.4
// > Windows : Services > MongoDB
// > Linux : sudo systemctl restart mongod
