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
	
	/*this.test1 = "dd";
	
	var quantize = function(val){
		
		return val;
	}*/
	
	return quantize;
}

var fTest = {
	scale: {
		quantize: function(){
			
			var quantizeObj = {
				domain: function(stVal, edVal){
					
					var domainObj = {
						range: function(rangeCnt){
							
							var me = this;
							
							me.arrQuantize = [];
							var diffVal = (edVal - stVal) / rangeCnt;
							
							for(var i = 0; i < rangeCnt; i++){
								
								var minVal = 0;
								
								if(i == 0){
									
									minVal = Math.floor(stVal); // 내림
								}
								else{
									
									minVal = me.arrQuantize[i - 1].maxVal + 1;
								}
									
								var maxVal = stVal + (diffVal * (i + 1));
								maxVal = Math.ceil(maxVal); // 올림
								
								var quantizeObj = {minVal: minVal, maxVal: maxVal};
								
								me.arrQuantize.push(quantizeObj);
							}
							
							this.valueRange = function(value){
								
								var retVal = -1;
								
								for(var i = 0; i < me.arrQuantize.length; i++){
									
									if(value <= me.arrQuantize[i]){
										
										if(retVal == -1){
											
											retVal = i;
										}
									}
								}
								
								return retVal;
							}
							
							me.rangeCnt = function(){
								
								return rangeCnt;
							}
							
							me.invertExtent = function(range){
								
								var arrRetVal = [];
								
								if(range > arrQuantize.length - 1){
									
									console.error("range가 범위를 벗어났습니다.");
									return null;
								}
								
								var stExt = null;
								var edExt = null;
								
								if(range == 0){
									stExt = stVal;
								}
								else{
									stExt = arrQuantize[range - 1];
								}
								
								edExt = arrQuantize[range];
								
								arrRetVal.push(arrQuantize[range - 1]);
								arrRetVal.push(arrQuantize[range]);
								
								return range;
							}
								
							return me;
						}
					}
					
					return domainObj;
				}
			}
			
			return quantizeObj;
		}
	}
}

getQuantizeObj = function(minVal, maxVal, range){
	
	var quantizeObj = fTest.scale.quantize().domain(minVal, maxVal).range(range);
	/*console.info(test1.valueRange(12.99999999999));
	console.info(test1.valueRange(100));
	console.info(test1.rangeCnt());
	console.info(test1.arrQuantize);*/
	
	return quantizeObj;
}

var tmQuantize = {
	setOnlyOneFeature: function(features, attrName){
		
		features.sort(function(a, b){
			
			return eval("b.attributes." + attrName) - eval("a.attributes." + attrName);
		});
		
		if(features.length <= 15){
			
			for(var i = 0; i < features.length; i++){
				
				//console.info(eval("features[i].attributes." + attrName));
			}
		}
	},
	setScale: function(featureSet, attrName){
		
		var features = featureSet.features;
		
		if(features.length <= 15){
			
			this.setOnlyOneFeature(features, attrName);
		}
		
		var minVal = undefined;
		var maxVal = undefined;
		
		/*if(featureSet.stVal != undefined){
			
			minVal = featureSet.stVal;
		}
		
		if(featureSet.edVal != undefined){
			
			maxVal = featureSet.edVal;
		}*/
		
		if(features != undefined){
			
			for(var i = 0; i < features.length; i++){
				
				var feature = features[i];
				var quantizeVal = eval("feature.attributes." + attrName);
				
				// Min Value 셋팅
				if(minVal == undefined || quantizeVal < minVal){
					minVal = quantizeVal;
				}
				
				// Max Value 셋팅
				if(maxVal == undefined || quantizeVal > maxVal){
					maxVal = quantizeVal;
				}
			}
		}
		
		this.setQuantize = function(range){
			
			if(this.totRange == undefined){
				
				this.totRange = range;
			}
			
			var arrQuantize = [];
			
			var diffVal = (maxVal - minVal) / range;
			
			for(var i = 0; i < range; i++){
				
				var stVal = 0;
				var edVal = 0;
				var curRange = i;
				
				if(featureSet.range != undefined){
					
					curRange = featureSet.range + "-" + i;
				}
				
				if(i == 0){
					
					stVal = minVal;
				}
				else{
					
					stVal = arrQuantize[i - 1].edVal;
				}
				
				if(i == range - 1){
					edVal = maxVal;
				}
				else{
					edVal = stVal + diffVal;
				}
				
				stVal = Math.round(stVal);
				edVal = Math.round(edVal);
				
				var obj = {stVal: stVal, edVal: edVal, range: curRange};
				
				arrQuantize.push(obj);
			}
			
			this.setFeature = function(){
				
				for(var quanCnt = 0; quanCnt < arrQuantize.length; quanCnt++){
					
					if(arrQuantize[quanCnt].features == undefined){
						
						arrQuantize[quanCnt].features = [];
					}
					
					var qStVal = arrQuantize[quanCnt].stVal;
					var qEdVal = arrQuantize[quanCnt].edVal;
					
					for(var featureCnt = 0; featureCnt < features.length; featureCnt++){
					
						var feature = features[featureCnt];
			    		var quantizeVal = Math.round(eval("feature.attributes." + attrName));
						
						if(quantizeVal >= qStVal && quantizeVal <= qEdVal){
							
							arrQuantize[quanCnt].features.push(feature);
						}
					}
				}
				
				arrQuantize.sort(function(a, b){
					
					// return a.features.length - b.features.length; // ASC
					return b.features.length - a.features.length; // DESC
				});

				if(this.quantizeObj.length < this.totRange){
					
					var zeroCnt = 0;
					
					for(var reCnt = 0; reCnt < arrQuantize.length; reCnt++){
						
						if(arrQuantize[reCnt].features.length > 0){
							
							var subRange = arrQuantize[reCnt].range;
							
							if(subRange.length > 2){
								subRange = subRange.substring(0, subRange.length - 2);
							}
							
							for(var objCnt = 0; objCnt < this.quantizeObj.length; objCnt++){
								
								if(this.quantizeObj[objCnt].range == subRange){
									console.info(subRange);
									this.quantizeObj.splice(objCnt, 1);	
								}
							}
							
							/*arrQuantize[reCnt].features.sort(function(a, b){
								
								return eval("a.attributes." + attrName); - eval("b.attributes." + attrName); // ASC
							});
							
							var tmpFeatures = arrQuantize[reCnt].features;
							arrQuantize[reCnt].stVal = eval("tmpFeatures[0].attributes." + attrName);
							arrQuantize[reCnt].edVal = eval("tmpFeatures[tmpFeatures.length - 1].attributes." + attrName);*/
							
							this.quantizeObj.push(arrQuantize[reCnt]);
						}
						else{
							
							zeroCnt++;
						}
					}
					
					for(var reCnt = 0; reCnt < arrQuantize.length; reCnt++){
						
						if(arrQuantize[reCnt].features.length > 1){
							
							if(zeroCnt > 0){
								
								this.setScale(arrQuantize[reCnt], attrName).setQuantize(2).setFeature();
							}
						}
					}
				}
				
				this.quantizeObj.sort(function(a, b){
					
					return a.stVal - b.stVal; // ASC
				});
				
				for(var i = 0; i < this.quantizeObj.length; i++){
					
					this.quantizeObj[i].range = i;
				}
				
				return this;
			}
			
			return this;
		}
		
		return this;
	},
	totRange: undefined,
	quantizeObj: []
}

getQuantizeObj = function(featureSet, attrName, range){
	
	/*var minMaxObj = getMinMaxVal(features, attrName);
	var quantizeObj = getQuantizeObj(minMaxObj.minVal, minMaxObj.maxVal, range);
	var arrQuantize = sortQuantize(features, attrName, quantizeObj.arrQuantize);*/
	
	var quantize = tmQuantize.setScale(featureSet, attrName).setQuantize(range).setFeature();
	//console.info(quantize.quantizeObj);
	//console.info(quantize.quantizeObj.splice(1, 1));
	
	return quantize.quantizeObj;
}

catTMLayerOnOff = function(){
	
	var catTMOnOff = $("#catTMOnOff");
	
	if(catTMOnOff[0].src.indexOf("_on.") > 0){
		
		catTMOnOff[0].src = catTMOnOff[0].src.replace("_on.", "_off.");
		// 주제도 레이어 클리어
		tmCatLayerClear();
	}
	else{
		
		catTMOnOff[0].src = catTMOnOff[0].src.replace("_off.", "_on.");
		// 주제도 레이어 보이기
		showCatTMLayer();
	}
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
	
	//console.info(coreMap.tmLayerAdmin);
	//console.info(coreMap.tmLayerAdmin.tmGraphicLayerCat);
	
	if(coreMap.tmLayerAdmin == undefined || coreMap.tmLayerAdmin == null){
		
		coreMap.tmLayerAdmin = Ext.create("KRF_DEV.view.map.TMLayerAdmin");
	}
	
	// 집수구역별 주제도 레이어 그리기 함수 호출
	coreMap.tmLayerAdmin.drawTMCatLayer(inStrCatDids);
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
	}*/
	
	switch(range){
    
    case 0:
    	color = "#FFFFCC";
    	break;
    case 1:
    	color = "#FFF4B4";
    	break;
    case 2:
    	color = "#FFEDA0";
    	break;
    case 3:
    	color = "#FFE282";
    	break;
    case 4:
    	color = "#FED976";
    	break;
    case 5:
    	color = "#FED24C";
    	break;
    case 6:
    	color = "#FEBE5A";
    	break;
    case 7:
    	color = "#FEA043";
    	break;
    case 8:
    	color = "#FD8D3C";
    	break;
    case 9:
    	color = "#FD6E32";
    	break;
    case 10:
    	color = "#FC4E2A";
    	break;
    case 11:
    	color = "#F0322D";
    	break;
    case 12:
    	color = "#E31A1C";
    	break;
    case 13:
    	color = "#C80D32";
    	break;
    case 14:
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

// 집수구역별 해당 범위의 원 반지름 가져오기
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
		
		coreMap.tmLayerAdmin.tmGraphicLayerCat.setVisibility(false);
		coreMap.tmLayerAdmin.tmGraphicLayerCat.clear();
		
		// 클리어시 setVisibility
		coreMap.tmLayerAdmin.barImgGraphicLayer.setVisibility(false);
		coreMap.tmLayerAdmin.barImgGraphicLayer.clear();
		
		coreMap.tmLayerAdmin.circleGraphicLayer.setVisibility(false);
		coreMap.tmLayerAdmin.circleGraphicLayer.clear();
		
		coreMap.tmLayerAdmin.tmLabelLayerCat.setVisibility(false);
		coreMap.tmLayerAdmin.tmLabelLayerCat.clear();
		
		// 집수구역 레이어 버튼 강제 클릭
    	$("#btnAreaLayer").click();
    	Ext.getCmp("tmLegendWindow").close();
	}
}

paddingLeft = function(padString, length, value){
	
	var retVal = "";
	
	for(var i = value.length; i < length; i++){
		
		retVal += padString;
	}
	
	retVal += value;
	
	return retVal;
}