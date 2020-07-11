var express = require('express');
var app = express();

app.get('/', (req, res) => {
    
    res.send('hello world');
});

app.get('/corsTest', (req, res) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5000");
    res.send('cors success');
});

var port = 3000;
app.listen(port, () => {
    console.log('server on! http://localhost:', port);
});