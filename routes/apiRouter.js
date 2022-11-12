const path = require("path");
const fs = require("fs").promises;
const express = require("express");
const apiProfilesRouter = express.Router();


apiProfilesRouter.get("/", (req, res) => {
    fs.readFile(path.join(__dirname, "../data/profiles.json"))
    .then((contents) => {
        
      // need to parse the raw buffer as json if we want to work with it
      const profilesJson = JSON.parse(contents);
      
      //   prepare and send an OK response
      res.render("profiles", {
        title: "Express Yourself - Profiles",
        profiles: profilesJson,
      });
    })
    .catch((err) => {
      console.log(err);
      res.writeHead(500);
      res.end("Error");
    });
});

module.exports = apiProfilesRouter;