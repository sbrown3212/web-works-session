import express from "express";
import nunjucks from "nunjucks";
import session from "express-session";

const PORT = 8888;

const app = express();

// Configure nunjucks
nunjucks.configure("views", {
    autoescape: true,
    express: app,
})

// Displays hyperlink in console to view app in browser
app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`))

// Home route
app.get("/", (req, res) => {
    res.render("index.html")
})

