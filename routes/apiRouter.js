const path = require("path");
const fs = require("fs").promises;
const express = require("express");
const apiProfilesRouter = express.Router();


apiProfilesRouter.get("/", (req, res) => {
  const id = req.params.id;
  fs.readFile(path.join(__dirname, "../data/profiles.json"))
  .then((contents) => {
    // need to parse the raw buffer as json if we want to work with it
    const profilesJson = JSON.parse(contents);

    res.send(profilesJson);
  })
  .catch((err) => {
    console.log(err);
    res.writeHead(500);
    res.end("Error");
  });
});

apiProfilesRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  fs.readFile(path.join(__dirname, "../data/profiles.json"))
  .then((contents) => {
    // need to parse the raw buffer as json if we want to work with it
    const profilesJson = JSON.parse(contents);

    // check whether id is valid and errors if it is not
    const person = profilesJson.filter(e => e.id === id)[0];
    if (!person) {
      res.status(404).render("error", { 
        title: `Express Yourself - Error`,
        errorMessage: "No profile has been found."
      })
      return;
    }

    res.send(person);
  })
  .catch((err) => {
    console.log(err);
    res.writeHead(500);
    res.end("Error");
  });
});

module.exports = apiProfilesRouter;