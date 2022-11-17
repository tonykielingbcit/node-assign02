const express = require("express");
const app = express();
const logger = require('morgan');
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const cors = require("cors");

// Use environment variable if defined, or a fixed value if not.
const PORT = process.env.PORT || 3003;

// morgan is set ON
app.use(logger("combined"));

app.use(cors());


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
app.use("/profiles", profilesRouter);
app.use("/api", apiProfilesRouter);
app.use(indexRouter);


app.get("*", (req, res) => res.status(404).send("<h2 style='text-align: center; color: red; margin-top: 2rem;'>No page has been found</h2>"));

// app is listening
app.listen(PORT, () => {
    console.log(` => Server running at http://localhost:${PORT}`);
});
  
    