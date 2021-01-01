const express = require('express');
const app = express();
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const { response } = require('express');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

var giphy = require('giphy-api')('ye2zcKYy20F9pefcZ42CxKBNB1cTQAKF');



app.get('/', (req, res)=> {
    giphy.trending({
        limit: 25,
        rating: 'g',
        fmt: 'json'
    }, function (err, response) {
        res.render('home', {data: response.data})

     
    });
})

app.post('/search',(req, res)=> {
    giphy.search({
        limit: 30,
        q: req.body.search,
        rating: 'g'
    }, function (err, response) {
        res.render('search', {data :response.data})
    });
} );

app.get('/50', (req, res)=> {
    giphy.trending({
        limit: 50,
        rating: 'g',
        fmt: 'json'
    }, function (err, response) {
        res.render('home', {data: response.data})     
    });
})


app.get('*', (req, res) => {
    res.json("Wrong URL please go back!!");
});

app.listen(3000, ()=> console.log('server running'));



