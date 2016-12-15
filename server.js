var Fox = require('./js/fox.js');
var davis = require('./js/davis.js');
var geo = require('./js/geo.js');

// var ngon = function (c) {
//     var n=c.n || 3;
//
//     var ctx= c.context || false;
//     var x=c.x || 500;
//     var y=c.y || x;
//     var r=c.r || 500;
//     if (n%2==0){
//         var rotation=360/(n*2)*davis.random(n*2);
//     }
//     else {
//         var rotation=90+(180*davis.random(2));
//     };
//     rotation=c.rotation || rotation;
//     var color=c.color || davis.randomColor("grey");
//     var lineWidth=c.lineWidth || 1;
//     var fill=c.fill || davis.randcomColor();
//     ctx.beginPath();
//     for (var i=0;i<n+2;i++){
//         var nx=geo.getPoint(x,y,r,rotation+(i*360/n)).x2;
//         var ny=geo.getPoint(x,y,r,rotation+(i*360/n)).y2;
//         ctx.lineTo(nx,ny);
//     }
//     ctx.lineJoin='miter';
//     ctx.strokeStyle=color;
//     ctx.lineWidth=lineWidth;
//     ctx.fillStyle=fill;
//     ctx.fill();
//     ctx.stroke();
//     return true;
// };

var renderFox = function (canvas, opts) {
    var width = opts.canvas.width;
    var height = opts.canvas.height;
    var ctx = canvas.getContext('2d');

    // draw ears
    renderEars(ctx, opts.ears);
    // draw head
    renderHead(ctx, opts.head);
    // draw eyes
    renderEyes(ctx, opts.eyes);
    // draw cheeks
    // draw eyes
    // draw nose
    renderNose(ctx, opts.nose);
    // draw mouth
};

function renderHead(ctx, opts) {
    ctx.save();
    ctx.translate(ctx.canvas.width/2, ctx.canvas.height/2);
    ctx.rotate(Math.PI / 4);
    drawEllipseByCenter(ctx, 0, 0, opts.width, opts.height, opts.color, null, opts.kappa);
    ctx.restore();
}

function renderEars(ctx, opts) {
    var offset = {
        x: ctx.canvas.width/2,
        y: ctx.canvas.height/2
    }
    ctx.save();
    ctx.translate(offset.x, offset.y);
    ctx.rotate(-opts.left.angle);
    drawEllipseByCenter(ctx, opts.left.x - offset.x, opts.left.y - offset.y, opts.left.width, opts.left.height, opts.color, null, opts.kappa);
    ctx.restore();

    ctx.save();
    ctx.translate(offset.x, offset.y);
    ctx.rotate(-opts.right.angle);
    drawEllipseByCenter(ctx, opts.right.x - offset.x, opts.right.y - offset.y, opts.right.width, opts.right.height, opts.color, null, opts.kappa);
    ctx.restore();
}

function renderEyes(ctx, opts) {
    drawEllipseByCenter(ctx, opts.left.x, opts.left.y, opts.width, opts.height, "black", null, 0.5);
    drawEllipseByCenter(ctx, opts.right.x, opts.right.y, opts.width, opts.height, "black", null, 0.5);
}

function renderNose(ctx, opts) {
    drawEllipseByCenter(ctx, opts.x, opts.y, opts.width, opts.height, "black", null, 0.5);
}

function drawEllipseByCenter(ctx, cx, cy, w, h, color, fillColor, kappa) {
  console.log("ellipse coords", cx, cy, w, h);
  drawEllipse(ctx, cx - w/2.0, cy - h/2.0, w, h, color, fillColor, kappa);
}

function drawEllipse(ctx, x, y, w, h, color, fillColor, kappa) {
  var kappa = kappa || 0.3,
      ox = (w / 2) * kappa, // control point offset horizontal
      oy = (h / 2) * kappa, // control point offset vertical
      xe = x + w,           // x-end
      ye = y + h,           // y-end
      xm = x + w / 2,       // x-middle
      ym = y + h / 2;       // y-middle

  if (color) {
    ctx.strokeStyle = color;
  }
  ctx.beginPath();
  ctx.moveTo(x, ym);
  ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
  ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
  ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
  ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
  var fillColor = fillColor || color;
  if (fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fill();
  }
  //ctx.closePath(); // not used correctly, see comments (use to close off open path)
  ctx.stroke();
}

var circle = function(c){
    var ctx= c.context || false;
    var x=c.x || 500;
    var y=c.y || x;
    var r=c.r || 10;
    var cr=ctx.canvas.width/2;
    var lineWidth=c.lineWidth || 1;
    ctx.beginPath();
    ctx.arc(x,y,r,0,2*Math.PI);
    ctx.lineWidth=lineWidth;

    ctx.fillStyle="red";
    ctx.fill();
    ctx.stroke();


    return true;
};

function writeFoxesToDisk (width, height, n=10) {
    var fileNames = [];
    for (var i = 0; i < n; i++) {
        var Image = Canvas.Image;
        var canvas = new Canvas(width, height);
        var ctx = canvas.getContext('2d');
        var fox = Fox(width, height);
        renderFox(canvas, fox);
        var img = new Buffer(canvas.toDataURL(), 'base64');
        var fileName = "fox" + Math.floor(Math.random() * 10000) + ".png";
        var filePath = __dirname + '/images/' + fileName;

        fs.writeFile(filePath, canvas.toBuffer(), function(err) {
            if (err) console.log('error', err);
        });

        fileNames.push(fileName);
    }
    return fileNames;
};

var Canvas = require('canvas');
var express = require('express');
var fs = require('fs');

var app = express();

app.use(express.static(__dirname + '/images'));

app.get('/', function(req, res) {
    var fileNames = writeFoxesToDisk(300, 300, 30);
    var images = fileNames.map(fileName => '<img src="/' + fileName + '"/>');
    res.send(images.join(''));
});


app.listen(process.env.PORT || 3000);
console.log('listening on http://localhost:3000');
