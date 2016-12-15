geo={};

geo.getPoint=function(x,y,r,theta){
	theta+=90;
	theta=theta*(Math.PI/180);
	var x2=x+(r*Math.sin(theta));
	var y2=y+(r*Math.cos(theta));
	var circle={x1:x,y1:y,r:r,x2:x2,y2:y2};
	return circle;
	};

geo.arcPath=function(x,y,r,theta1,theta2,w){
	var f1=0;
	var f2=0;
	var f3=0;
	var f4=1;
	if ((theta2-theta1)>180){
		f1=1;
		f3=1;
		}
	
	var arcPath="";
	arcPath+="M "+geo.getPoint(x,y,r,theta1).x2+" "+geo.getPoint(x,y,r,theta1).y2;
	arcPath+=" A "+r+" "+r+" "+(theta2-theta1)+" "+f1+" "+f2+" "+geo.getPoint(x,y,r,theta2).x2+" "+geo.getPoint(x,y,r,theta2).y2;
	arcPath+=" L "+geo.getPoint(x,y,(r-w),theta2).x2+" "+geo.getPoint(x,y,(r-w),theta2).y2;
	arcPath+=" A "+(r-w)+" "+(r-w)+" "+(theta2-theta1)+" "+f3+" "+f4+" "+geo.getPoint(x,y,(r-w),theta1).x2+" "+geo.getPoint(x,y,(r-w),theta1).y2;
	arcPath+=" Z";
	return arcPath;
	};

geo.ngon=function(x,y,r,n){
	if (!n){n=3};
	var path="";
	path+="M "+geo.getPoint(x,y,r,0).x2+" "+geo.getPoint(x,y,r,0).y2;
	for (var i=0;i<n;i++){
		var interval=360/n;
		var theta=interval*i;
		path+=" L"+geo.getPoint(x,y,r,theta).x2+" "+geo.getPoint(x,y,r,theta).y2;
		}	
	path+="Z";
	var ngon=model.paper.path(path).attr({"stroke":"#fff"});
	return ngon;
	};

geo.orbital=function(x,y,r,n,color){
	if (!x){x=model.bounds.right/2;}
	if (!y){y=model.bounds.bottom/2;}
	if (!r){r=model.bounds.bottom/3;}
	if (!n){n=1;}
	if (!color){color="#FFF";}
	var set=[];
	
	for (var i=0;i<n;i++){
		var theta1=_.random(180);
		var theta2=theta1+(18*_.random(1,20));
		var w=(0.1*r)*_.random(1,3);
	
		var arcPath=geo.arcPath(x,y,r,theta1,theta2,w);
		var circle=model.paper.path(arcPath)
			.attr({"fill":color,"fill-opacity":0.5})
		set.push(circle);
		}
	return set;
	};


