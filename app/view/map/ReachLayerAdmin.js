Ext.define('KRF_DEV.view.map.ReachLayerAdmin', {
	map:null, 
	reachLinelayer: null,
	reachLineGraphics: null,
	reachArealayer: null,
	reachAreaGraphics: null,
	selectionToolbar: null,
	
	upRchGraphics: [], // 시작위치 클릭 시 선택된 상류 그래픽 배열
    downRchGraphics: [], // 시작위치 클릭 시 선택된 하류 그래픽 배열
    selRchGraphics: [], // 시작위치 및 리치추가로 지정된 그래픽 배열
    startRchGraphics: [], // 시작위치로 지정된 그래픽 배열
    selAreaGraphics: [], // 선택된 집수구역 그래픽 배열
    
    selLoiRchIds: [], // 하류 유입 리치 아이디 선택 배열
    
    isUpDraw: true, // 검색설정 상류 체크여부
    isDownDraw: false, // 검색설정 하류 체크여부
    isUpBonDraw: true, // 검색설정 상류 본류 체크여부
    isUpJiDraw: true, // 검색설정 상류 지류 체크여부
    isDownBonDraw: true, // 검색설정 상류 본류 체크여부
    isDownJiDraw: true, // 검색설정 상류 지류 체크여부
    isAMDraw: true, // 검색설정 해당중권역 체크여부
    isDemDraw: false, // 검색설정 댐 체크여부
    
    selLineSymbol: null,
    upLineSymbol: null,
    downLineSymbol: null,
    areaSymbol: null,
    amCD_temp: null,
    featureSelectQuery: null,
	
	constructor: function(map) {
		
		var me = this;
		
		require(["esri/symbols/SimpleLineSymbol", "esri/Color", "esri/symbols/SimpleFillSymbol",], function (SimpleLineSymbol, Color, SimpleFillSymbol) {
			
			me.selLineSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 255, 255]), 5);
			me.upLineSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([237, 20, 91]), 5);
			me.downLineSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 170, 0]), 5);
			me.areaSymbol = 
        		new SimpleFillSymbol(
        							SimpleFillSymbol.STYLE_SOLID,
			        				new SimpleLineSymbol(
						        						SimpleLineSymbol.STYLE_DASHDOT,
									        			new Color([0, 0, 0]),
									        			2
						        						),
			        				new Color([255, 255, 0, 0.3])
        							);
			
			me.reachMapLoad(map);
		});
    },
    
    reachMapLoad: function(map){
    	
    	var me = this;
        me.map = map;
        
        var reachLinelayer = me.map.getLayer("reachLinelayer");
				
		if(reachLinelayer != undefined){
			me.map.removeLayer(reachLinelayer);
		}
        
        require([
                 "esri/InfoTemplate",
                 "esri/map",
                 "esri/layers/FeatureLayer",
                 "esri/symbols/SimpleFillSymbol",
                 "esri/symbols/SimpleLineSymbol",
                 "esri/tasks/query",
                 "esri/toolbars/draw",
                 "dojo/dom",
                 "dojo/on",
                 "dojo/parser",
                 "dojo/_base/array",
                 "esri/Color",
                 "dijit/form/Button",
                 "dojo/domReady!",
                 "esri/layers/GraphicsLayer",
                 "esri/renderers/SimpleRenderer",
                 "esri/graphic",
                 "esri/geometry/Point"
               ],
                 function (
                   InfoTemplate, Map, FeatureLayer, SimpleFillSymbol, SimpleLineSymbol,
                   Query, Draw, dom, on, parser, arrayUtil, Color, GraphicsLayer, SimpleRenderer, Graphic, Point
                 ) {
        	
        	parser.parse();
        	
        	//me.initSelectToolbar(me); // 툴바 설정
        	
        	/* 리치라인 피처 레이어 추가 */
        	var lineSelectionSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 255, 255]), 5);
        	
        	me.reachLinelayer = new FeatureLayer(_mapServiceUrl + "/" + _reachLineLayerId, {
	            //mode: FeatureLayer.MODE_ONDEMAND,
        		mode: FeatureLayer.MODE_SELECTION,
	            outFields: ["*"]
        	});
        	
        	me.reachLinelayer.id = "reachLineLayer";

        	//me.reachLinelayer.setDefinitionExpression("RCH_ID IN ('10130301')");
        	me.reachLinelayer.setSelectionSymbol(lineSelectionSymbol);
        	
        	//var renderer = new esri.renderer.SimpleRenderer(lineSelectionSymbol);
    		//me.reachLinelayer.setRenderer(renderer);
        	
        	//me.reachLinelayer.setSelectionSymbol(startSymbol);
        	/*
        	me.reachLinelayer.on("selection-complete", me.reachLineSelect);
        	me.reachLinelayer.on("selection-clear", function () {
        		//alert("clear");
        	});
        	*/
        	console.info(me.reachLinelayer);
        	me.map.addLayer(me.reachLinelayer);
        	/* 리치라인 피처 레이어 추가 끝 */
        	
        	/* 집수구역 레이어 추가 */
        	var areaSelectionSymbol = 
        		new SimpleFillSymbol(
        							SimpleFillSymbol.STYLE_SOLID,
			        				new SimpleLineSymbol(
						        						SimpleLineSymbol.STYLE_DASHDOT,
									        			new Color([0, 0, 0]),
									        			2
						        						),
			        				new Color([255, 255, 0, 0.3])
        							);
        	
        	me.reachArealayer = new FeatureLayer(_mapServiceUrl + "/" + _reachAreaLayerId, {
	            //mode: FeatureLayer.MODE_ONDEMAND,
        		mode: FeatureLayer.MODE_SELECTION,
	            outFields: ["*"]
        	});
        	
        	me.reachArealayer.id = "reachAreaLayer";

        	//me.layer.setDefinitionExpression("1=1");
        	me.reachArealayer.setSelectionSymbol(areaSelectionSymbol);
        	/*me.layer.on("selection-complete", me.reachLineSelect);
        	me.layer.on("selection-clear", function () {
        		//alert("clear");
        	});*/
        	me.reachArealayer.visible = false;
        	
        	me.map.addLayer(me.reachArealayer);
        	/* 집수구역 레이어 추가 끝 */
        	
        });
    },
    
    // option : ADD, NEW ...
    initSelectToolbar: function(me, option, btnId){
    	
    	require([
				"esri/toolbars/draw",
				"esri/tasks/query",
				"dojo/on",
				"esri/layers/FeatureLayer",
				"esri/geometry/Point",
				"esri/geometry/Extent",
				"esri/graphic"
				], function(Draw, Query, on, FeatureLayer, Point, Extent, Graphic){
    		
    		me.selectionToolbar = new Draw(me.map, { showTooltips: true });
    		
    		on(me.map, "mouse-down", function(evt){
    			console.info(evt);
    		});

            on(me.selectionToolbar, "DrawEnd", function (evt) {
            	
            	/* 시작위치, 끝위치, 리치추가, 구간제거 시 
            	 * 좌측 레이어 및 검색창 크기 변경될때 
            	 * 포인트가 좌측으로 치우치는 현상이 있어 계산 로직 추가 */
            	var tileInfo = KRF_DEV.getApplication().coreMap.tileInfo;
    			var curLevel = me.map.getLevel();
    			var resolution = tileInfo.lods[curLevel].resolution;
    			
            	var initWidth = Ext.getCmp("west_container").initWidth;
    			var leftWidth = Ext.getCmp("west_container").getWidth();
    			var isCollapsed = Ext.getCmp("west_container").collapsed;
    			if(isCollapsed != false)
    				leftWidth = 0;
    			//console.info(evt);
    			var offset = (initWidth - leftWidth) * resolution;
    			
    			// 위에서 계산된 offset 적용
    			if(evt.x != undefined)
    				evt.x = evt.x + offset;
    			if(evt.xmin != undefined)
    				evt.xmin = evt.xmin + offset;
    			if(evt.xmax != undefined)
    				evt.xmax = evt.xmax + offset;
    			/* 계산 끝 */
            	
            	var selectQuery = new Query();
            	var queryExtent = evt;
            	selectQuery.geometry = queryExtent;
            	
            	if(evt.type == "point"){
	            	var centerPoint = new Point(evt.x, evt.y, evt.spatialReference);
	            	var mapWidth = me.map.extent.getWidth();
	            	var pixelWidth = mapWidth/me.map.width;
	            	var tolerance = 10 * pixelWidth;
	            	//console.info(pixelWidth)
	            	queryExtent = new Extent(1, 1, tolerance, tolerance, evt.spatialReference);
	            	//queryExtent = new Extent(1, 1, 1.5, 1.5, evt.spatialReference);
	            	selectQuery.geometry = queryExtent.centerAt(centerPoint);
            	}
            	
            	// 전역변수 저장
            	me.featureSelectQuery = selectQuery;
            	//console.info(selectQuery);
            	
            	// FeatureLayer.SELECTION_NEW : 새로선택, FeatureLayer.SELECTION_ADD : 추가선택, FeatureLayer.SELECTION_SUBTRACT : 선택취소
            	// FeatureLayer 선택기능은 필요없으므로 SELECTION_SUBTRACT로 처리 (각 콜백함수에서 그래픽레이어 생성)
            	if(option == "NEW"){
            		//me.reachLinelayer.selectFeatures(selectQuery, FeatureLayer.SELECTION_NEW, me.addLineDraw); // 리치라인 셀렉트
            		//me.reachArealayer.selectFeatures(selectQuery, FeatureLayer.SELECTION_NEW); // 집수구역 셀렉트
            	}
            	else if(option == "ADD"){
            		me.reachLinelayer.selectFeatures(selectQuery, FeatureLayer.SELECTION_SUBTRACT, me.addLineDraw); // 리치라인 셀렉트
            		//me.reachArealayer.selectFeatures(selectQuery, FeatureLayer.SELECTION_SUBTRACT, me.addAreaDraw);
            	}
            	else if(option == "REMOVE"){
            		me.reachLinelayer.selectFeatures(selectQuery, FeatureLayer.SELECTION_SUBTRACT, me.removeLine); // 리치라인 삭제
            		//me.reachArealayer.selectFeatures(selectQuery, FeatureLayer.SELECTION_SUBTRACT, me.removeArea);
            	}
            	else if(option == "STARTPOINT"){
            		me.setStartSymbol(evt, btnId); // 시작위치 심볼 설정
            		me.reachLinelayer.selectFeatures(selectQuery, FeatureLayer.SELECTION_SUBTRACT, me.startLineDraw); // 리치라인 셀렉트
            		//me.reachArealayer.selectFeatures(selectQuery, FeatureLayer.SELECTION_SUBTRACT, me.startAreaDraw);
            	}
            	else if(option == "ENDPOINT"){
            		me.setEndSymbol(evt, btnId); // 끝위치 심볼 설정
            		me.reachLinelayer.selectFeatures(selectQuery, FeatureLayer.SELECTION_SUBTRACT, me.endLineDraw); // 리치라인 셀렉트
            	}
            	else{
            		alert("옵션이 지정되지 않았습니다. ex) NEW, ADD, ...");
            		me.drawEnd(btnId);
            	}
            	
            });
    	});
    	
    },
    
    // 검색설정 변수 셋팅
    setSearchConfig: function(){
    	
    	var me = this;
    	
    	me.isUpDraw = false; // 검색설정 상류 체크여부
    	me.isDownDraw = false; // 검색설정 하류 체크여부
    	me.isUpBonDraw = false; // 검색설정 상류 본류 체크여부
    	me.isDownBonDraw = false; // 검색설정 하류 본류 체크여부
    	me.isUpJiDraw = false; // 검색설정 상류 지류 체크여부
    	me.isDownJiDraw = false; // 검색설정 하류 지류 체크여부
    	me.isAMDraw = false; // 검색설정 해당중권역 체크여부
    	me.isDemDraw = false; // 검색설정 댐 체크여부
    	
    	var chkGroup1Value = "";
		var chkGroup1 = Ext.getCmp("chkGroup1");
		var chkGroup1Items = chkGroup1.items.items;
		
		for(var i = 0; i < chkGroup1Items.length; i++){
			if(chkGroup1Items[i].checked == true){
				if(chkGroup1Items[i].inputValue == "isUpDraw"){
					me.isUpDraw = true;
				}
				if(chkGroup1Items[i].inputValue == "isDownDraw"){
					me.isDownDraw = true;
				}
				if(chkGroup1Items[i].inputValue == "isUpBonDraw"){
					me.isUpBonDraw = true;
				}
				if(chkGroup1Items[i].inputValue == "isDownBonDraw"){
					me.isDownBonDraw = true;
				}
				if(chkGroup1Items[i].inputValue == "isUpJiDraw"){
					me.isUpJiDraw = true;
				}
				if(chkGroup1Items[i].inputValue == "isDownJiDraw"){
					me.isDownJiDraw = true;
				}
			}
		}
		
		var chkGroup2Value = ""
		var chkGroup2 = Ext.getCmp("chkGroup2");
		var chkGroup2Items = chkGroup2.items.items;
		
		for(var i = 0; i < chkGroup2Items.length; i++){
			if(chkGroup2Items[i].checked == true){
				if(chkGroup2Items[i].inputValue == "isAMDraw"){
					me.isAMDraw = true;
				}
				if(chkGroup2Items[i].inputValue == "isDemDraw"){
					me.isDemDraw = true;
				}
			}
		}

		console.info("me.isUpDraw : " + me.isUpDraw + ", me.isDownDraw : " + me.isDownDraw
				+ ", me.isUpBonDraw : " + me.isUpBonDraw + ", me.isDownBonDraw : " + me.isDownBonDraw
				+ ", me.isUpJiDraw : " + me.isUpJiDraw + ", me.isAMDraw : " + me.isAMDraw
				+ ", me.isDownJiDraw : " + me.isDownJiDraw+ ", me.isDemDraw : " + me.isDemDraw);
    	
    },
    
    // 리치라인 그래픽 레이어 그래픽 추가
    addLineGraphic: function(graphic){
    	
    	var me = GetCoreMap();
    	
    	require(["esri/layers/GraphicsLayer"], function(GraphicsLayer){
    		
    		if(me.reachLayerAdmin.reachLineGraphics == null
    				|| me.reachLayerAdmin.reachLineGraphics.graphics == undefined){
    			
	    		me.reachLayerAdmin.reachLineGraphics = new GraphicsLayer();
	        	me.reachLayerAdmin.reachLineGraphics.id = "reachLineGraphics";
	        	me.map.addLayer(me.reachLayerAdmin.reachLineGraphics);
    		}
    		if(graphic){
    			me.reachLayerAdmin.reachLineGraphics.add(graphic);
    			// 지점 목록 창 띄우기
        		Ext.ShowSiteListWindow("selectReach");
        		
        		// 검색결과 창 띄우기
        		ShowSearchResultReach("");
        		
        		// 위치검색 선택영역 그래픽 삭제
        		me.searchLayerAdmin.sourceGraphicLayer.clear();
    		}
    	});
    },
    
    removeLineGraphics: function(rchId, isAuto){
    	
    	var me = GetCoreMap();
    	
    	if(me.reachLayerAdmin.reachLineGraphics == null ||
    			me.reachLayerAdmin.reachLineGraphics.graphics == undefined){
    		alert("삭제 대상이 없습니다.")
    	}
    	
    	// 상류 그래픽 삭제
    	var arrIdx = this.getRchGraphicIndex(rchId, this.upRchGraphics);
    	//alert(arrIdx);
    	if(arrIdx > -1){
    		
    		// 집수구역 그래픽 삭제
			if(this.upRchGraphics[arrIdx].attributes != undefined)
				me.reachLayerAdmin.removeAreaGraphics(this.upRchGraphics[arrIdx].attributes.CAT_ID);
	    	
    		var rupRchId = this.upRchGraphics[arrIdx].attributes.RUP_RCH_ID;
			var lupRchId = this.upRchGraphics[arrIdx].attributes.LUP_RCH_ID;
			
			//me.map.graphics.remove(this.upRchGraphics[arrIdx]);
			me.reachLayerAdmin.reachLineGraphics.remove(this.upRchGraphics[arrIdx]);
			
			// 배열에서 제거
			this.upRchGraphics.splice(arrIdx, 1);
			
			if(isAuto == true){
				if(rupRchId != "00000000"){
					this.removeLineGraphics(rupRchId, true);
				}
				if(lupRchId != "00000000"){
					this.removeLineGraphics(lupRchId, true);
				}
			}

    	}
    	
    	// 선택 그래픽 삭제
    	arrIdx = this.getRchGraphicIndex(rchId, this.selRchGraphics);
    	//alert(arrIdx);
    	if(arrIdx > -1){
    		
    		// 집수구역 그래픽 삭제
	    	if(this.selRchGraphics[arrIdx].attributes != undefined)
	    		me.reachLayerAdmin.removeAreaGraphics(this.selRchGraphics[arrIdx].attributes.CAT_ID);
	    	
	    	//me.map.graphics.remove(this.selRchGraphics[arrIdx]);
    		me.reachLayerAdmin.reachLineGraphics.remove(this.selRchGraphics[arrIdx]);
	    	this.selRchGraphics.splice(arrIdx, 1);

    	}
    	
    	// 하류 그래픽 삭제
    	arrIdx = this.getRchGraphicIndex(rchId, this.downRchGraphics);
    	//alert(arrIdx);
    	if(arrIdx > -1){
    		
    		// 집수구역 그래픽 삭제
	    	if(this.downRchGraphics[arrIdx].attributes != undefined)
	    		me.reachLayerAdmin.removeAreaGraphics(this.downRchGraphics[arrIdx].attributes.CAT_ID);
    		
    		var looRchId = this.downRchGraphics[arrIdx].attributes.LOO_RCH_ID;
    		
	    	//me.map.graphics.remove(this.downRchGraphics[arrIdx]);
    		me.reachLayerAdmin.reachLineGraphics.remove(this.downRchGraphics[arrIdx]);
	    	this.downRchGraphics.splice(arrIdx, 1);
	    	
	    	if(isAuto == true){
		    	if(looRchId != "00000000"){
					this.removeLineGraphics(looRchId, true);
				}
	    	}
    	}
    	
    	// 지점 목록 창 띄우기
		Ext.ShowSiteListWindow("selectReach");
		
		// 검색결과 창 띄우기
		ShowSearchResultReach("");
		
		// 위치검색 선택영역 그래픽 삭제
		me.searchLayerAdmin.sourceGraphicLayer.clear();
    },
    
    // 집수구역 그래픽 레이어 그래픽 추가
    addAreaGraphic: function(featureSet){
    	
    	var me = GetCoreMap();
    	//console.info(graphic);
    	require(["esri/layers/GraphicsLayer"], function(GraphicsLayer){
    		//console.info(me.reachLayerAdmin.reachAreaGraphics);
    		if(me.reachLayerAdmin.reachAreaGraphics == null
    				|| me.reachLayerAdmin.reachAreaGraphics.graphics == undefined){
    			
	    		me.reachLayerAdmin.reachAreaGraphics = new GraphicsLayer();
	        	me.reachLayerAdmin.reachAreaGraphics.id = "reachAreaGraphics";
	        	me.map.addLayer(me.reachLayerAdmin.reachAreaGraphics);
    		}
    		if(featureSet){
    			for(var i = 0; i < featureSet.features.length; i++){
        			
        			var graphic = featureSet.features[i];
        			
        			var arrIdx = me.reachLayerAdmin.getCatGraphicIndex(graphic.attributes.CAT_ID, me.reachLayerAdmin.selAreaGraphics);
        			
        	    	if(arrIdx == -1){
        	    		graphic.setSymbol(me.reachLayerAdmin.areaSymbol); // 심볼설정
            			me.reachLayerAdmin.reachAreaGraphics.add(graphic);
            			// 전역 변수 배열에 담아두기
                		me.reachLayerAdmin.selAreaGraphics.push(graphic);
                		
                		// 지점 목록 창 띄우기
                		Ext.ShowSiteListWindow("selectReach");
                		
                		// 검색결과 창 띄우기
                		ShowSearchResultReach("");
                		
                		// 위치검색 선택영역 그래픽 삭제
                		me.searchLayerAdmin.sourceGraphicLayer.clear();
        	    	}
        		}
    		}
    	});
    },
    
    // 집수구역 그래픽 삭제
    removeAreaGraphics: function(catId){
    	//alert(catId);
    	var me = GetCoreMap();
    	
    	if(me.reachLayerAdmin.reachAreaGraphics == null ||
    			me.reachLayerAdmin.reachAreaGraphics.graphics == undefined){
    		alert("삭제 대상이 없습니다.")
    	}
    	
    	// 집수구역 그래픽 삭제
    	var arrIdx = this.getCatGraphicIndex(catId, me.reachLayerAdmin.selAreaGraphics);
    	//console.info(catId);
    	if(arrIdx > -1){
	    	
    		//var graphic = graphicArray[i].attributes.CAT_ID
			me.reachLayerAdmin.reachAreaGraphics.remove(me.reachLayerAdmin.selAreaGraphics[arrIdx]);
			
			// 배열에서 제거
			me.reachLayerAdmin.selAreaGraphics.splice(arrIdx, 1);
			
			// 지점 목록 창 띄우기
			Ext.ShowSiteListWindow("selectReach");
			
			// 검색결과 창 띄우기
			ShowSearchResultReach("");
			
			// 위치검색 선택영역 그래픽 삭제
			me.searchLayerAdmin.sourceGraphicLayer.clear();

    	}
    },
    
    // 시작위치부터 다시그리기
    startLineReDraw: function(){
    	
		var me = GetCoreMap();
		me.reachLayerAdmin.setSearchConfig(); // 검색설정 셋팅
		me.reachLayerAdmin.drawEnd(); // 리치 선택 종료
		me.reachLayerAdmin.clearGraphicsLayer("redraw"); // 리치라인, 집수구역 그래픽 레이어 및 전역 변수 clear
		
		console.info(me.reachLayerAdmin.isDownDraw);

		if(me.reachLayerAdmin.startRchGraphics.length > 0){
			for(var i = 0; i < me.reachLayerAdmin.startRchGraphics.length; i++){
				me.reachLayerAdmin.executeQuery(me.reachLayerAdmin.startRchGraphics[i], "start");
				if(me.reachLayerAdmin.isUpDraw == true){
					me.reachLayerAdmin.executeQuery(me.reachLayerAdmin.startRchGraphics[i], "up");
				}
				if(me.reachLayerAdmin.isDownDraw == true){
					me.reachLayerAdmin.executeQuery(me.reachLayerAdmin.startRchGraphics[i], "down");
				}
			}
		}
    	
    },
    
    // 시작위치 그리기
    startLineDraw: function(evt){

    	var me = GetCoreMap(); // this 사용하지 말자.
    	me.reachLayerAdmin.setSearchConfig(); // 검색설정 셋팅
    	
    	if(evt.length == 0){
    		require(["esri/layers/FeatureLayer"], function(FeatureLayer){
    			//console.info(me.reachLayerAdmin.featureSelectQuery);
    			me.reachLayerAdmin.reachArealayer.selectFeatures(me.reachLayerAdmin.featureSelectQuery, FeatureLayer.SELECTION_SUBTRACT, me.reachLayerAdmin.startAreaDraw);
    		});
    	}
    	else{
    		
    		if(evt.length > 1){
    			alert("여러개의 리치가 선택되었습니다. 한개의 리치만 선택하세요.");
    			return;
    		}
    		
    		//console.info(evt[0]);
	    	// khLee 검색 수정 테스트
	    	//return;
    		
    		// 하류 유입 아이디 배열 초기화
    		me.selLoiRchIds = [];
    		
	    	me.reachLayerAdmin.executeQuery(evt[0], "start");
	    	
	    	if(me.reachLayerAdmin.isUpDraw == true){
	    		me.reachLayerAdmin.executeQuery(evt[0], "up");
	    	}
	    	
	    	if(me.reachLayerAdmin.isDownDraw == true){
	    		me.reachLayerAdmin.executeQuery(evt[0], "down");
	    	}
    	}
    	
    },
    
    addLineDraw: function(evt){
    	var me = GetCoreMap(); // this 사용하지 말자.
    	console.info(evt);
    	if(evt.length == 0){
    		require(["esri/layers/FeatureLayer"], function(FeatureLayer){
    			//console.info(me.reachLayerAdmin.featureSelectQuery);
    			me.reachLayerAdmin.reachArealayer.selectFeatures(me.reachLayerAdmin.featureSelectQuery, FeatureLayer.SELECTION_SUBTRACT, me.reachLayerAdmin.addAreaDraw);
    		});
    	}
    	else{
	    	var me = GetCoreMap();
	    	
	    	console.info(evt);
	    	for(var i = 0; i < evt.length; i++){
	    		me.reachLayerAdmin.executeQuery(evt[i], "add");
	    	}
    	}
    	
    },
    
    addAreaDraw: function(features){
    	//console.info(evt);
    	require(["esri/symbols/SimpleLineSymbol", "esri/Color", "esri/tasks/query", "esri/tasks/QueryTask", "esri/layers/FeatureLayer"], function(SimpleLineSymbol, Color, Query, QueryTask, FeatureLayer){
    		
    		query = new Query();
			query.returnGeometry = true;
			query.outFields = ["*"];
			
			var catId = features[0].attributes.CAT_ID;
			
			query.where = "CAT_ID = '" + catId + "'";
			me.reachLinelayer.selectFeatures(query, FeatureLayer.SELECTION_SUBTRACT, me.addLineDraw);
			
		});
    },
    
    removeArea: function(features){
    	
    	require(["esri/symbols/SimpleLineSymbol", "esri/Color", "esri/tasks/query", "esri/tasks/QueryTask", "esri/layers/FeatureLayer"], function(SimpleLineSymbol, Color, Query, QueryTask, FeatureLayer){
    		
    		query = new Query();
			query.returnGeometry = true;
			query.outFields = ["*"];
			
			var catId = features[0].attributes.CAT_ID;
			
			query.where = "CAT_ID = '" + catId + "'";
			me.reachLinelayer.selectFeatures(query, FeatureLayer.SELECTION_SUBTRACT, me.removeLine);
			
		});
    	
    },
    
    startAreaDraw: function(features){
    	
    	require(["esri/symbols/SimpleLineSymbol", "esri/Color", "esri/tasks/query", "esri/tasks/QueryTask", "esri/layers/FeatureLayer"], function(SimpleLineSymbol, Color, Query, QueryTask, FeatureLayer){
    		
    		query = new Query();
			query.returnGeometry = true;
			query.outFields = ["*"];
			
			var catId = features[0].attributes.CAT_ID;
			
			query.where = "CAT_ID = '" + catId + "'";
			me.reachLinelayer.selectFeatures(query, FeatureLayer.SELECTION_SUBTRACT, me.startLineDraw);
			
		});
    	
    },
    
    executeQuery: function(feature, type){
    	
    	var me = this;
    	
    	//console.info("선택리치아이디 : " + feature.attributes.RCH_ID); // 선택 리치아이디
    	//console.info("상류우측유입아이디 : " + feature.attributes.RUP_RCH_ID);
    	//console.info("상류좌측유입아이디 : " + feature.attributes.LUP_RCH_ID);
    	//console.info("하류유출아이디 : " + feature.attributes.LOO_RCH_ID);
    	
    	require(["esri/symbols/SimpleLineSymbol", "esri/Color", "esri/tasks/query", "esri/tasks/QueryTask"], function(SimpleLineSymbol, Color, Query, QueryTask){
    		
    		queryTask = new QueryTask(_mapServiceUrl + "/" + _reachLineLayerId);
    		query = new Query();
			query.returnGeometry = true;
			query.outFields = ["*"];
			
			var rchId = feature.attributes.RCH_ID; // 리치 아이디
			var rupRchId = feature.attributes.RUP_RCH_ID; // 우측 상류 아이디
			var lupRchId = feature.attributes.LUP_RCH_ID; // 좌측 상류 아이디
			var looRchId = feature.attributes.LOO_RCH_ID; // 하류 유출 아이디
			var loiRchId = feature.attributes.LOI_RCH_ID; // 하류 유입 아이디
			var geoTrib = feature.attributes.GEO_TRIB; // 본류, 지류 구분 (0:본류, 1,2,3... depth: 지류)
			var catId = feature.attributes.CAT_ID; // 집수구역 아이디
			
			if(me.isAMDraw == true){
				// 시작위치로 설정된 집수구역 중권역 설정
				AM_CD = catId.substring(0, 4);
				//console.info(AM_CD);
				AS_CD = ""; // 소권역은 공백
			}
			else{
				AM_CD = "";
				AS_CD = "";
			}
			
    		//console.info("대권역 : " + WS_CD);
    		//console.info("중권역 : " + AM_CD);
    		//console.info("소권역 : " + AS_CD);
    		//console.info("법정동 : " + ADM_CD);
			
			// 집수구역 그리기
			me.currAreaDraw(feature);
			
			var queryWhere = "";
			
			if(AM_CD != ""){
				queryWhere = "RCH_ID LIKE '" + AM_CD + "%' AND";
			}
			if(AS_CD != ""){
				queryWhere = "RCH_ID LIKE '" + AS_CD + "%' AND";
			}
			
			//isUpBonDraw: true, // 검색설정 상류 본류 체크여부
	        //isUpJiDraw: true, // 검색설정 상류 지류 체크여부
		
			// 상류 검색
			if(type == "up"){
				
				// 상류 본류 체크, 상류 지류 체크 해제 시
				if(me.isUpBonDraw == true && me.isUpJiDraw == false){
					queryWhere += " GEO_TRIB = 0 AND";
    				//queryWhere += " GEO_TRIB IN (0, 1) AND";
					//queryWhere += " GEO_TRIB = " + geoTrib + " AND";
    			}
				
				if(rupRchId != "00000000"){
					query.where = queryWhere + " RCH_ID = '" + rupRchId + "'";
					queryTask.execute(query, me.upLineDraw_auto);
				}
				
				if(lupRchId != "00000000"){
					query.where = queryWhere + " RCH_ID = '" + lupRchId + "'";
					queryTask.execute(query, me.upLineDraw_auto);
				}
			}
			
			// 하류 검색
			if(type == "down"){
				
				// 하류 본류 체크, 상류 지류 체크 해제 시
				if(me.isDownBonDraw == true && me.isDownJiDraw == false){
					queryWhere += " GEO_TRIB = 0 AND";
    				//queryWhere += " GEO_TRIB IN (0, 1) AND";
					//queryWhere += " GEO_TRIB = " + geoTrib + " AND";
    			}
				
				if(looRchId != "00000000"){
					query.where = queryWhere + " RCH_ID = '" + looRchId + "'";
					queryTask.execute(query, me.downLineDraw_auto);
				}
				
				if(loiRchId != "00000000"){
					
					// 하류 유입 아이디 전역 배열 인덱스 가져오기
					var loiIdx = me.getLoiRchIdIndex(loiRchId);
					
					if(loiIdx == -1){ // 하류 유입 아이디 인덱스 없으면
						me.selLoiRchIds.push(loiRchId); // 하류 유입 아이디 인덱스 추가
						query.where = queryWhere + " RCH_ID = '" + loiRchId + "'";
						queryTask.execute(query, me.downLineDraw_auto);
					}
				}
			}
			
			// 시작 위치 검색
			if(type == "start"){
				query.where = queryWhere + " RCH_ID = '" + rchId + "'";
				queryTask.execute(query, me.startLineDrawGraphic);
			}
			
			// 리치 추가 검색
			if(type == "add"){
				query.where = " RCH_ID = '" + rchId + "'";
				queryTask.execute(query, me.currLineDraw);
			}
			
    	});
			
    },
    
    upLineDraw_auto: function(featureSet){
    	
    	var me = GetCoreMap(); // this 사용하지 말자.
    	
    	require(["esri/symbols/SimpleLineSymbol", "esri/Color", "esri/tasks/query", "esri/layers/FeatureLayer"], function(SimpleLineSymbol, Color, Query, FeatureLayer){
    		
        	var selectQuery = new Query();
        	
        	for(var i = 0; i < featureSet.features.length; i++){
        		
        		var graphic = featureSet.features[i];
        		var rchId = graphic.attributes.RCH_ID;
            	arrIdx = me.reachLayerAdmin.getRchGraphicIndex(rchId, me.reachLayerAdmin.upRchGraphics);
            	
            	if(arrIdx == -1){
            		
            		// 전역 변수 배열에 담아두기
	            	me.reachLayerAdmin.upRchGraphics.push(graphic);
	            	
	        		graphic.setSymbol(me.reachLayerAdmin.upLineSymbol); // 심볼설정
	        		me.reachLayerAdmin.addLineGraphic(graphic);
            	}
            	
            	me.reachLayerAdmin.executeQuery(featureSet.features[i], "up");
        	}
    	});
    },
    
    downLineDraw_auto: function(featureSet){
    	
    	var me = GetCoreMap(); // this 사용하지 말자.
    	
    	require(["esri/symbols/SimpleLineSymbol", "esri/Color", "esri/tasks/query", "esri/layers/FeatureLayer"], function(SimpleLineSymbol, Color, Query, FeatureLayer){
    		
        	var selectQuery = new Query();
        	
        	for(var i = 0; i < featureSet.features.length; i++){
        		
        		var graphic = featureSet.features[i];
        		var rchId = graphic.attributes.RCH_ID;
            	arrIdx = me.reachLayerAdmin.getRchGraphicIndex(rchId, me.reachLayerAdmin.downRchGraphics);
            	
            	if(arrIdx == -1){
            		
            		// 전역 변수 배열에 담아두기
	        		me.reachLayerAdmin.downRchGraphics.push(graphic);
            		
	        		graphic.setSymbol(me.reachLayerAdmin.downLineSymbol); // 심볼설정
	        		me.reachLayerAdmin.addLineGraphic(graphic);
	        		
            	}
        		
        		me.reachLayerAdmin.executeQuery(featureSet.features[i], "down");
        	}
    	});
    },
    
    // 시작위치 라인 그래픽 그리기
    startLineDrawGraphic: function(featureSet){
    	
    	var me = GetCoreMap(); // this 사용하지 말자.
    	
    	require(["esri/symbols/SimpleLineSymbol", "esri/Color", "esri/tasks/query", "esri/layers/FeatureLayer"], function(SimpleLineSymbol, Color, Query, FeatureLayer){
    		
        	var selectQuery = new Query();
        	
        	for(var i = 0; i < featureSet.features.length; i++){
        		
        		var graphic = featureSet.features[i];
        		var rchId = graphic.attributes.RCH_ID;
        		
            	arrIdx = me.reachLayerAdmin.getRchGraphicIndex(rchId, me.reachLayerAdmin.startRchGraphics);
            	
            	if(arrIdx == -1){
            	
            		// 전역 변수 배열에 담아두기
	    			me.reachLayerAdmin.startRchGraphics.push(graphic);
	    			
	        		graphic.setSymbol(me.reachLayerAdmin.selLineSymbol); // 심볼설정
	        		me.reachLayerAdmin.addLineGraphic(graphic);
	    			
            	}
        	}
        	
        	// 리치 정보 보여주기
        	//me.reachLayerAdmin.reachSelected(featureSet.features);
        	
    	});
    	
    },
    
    currLineDraw: function(featureSet){
    	
    	var me = GetCoreMap(); // this 사용하지 말자.
    	
    	require(["esri/symbols/SimpleLineSymbol", "esri/Color", "esri/tasks/query", "esri/layers/FeatureLayer"], function(SimpleLineSymbol, Color, Query, FeatureLayer){
    		
        	var selectQuery = new Query();
        	
        	for(var i = 0; i < featureSet.features.length; i++){
        		
        		var graphic = featureSet.features[i];
        		var rchId = graphic.attributes.RCH_ID;
        		
            	arrIdx = me.reachLayerAdmin.getRchGraphicIndex(rchId, me.reachLayerAdmin.selRchGraphics);
            	
            	if(arrIdx == -1){
            	
            		// 전역 변수 배열에 담아두기
	    			me.reachLayerAdmin.selRchGraphics.push(graphic);
	    			
	        		graphic.setSymbol(me.reachLayerAdmin.selLineSymbol); // 심볼설정
	        		me.reachLayerAdmin.addLineGraphic(graphic);
	    			
            	}
        	}
        	
        	// 리치 정보 보여주기
        	//me.reachLayerAdmin.reachSelected(featureSet.features);
        	
    	});
    	
    },
    
    currAreaDraw: function(lineFeater){
    	
    	var me = GetCoreMap();
    	var catId = lineFeater.attributes.CAT_ID;
    	
    	require(["esri/symbols/SimpleLineSymbol", "esri/Color", "esri/tasks/query", "esri/layers/FeatureLayer", "esri/tasks/QueryTask"], function(SimpleLineSymbol, Color, Query, FeatureLayer, QueryTask){
    		
    		//console.info(_mapServiceUrl + "/" + _reachAreaLayerId);
    		var queryTask = new QueryTask(_mapServiceUrl + "/" + _reachAreaLayerId);
    		query = new Query();
			query.returnGeometry = true;
			query.outFields = ["*"];
			
			query.where = "CAT_ID = '" + catId + "'";
			queryTask.execute(query, me.reachLayerAdmin.addAreaGraphic);
			
    	});
    	
    },
    
    // 하류 유입 RCH ID 인덱스 가져오기
    getLoiRchIdIndex: function(loiRchId){
    	
    	var me = this;
    	
    	if(me.selLoiRchIds != null && me.selLoiRchIds != undefined){
	    	for(var i = 0; i < me.selLoiRchIds.length; i++){
	    		var tmpId = me.selLoiRchIds[i];
	    		if(tmpId == loiRchId){
	    			return i;
	    		}
	    	}
    	}
    	
    	return -1;
    	
    },
    
    // 선택, 상류, 하류 리치 그래픽 인덱스 가져오기
    getRchGraphicIndex: function(rchId, graphicArray){
    	
    	if(graphicArray != null && graphicArray != undefined){
	    	for(var i = 0; i < graphicArray.length; i++){
	    		var tmpId = graphicArray[i].attributes.RCH_ID;
	    		if(tmpId == rchId){
	    			return i;
	    		}
	    	}
    	}
    	
    	return -1;
    },
    
    // 선택, 상류, 하류 집수구역 그래픽 인덱스 가져오기
    getCatGraphicIndex: function(catId, graphicArray){
    	
    	if(graphicArray != null && graphicArray != undefined){
	    	for(var i = 0; i < graphicArray.length; i++){
	    		var tmpId = graphicArray[i].attributes.CAT_ID;
	    		if(tmpId == catId){
	    			return i;
	    		}
	    	}
    	}
    	
    	return -1;
    },
    
    endLineDraw: function(evt){
    	
    	var me = GetCoreMap(); // this 사용하지 말자.
    	
    	if(evt.length == 0){
    		require(["esri/layers/FeatureLayer"], function(FeatureLayer){
    			//console.info(me.reachLayerAdmin.featureSelectQuery);
    			me.reachLayerAdmin.reachArealayer.selectFeatures(me.reachLayerAdmin.featureSelectQuery, FeatureLayer.SELECTION_SUBTRACT, me.reachLayerAdmin.endAreaDraw);
    		});
    	}
    	else{
    		
    		if(evt.length > 1){
    			alert("여러개의 리치가 선택되었습니다. 한개의 리치만 선택하세요.");
    			return;
    		}
    		
    		//console.info(evt[0]);
	    	// khLee 검색 수정 테스트
	    	//return;
	    	
    		var rchId = evt[0].attributes.RCH_ID;
    		me.reachLayerAdmin.removeLineGraphics(rchId, true);
    	}
    },
    
    endAreaDraw: function(features){
    	
    	require(["esri/symbols/SimpleLineSymbol", "esri/Color", "esri/tasks/query", "esri/tasks/QueryTask", "esri/layers/FeatureLayer"], function(SimpleLineSymbol, Color, Query, QueryTask, FeatureLayer){
    		
    		query = new Query();
			query.returnGeometry = true;
			query.outFields = ["*"];
			
			var catId = features[0].attributes.CAT_ID;
			
			query.where = "CAT_ID = '" + catId + "'";
			me.reachLinelayer.selectFeatures(query, FeatureLayer.SELECTION_SUBTRACT, me.endLineDraw);
			
		});
    	
    },
    
    removeLine: function(evt){
    	//console.info("remove");
    	
    	var me = GetCoreMap(); // this 사용하지 말자.
    	//console.info(evt);
    	if(evt.length == 0){
    		require(["esri/layers/FeatureLayer"], function(FeatureLayer){
    			//console.info(me.reachLayerAdmin.featureSelectQuery);
    			me.reachLayerAdmin.reachArealayer.selectFeatures(me.reachLayerAdmin.featureSelectQuery, FeatureLayer.SELECTION_SUBTRACT, me.reachLayerAdmin.removeArea);
    		});
    	}
    	else{
	    	for(var i = 0; i < evt.length; i++){
		    	var rchId = evt[i].attributes.RCH_ID;
				me.reachLayerAdmin.removeLineGraphics(rchId, false);
	    	}
    	}
    },
    
    reachSelected: function(objs){
    	//console.info(objs);
    	if(objs == undefined || objs[0] == undefined)
    		return;
    	
    	var RCH_ID = objs[0].attributes.RCH_ID; // 리치코드
    	var RIV_ID = objs[0].attributes.RIV_ID; // 하천코드
    	var RIV_NM = objs[0].attributes.RIV_NM; // 하천명
    	var SB_ID = objs[0].attributes.SB_ID; // 표준유역코드
    	var SB_NM = objs[0].attributes.SB_NM; // 표준유역명
    	var LO_RIV_ID = objs[0].attributes.LO_RIV_ID; // 하류연결하천코드
    	var LO_RIV_NM = objs[0].attributes.LO_RIV_NM; // 하류연결하천명
    	var SN = objs[0].attributes.SN; // 순차번호
    	var GEO_TRIB = objs[0].attributes.GEO_TRIB; // 하천차수
    	var RCH_LEN = objs[0].attributes.RCH_LEN; // 리치길이
    	var CUM_LEN = objs[0].attributes.CUM_LEN; // 누적거리
    	var CAT_AREA = objs[0].attributes.CAT_AREA; // 집수면적
    	// 상류면적?
    	
    	// 리치 정보창 띄우기
    	var reachInfoCtl = ShowReachInfoWindow();
    	
    	if(Ext.getCmp("RCH_ID") != undefined) { Ext.getCmp("RCH_ID").setHtml(RCH_ID) };
    	if(Ext.getCmp("RIV_ID") != undefined) { Ext.getCmp("RIV_ID").setHtml(RIV_ID) };
    	if(Ext.getCmp("RIV_NM") != undefined) { Ext.getCmp("RIV_NM").setHtml(RIV_NM) };
    	if(Ext.getCmp("SB_ID") != undefined) { Ext.getCmp("SB_ID").setHtml(SB_ID) };
    	if(Ext.getCmp("SB_NM") != undefined) { Ext.getCmp("SB_NM").setHtml(SB_NM) };
    	if(Ext.getCmp("LO_RIV_ID") != undefined) { Ext.getCmp("LO_RIV_ID").setHtml(LO_RIV_ID) };
    	if(Ext.getCmp("LO_RIV_NM") != undefined) { Ext.getCmp("LO_RIV_NM").setHtml(LO_RIV_NM) };
    	if(Ext.getCmp("SN") != undefined) { Ext.getCmp("SN").setHtml(SN) };
    	if(Ext.getCmp("GEO_TRIB") != undefined) { Ext.getCmp("GEO_TRIB").setHtml(GEO_TRIB) };
    	if(Ext.getCmp("RCH_LEN") != undefined) { Ext.getCmp("RCH_LEN").setHtml(RCH_LEN) };
    	if(Ext.getCmp("CUM_LEN") != undefined) { Ext.getCmp("CUM_LEN").setHtml(CUM_LEN) };
    	if(Ext.getCmp("CAT_AREA") != undefined) { Ext.getCmp("CAT_AREA").setHtml(CAT_AREA) };
    	
    	// 버튼 On/Off
    	var currCtl = SetBtnOnOff("btnAreaLayer");
    	ReachLayerOnOff("btnAreaLayer", _reachAreaLayerId);
    	
    },
    
    // option : ADD, NEW ...
    pointDraw: function(option, btnId){
    	me = this;
    	me.map.disablePan();
        //me.map.disableMapNavigation();
    	
    	me.initSelectToolbar(me, option, btnId);

    	require(["esri/toolbars/draw","dojo/i18n!esri/nls/jsapi"], function(Draw, bundle){
    		
    		if(option == "REMOVE"){
    			bundle.toolbars.draw.addPoint = "제거할 리치라인을 클릭하세요.";
    		}
    		else{
    			bundle.toolbars.draw.addPoint = "선택할 리치라인을 클릭하세요.";
    		}
    		
    		me.selectionToolbar.activate(Draw.POINT);
    	});
    },
    
    pointStartDraw: function(option, btnId){
    	// 커서 이미지 설정
		Ext.get('_mapDiv__gc').setStyle('cursor','url(./resources/images/symbol/btn_start01.png) 13 38,auto');
		
		me = this;
		me.map.disablePan();
		
		me.initSelectToolbar(me, option, btnId);
		
		require(["esri/toolbars/draw","dojo/i18n!esri/nls/jsapi"], function(Draw, bundle){
    		bundle.toolbars.draw.addPoint = "시작위치로 설정 할 리치라인을 클릭하세요.";
    		me.selectionToolbar.activate(Draw.POINT);
    	});
    },
    
    setStartSymbol: function(geom, btnId){
    	var me = GetCoreMap();
    	
    	require([
	 	        "esri/symbols/PictureMarkerSymbol",
				"esri/graphic"
				], function(PictureMarkerSymbol, Graphic){
	 		var startSymbol = new PictureMarkerSymbol({
	 		    "angle": 0,
	 		    //"xoffset": 10,
	 		    "yoffset": 14,
	 		    "type": "esriPMS",
	 		    "url": window.baseUrl + "/resources/images/symbol/btn_start01.png",
	 		    "contentType": "image/png",
	 		    "width": 20,
	 		    "height": 28
	 		});
	 		
	 		//console.info(geom);
	 		//me.map.graphics.add(new Graphic(geom, startSymbol));
	 		me.reachLayerAdmin.addLineGraphic(new Graphic(geom, startSymbol));
	 	});
    	
    	// 버튼 On/Off
		var currCtl = SetBtnOnOff(btnId);
		me.reachLayerAdmin.drawEnd();
    },
    
    pointEndDraw: function(option, btnId){
    	// 커서 이미지 설정
    	Ext.get('_mapDiv__gc').setStyle('cursor','url(./resources/images/symbol/btn_end01.png) 13 38,auto');
		
		me = this;
		me.map.disablePan();
		
		me.initSelectToolbar(me, option, btnId);
		
		require(["esri/toolbars/draw","dojo/i18n!esri/nls/jsapi"], function(Draw, bundle){
    		bundle.toolbars.draw.addPoint = "끝위치로 설정 할 리치라인을 클릭하세요.";
    		me.selectionToolbar.activate(Draw.POINT);
    	});
    },
    
    setEndSymbol: function(geom, btnId){
    	var me = GetCoreMap();
    	
    	require([
	 	        "esri/symbols/PictureMarkerSymbol",
				"esri/graphic"
				], function(PictureMarkerSymbol, Graphic){
    		var endSymbol = new esri.symbol.PictureMarkerSymbol({
			    "angle": 0,
			    //"xoffset": 10,
			    "yoffset": 14,
			    "type": "esriPMS",
			    "url": window.baseUrl + "/resources/images/symbol/btn_end01.png",
			    "contentType": "image/png",
			    "width": 20,
			    "height": 28
			});
	 		
	 		//console.info(geom);
	 		//me.map.graphics.add(new Graphic(geom, endSymbol));
    		me.reachLayerAdmin.addLineGraphic(new Graphic(geom, endSymbol));
	 	});
    	
    	// 버튼 On/Off
		var currCtl = SetBtnOnOff(btnId);
		me.reachLayerAdmin.drawEnd();
    },
    
    // selectFeatures 콜백 매서드
    endFeatureSelect: function(objs){
    	var me = GetCoreMap(); // this 사용하지 말자.
    	//me.reachLayerAdmin.reachSelected(objs);
    	
    	// 상류 10개, 하류 10개 리치선택 로직 들어갈 곳.
    	
    	me.reachLayerAdmin.drawEnd();
    },
    
    extentDraw: function(option, btnId){
    	me = this;
    	me.map.disablePan();
        //me.map.disableMapNavigation();
    	
    	me.initSelectToolbar(me, option, btnId);

    	require(["esri/toolbars/draw","dojo/i18n!esri/nls/jsapi"], function(Draw, bundle){
    		
    		if(option == "REMOVE"){
    			bundle.toolbars.draw.addPoint = "제거할 영역을 드래그하세요.";
    		}
    		else{
    			bundle.toolbars.draw.addPoint = "선택할 영역을 드래그하세요.";
    		}
    		
    		me.selectionToolbar.activate(Draw.EXTENT);
    		//me.selectionToolbar.activate(Draw.POINT);
    		//me.selectionToolbar.activate(Draw.CIRCLE);
    		//me.selectionToolbar.activate("polyline");
    	});
    },
    
    radiusDraw: function(option, btnId){
    	me = this;
    	me.map.disablePan();
        //me.map.disableMapNavigation();
    	
    	me.initSelectToolbar(me, option, btnId);

    	require(["esri/toolbars/draw","dojo/i18n!esri/nls/jsapi"], function(Draw, bundle){
    		
    		if(option == "REMOVE"){
    			bundle.toolbars.draw.addPoint = "제거할 영역을 드래그하세요.";
    		}
    		else{
    			bundle.toolbars.draw.addPoint = "선택할 영역을 드래그하세요.";
    		}
    		
    		//me.selectionToolbar.activate(Draw.EXTENT);
    		//me.selectionToolbar.activate(Draw.POINT);
    		me.selectionToolbar.activate(Draw.CIRCLE);
    		//me.selectionToolbar.activate("polyline");
    	});
    },
    
    drawEnd: function(){
    	me = this;
    	//console.info(me.selectionToolbar);
    	if(me.selectionToolbar != null){
	    	me.selectionToolbar.deactivate();
	    	me.map.enablePan();
	    	//me.map.enableMapNavigation();
	    	
	    	Ext.get('_mapDiv__gc').setStyle('cursor','default');
    	}
    },
    
    setCatIds: function(){
    	

    	
    	if(_searchType == "리치검색"){
    		
    		var me = GetCoreMap();
    		
    		if(me.reachLayerAdmin.reachAreaGraphics == null || me.reachLayerAdmin.reachAreaGraphics == undefined){
    			
    			//alert("선택된 집수구역이 없습니다.");
    			return false; // 리치검색일때는 일단 false를 리턴하지 말자..
    			
    		}
    		else{
    			
    			var graphics = me.reachLayerAdmin.reachAreaGraphics.graphics;
    			
    			if(graphics == null || graphics == undefined){
    				
    				//alert("선택된 집수구역이 없습니다.");
    				//return false; // 리치검색일때는 일단 false를 리턴하지 말자..
    				
    			}
    			else{
    				
    				for(var i = 0; i < graphics.length; i++){
    					
    					var catId = graphics[i].attributes.CAT_ID;
    					_catIds += "'" + catId + "', ";
    					
    				}
    				
    				_catIds = _catIds.substring(0, _catIds.length - 2);
    				console.info(_catIds);
    				
    			}
    			
    		}
    		
    	}
    	
    },
    
    // 리치라인, 집수구역 그래픽 레이어 초기화 (mode : 초기화인지 적용인지)
    clearGraphicsLayer: function(mode){
    	
    	var me = GetCoreMap();
    	
    	if(me.reachLayerAdmin.reachLineGraphics != null && me.reachLayerAdmin.reachLineGraphics != undefined){
    		me.reachLayerAdmin.reachLineGraphics.clear(); // 리치라인 초기화
    	}
    	if(me.reachLayerAdmin.reachAreaGraphics != null && me.reachLayerAdmin.reachAreaGraphics != undefined){
    		me.reachLayerAdmin.reachAreaGraphics.clear(); // 집수구역 초기화
    	}
    	
    	me.reachLayerAdmin.upRchGraphics = [];
    	me.reachLayerAdmin.downRchGraphics = [];
    	me.reachLayerAdmin.selRchGraphics = [];
    	// 초기화일 경우 시작라인 배열 삭제
    	if(mode == "reset")
    		me.reachLayerAdmin.startRchGraphics = [];
    	me.reachLayerAdmin.selAreaGraphics = [];
    	
    }
});