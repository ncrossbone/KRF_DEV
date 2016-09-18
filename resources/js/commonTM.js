/*
 * 주제도 표출 관련 공통 클래스 */
// 단계(range)별 Feature셋팅 Obj
var tmQuantize = {
	// Object 초기화
	setInitObj: function(){
		
		this.isOnlyOne = false;
		this.totRange = undefined;
		this.quantizeObj = []
	},
	// 각 단계(range)당 Feature 한개씩 셋팅
	setOnlyOneFeature: function(features, attrName){
		
		// Object 초기화
		this.setInitObj();
		
		features.sort(function(a, b){
			
			return eval("a.attributes." + attrName) - eval("b.attributes." + attrName);
		});
		
		if(features.length <= 15){
			
			var quanCnt = -1;
			var arrQuantize = [];
			var preVal = undefined;
			
			for(var i = 0; i < features.length; i++){
				
				var feature = features[i];
				
				var stVal = edVal = Math.round(eval("feature.attributes." + attrName));
				
				if(preVal != stVal){
					
					quanCnt += 1;
					
					var curRange = quanCnt;
					
					var obj = {stVal: stVal, edVal: edVal, range: curRange};
					
					arrQuantize.push(obj);
					//console.info(quanCnt);
					//console.info(arrQuantize[quanCnt]);
					if(arrQuantize[quanCnt].features == undefined){
						
						arrQuantize[quanCnt].features = [];
					}
					
					preVal = stVal;
				}
				
				arrQuantize[quanCnt].features.push(feature);
			}
			
			for(var quanCnt = 0; quanCnt < arrQuantize.length; quanCnt++){
				
				this.quantizeObj.push(arrQuantize[quanCnt]);
			}
			
			this.totRange = arrQuantize.length;
			this.isOnlyOne = true;
			
			//console.info(this.quantizeObj);
		}
	},
	// Minimum, Maximum 셋팅 (featureSet, attrName:값 속성명, [isReCall: 재귀호출 여부])
	setScale: function(featureSet, attrName, isReCall){
		//console.info(isReCall);
		// 재귀 호출 아닐때
		if(isReCall != true){
			
			// Object 초기화
			this.setInitObj();
		}
		
		var features = featureSet.features;
		
		if(features.length <= 15){
			
			this.setOnlyOneFeature(features, attrName);
		}
		
		var minVal = undefined;
		var maxVal = undefined;

		if(this.isOnlyOne == false){
			
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
		}
		
		// 단계 나누기
		this.setQuantize = function(range){
			
			if(this.isOnlyOne == false){
				
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
			}
				
				// 각 단계에 Feature 셋팅
			this.setFeature = function(){
				
				if(this.isOnlyOne == false){
					
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
									
									// 재귀 호출 단계 재분배
									this.setScale(arrQuantize[reCnt], attrName, true).setQuantize(2).setFeature();
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
				}
				
				return this;
			}
			
			return this;
		}
		
		return this;
	},
	isOnlyOne: false,
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

catTMLayerOnOff = function(onOff){
	
	var pollMapSetValue = Ext.getCmp("pollMapSetValue");
	if(pollMapSetValue == undefined){
		pollMapSetValue =  Ext.create("KRF_DEV.view.east.PollMapSetValue", {
			x: Ext.getBody().getWidth() - 300
		});
	}
	
	var catTMOnOff = $("#catTMOnOff");
	var corMap = GetCoreMap();
	var imgSrc = catTMOnOff[0].src;
	
	if(imgSrc.indexOf("_on.") > -1 || onOff == "off"){
		
		// 집수구역 버튼 Off
		var currCtl = SetBtnOnOff("btnAreaLayer", "on");
		corMap.reachLayerAdmin_v3_New.areaGrpLayer.setVisibility(true);
		
		catTMOnOff[0].src = imgSrc.replace("_on.", "_off.");
		
		// 주제도 레이어 클리어
		tmCatLayerClear();
		//console.info(this.tmGraphicLayerCat.id);
		pollMapSetValue.hide();
		
	}
	else if(imgSrc.indexOf("_off.") > -1 || onOff == "on"){
		
		// 집수구역 버튼 Off
		var currCtl = SetBtnOnOff("btnAreaLayer", "off");
		corMap.reachLayerAdmin_v3_New.areaGrpLayer.setVisibility(false);
		
		catTMOnOff[0].src = imgSrc.replace("_off.", "_on.");
		
		// 주제도 레이어 클리어
		tmCatLayerClear();
		// 주제도 레이어 보이기
		showCatTMLayer();
		//PollLoadSearchResult("");
		pollMapSetValue.show();
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
		
		var legendWindow = Ext.getCmp("tmLegendWindow");
		if(legendWindow != undefined){
			legendWindow.close();
		}
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

//부하량 검색결과
PollLoadSearchResult = function(value){


		var rchMap = GetCoreMap();
		var tmpAreaGrp = rchMap.reachLayerAdmin_v3_New.arrAreaGrp;
		
		var catDid = [];
		
		if(tmpAreaGrp != null){
			for(i = 0; i < tmpAreaGrp.length;i++){
				catDid.push(tmpAreaGrp[i].attributes.CAT_DID);
			}
		}
		
		if(catDid.length == 0){
			return;
		}
		
		
		
	
		if(value == ""){
			value = "11";
		}
	
		var options = {
				id: 'searchResultTab',
				//title: '결과탭1',
				header: false
		};
		var searchResultTab = GetTabControl(options);
		var tab = searchResultTab.items.items[1];
		//2016-08-24 리치검색시 방유량 그리드 생성
		var pollOptions = {
				//id: "searchResultContainer",
				id: "searchResultPollLoad_container",
				title: '부하량',
				autoResize: true
		};
		
		//console.info(pollgrdContainer);
		
		var pollgrdContainer = undefined; //재검색 초기화
		pollgrdContainer = Ext.getCmp("searchResultPollLoad_container");
		
		
		if(pollgrdContainer == null || pollgrdContainer == undefined){
			pollgrdContainer = Ext.create("KRF_DEV.view.south.SearchResultGrid_PollLoad_Result", pollOptions);
			tab.insert(1, pollgrdContainer);
		}
		tab.setActiveTab("searchResultPollLoad_container");
		
		
		var pollgrdCtl = pollgrdContainer.items.items[0]; // 그리드 컨테이너
		pollgrdCtl = pollgrdCtl.items.items[0]; // 그리드 컨트롤
		
		var pollstore = Ext.create("KRF_DEV.store.south.SearchPollLoadResultGrid",{
			selectValue: value,
			catDid: catDid
		});
		
		
		
		pollgrdCtl.setStore(pollstore);
		
		//hidden 처리
		if(value == "11" ){
			pollgrdCtl.columns[3].setHidden(true);
			pollgrdCtl.columns[4].setHidden(true);
			pollgrdCtl.columns[5].setHidden(true);
			pollgrdCtl.columns[6].setHidden(true);
		}else if(value == "22"){
			pollgrdCtl.columns[3].setHidden(true);
			pollgrdCtl.columns[4].setHidden(true);
			pollgrdCtl.columns[5].setHidden(true);
			pollgrdCtl.columns[6].setHidden(false);
		}else if(value == "33"){
			pollgrdCtl.columns[3].setHidden(false);
			pollgrdCtl.columns[4].setHidden(true);
			pollgrdCtl.columns[5].setHidden(true);
			pollgrdCtl.columns[6].setHidden(false);
		}else{
			pollgrdCtl.columns[3].setHidden(false);
			pollgrdCtl.columns[4].setHidden(false);
			pollgrdCtl.columns[5].setHidden(false);
			pollgrdCtl.columns[6].setHidden(false);
		}
		
	
}