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

var textIcon = function (canvas, width, height) {
  var ctx = canvas.getContext('2d');
  ctx.beginPath();

  var color=davis.randomColor();
  var gradient=ctx.createLinearGradient(0,0,0,height);
  gradient.addColorStop(0,color);
  gradient.addColorStop(1,davis.pick([color,davis.randomColor(),"#000","#fff",davis.alpha(color,0)]));
  ctx.fillStyle=gradient;
  ctx.fillRect(0,0,width,height);


  for (var j=0;j<davis.random(4);j++){
    var r=davis.random(width/2);
    var rf=davis.random(width/2);
    var color=davis.randomColor();
    davis.maybe(2,3,function(){color=davis.randomColor("grey");});
    var lw=1+davis.random(width/20);
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

  var radialCanvas = new Canvas(width, height);
  var ctx2 = radialCanvas.getContext('2d');
  radial(ctx2, width, height);
  var pattern = ctx.createPattern(radialCanvas);
  ctx.clearRect(0, 0, width, height);

  ngon({
    n:3+davis.random(4),
    gradient:true,
    context:ctx,
    x:width/2,
    y:height/2,
    r:width/4+davis.random(width/4),
    fill:pattern,
    lineWidth:davis.random(width/15)
  });	

};




var circle = function(c){
  var ctx= c.context || false;
  var x=c.x || 500;
  var y=c.y || x;
  var r=c.r || 10;
  var color=c.color || davis.randomColor("grey");
  var fadeColor=c.fadeColor || "rgba(0,0,0,0)";
  var fadeRadius=c.fadeRadius || Math.random();
  var cr=ctx.canvas.width/2;
  var gradient=ctx.createRadialGradient(cr,cr,(fadeRadius*cr),cr,cr,cr);
  gradient.addColorStop(0,color);
  gradient.addColorStop(1,fadeColor);
  var lineWidth=c.lineWidth || 1;
  ctx.beginPath();
  ctx.arc(x,y,r,0,2*Math.PI);
  ctx.strokeStyle=gradient;
  ctx.lineWidth=lineWidth;

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

var app = express();

app.get('/:width', function(req, res) {

  var width = Math.min(1000, Math.max(0, parseInt(req.params.width) || 500));
  var height = width;


  var Canvas = require('canvas')
    , Image = Canvas.Image
    , canvas = new Canvas(width, height)
    , ctx = canvas.getContext('2d');

  textIcon(canvas, width, height);
  res.send(canvas.toDataURL());
  /*  
  var img = new Buffer(canvas.toDataURL(), 'base64');
    console.log(img.length);

   res.writeHead(200, {
     'Content-Type': 'image/png',
     'Content-Length': img.length
   });
   res.end();
   */
});


app.listen(process.env.PORT || 3000);
console.log('listening on http://localhost:3000');
