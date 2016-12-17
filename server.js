var fs = require('fs');
var express = require('express');
var uuid = require('uuid/v4');
var sanitize = require('sanitize-filename');
var Canvas = require('canvas');

var Fox = require('./js/fox.js');
var renderFox = require('./js/render-fox.js');

function composeImage(width, height, seed) {
    var fox = Fox(width, height, seed);
    var canvas = new Canvas(width, height);
    var ctx = canvas.getContext('2d');
    renderFox(canvas, fox);
    return canvas;
};

function writeFoxToDisk (width, height, seed) {
    if (seed === undefined) seed = uuid();
    var canvas = composeImage(width, height, seed);
    var fileName = "fox-" + seed + ".png";
    var filePath = __dirname + '/images/' + fileName;

    fs.writeFile(filePath, canvas.toBuffer(), function(err) {
        if (err) console.log('error', err);
    });

    return fileName;
};

function writeFoxesToDisk (width, height, n=10) {
    var fileNames = [];
    for (var i = 0; i < n; i++) {
        fileNames.push(writeFoxToDisk(width, height));
    }
    return fileNames;
};

var app = express();

app.use(express.static(__dirname + '/images'));

app.get('/', function(req, res) {
    var fileNames = writeFoxesToDisk(200, 200, 28);
    var images = fileNames.map(fileName => '<img src="/' + fileName + '"/>');
    res.send(images.join(''));
});

app.get('/:width', function(req, res) {
    var width = parseInt(req.params.width);
    if (!width) width = 400;
    var fileName = writeFoxToDisk(width, width);
    res.send('<img src="/' + fileName + '"/>');
});

app.get('/:width/:seed', function(req, res) {
    var width = parseInt(req.params.width);
    var seed = sanitize(req.params.seed);
    if (width === undefined) width = 400;
    if (!seed) seed = uuid();
    var fileName = writeFoxToDisk(width, width, seed);
    res.send('<img src="/' + fileName + '"/>');
});

app.listen(process.env.PORT || 3000);
console.log('listening on http://localhost:3000');
