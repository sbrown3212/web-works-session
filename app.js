import express from "express";
import nunjucks from "nunjucks";
import session from "express-session";

const PORT = 8888;

const app = express();

// Allows express to decode a body object???
app.use(express.urlencoded({
    extended: false
}))

// Allows express to set up a session
app.use(
    session({
      secret: "ssshhhhh",
      saveUninitialized: true,
      resave: false,
    })
  );

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

// Login GET route
app.get("/login", (req, res) => {
    // if req.session.username exists, then this client has previously "logged in"
    if (req.session.username) {
        res.render("dashboard.html", {
            username: req.session.username,
        })
    } else {
        res.render("login.html")
    }
})

// Login POST route
app.post("/login", (req, res) => {
    req.session.username = req.body.username;
    
    res.render("dashboard.html", {
        username: req.session.username,
    })
})

// Logout route
app.get("/logout", (req, res) => {
    // "Destoy" the session, and navigate back home
    req.session.destroy();
    
    // Redirects to Home route
    res.redirect("/")
})