var express = require('express');
var fs = require('fs');
var app = express();
const axios = require('axios');
const fetch = require('node-fetch');

var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
var $ = jQuery = require('jquery')(window);

app.use(express.static(__dirname + '/public'));

// html get request
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
// XMLHttpRequest get request
app.get('/serverTest', (req, res) => {
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (this.status == 200 && this.readyState == this.DONE) {
        console.log(xmlHttp.responseText);
        }
    }

    xmlHttp.open("GET", "http://localhost:3000/corsTest?" + "id=gmm117&pw=hongseungah");

    xmlHttp.send();
    res.send('cors server success');
});

// XMLHttpRequest post request
app.get('/serverpostTest', (req, res) => {
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.status == 200 && this.readyState == this.DONE) {
        console.log(xhr.responseText);
        }
    }

    xhr.open("POST", "http://localhost:3000/corspostTest", false);
    // xhr.setRequestHeader("Content-type", "application/json");
    // const data = JSON.stringify({
    //     id: 'gmm117',
    //     pw: 'hongseungah'
    // });
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("id=gmm117&pw=hongseungah");
    res.send("cors client test");
});

// ajax post request
app.get('/serverpostajaxTest', (req, res) => {
    $.ajax({
        url:'http://localhost:3000/corspostTest', // 요청 할 주소
        async:false,// false 일 경우 동기 요청으로 변경
        type:'POST', // GET, PUT
        data: "id=gmm117&pw=hongseungah",// 전송할 데이터
        dataType:'text',// xml, json, script, html
        beforeSend:function(jqXHR) {},// 서버 요청 전 호출 되는 함수 return false; 일 경우 요청 중단
        success:function(jqXHR) {},// 요청 완료 시
        error:function(jqXHR) {},// 요청 실패.
        complete:function(jqXHR) {}// 요청의 실패, 성공과 상관 없이 완료 될 경우 호출
    });

    res.send("cors ajax client test");
});


// axios post request
app.get('/serverpostaxiosTest', (req, res) => {
    axios({
        url: 'http://localhost:3000/corspostTest',
        method: 'POST',
        data: "id=gmm117&pw=hongseungah"
      });

    res.send("cors axios client test");
});

app.get('/serverpostfetchTest', (req, res) => {
    fetch('http://localhost:3000/corspostTest', {
        method: 'POST',
        body: JSON.stringify({
                id: 'gmm117',
                pw: 'hongseungah'
            }),
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => console.log(response));

    res.send("cors fetch client test");
});

var port = 5000;
app.listen(port, () => {
    console.log('server on! http://localhost:', port);
});