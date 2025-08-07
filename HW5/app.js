const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorRoutes = require('./routes/404')

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname ,"public")));

app.use("/admin",adminRoutes.router);
app.use(shopRoutes);
app.use(errorRoutes);

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
    res.sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000);