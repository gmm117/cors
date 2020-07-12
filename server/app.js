var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.get('/', (req, res) => {
    res.send('hello world');
});

app.get('/corsTest', (req, res) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5000");
    
    res.send('cors success');
    console.log(req.query.id , req.query.pw);
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/corspostTest', (req, res) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5000");
    res.send('cors post success');
    console.log(req.body);
});

var port = 3000;
app.listen(port, () => {
    console.log('server on! http://localhost:', port);
});