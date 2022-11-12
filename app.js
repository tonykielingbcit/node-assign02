const express = require("express");
const app = express();
const logger = require('morgan');
const path = require("path");
const expressLayouts = require("express-ejs-layouts");

// Use environment variable if defined, or a fixed value if not.
const PORT = process.env.PORT || 3003;

// morgan is set ON
app.use(logger("combined"));


// get the routes
const indexRouter = require("./routes/indexRouter.js");
const profilesRouter = require("./routes/profilesRouter.js");
const apiProfilesRouter = require("./routes/apiRouter.js");

app.use(express.static('public'));

app.set("views", path.join(__dirname, "views"));
// set the view engine to ejs
app.set("view engine", "ejs");

// Enable layouts
app.use(expressLayouts);
// Set the default layout
app.set("layout", "./layouts/full-width");


// call the routes
app.use("/api/profiles", apiProfilesRouter);
app.use("/profiles", profilesRouter);
app.use(indexRouter);


app.get("*", (req, res) => res.status(404).send("<h2 style='text-align: center; color: red; margin-top: 2rem;'>No page has been found</h2>"));

// app is listening
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
  
    