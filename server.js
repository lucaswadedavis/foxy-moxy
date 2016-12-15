var Fox = require('./js/fox.js');
var davis = require('./js/davis.js');
var geo = require('./js/geo.js');

var ngon = function (c) {
    var n=c.n || 3;

    var ctx= c.context || false;
    var x=c.x || 500;
    var y=c.y || x;
    var r=c.r || 500;
    if (n%2==0){
        var rotation=360/(n*2)*davis.random(n*2);
    }
    else {
        var rotation=90+(180*davis.random(2));
    };
    rotation=c.rotation || rotation;
    var color=c.color || davis.randomColor("grey");
    var lineWidth=c.lineWidth || 1;
    var fill=c.fill || davis.randcomColor();
    ctx.beginPath();
    for (var i=0;i<n+2;i++){
        var nx=geo.getPoint(x,y,r,rotation+(i*360/n)).x2;
        var ny=geo.getPoint(x,y,r,rotation+(i*360/n)).y2;
        ctx.lineTo(nx,ny);
    }
    ctx.lineJoin='miter';
    ctx.strokeStyle=color;
    ctx.lineWidth=lineWidth;
    ctx.fillStyle=fill;
    ctx.fill();
    ctx.stroke();
    return true;
};

var renderFox = function (canvas, opts) {
    var width = opts.canvas.width;
    var height = opts.canvas.height;
    var ctx = canvas.getContext('2d');
    ctx.beginPath();

    circle({
        gradient:false,
        context:ctx,
        x: width/2,
        y: height/2,
        r: width/2,
    });
};




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


var radial = function(ctx,width,height){
    ctx.beginPath();
    ctx.arc(width/2,width/2,davis.random(width/2),0,2*Math.PI);
    ctx.strokeStyle=davis.randomColor();
    ctx.lineWidth=1+davis.random(0.5*width);
    ctx.stroke();


    for (var j=0;j<davis.random(4);j++){
        var r=davis.random(width/2);
        var rf=davis.random(width/2);
        var color=davis.randomColor();
        davis.maybe(2,3,function(){color=davis.randomColor("grey");});
        var lw=1+davis.random(width/10);
        var steps=1+davis.random(30);
        var incrementMod=davis.random(3)*90;
        var n=davis.random(6);
        var rotation=90*davis.random(3);
        var fadeColor=davis.pick(["rgba(0,0,0,0)","rgba(255,255,255,0)"]);
        var fadeRadius=Math.random();
        davis.maybe(1,5,function(){fadeRadius=0;});
        davis.maybe(1,5,function(){fadeRadius=false;});
        for (var i=0;i<steps;i++){
            var increment=i*360/steps;
            var x=geo.getPoint(width/2,height/2,rf,increment+incrementMod).x2;
            var y=geo.getPoint(width/2,height/2,rf,increment+incrementMod).y2;

            circle({
                n:n,
                gradient:true,
                context:ctx,
                x:x,
                y:y,
                r:r,
                rotation:rotation,
                lineWidth:lw,
                color:color,
                fadeColor:fadeColor,
                fadeRadius:fadeRadius
            });
        }
    }
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
