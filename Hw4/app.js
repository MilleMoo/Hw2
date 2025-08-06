const express = require('express');
const bodyParser = require("body-parser");
const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: true}));

app.use("/admin",adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).send("<h1>page not found.</h1>");
});

app.use('/add-product', (req, res, next) => {
    console.log("Add Product Page");
    res.send(`<form action="/product" method="POST">
        <input type="text" name="title">
        <button type="submit">Add Product</button>
        </form>`)
});

app.post('/product', (req, res, next)=> {
    console.log(req.body);
    res.redirect("/");
});

app.use('/', (req, res, next) => {
    console.log("in antother middleware.");
    res.send('<h2>what do you want, bro??</h2>');
});

app.listen(3000);