var fs = require('fs');
var express = require('express');
var Canvas = require('canvas');

var Fox = require('./js/fox.js');
var renderFox = require('./js/render-fox.js');

function writeFoxesToDisk (width, height, n=10) {
    var fileNames = [];
    for (var i = 0; i < n; i++) {
        var canvas = new Canvas(width, height);
        var ctx = canvas.getContext('2d');
        var fox = Fox(width, height);
        renderFox(canvas, fox);
        var fileName = "fox" + Math.floor(Math.random() * 10000) + ".png";
        var filePath = __dirname + '/images/' + fileName;

        fs.writeFile(filePath, canvas.toBuffer(), function(err) {
            if (err) console.log('error', err);
        });

        fileNames.push(fileName);
    }
    return fileNames;
};

var app = express();

app.use(express.static(__dirname + '/images'));

app.get('/', function(req, res) {
    var fileNames = writeFoxesToDisk(400, 400, 30);
    var images = fileNames.map(fileName => '<img src="/' + fileName + '"/>');
    res.send(images.join(''));
});

app.listen(process.env.PORT || 3000);
console.log('listening on http://localhost:3000');
