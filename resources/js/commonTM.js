/*
 * 주제도 표출 관련 공통 클래스 */

// khLee test
var tmQuantizeTest = {
	quantizeObj: {
		tmpFeatureSet: [],	// 임시 피처셋 배열
		rstFeatureSet: [],	// 최종 결과 피처셋 배열
		originFeatures: [],	// 최초 피처 배열
		maxVal: null,		// 해당 attribute 최대값
		minVal: null,		// 해당 attribute 최소값
		gapVal: null,		// 해당 attribute 단계 사이의 값 차이
		recursiveCnt: 1		// 재귀 호출 카운트
	},
	initQuantizeObj: function(){
		
		this.quantizeObj.tmpFeatureSet = [];
		this.quantizeObj.rstFeatureSet = [];
		this.quantizeObj.recursiveCnt = 1;
	},
	getSortArray: function(arrObj, attrName, description){
		
		arrObj.sort(function(a, b){
			
			if(description == "DESC"){
				return eval("b.attributes." + attrName) - eval("a.attributes." + attrName);
			}
			else{
				return eval("a.attributes." + attrName) - eval("b.attributes." + attrName);
			}
		});
		
		return arrObj;
	},
	// 각 단계(range)당 Feature 한개씩 셋팅
	setOnlyOneFeature: function(features, attrName, doubleCnt){
		
		// Object 초기화
		this.initQuantizeObj();
		
		features = this.getSortArray(features, attrName, "DESC");
			
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
				
				feature.attributes.stVal = stVal;
				feature.attributes.edVal = edVal;
				feature.attributes.color = getCatRangeColor(curRange * doubleCnt);
				feature.attributes.range = curRange;
				
				preVal = stVal;
			}
			
			arrQuantize[quanCnt].features.push(feature);
		}
		
		for(var quanCnt = 0; quanCnt < arrQuantize.length; quanCnt++){
			
			this.quantizeObj.rstFeatureSet.push(arrQuantize[quanCnt]);
		}
		
		//console.info(this.quantizeObj.rstFeatureSet);
	},
	setOneMoreFeature: function(featureSet, attrName, oneMoreCnt, recursiveCnt){
		
		// Object 초기화
		this.initQuantizeObj();
		
		var range = 0;
		var doubleCnt = 0;
		
		if(oneMoreCnt <= 4){
			
			doubleCnt = 2;
		}
		else{
			
			if(oneMoreCnt <= 8){
				
				doubleCnt = 1;
			}
		}
		
		if(oneMoreCnt <= 8){
			
			for(var i = 0; i < featureSet.length; i++){
				
				var fSetCnt = featureSet[i].features.length;
				
				if(fSetCnt > 0){
					
					for(var fCnt = 0; fCnt < featureSet[i].features.length; fCnt++){
						
						var feature = featureSet[i].features[fCnt];
						
						feature.attributes.stVal = featureSet[i].minVal;
						feature.attributes.edVal = featureSet[i].maxVal;
						feature.attributes.color = getCatRangeColor(range * doubleCnt);
						feature.attributes.range = range;
						featureSet[i].range = range;
					}
					
					this.quantizeObj.rstFeatureSet.push(featureSet[i]);
					range++;
				}
			}
		}
		else{
			//console.info(recursiveCnt);
			var restCnt = oneMoreCnt % 8; // 나머지
			var quotientCnt = this.Floor(oneMoreCnt / 8, 0); // 몫
			console.info(oneMoreCnt);
			console.info(restCnt);
			console.info(quotientCnt);
			var plusCnt1 = 0;
			
			/*for(var i = 0; i < featureSet.length; i += plusCnt1){
				
				var fSetCnt = featureSet[i].features.length;
				
				if(fSetCnt > 0){
					
					plusCnt1 
					if(plusCnt1 < restCnt){
						
						
					}
					
					plusCnt1++;
				}
			}*/
		}
		
		console.info(this.quantizeObj.rstFeatureSet);
	},
	setScale: function(featureSet, attrName){
		
		this.setRange = function(originRange){
			
			var range = originRange * this.quantizeObj.recursiveCnt; // 재귀 카운트 만큼 곱하기..
			//console.info(range);
			
			// 소수점 자릿수 설정 (digit: 자릿수, roundUpDown: 반올림[round] 올림[up] 내림[down])
			this.setPointCipher = function(digit, roundUpDown){
				
				// 최초 한번만 설정
				//if(this.quantizeObj.originFeatures.length == 0){
					
					// 피처 정렬
					var originFeatures = this.getSortArray(featureSet.features, attrName, "DESC");
					// 최초 Feature 셋팅
					this.quantizeObj.originFeatures = originFeatures;
					this.quantizeObj.tmpFeatureSet = [];
					
					// Max Value
					this.quantizeObj.maxVal = eval("originFeatures[0].attributes." + attrName);
					this.quantizeObj.maxVal = this.getRoundUpDown(digit, roundUpDown, this.quantizeObj.maxVal);
					
					// Min Value
					this.quantizeObj.minVal = eval("originFeatures[originFeatures.length - 1].attributes." + attrName);
					this.quantizeObj.minVal = this.getRoundUpDown(digit, roundUpDown, this.quantizeObj.minVal);
					
					// 단계 값 차이
					this.quantizeObj.gapVal = (this.quantizeObj.maxVal - this.quantizeObj.minVal) / range;
					this.quantizeObj.gapVal = this.getRoundUpDown(digit, roundUpDown, this.quantizeObj.gapVal);
					
					var minPlus = 1;
					
					for(var i = 0; i < digit; i++){
						
						minPlus = minPlus / 10;
					}
					
					for(var i = 0; i < range; i++){
						
						// 각 단계 Max Value
						var maxVal = this.quantizeObj.maxVal - (this.quantizeObj.gapVal * i);
						maxVal = this.getRoundUpDown(digit, roundUpDown, maxVal);
						
						// 각 단계 Min Value
						var minVal = maxVal - this.quantizeObj.gapVal + Number(minPlus);
						minVal = this.getRoundUpDown(digit, roundUpDown, minVal);
						if(i == range - 1){
							minVal = "0";
						}
						
						var featureSetObj = {range: i, maxVal: maxVal, minVal: minVal, features: []};
						
						// 피처셋 배열 추가
						this.quantizeObj.tmpFeatureSet.push(featureSetObj);
					}
				//}
				
				this.setFeatures = function(featureSet){
					
					// 피처 정렬
					var features = this.getSortArray(featureSet.features, attrName, "DESC");
					//console.info(features);
					for(var fCnt = 0; fCnt < this.quantizeObj.tmpFeatureSet.length; fCnt++){
						
						for(var oCnt = 0; oCnt < features.length; oCnt++){
							
							var attrValue = eval("features[oCnt].attributes." + attrName);
							// 소수점 적용
							attrValue = this.getRoundUpDown(digit, roundUpDown, attrValue);
							// 소수점 적용 재입력
							eval("features[oCnt].attributes." + attrName + " = " + attrValue);
							
							var featureSetF = this.quantizeObj.tmpFeatureSet[fCnt];

							if(Number(attrValue) >= Number(featureSetF.minVal) && Number(attrValue) <= Number(featureSetF.maxVal)){
								//console.info(attrValue);
								this.quantizeObj.tmpFeatureSet[fCnt].features.push(features[oCnt]);
							}
						}
					}
					
					//console.info(this.quantizeObj.featureSet);
					
					var zeroCnt = 0;
					var oneMoreCnt = 0;
					
					for(var fCnt = 0; fCnt < this.quantizeObj.tmpFeatureSet.length; fCnt++){
						
						if(this.quantizeObj.tmpFeatureSet[fCnt].features.length == 0){
							
							zeroCnt++;
						}
						else{
							
							oneMoreCnt++;
						}
					}
					
					//console.info(zeroCnt);
					//console.info(oneMoreCnt);
					
					var minRange = Math.round(originRange / 2);
					var totFCnt = this.quantizeObj.originFeatures.length;
					
					if(oneMoreCnt < minRange && totFCnt > minRange && this.quantizeObj.recursiveCnt < 5){
						
						this.quantizeObj.recursiveCnt++; // 재귀 카운트 증가
						
						this.setScale(featureSet, attrName).setRange(originRange)
						.setPointCipher(digit, roundUpDown).setFeatures(featureSet);
					}
					else{
						
						if(totFCnt <= minRange){
							
							this.setOnlyOneFeature(this.quantizeObj.originFeatures, attrName, 2);
						}
						else{
							
							if(totFCnt > minRange && totFCnt <= originRange){
								
								this.setOnlyOneFeature(this.quantizeObj.originFeatures, attrName, 1);
							}
							else{
								
								this.setOneMoreFeature(this.quantizeObj.tmpFeatureSet, attrName, oneMoreCnt, this.quantizeObj.recursiveCnt);
								//alert(totCnt);
							}
						}
					}
					
					return this;
				}
				
				return this;
			}
			
			return this;
		}
		
		return this;
	},
	getRoundUpDown: function(digit, roundUpDown, value){
		
		var roundFnName = "Round";
		if(roundUpDown == "up"){
			roundFnName = "Ceiling";
		}
		if(roundUpDown == "down"){
			roundFnName = "Floor";
		}
		return eval("this." + roundFnName + "(" + value + ", " + digit + ")");
	},
	// 지정자리 반올림 (값, 자릿수)
	Round: function(n, pos) {
		var digits = Math.pow(10, pos);

		var sign = 1;
		if (n < 0) {
			sign = -1;
		}

		// 음수이면 양수처리후 반올림 한 후 다시 음수처리
		n = n * sign;
		var num = Math.round(n * digits) / digits;
		num = num * sign;

		return num.toFixed(pos);
	},
	// 지정자리 버림 (값, 자릿수)
	Floor: function(n, pos) {
		var digits = Math.pow(10, pos);

		var num = Math.floor(n * digits) / digits;

		return num.toFixed(pos);
	},
	// 지정자리 올림 (값, 자릿수)
	Ceiling: function(n, pos) {
		var digits = Math.pow(10, pos);

		var num = Math.ceil(n * digits) / digits;

		return num.toFixed(pos);
	}
}

var percentile = {
	rstFeatureSet: [],
	quantile: function(array, percentile){
			
		array.sort(function(a, b){
			
			return a - b;
		});
		
		var index = percentile / 100 * (array.length - 1);
		
		if(Math.floor(index) == index){
			
			result = array[index];
		}
		else{
			
			var i = Math.floor(index);
			var fraction = index - i;
			result = array[i] + (array[i+1] - array[i]) * fraction;
		}
		
		return result;
	},
	getPercentileObj: function(arrFeatures, attrPath, range, pos){
		
		var me = this;
		me.rstFeatureSet = [];
		
		var arrPercentiles = [];
		var arrValues = [];
		
		var perRange = me.Round(100 / range, 1);
		
		for(var i = 0; i < range; i++){
			
			//console.info(Math.round((i + 1) * perRange));
			var percentile = Math.round((i + 1) * perRange);
			
			if(i == range - 1){
				
				percentile = 100;
			}
			
			arrPercentiles.push(percentile);
		}
		
		for(var i = 0; i < arrFeatures.length; i++){
			
			var data = eval("arrFeatures[i].attributes." + attrPath);
			arrValues.push(data);
		}
		
		var minVal = "0";
		
		arrPercentiles.forEach(function(elem, index, array){
			
			var curMinVal = minVal;
			var curMaxVal = me.Ceiling(me.quantile(arrValues, elem), pos);
			var curRange = index;
			
			var features = [];
			
			for(var i = 0; i < arrFeatures.length; i++){
				
				var data = eval("arrFeatures[i].attributes." + attrPath);
				
				if(data >= curMinVal && data < curMaxVal){
					
					arrFeatures[i].attributes.stVal = curMinVal;
					arrFeatures[i].attributes.edVal = curMaxVal;
					arrFeatures[i].attributes.color = getCatRangeColor(curRange);
					arrFeatures[i].attributes.range = curRange;
					
					features.push(arrFeatures[i])
				}
			}
			
			minVal = curMaxVal;
			
			var fObj = {minVal: curMinVal, maxVal: curMaxVal, range: curRange, features: features};
			me.rstFeatureSet.push(fObj);
		});
		
		//console.info(me.rstFeatureSet);
		return this;
	},
	// 지정자리 반올림 (값, 자릿수)
	Round: function(n, pos) {
		var digits = Math.pow(10, pos);

		var sign = 1;
		if (n < 0) {
			sign = -1;
		}

		// 음수이면 양수처리후 반올림 한 후 다시 음수처리
		n = n * sign;
		var num = Math.round(n * digits) / digits;
		num = num * sign;

		return num.toFixed(pos);
	},
	// 지정자리 버림 (값, 자릿수)
	Floor: function(n, pos) {
		var digits = Math.pow(10, pos);

		var num = Math.floor(n * digits) / digits;

		return num.toFixed(pos);
	},
	// 지정자리 올림 (값, 자릿수)
	Ceiling: function(n, pos) {
		var digits = Math.pow(10, pos);

		var num = Math.ceil(n * digits) / digits;

		return num.toFixed(pos);
	}
}

getQuantizeObj = function(featureSet, attrName, range){
	
	var quantize = percentile.getPercentileObj(featureSet.features, attrName, range, 0);
	
	/*var quantize = tmQuantizeTest.setScale(featureSet, attrName).setRange(range)
	.setPointCipher(0, "round").setFeatures(featureSet);
	
	return quantize.quantizeObj.rstFeatureSet;*/
	return quantize.rstFeatureSet;
}

catTMLayerOnOff = function(onOff){
	
	var pollMapSetValue = Ext.getCmp("pollMapSetValue");
	if(pollMapSetValue == undefined){
		pollMapSetValue =  Ext.create("KRF_DEV.view.east.PollMapSetValue", {
			x: Ext.getBody().getWidth() - 261
		});
	}
	
	var cboTMYear = Ext.getCmp("setPollYear");
	var year = cboTMYear.value;
	var cboTMSelect = Ext.getCmp("setPollItems");
	var colName = cboTMSelect.value;
	
	var catTMOnOff = $("#catTMOnOff");
	var corMap = GetCoreMap();
	//console.info(catTMOnOff[0]);
	
	if(catTMOnOff[0] != undefined){
	
		var imgSrc = catTMOnOff[0].src;
		
		if((onOff == undefined && imgSrc.indexOf("_on.") > -1) || onOff == "off"){
			
			pollMapSetValue.hide();
			
			// 집수구역 버튼 Off
			var currCtl = SetBtnOnOff("btnAreaLayer", "on");
			corMap.reachLayerAdmin_v3_New.areaGrpLayer.setVisibility(true);
			
			catTMOnOff[0].src = imgSrc.replace("_on.", "_off.");
			
			// 주제도 레이어 클리어
			tmCatLayerClear();
			//console.info(this.tmGraphicLayerCat.id);
		}
		else if((onOff == undefined && imgSrc.indexOf("_off.") > -1) || onOff == "on"){
			
			pollMapSetValue.show();
			
			// 집수구역 버튼 Off
			var currCtl = SetBtnOnOff("btnAreaLayer", "off");
			corMap.reachLayerAdmin_v3_New.areaGrpLayer.setVisibility(false);
			
			catTMOnOff[0].src = imgSrc.replace("_off.", "_on.");
			
			// 주제도 레이어 클리어
			tmCatLayerClear();
			// 주제도 레이어 보이기
			showCatTMLayer(year, colName);
		}
	}
}

// 집수구역별 주제도 보여주기
showCatTMLayer = function(year, colName){
	
	var coreMap = GetCoreMap();
	
	var arrAreaGrp = coreMap.reachLayerAdmin_v3_New.arrAreaGrp;
	var inStrCatDids = "";
	
	for(var i = 0; i < arrAreaGrp.length; i++){
		
		inStrCatDids += "'" + arrAreaGrp[i].attributes.CAT_DID + "', ";
	}
	
	if(inStrCatDids.length > 0){
		
		inStrCatDids = inStrCatDids.substring(0, inStrCatDids.length -2);
	}
	
	if(coreMap.tmLayerAdmin == undefined || coreMap.tmLayerAdmin == null){
		
		coreMap.tmLayerAdmin = Ext.create("KRF_DEV.view.map.TMLayerAdmin");
	}
	
	// 집수구역별 주제도 레이어 그리기 함수 호출
	coreMap.tmLayerAdmin.drawTMCatLayer(inStrCatDids, year, colName);
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