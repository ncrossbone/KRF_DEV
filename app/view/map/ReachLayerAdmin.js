Ext.define('KRF_DEV.view.map.ReachLayerAdmin', {
	map:null, 
	reachLinelayer: null,
	reachArealayer: null,
	selectionToolbar: null,
	
	constructor: function(map) {
		this.reachMapLoad(map);
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
                 "dojo/domReady!"
               ],
                 function (
                   InfoTemplate, Map, FeatureLayer, SimpleFillSymbol, SimpleLineSymbol,
                   Query, Draw, dom, on, parser, arrayUtil, Color
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
	            	queryExtent = new Extent(1, 1, tolerance, tolerance, evt.spatialReference);
	            	selectQuery.geometry = queryExtent.centerAt(centerPoint);
            	}
            	
            	//console.info(option);
            	if(option == "NEW"){
            		me.reachLinelayer.selectFeatures(selectQuery, FeatureLayer.SELECTION_NEW, me.reachSelected); // 리치라인 셀렉트
            		//me.reachArealayer.selectFeatures(selectQuery, FeatureLayer.SELECTION_NEW); // 집수구역 셀렉트
            	}
            	else if(option == "ADD"){
            		me.reachLinelayer.selectFeatures(selectQuery, FeatureLayer.SELECTION_ADD, me.reachSelected); // 리치라인 셀렉트
            		//me.reachArealayer.selectFeatures(selectQuery, FeatureLayer.SELECTION_ADD); // 집수구역 셀렉트
            	}
            	else if(option == "REMOVE"){
            		me.reachLinelayer.selectFeatures(selectQuery, FeatureLayer.SELECTION_SUBTRACT, me.reachSelected); // 리치라인 삭제
            		me.reachArealayer.selectFeatures(selectQuery, FeatureLayer.SELECTION_SUBTRACT); // 집수구역 삭제
            	}
            	else if(option == "STARTPOINT"){
            		me.setStartSymbol(evt, btnId); // 시작위치 심볼 설정
            		me.reachLinelayer.selectFeatures(selectQuery, FeatureLayer.SELECTION_ADD, me.startLineDraw); // 리치라인 셀렉트
            		//me.reachArealayer.selectFeatures(selectQuery, FeatureLayer.SELECTION_ADD); // 집수구역 셀렉트
            	}
            	else if(option == "ENDPOINT"){
            		me.setEndSymbol(evt, btnId); // 끝위치 심볼 설정
            		me.reachLinelayer.selectFeatures(selectQuery, FeatureLayer.SELECTION_SUBTRACT, me.endLineDraw); // 리치라인 셀렉트
            		me.reachArealayer.selectFeatures(selectQuery, FeatureLayer.SELECTION_SUBTRACT); // 집수구역 셀렉트
            	}
            	else{
            		alert("옵션이 지정되지 않았습니다. ex) NEW, ADD, ...");
            		me.drawEnd(btnId);
            	}
            	
            });
    	});
    	
    },
    
    startLineDraw: function(evt){
    	
    	var me = GetCoreMap(); // this 사용하지 말자.
    	
    	me.reachLayerAdmin.executeQuery(evt[0], "up");
    	me.reachLayerAdmin.executeQuery(evt[0], "down");
    	
    	// 버튼 On/Off
    	var currCtl = SetBtnOnOff("btnAreaLayer");
    	ReachLayerOnOff("btnAreaLayer", _reachAreaLayerId);
    	
    },
    
    executeQuery: function(feature, type){
    	
    	console.info("선택리치아이디 : " + feature.attributes.RCH_ID); // 선택 리치아이디
    	console.info("상류우측유입아이디 : " + feature.attributes.RUP_RCH_ID);
    	console.info("상류좌측유입아이디 : " + feature.attributes.LUP_RCH_ID);
    	console.info("하류유출아이디 : " + feature.attributes.LOO_RCH_ID);
    	
    	require(["esri/symbols/SimpleLineSymbol", "esri/Color", "esri/tasks/query", "esri/tasks/QueryTask"], function(SimpleLineSymbol, Color, Query, QueryTask){
    		
    		queryTask = new QueryTask(_mapServiceUrl + "/" + _reachLineLayerId);
    		query = new Query();
			query.returnGeometry = true;
			query.outFields = ["*"];
			
			var rupRchId = feature.attributes.RUP_RCH_ID;
			var lupRchId = feature.attributes.LUP_RCH_ID;
			var looRchId = feature.attributes.LOO_RCH_ID;
			
			if(type == "up"){
				if(rupRchId != "00000000"){
					query.where = "RCH_ID = '" + rupRchId + "'";
					queryTask.execute(query, me.upLineDraw_auto);
				}
				
				if(lupRchId != "00000000"){
					query.where = "RCH_ID = '" + lupRchId + "'";
					queryTask.execute(query, me.upLineDraw_auto);
				}
			}
			
			if(type == "down"){
				if(looRchId != "00000000"){
					query.where = "RCH_ID = '" + looRchId + "'";
					queryTask.execute(query, me.downLineDraw_auto);
				}
			}
    	});
			
    },
    
    upLineDraw_auto: function(featureSet){
    	
    	var me = GetCoreMap(); // this 사용하지 말자.
    	
    	console.info(featureSet.features);
    	
    	require(["esri/symbols/SimpleLineSymbol", "esri/Color", "esri/tasks/query", "esri/layers/FeatureLayer"], function(SimpleLineSymbol, Color, Query, FeatureLayer){
    		var lineSelectionSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([237, 20, 91]), 5);
        	
        	var selectQuery = new Query();
        	
        	for(var i = 0; i < featureSet.features.length; i++){
	        	selectQuery.geometry = featureSet.features[i].geometry;
	        	selectQuery.where = "RCH_ID = '" + featureSet.features[i].attributes.RCH_ID + "'";
	        	me.reachLayerAdmin.reachLinelayer.selectFeatures(selectQuery, FeatureLayer.SELECTION_ADD); // 리치라인 셀렉트
	        	
	        	selectQuery.where = "CAT_ID = '" + featureSet.features[i].attributes.CAT_ID + "'";
	        	me.reachLayerAdmin.reachArealayer.selectFeatures(selectQuery, FeatureLayer.SELECTION_ADD); // 집수구역 셀렉트
        		
        		var graphic = featureSet.features[i];
        		graphic.setSymbol(lineSelectionSymbol);
        		me.map.graphics.add(graphic);
        		
        		me.reachLayerAdmin.executeQuery(featureSet.features[i], "up");
        	}
    	});
    },
    
    downLineDraw_auto: function(featureSet){
    	
    	var me = GetCoreMap(); // this 사용하지 말자.
    	
    	console.info(featureSet.features);
    	
    	require(["esri/symbols/SimpleLineSymbol", "esri/Color", "esri/tasks/query", "esri/layers/FeatureLayer"], function(SimpleLineSymbol, Color, Query, FeatureLayer){
    		var lineSelectionSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 170, 0]), 5);
        	
        	var selectQuery = new Query();
        	
        	for(var i = 0; i < featureSet.features.length; i++){
	        	selectQuery.geometry = featureSet.features[i].geometry;
	        	selectQuery.where = "RCH_ID = '" + featureSet.features[i].attributes.RCH_ID + "'";
	        	me.reachLayerAdmin.reachLinelayer.selectFeatures(selectQuery, FeatureLayer.SELECTION_ADD); // 리치라인 셀렉트
	        	
	        	selectQuery.where = "CAT_ID = '" + featureSet.features[i].attributes.CAT_ID + "'";
	        	me.reachLayerAdmin.reachArealayer.selectFeatures(selectQuery, FeatureLayer.SELECTION_ADD); // 집수구역 셀렉트
        		
        		var graphic = featureSet.features[i];
        		graphic.setSymbol(lineSelectionSymbol);
        		me.map.graphics.add(graphic);
        		
        		me.reachLayerAdmin.executeQuery(featureSet.features[i], "down");
        	}
    	});
    },
    
    upLineDraw: function(featureSet){
    	var me = GetCoreMap(); // this 사용하지 말자.
    	console.info(featureSet);
    	require(["esri/symbols/SimpleLineSymbol", "esri/Color", "esri/tasks/query", "esri/layers/FeatureLayer"], function(SimpleLineSymbol, Color, Query, FeatureLayer){
    		var lineSelectionSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([237, 20, 91]), 5);
        	//me.reachLayerAdmin.reachLinelayer.setSelectionSymbol(lineSelectionSymbol);
        	
        	var selectQuery = new Query();
        	
        	for(var i = 0; i < featureSet.features.length; i++){
	        	selectQuery.geometry = featureSet.features[i].geometry;
	        	selectQuery.where = "RCH_ID = '" + featureSet.features[i].attributes.RCH_ID + "'";
	        	me.reachLayerAdmin.reachLinelayer.selectFeatures(selectQuery, FeatureLayer.SELECTION_ADD); // 리치라인 셀렉트
	        	
	        	selectQuery.where = "CAT_ID = '" + featureSet.features[i].attributes.INODE_ID + "'";
	        	me.reachLayerAdmin.reachArealayer.selectFeatures(selectQuery, FeatureLayer.SELECTION_ADD); // 집수구역 셀렉트
        		
        		var graphic = featureSet.features[i];
        		graphic.setSymbol(lineSelectionSymbol);
        		me.map.graphics.add(graphic);
        	}
        	
        	// 버튼 On/Off
        	var currCtl = SetBtnOnOff("btnAreaLayer");
        	ReachLayerOnOff("btnAreaLayer", _reachAreaLayerId);
    	});
    },
    
    downLineDraw: function(featureSet){
    	var me = GetCoreMap(); // this 사용하지 말자.
    	
    	require(["esri/symbols/SimpleLineSymbol", "esri/Color", "esri/tasks/query", "esri/layers/FeatureLayer"], function(SimpleLineSymbol, Color, Query, FeatureLayer){
    		var lineSelectionSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 170, 0]), 5);
        	//me.reachLayerAdmin.reachLinelayer.setSelectionSymbol(lineSelectionSymbol);
        	
        	var selectQuery = new Query();
        	
        	for(var i = 0; i < featureSet.features.length; i++){
	        	selectQuery.geometry = featureSet.features[i].geometry;
	        	selectQuery.where = "RCH_ID = '" + featureSet.features[i].attributes.RCH_ID + "'";
	        	me.reachLayerAdmin.reachLinelayer.selectFeatures(selectQuery, FeatureLayer.SELECTION_ADD); // 리치라인 셀렉트
	        	
	        	selectQuery.where = "CAT_ID = '" + featureSet.features[i].attributes.INODE_ID + "'";
	        	me.reachLayerAdmin.reachArealayer.selectFeatures(selectQuery, FeatureLayer.SELECTION_ADD); // 집수구역 셀렉트
	        	
        		var graphic = featureSet.features[i];
        		graphic.setSymbol(lineSelectionSymbol);
        		me.map.graphics.add(graphic);
        	}
        	
        	// 버튼 On/Off
        	var currCtl = SetBtnOnOff("btnAreaLayer");
        	ReachLayerOnOff("btnAreaLayer", _reachAreaLayerId);
    	});
    },
    
    endLineDraw: function(evt){
    	//console.info(evt);
    	require(["esri/symbols/SimpleLineSymbol", "esri/Color", "esri/tasks/query", "esri/tasks/QueryTask"], function(SimpleLineSymbol, Color, Query, QueryTask){
    		
    		queryTask = new QueryTask(_mapServiceUrl + "/" + _reachLineLayerId);
    		query = new Query();
			query.returnGeometry = true;
			query.outFields = ["*"];
			
			query.where = "RCH_ID = '" + evt[0].attributes.RCH_ID + "'";
			queryTask.execute(query, me.endLineRemove);
    	});
    },
    
    endLineRemove: function(featureSet){
    	for(var i = 0; i < featureSet.features.length; i++){
    		var graphic = featureSet.features[i];
    		//console.info(graphic);
    		//graphic.setSymbol(lineSelectionSymbol);
    		me.map.graphics.remove(graphic);
    		
    		// 버튼 On/Off
        	var currCtl = SetBtnOnOff("btnAreaLayer");
        	ReachLayerOnOff("btnAreaLayer", _reachAreaLayerId);
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
	 		me.map.graphics.add(new Graphic(geom, startSymbol));
	 	});
    	
    	// 버튼 On/Off
		var currCtl = SetBtnOnOff(btnId);
		me.reachLayerAdmin.drawEnd();
    },
    
    // selectFeatures 콜백 매서드
    startFeatureSelect: function(objs){
    	var me = GetCoreMap(); // this 사용하지 말자.
    	me.reachLayerAdmin.reachSelected(objs);
    	
    	// 상류 10개, 하류 10개 리치선택 로직 들어갈 곳.
    	console.info(objs[0].attributes.RCH_ID);
    	// 하류(255, 170, 0), 상류(237, 20, 91), 선택(0, 255, 255)
    	console.info(me.reachLayerAdmin.reachIds1.indexOf(objs[0].attributes.RCH_ID));
    	var reachIds1Idx = me.reachLayerAdmin.reachIds1.indexOf(objs[0].attributes.RCH_ID);
    	var reachIds2Idx = me.reachLayerAdmin.reachIds2.indexOf(objs[0].attributes.RCH_ID);
    	
    	if(reachIds1Idx > -1){
    		console.info("1");
    		var reachIdsUp = "";
    		var reachIdsDown = "";
    		for(var i = 0; i < me.reachLayerAdmin.reachIds1.length; i ++){
    			if(me.reachLayerAdmin.reachIds1[i] < objs[0].attributes.RCH_ID)
    				reachIdsUp += "'" + me.reachLayerAdmin.reachIds1[i] + "', ";
    			if(me.reachLayerAdmin.reachIds1[i] > objs[0].attributes.RCH_ID)
    				reachIdsDown += "'" + me.reachLayerAdmin.reachIds1[i] + "', ";
    		}
    		reachIdsUp = reachIdsUp.substring(0, reachIdsUp.length - 2);
    		reachIdsDown = reachIdsDown.substring(0, reachIdsDown.length - 2);
    		
    		//console.info(reachIdsUp);
    		//console.info(reachIdsDown);
    		
    		require(["esri/symbols/SimpleLineSymbol", "esri/Color", "esri/tasks/query", "esri/tasks/QueryTask"], function(SimpleLineSymbol, Color, Query, QueryTask){
    			
    			queryTask = new QueryTask(_mapServiceUrl + "/" + _reachLineLayerId);

    			  //initialize query
    			  query = new Query();
    			  query.returnGeometry = true;
    			  query.outFields = ["*"];
    			  query.where = "RCH_ID IN (" + reachIdsUp + ")";
    			  //query.where = "1=1";
    			  queryTask.execute(query, me.reachLayerAdmin.showResults);
    			  
    			 /*
    			me.reachLinelayer.selectFeatures(selectQuery, FeatureLayer.SELECTION_ADD, me.startFeatureSelect);
    			
    			me.reachLayerAdmin.reachLinelayer.setDefinitionExpression("RCH_ID IN ('10130301')");
        		var lineSelectionSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 255, 255]), 5);
            	var renderer = new esri.renderer.SimpleRenderer(lineSelectionSymbol);
        		me.reachLayerAdmin.reachLinelayer.setRenderer(renderer);
        		*/
    		});
    	}
    	
    	if(reachIds2Idx > -1){
    		console.info("2");
    	}
    	
    	me.reachLayerAdmin.drawEnd();
    },
    
    showResults: function(featureSet){
    	var me = GetCoreMap(); // this 사용하지 말자.
    	//me.reachLinelayer.selectFeatures(selectQuery, FeatureLayer.SELECTION_ADD, me.startFeatureSelect);
    	console.info(me.reachLayerAdmin.reachLinelayer);
    	console.info(featureSet.features[0]);
    	
    	require(["esri/symbols/SimpleLineSymbol", "esri/Color", "esri/tasks/query", "esri/layers/FeatureLayer"], function(SimpleLineSymbol, Color, Query, FeatureLayer){
    		var lineSelectionSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 0, 0]), 5);
        	var graphic = featureSet.features[0];
        	graphic.setSymbol(lineSelectionSymbol);
        	//me.map.graphics.add(graphic);
        	
        	
        	me.reachLayerAdmin.reachLinelayer.setSelectionSymbol(lineSelectionSymbol);
        	var selectQuery = new Query();
        	
        	for(var i = 0; i < featureSet.features.length; i++){
	        	selectQuery.geometry = featureSet.features[i].geometry;
	        	selectQuery.where = "RCH_ID IN ('" + featureSet.features[i].attributes.RCH_ID + "')";
	        	me.reachLayerAdmin.reachLinelayer.selectFeatures(selectQuery, FeatureLayer.SELECTION_ADD);
        	}
    	});
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
	 		me.map.graphics.add(new Graphic(geom, endSymbol));
	 	});
    	
    	// 버튼 On/Off
		var currCtl = SetBtnOnOff(btnId);
		me.reachLayerAdmin.drawEnd();
    },
    
    // selectFeatures 콜백 매서드
    endFeatureSelect: function(objs){
    	var me = GetCoreMap(); // this 사용하지 말자.
    	me.reachLayerAdmin.reachSelected(objs);
    	
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
    	
    	me.selectionToolbar.deactivate();
    	me.map.enablePan();
    	//me.map.enableMapNavigation();
    	
    	Ext.get('_mapDiv__gc').setStyle('cursor','default');
    }
});