const express = require("express");
const path = require("path");
const app = express();
require("./db/conn");
const hbs = require("hbs");

const Signin = require("./models/sigins");
const async = require("hbs/lib/async");
// const async = require("hbs/lib/async");
// const {json} =require(express);

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/login", (req, res) => {
    res.render("login");
});
app.get("/booking", (req, res) => {
    res.render("booking");
});

app.get("/signin", (req, res) => {
    res.render("signin");
});

app.post("/signin", async (req, res) => {
    try {
        console.log(req.body);
        const email = req.body.email;
        const password = req.body.password;
        const username = req.body.username;

        const signinUser = new Signin({
            name: username,
            email: email,
            password: password,
        });

        await signinUser.save();
        console.log(signinUser);
        res.status(201).render("./index")
    } catch (error) {
        res.status(400).send(error);
    }
});

// for login

app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Signin.findOne({email:email});

        if (useremail.password === password) {
            res.status(201).render("./index")
        } else {
            res.status(400).send("your password and email are incorrect");
        }

    } catch (error) {
        res.status(400).send("invalid Email")
    }
});

app.get("/tournamentpage", (req, res) => {
    res.render("tournamentpage");
});

app.get("/cart", (req, res) => {
    res.render("cart");
});

app.get("/step3", (req, res) => {
    res.render("step3");
});

app.get("/payment", (req, res) => {
    res.render("payment");
});

app.listen(port, () => {
    console.log(`server is running ${port}`);
});
