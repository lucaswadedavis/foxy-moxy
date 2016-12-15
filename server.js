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
    ctx.beginPath();

    drawEllipseByCenter(ctx, width/2, height/2, opts.head.width, opts.head.height);
};

function drawEllipseByCenter(ctx, cx, cy, w, h) {
  drawEllipse(ctx, cx - w/2.0, cy - h/2.0, w, h);
}

function drawEllipse(ctx, x, y, w, h) {
  var kappa = .3,
      ox = (w / 2) * kappa, // control point offset horizontal
      oy = (h / 2) * kappa, // control point offset vertical
      xe = x + w,           // x-end
      ye = y + h,           // y-end
      xm = x + w / 2,       // x-middle
      ym = y + h / 2;       // y-middle

  ctx.beginPath();
  ctx.moveTo(x, ym);
  ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
  ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
  ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
  ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
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

var Canvas = require('canvas');
var express = require('express');
var fs = require('fs');

var app = express();

app.use(express.static(__dirname + '/images'));

app.get('/', function(req, res) {

    var width = 200;
    var height = 200;
    var Canvas = require('canvas');
    var Image = Canvas.Image;
    var canvas = new Canvas(width, height);
    var ctx = canvas.getContext('2d');
    var fox = Fox(width, height);
    console.log(fox);
    renderFox(canvas, fox);
    var img = new Buffer(canvas.toDataURL(), 'base64');
    var fileName = "fox" + Math.floor(Math.random() * 10000) + ".png";

    fs.writeFile(__dirname + '/images/' + fileName, canvas.toBuffer(), function(err) {
        console.log('error', err);
    });

    console.log(fileName);
    res.redirect(301, fileName);
});


app.listen(process.env.PORT || 3000);
console.log('listening on http://localhost:3000');
