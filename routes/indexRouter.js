const express = require("express");
const indexRouter = express.Router();


// GET method routes
indexRouter.get("/", (req, res) => res.render("index"));

indexRouter.get("/about", (req, res) => res.render("about"));

indexRouter.get("/contact", (req, res) => res.render("contact"));

indexRouter.get("*", (req, res) => res.status(404).render("error", { errorMessage: "No page has been found."}));


// POST method route
indexRouter.post("/contact", (req, res) => {
    res.render("contact", {message: "We've received your message. Thank you!"});
});

module.exports = indexRouter;