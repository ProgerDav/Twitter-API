const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const twit_search = require("./search");
const port = 3000;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json


app.use(bodyParser.json());

app.use(express.static('public'));

app.use('/static', express.static('public'))

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', {});
});

app.post("/loc", (req, res) => {
    const loc = req.body.loc;
    twit_search.location(loc, (data) => {
        res.json(data);
    });
})

app.post("/search", (req, res) => {
    const query = req.body.query;
    console.log(query);
    twit_search.search(query, (data) => {
        res.json(data);
    });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

