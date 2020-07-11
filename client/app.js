var express = require('express');
var fs = require('fs');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    fs.readFile('./public/index.html', function(error, data) {
        if(error) {
          console.log(error);
        } else {
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.end(data);
        }
    });
});

// 직접 서버간의 통신으로는 cors error가 발생하지 않는다(브라우저 정책상 제한:domain,port,protocol)
app.get('/serverTest', (req, res) => {
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (this.status == 200 && this.readyState == this.DONE) {
        console.log(xmlHttp.responseText);
        }
    }

    xmlHttp.open("GET", "http://localhost:3000/corsTest");

    xmlHttp.send();
    res.send('cors server success');
});

var port = 5000;
app.listen(port, () => {
    console.log('server on! http://localhost:', port);
});