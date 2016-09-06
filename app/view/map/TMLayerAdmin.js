Ext.define("KRF_DEV.view.map.TMLayerAdmin", {
	
	tmGraphicLayerCat: null,
	tmLabelLayerCat: null,
	
	initOpacity: "0.4", // 기본 투명도
	mouseOverOpacity: "0.8", // 마우스 오버시 투명도
	
	constructor: function() {
		
		
    },
    
    // 집수구역별 부하량 주제도 그리기
    drawTMCatLayer: function(inStrCatDids){
    	
    	var me = this;
    	var coreMap = GetCoreMap();
        
        /* Definition FeatureLayer 생성 */
		/*coreMap.tmLayerCat = new esri.layers.FeatureLayer("http://112.217.167.123:20002/arcgis/rest/services/reach_V3_TM/MapServer/2", {
        	outFields: ["*"]
        });
        
		coreMap.tmLayerCat.id = "DynamicLayerTMAdmin_test";
		coreMap.tmLayerCat.visible = true;
        
		coreMap.tmLayerCat.setDefinitionExpression("CAT_DID IN (" + inStrCatDids + ")");*/
        /* Definition FeatureLayer 생성 끝 */
        
        /* Definition DynamicLayer 생성 */
		/*coreMap.tmLayerCat = new esri.layers.ArcGISDynamicMapServiceLayer("http://112.217.167.123:20002/arcgis/rest/services/reach_V3_TM/MapServer", {
        	outFields: ["*"]
        });
        
		coreMap.tmLayerCat.setVisibleLayers([2]);
		var tmLayerCatDefs = [];
		tmLayerCatDefs[2] = "CAT_DID IN (" + inStrCatDids + ")";
		coreMap.tmLayerCat.setLayerDefinitions(tmLayerCatDefs);*/
        /* Definition DynamicLayer 생성 끝 */
		
		require([
		         "esri/tasks/QueryTask",
                 "esri/tasks/query",
                 "esri/layers/GraphicsLayer",
                 "esri/symbols/SimpleFillSymbol",
                 "esri/symbols/SimpleLineSymbol",
                 "esri/Color",
                 "esri/symbols/TextSymbol",
                 "esri/symbols/Font",
                 "esri/graphic",
                 "dojo/on",
                 "esri/symbols/SimpleMarkerSymbol",
                 "esri/geometry/Circle",
                 "esri/symbols/PictureMarkerSymbol",
                 "dojo/dom",
                 "dojo/dom-class"],
		        function(QueryTask,
                		 Query,
                		 GraphicsLayer,
                		 SimpleFillSymbol,
                		 SimpleLineSymbol,
                		 Color,
                		 TextSymbol,
                		 Font,
                		 Graphic,
                		 on,
                		 SimpleMarkerSymbol,
                		 Circle,
                		 PictureMarkerSymbol,
                		 dom,
                		 domClass){
			
			var queryTask = new QueryTask("http://112.217.167.123:20002/arcgis/rest/services/reach_V3_TM/MapServer/2");
			
			var query = new Query();
	        query.returnGeometry = true;
	        query.outFields = ["*"];
	        query.outSpatialReference = {
	          "wkid": 102100
	        };
	        query.where = "CAT_DID IN (" + inStrCatDids + ")";
	        
	        queryTask.execute(query, function(tmCatFeatureSet){
	        	
	        	//console.info(tmCatFeatureSet);
	        	
	        	if(me.tmGraphicLayerCat == undefined || me.tmGraphicLayerCat == null){
		        	// 폴리곤 레이어 생성
		        	me.tmGraphicLayerCat = new GraphicsLayer();
		        	me.tmGraphicLayerCat.id = "tmGraphicLayerCat";
	        	}
	        	
	        	me.tmGraphicLayerCat.setVisibility(true);
	        	
	        	if(me.circleGraphicLayer == undefined || me.circleGraphicLayer == null){
		        	// 원형 심볼 레이어
		        	me.circleGraphicLayer = new GraphicsLayer();
		        	me.circleGraphicLayer.id = "circleGraphicLayer";
	        	}
	        	
	        	me.circleGraphicLayer.setVisibility(true);
	        	
	        	if(me.barImgGraphicLayer == undefined || me.barImgGraphicLayer == null){
		        	// 막대 심볼 레이어
		        	me.barImgGraphicLayer = new GraphicsLayer();
		        	me.barImgGraphicLayer.id = "barImgGraphicLayer";
	        	}
	        	
	        	me.barImgGraphicLayer.setVisibility(true);
	        	
	        	if(me.tmLabelLayerCat == undefined || me.tmLabelLayerCat == null){
		        	// 라벨 레이어 생성
		        	me.tmLabelLayerCat = new GraphicsLayer();
		        	me.tmLabelLayerCat.id = "tmLabelLayerCat";
	        	}
	        	
	        	me.tmLabelLayerCat.setVisibility(true);
	        	
	        	// 폴리곤 그래픽 심볼 생성
        		var tmCatFillSymbol = new SimpleFillSymbol(
        				SimpleFillSymbol.STYLE_SOLID,
        				new SimpleLineSymbol(
        						SimpleFillSymbol.STYLE_SOLID,
        						new esri.Color([100, 255, 100]),
        						1
        				),
        				new Color([255, 0, 0, 1])
        		);
	        	
	        	var tmCatFeatures = tmCatFeatureSet.features;
	        	var minVal = 0;
	        	var maxVal = 0;
	        	var range = 8;
	        	
	        	for(var i = 0; i < tmCatFeatures.length; i++){
	        		
	        		var tmCatGraphic = tmCatFeatures[i];
	        		
	        		// 발생부하량 BOD 합계
	        		var gnrBodSu = tmCatGraphic.attributes.GNR_BOD_SU;
	        		
	        		// Max Value 셋팅
	        		if(gnrBodSu > maxVal || i == 0){
	        			maxVal = gnrBodSu;
	        		}
	        		
	        		// Min Value 셋팅
	        		if(gnrBodSu < minVal || i == 0){
	        			minVal = gnrBodSu;
	        		}
	        	}
	        	
	        	//console.info("min : " + minVal + ", max : " + maxVal + ", range : " + range);
	        	
	        	quantize = getQuantize(minVal, maxVal, range);
	        	
	        	for(var i = 0; i < tmCatFeatures.length; i++){
	        		
	        		// 폴리곤 그래픽 지정
	        		var tmCatGraphic = tmCatFeatures[i];
	        		// 폴리곤 심볼 지정
	        		tmCatGraphic.setSymbol(tmCatFillSymbol);
	        		// 폴리곤 그래픽 추가
	        		me.tmGraphicLayerCat.add(tmCatGraphic);
	        		
	        		/* 폴리곤 중심점 가져오기 */
	        		var centerPoint = getCenterFromGraphic(tmCatGraphic);
	        		
	        		// 발생부하량 BOD 합계
	        		var gnrBodSu = tmCatGraphic.attributes.GNR_BOD_SU;
	        		
	        		// 라벨 텍스트 설정
	        		var gnrBodSulabel = Math.round(Number(gnrBodSu)) + "kg/일";
	        		
	        		// 텍스트 라벨 생성
	        		var tmCatLabelSymbol = new esri.symbol.TextSymbol(gnrBodSulabel).setColor(
	        				new esri.Color([255,255,255])).setAlign(esri.symbol.Font.ALIGN_START).setAngle(0).setFont(
	        						new esri.symbol.Font("9pt", null, null, null, "굴림").setWeight(esri.symbol.Font.WEIGHT_BOLD)).setOffset(0, -20);
	        		// 라벨 그래픽 생성
	        		var tmCatLabelGraphic = new Graphic(centerPoint, tmCatLabelSymbol);
	        		// 집수구역 부하량 속성 데이터 카피
	        		tmCatLabelGraphic.attributes = tmCatGraphic.attributes;
	        		me.tmLabelLayerCat.add(tmCatLabelGraphic);
	        		
	        		var range = quantize(gnrBodSu);
	        		
	        		var circle = new Circle({
	        			center: centerPoint,
	        			radius: getCatRangeRadius(range)
	        		});
	        		
	        		// 원형 그래픽 생성
	        		var cirCleGraphic = new Graphic(circle, tmCatFillSymbol);
	        		// 집수구역 부하량 속성 데이터 카피
	        		cirCleGraphic.attributes = tmCatGraphic.attributes;
	        		me.circleGraphicLayer.add(cirCleGraphic);
	        		
	        		// 이미지 심볼 생성
	        		var barImgSymbol = new PictureMarkerSymbol(getCatRangeBarSrc(range), 25, 63).setOffset(0, 25);
	        		var barImgGraphic = new Graphic(centerPoint, barImgSymbol);
	        		// 집수구역 부하량 속성 데이터 카피
	        		barImgGraphic.attributes = tmCatGraphic.attributes;
	        		me.barImgGraphicLayer.add(barImgGraphic);
	        	}
	        	
	        	/* 폴리곤 그래픽 이벤트 */
	        	on(me.tmGraphicLayerCat, "graphic-draw", function(evt){
	        		
	        		//console.info(evt);
	        		var attrs = evt.graphic.attributes,
	        			GNR_BOD_SU = (attrs && attrs.GNR_BOD_SU) || undefined,
	        			range;
	        		
                    range = quantize(GNR_BOD_SU);
                    //console.info(range);
                    // 집수구역별 부하량 폴리곤 그래픽 스타일 셋팅
                    me.setAttributeInit(evt.node, "polySymbol_" + attrs.CAT_DID, getCatRangeColor(range));
                    
                    // 범례와 연계하기 위해 클래스 지정 (가상)
                    evt.node.setAttribute("class", "polySymbol_" + range);
	        	});
	        	
	        	on(me.tmGraphicLayerCat, "mouse-over", function(evt){
	        		
	        		var polySymbol = $("#polySymbol_" + evt.graphic.attributes.CAT_DID);
	        		polySymbol[0].setAttribute("opacity", me.mouseOverOpacity);
	        	});
	        	
	        	on(me.tmGraphicLayerCat, "mouse-out", function(evt){
	        		
	        		var polySymbol = $("#polySymbol_" + evt.graphic.attributes.CAT_DID);
	        		polySymbol[0].setAttribute("opacity", me.initOpacity);
	        	});
	        	/* 폴리곤 그래픽 이벤트 끝 */
	        	
	        	/* 이미지 그래픽 이벤트 */
	        	on(me.barImgGraphicLayer, "mouse-over", function(evt){
	        		
	        		var polySymbol = $("#polySymbol_" + evt.graphic.attributes.CAT_DID);
	        		polySymbol[0].setAttribute("opacity", me.mouseOverOpacity);
	        	});
	        	
	        	on(me.barImgGraphicLayer, "mouse-out", function(evt){
	        		
	        		var polySymbol = $("#polySymbol_" + evt.graphic.attributes.CAT_DID);
	        		polySymbol[0].setAttribute("opacity", me.initOpacity);
	        	});
	        	/* 이미지 그래픽 이벤트 끝 */
	        	
	        	/* 라벨 그래픽 이벤트 */
	        	on(me.tmLabelLayerCat, "mouse-over", function(evt){
	        		
	        		var polySymbol = $("#polySymbol_" + evt.graphic.attributes.CAT_DID);
	        		polySymbol[0].setAttribute("opacity", me.mouseOverOpacity);
	        	});
	        	
	        	on(me.tmLabelLayerCat, "mouse-out", function(evt){
	        		
	        		var polySymbol = $("#polySymbol_" + evt.graphic.attributes.CAT_DID);
	        		polySymbol[0].setAttribute("opacity", me.initOpacity);
	        	});
	        	/* 라벨 그래픽 이벤트 끝 */
	        	
	        	/* 원형 그래픽 이벤트 */
	        	on(me.circleGraphicLayer, "graphic-draw", function(evt){
	        		
	        		//console.info(evt);
	        		var attrs = evt.graphic.attributes,
	        			GNR_BOD_SU = (attrs && attrs.GNR_BOD_SU) || undefined,
	        			range;
	        		
                    range = quantize(GNR_BOD_SU);
                    
                    // 집수구역별 부하량 원형 그래픽 스타일 셋팅
                    me.setAttributeInit(evt.node, "polySymbol_" + attrs.CAT_DID, getCatRangeColor(range));
	        	});
	        	/* 원형 그래픽 이벤트 끝 */
	        	
	        	// 집수구역 부하량 폴리곤 레이어 추가
	        	coreMap.map.addLayer(me.tmGraphicLayerCat);
	        	
	        	// 집수구역 부하량 원형 레이어 추가 (사용안함)
	        	me.circleGraphicLayer.setVisibility(false);
	        	coreMap.map.addLayer(me.circleGraphicLayer);
	        	
	        	// 집수구역 부하량 이미지 레이어 추가
	        	coreMap.map.addLayer(me.barImgGraphicLayer);
	        	
	        	// 집수구역 부하량 라벨 레이어 추가
	        	coreMap.map.addLayer(me.tmLabelLayerCat);
	        	
	        	// 집수구역 레이어 버튼 강제 클릭
	        	$("#btnAreaLayer").click();
	        	
	        	/* 레전드 그리기 */
	        	me.createLegend();
	        });
		});
    },
    
    // 레전드 그리기
    createLegend: function(){
    	
    	var coreMap = GetCoreMap();
    	var me = this;
    	
    	// 레전드 윈도우 생성
    	var tmLegendWindow = Ext.create("KRF_DEV.view.map.TMLegendWindow");
    	// 레전드 윈도우 보이기
    	tmLegendWindow.show();
    	
    	require(["dojo/dom",
		         "dojo/_base/array",
		         "dojo/number"],
		        function(dom,
		        		 array,
		        		 number){
    		
    		var swatchTemplate =
                '<div>' +
                        '&nbsp;&nbsp;&nbsp;<svg width="24" height="24" version="1.1" xmlns="https://www.w3.org/2000/svg">' +
                        //'<path d="M 11 11 L 12 11 L 12 12 L 11 12 Z" data-classification="${classification}" />' +
                        '<rect width="200" height="20" range="${range}" class="tmLegendSymbol tmLegendSymbol_${range}" style="fill:${fill};" />' +
                        '</svg>' +
                        '&nbsp;&nbsp;&nbsp;<span style="vertical-align:top;" range="${range}" class="tmLegendSymbol tmLegendSymbol_${range}">${label}</span>' +
                        '</div>';

        	var html = "", inverted, data, legend = dom.byId("tmLegend");
        	
            array.forEach(quantize.range(), function (range) {
                
                inverted = quantize.invertExtent(range);

                data = {
                		
                    label:number.format(inverted[0], { places:4 }) + " - " + number.format(inverted[1], { places:4 }),
                    fill:getCatRangeColor(range),
                    range:range
                };
                
                html += esri.substitute(data, swatchTemplate);
            });
            
            legend.innerHTML = legend.innerHTML + html;
            
            var tmLegendSymbol = dojo.query("#tmLegend .tmLegendSymbol");
            
            tmLegendSymbol.on("mouseover", function(evt){
            	console.info(evt);
            	evt.target.setAttribute("stroke", "red");
            	evt.target.setAttribute("stroke-width", "2");
            	
            	var range = evt.target.getAttribute("range");
            	var polySymbol = $(".polySymbol_" + range);
            	
            	for(var i = 0; i < polySymbol.length; i++){
            		
            		polySymbol[i].setAttribute("opacity", me.mouseOverOpacity);
            	}
            });
            
            tmLegendSymbol.on("mouseout", function(evt){
            	
            	//console.info(evt);
            	var range = evt.target.getAttribute("range");
            	var polySymbol = $(".polySymbol_" + range);
            	
            	for(var i = 0; i < polySymbol.length; i++){
            		
            		polySymbol[i].setAttribute("opacity", me.initOpacity);
            	}
            });
            
            /*tmLegendSymbol.on("click", function(evt){
            	
            	//console.info(evt);
            	var range = evt.target.getAttribute("range");
            	var polySymbol = $(".polySymbol_" + range);
            	
            	for(var i = 0; i < polySymbol.length; i++){
            		
            		//polySymbol[i].setAttribute("stroke", "rgb(0, 150, 150)");
            		//polySymbol[i].setAttribute("stroke-width", "5");
            		//polySymbol[i].setAttribute("box-shadow", "0 0 5px 5px rgb(0, 0, 100)");
            		//polySymbol[i].setAttribute("opacity", "1");
            	}
            });*/
    	});
    },
    
    // 기본 스타일 셋팅
    setAttributeInit: function(el, id, color){
    	
    	var me = this;
    	
    	if(el != undefined && el != null){
    		
    		if(id != ""){
    			el.setAttribute("id", id);
    		}
    		if(color != ""){
    			el.setAttribute("color", color);
    		}
    		el.setAttribute("fill", "currentColor");
    		el.setAttribute("opacity", me.initOpacity);
    		el.setAttribute("stroke", "black");
    		el.setAttribute("stroke-width", "1");
    		el.setAttribute("stroke-opacity", "1");
    		el.setAttribute("stroke-linecap", "round");
    		el.setAttribute("stroke-linejoin", "round");
    	}
    }
});