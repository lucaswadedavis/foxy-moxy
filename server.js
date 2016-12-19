var fs = require('fs');
var express = require('express');
var uuid = require('uuid/v4');
var sanitize = require('sanitize-filename');
var Canvas = require('canvas');

var Fox = require('./js/fox.js');
var renderFox = require('./js/render-fox.js');

function composeImage(width, height, seed) {
    seed = seed || uuid();
    var fox = Fox(width, height, seed);
    var canvas = new Canvas(width, height);
    var ctx = canvas.getContext('2d');
    renderFox(canvas, fox);
    return canvas;
};

function writeFoxToDisk (canvas, nameSuffix) {
    var fileName = "fox-" + nameSuffix + ".png";
    var filePath = __dirname + '/images/' + fileName;

    fs.writeFile(filePath, canvas.toBuffer(), function(err) {
        if (err) console.log('error', err);
    });

    return fileName;
};

function writeFoxesToDisk (width, height, n=10) {
    var fileNames = [];
    for (var i = 0; i < n; i++) {
        var seed = uuid();
        var canvas = composeImage(width, height, seed);
        fileNames.push(writeFoxToDisk(canvas, seed));
    }
    return fileNames;
};

var app = express();

app.use(express.static(__dirname + '/images'));

app.get('/', function(req, res) {
    var width = 400;
    var seed = uuid();
    var canvas = composeImage(width, width, seed);
    var buffer = canvas.toBuffer();
    res.set('Content-length', buffer.length);
    res.type('png');
    res.end(buffer, 'binary');
});

app.get('/:width', function(req, res) {
    var width = parseInt(req.params.width) || 400;
    var seed = uuid();
    var canvas = composeImage(width, width, seed);
    var buffer = canvas.toBuffer();
    res.set('Content-length', buffer.length);
    res.type('png');
    res.end(buffer, 'binary');
});

app.get('/:width/:seed', function(req, res) {
    var width = parseInt(req.params.width) || 400;
    var seed = sanitize(req.params.seed) || uuid();
    var canvas = composeImage(width, width, seed);
    var buffer = canvas.toBuffer();
    res.set('Content-length', buffer.length);
    res.type('png');
    res.end(buffer, 'binary');
});

app.listen(process.env.PORT || 3000);
console.log('listening on http://localhost:3000');
