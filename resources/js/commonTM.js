/*
 * 주제도 표출 관련 공통 클래스 */

// d3 테스트
testD3 = function(){
	
var diameter = 500,
    format = d3.format(",d"),
    color = d3.scale.category20c();

var bubble = d3.layout.pack()
    .sort(null)
    .size([diameter, diameter])
    .padding(1.5);

var svg = d3.select("#_mapDiv__gc").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

var node = svg.selectAll(".node")
	.data(bubble.nodes({children: [{packageName: null, className: "AgglomerativeCluster", value: "1000"}]})
	.filter(function(d) { return !d.children; }))
	.enter().append("g")
	.attr("class", "node")
	.attr("transform", function(d) { return "translate(" + 500 + "," + 500 + ")"; });
	//.attr("x", "500");

node.append("title")
.text(function(d) { return d.className + ": " + format(d.value); });

node.append("circle")
.attr("r", 250)
.style("fill", function(d) { return color(d.packageName); });

node.append("text")
.attr("dy", ".3em")
.style("text-anchor", "middle")
.text(function(d) { return d.className.substring(0, d.r / 3); });

d3.select(self.frameElement).style("height", diameter + "px");
}

//Returns a flattened hierarchy containing all leaf nodes under the root.
function classes(root) {
  var classes = [];

  function recurse(name, node) {
    if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
    else classes.push({packageName: name, className: node.name, value: node.size});
  }

  recurse(null, root);
  return {children: classes};
}

loadJsCssFile = function(src, filetype) {
	
	if (filetype=="js"){ //if filename is a external JavaScript file
		
        var fileref=document.createElement('script');
        
        fileref.setAttribute("type","text/javascript");
        fileref.setAttribute("src", src);
    }
    else if (filetype=="css"){ //if filename is an external CSS file
    	
        var fileref=document.createElement("link");
        
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", src);
    }
	
    if (typeof fileref != "undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
};

var filesadded="" //list of files already added
	 
function checkLoadJsCssFile(filename, filetype){
	
    if (filesadded.indexOf("["+filename+"]")==-1){
    	
    	loadJsCssFile(filename, filetype);
        filesadded+="["+filename+"]"; //List of files added in the form "[filename1],[filename2],etc"
        return false;
    }
    else{
        //alert("file already added!");
    	//console.info("ss");
    	//var quantize = d3.scale.quantize().domain([startValue, endValue]).range(d3.range(range));
    	return true;
    }
}

removeLanguageScript = function(src){
	
	$("script[src='" + src + "']").remove();
}

//값의 범위를 range 단계만큼 나눠 비교할 수 있는 오브젝트 함수를 리턴한다.
getQuantize = function(startValue, endValue, range){
	
	/*var timer = setInterval(function(){
		//console.info("dd");
		var jsCheck = checkLoadJsCssFile('./resources/js/d3.v3.min.js', "js");
		console.info(jsCheck);
		if(jsCheck == true){
			console.info(timer);
			//return d3.scale.quantize().domain([startValue, endValue]).range(d3.range(range));
		}
	}, 1000);
	
	getQuantize(startValue, endValue, range);*/
	
	var quantize = d3.scale.quantize().domain([startValue, endValue]).range(d3.range(range));
	//var quantize = d3.scale.quantize().domain([5000000, 10000000, 25000000, 50000000, 100000000, 250000000]).range(4);
	//console.info(quantize);
	//removeLanguageScript('./resources/js/d3.v3.min.js');
	
	return quantize;
}

// 집수구역별 주제도 보여주기
showCatTMLayer = function(){
	
	var coreMap = GetCoreMap();
	
	var arrAreaGrp = coreMap.reachLayerAdmin_v3_New.arrAreaGrp;
	var inStrCatDids = "";
	//console.info(coreMap.reachLayerAdmin_v3_New.arrAreaGrp);
	for(var i = 0; i < arrAreaGrp.length; i++){
		
		inStrCatDids += "'" + arrAreaGrp[i].attributes.CAT_DID + "', ";
	}
	
	if(inStrCatDids.length > 0){
		
		inStrCatDids = inStrCatDids.substring(0, inStrCatDids.length -2);
	}
	
	//console.info(inStrCatDids);
	
	coreMap.TMLayerAdmin = Ext.create("KRF_DEV.view.map.TMLayerAdmin");
	//coreMap.DynamicLayerTMAdmin = Ext.create("KRF_DEV.view.map.DynamicLayerTMAdmin", coreMap.map, inStrCatDids);
	// 집수구역별 주제도 레이어 그리기 함수 호출
	coreMap.TMLayerAdmin.drawTMCatLayer(inStrCatDids);
}

// 총량단위유역별 주제도 보여주기
showTmdlTMLayer = function(){
	
	var coreMap = GetCoreMap();
	
	// 총량단위유역별 주제도 레이어 그리기 함수 호출
	coreMap.TMLayerAdmin.drawTMTmdlLayer();
}

// 그래픽 오브젝트에서 센터 포인트 가져오기
getCenterFromGraphic = function(graphic){
	
	var centerPoint = null;
	
	switch(graphic.geometry.type){
		case "point":
			centerPoint = graphic.geometry;
			break;
		case "extent":
			centerPoint = graphic.getCenter();
			break;
		default:
			centerPoint = graphic.geometry.getExtent().getCenter();
	}
	
	return centerPoint;
}

// 집수구역별 해당 범위의 색상 가져오기
getCatRangeColor = function(range){
	
	var color = "";
	
    /*switch(range){
    
        case 0:
        	color = "#f5cb00";
        	break;
        case 1:
        	color = "#f67682";
        	break;
        case 2:
        	color = "#f75e64";
        	break;
        case 3:
        	color = "#f72d3f";
        	break;
        case 4:
        	color = "#F70019";
        	break;
    }*/
	
	switch(range){
    
	    case 0:
	    	color = "#FFFFCC";
	    	break;
	    case 1:
	    	color = "#FFEDA0";
	    	break;
	    case 2:
	    	color = "#FED976";
	    	break;
	    case 3:
	    	color = "#FED24C";
	    	break;
	    case 4:
	    	color = "#FD8D3C";
	    	break;
	    case 5:
	    	color = "#FC4E2A";
	    	break;
	    case 6:
	    	color = "#E31A1C";
	    	break;
	    case 7:
	    	color = "#B10026";
	    	break;
	}
    
    return color;
}

getCatRangeBarSrc = function(range){
	
	var src = "";
	
	switch(range){
    
	    case 0:
	    	src = "./resources/images/tmSymbols/barSymbol_1.gif";
	    	break;
	    case 1:
	    	src = "./resources/images/tmSymbols/barSymbol_2.gif";
	    	break;
	    case 2:
	    	src = "./resources/images/tmSymbols/barSymbol_3.gif";
	    	break;
	    case 3:
	    	src = "./resources/images/tmSymbols/barSymbol_4.gif";
	    	break;
	    case 4:
	    	src = "./resources/images/tmSymbols/barSymbol_5.gif";
	    	break;
	    case 5:
	    	src = "./resources/images/tmSymbols/barSymbol_6.gif";
	    	break;
	    case 6:
	    	src = "./resources/images/tmSymbols/barSymbol_7.gif";
	    	break;
	    case 7:
	    	src = "./resources/images/tmSymbols/barSymbol_8.gif";
	    	break;
	}
	
	return src;
}

// 집수구역별 해당 범위의 색상 가져오기
getCatRangeRadius = function(range){
	
	var radius = 0;
	
    switch(range){
    
        case 0:
        	radius = 500;
        	break;
        case 1:
        	radius = 1000;
        	break;
        case 2:
        	radius = 1500;
        	break;
        case 3:
        	radius = 2000;
        	break;
        case 4:
        	radius = 3000;
        	break;
    }
    
    var coreMap = GetCoreMap();
	var mapLevel = coreMap.map.getLevel();
	//console.info(mapLevel);
	
	/*if(mapLevel <= 12){
		
		radius = radius / 2;
	}*/
    
    return radius / 2;
}

tmCatPolygonOnOff = function(){
	
	var coreMap = GetCoreMap();
	
	if(coreMap.tmLayerAdmin.tmGraphicLayerCat.visible == true){
		
		coreMap.tmLayerAdmin.tmGraphicLayerCat.setVisibility(false);
	}
	else{
		
		coreMap.tmLayerAdmin.tmGraphicLayerCat.setVisibility(true);
	}
}

tmCatSymbolOnOff = function(){
	
	var coreMap = GetCoreMap();
	
	if(coreMap.tmLayerAdmin.circleGraphicLayer.visible == true){
		
		coreMap.tmLayerAdmin.circleGraphicLayer.setVisibility(false);
		coreMap.tmLayerAdmin.barImgGraphicLayer.setVisibility(false);
	}
	else if(coreMap.tmLayerAdmin.barImgGraphicLayer.visible == true){
		
		coreMap.tmLayerAdmin.circleGraphicLayer.setVisibility(true);
		coreMap.tmLayerAdmin.barImgGraphicLayer.setVisibility(false);
	}
	else{
		
		coreMap.tmLayerAdmin.circleGraphicLayer.setVisibility(false);
		coreMap.tmLayerAdmin.barImgGraphicLayer.setVisibility(true);
	}
}

tmCatLabelOnOff = function(){
	
	var coreMap = GetCoreMap();
	
	if(coreMap.tmLayerAdmin.tmLabelLayerCat.visible == true){
		
		coreMap.tmLayerAdmin.tmLabelLayerCat.setVisibility(false);
	}
	else{
		
		coreMap.tmLayerAdmin.tmLabelLayerCat.setVisibility(true);
	}
}

tmCatLayerClear = function(){
	
	var coreMap = GetCoreMap();
	
	if(coreMap.tmLayerAdmin != undefined && coreMap.tmLayerAdmin.tmGraphicLayerCat != undefined){
		
		coreMap.tmLayerAdmin.tmGraphicLayerCat.clear();
		coreMap.tmLayerAdmin.barImgGraphicLayer.clear();
		coreMap.tmLayerAdmin.circleGraphicLayer.clear();
		coreMap.tmLayerAdmin.tmLabelLayerCat.clear();
	}
}