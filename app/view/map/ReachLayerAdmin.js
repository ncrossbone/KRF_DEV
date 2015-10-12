Ext.define('KRF_DEV.view.map.ReachLayerAdmin', {
	map:null, 
	reachLinelayer: null,
	reachLineGraphics: null,
	reachArealayer: null,
	reachAreaGraphics: null,
	selectionToolbar: null,
	
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
    
    upRchGraphics: [],
    downRchGraphics: [],
    selRchGraphics: [],
    selAreaGraphics: [],
    
    selLineSymbol: null,
    upLineSymbol: null,
    downLineSymbol: null,
    areaSymbol: null,
    amCD_temp: null,
    featureSelectQuery: null,
    
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

            on(me.selectionToolbar, "DrawEnd", function (evt) {
            	
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
            	console.info(selectQuery);
            	
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
    		
    		me.reachLayerAdmin.reachLineGraphics.add(graphic);
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
    		
    		for(var i = 0; i < featureSet.features.length; i++){
    			
    			var graphic = featureSet.features[i];
    			
    			var arrIdx = me.reachLayerAdmin.getCatGraphicIndex(graphic.attributes.CAT_ID, me.reachLayerAdmin.selAreaGraphics);
    			
    	    	if(arrIdx == -1){
    	    		graphic.setSymbol(me.reachLayerAdmin.areaSymbol); // 심볼설정
        			me.reachLayerAdmin.reachAreaGraphics.add(graphic);
        			// 전역 변수 배열에 담아두기
            		me.reachLayerAdmin.selAreaGraphics.push(graphic);
            		
            		// 지점 목록 창 띄우기
            		Ext.ShowSiteListWindow("");
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
			Ext.ShowSiteListWindow("");

    	}
    },
    
    startLineDraw: function(evt){

    	var me = GetCoreMap(); // this 사용하지 말자.
    	
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
    		
	    	for(var i = 0; i < evt.length; i++){
		    	me.reachLayerAdmin.executeQuery(evt[i], "start");
		    	me.reachLayerAdmin.executeQuery(evt[i], "up");
		    	me.reachLayerAdmin.executeQuery(evt[i], "down");
	    	}
    	}
    	
    },
    
    addLineDraw: function(evt){
    	var me = GetCoreMap(); // this 사용하지 말자.
    	//console.info(evt);
    	if(evt.length == 0){
    		require(["esri/layers/FeatureLayer"], function(FeatureLayer){
    			//console.info(me.reachLayerAdmin.featureSelectQuery);
    			me.reachLayerAdmin.reachArealayer.selectFeatures(me.reachLayerAdmin.featureSelectQuery, FeatureLayer.SELECTION_SUBTRACT, me.reachLayerAdmin.addAreaDraw);
    		});
    	}
    	else{
	    	var me = GetCoreMap();
	    	
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
			
			var rchId = feature.attributes.RCH_ID;
			var rupRchId = feature.attributes.RUP_RCH_ID;
			var lupRchId = feature.attributes.LUP_RCH_ID;
			var looRchId = feature.attributes.LOO_RCH_ID;
			var catId = feature.attributes.CAT_ID;
			
			/*
    		console.info("대권역 : " + WS_CD);
    		console.info("중권역 : " + AM_CD);
    		console.info("소권역 : " + AS_CD);
    		console.info("법정동 : " + ADM_CD);
    		*/
			
			// 집수구역 그리기
			me.currAreaDraw(feature);
			
			var queryWhere = "";
			
			if(AM_CD != ""){
				queryWhere = "RCH_ID LIKE '" + AM_CD + "%'";
			}
			if(AS_CD != ""){
				queryWhere = "RCH_ID LIKE '" + AS_CD + "%'";
			}
			
			if(queryWhere != ""){
				queryWhere += " AND ";
			}
		
			if(type == "up"){
				if(rupRchId != "00000000"){
					query.where = queryWhere + "RCH_ID = '" + rupRchId + "'";
					queryTask.execute(query, me.upLineDraw_auto);
				}
				
				if(lupRchId != "00000000"){
					query.where = queryWhere + "RCH_ID = '" + lupRchId + "'";
					queryTask.execute(query, me.upLineDraw_auto);
				}
			}
			
			if(type == "down"){
				if(looRchId != "00000000"){
					query.where = queryWhere + "RCH_ID = '" + looRchId + "'";
					queryTask.execute(query, me.downLineDraw_auto);
				}
			}
			
			if(type == "start"){
				// 시작위치로 설정된 집수구역 중권역 설정
				//AM_CD = catId.substring(0, 4);
				//console.info(AM_CD);
				//AS_CD = ""; // 소권역은 공백
				
				//me.amCD_temp = AM_CD;
				//console.info(me.amCD_temp);
				// 지점목록 창 띄우기
				//Ext.ShowSiteListWindow(AM_CD);
				
				queryWhere = "RCH_ID LIKE '" + AM_CD + "%' AND ";
				query.where = queryWhere + "RCH_ID = '" + rchId + "'";
				queryTask.execute(query, me.currLineDraw);
			}
			
			if(type == "add"){
				// 추가위치로 설정된 집수구역 중권역 설정
				//AM_CD = catId.substring(0, 4);
				//AS_CD = ""; // 소권역은 공백
				
				query.where = "RCH_ID = '" + rchId + "'";
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
            	arrIdx = me.reachLayerAdmin.getRchGraphicIndex(rchId, this.upRchGraphics);
            	
            	if(arrIdx == -1){
            		
	        		graphic.setSymbol(me.reachLayerAdmin.upLineSymbol); // 심볼설정
	        		me.reachLayerAdmin.addLineGraphic(graphic);
	        		
	        		// 전역 변수 배열에 담아두기
	            	me.reachLayerAdmin.upRchGraphics.push(graphic);
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
            	arrIdx = me.reachLayerAdmin.getRchGraphicIndex(rchId, this.downRchGraphics);
            	
            	if(arrIdx == -1){
            		
	        		graphic.setSymbol(me.reachLayerAdmin.downLineSymbol); // 심볼설정
	        		me.reachLayerAdmin.addLineGraphic(graphic);
	        		
	        		// 전역 변수 배열에 담아두기
	        		me.reachLayerAdmin.downRchGraphics.push(graphic);
	        		
            	}
        		
        		me.reachLayerAdmin.executeQuery(featureSet.features[i], "down");
        	}
    	});
    },
    
    currLineDraw: function(featureSet){
    	
    	var me = GetCoreMap(); // this 사용하지 말자.
    	
    	require(["esri/symbols/SimpleLineSymbol", "esri/Color", "esri/tasks/query", "esri/layers/FeatureLayer"], function(SimpleLineSymbol, Color, Query, FeatureLayer){
    		
        	var selectQuery = new Query();
        	
        	for(var i = 0; i < featureSet.features.length; i++){
        		
        		var graphic = featureSet.features[i];
        		var rchId = graphic.attributes.RCH_ID;
        		
            	arrIdx = me.reachLayerAdmin.getRchGraphicIndex(rchId, this.upRchGraphics);
            	
            	if(arrIdx == -1){
            	
	        		graphic.setSymbol(me.reachLayerAdmin.selLineSymbol); // 심볼설정
	        		me.reachLayerAdmin.addLineGraphic(graphic);
	        		
	        		// 전역 변수 배열에 담아두기
	    			me.reachLayerAdmin.selRchGraphics.push(graphic);
	    			
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
	 		    "url": "./resources/images/symbol/btn_start01.png",
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
			    "url": "./resources/images/symbol/btn_end01.png",
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
    
    // 리치라인, 집수구역 그래픽 레이어 초기화
    clearGraphicsLayer: function(){
    	
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
    	me.reachLayerAdmin.selAreaGraphics = [];
    	
    }
});