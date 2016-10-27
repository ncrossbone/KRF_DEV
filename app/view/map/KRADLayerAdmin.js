Ext.define("KRF_DEV.view.map.KRADLayerAdmin", {
	
	id: "kradLayerAdmin",
	
	map: null,
	kradInfo: null,
	
	kradPointLayer: null,
	
	mouseOverObj_P: null,
	mouseOutObj_P: null,
	mouseClickObj_P: null,
	
	drawOption: null,
	rchMouseEvt: null,
	mousSymbol: null,
	rchIds: null,
	
	/* Point Symbol */
	basicSymbol_P: null,
	mouseOverSymbol_P: null,
	mouseOutSymbol_P: null,
	drawSymbol_P: null,
	
	/* Line Symbol */
	basicSymbol_L: null,
	mouseOverSymbol_L: null,
	mouseoutSymbol_L: null,
	drawSymbol_L:null,
	
	/* Area Symbol */
	basicSymbol_A: null,
	mouseOverSymbol_A: null,
	mouseoutSymbol_A: null,
	drawSymbol_A:null,
	
	constructor: function(map) {
		
		var me = this;
        me.map = map;
        
        /* khLee Test 임시 설정 개발완료 후 삭제할것.. */
        var confObj = {isBonDraw:true, isJiDraw:true, isKRAD:true};
		localStorage['_searchConfigInfo_'] = JSON.stringify(confObj);
		
		me.kradInfo = [{
			EXT_DATA_ID: "OBS_WQ_STR_EV",
			TITLE: "하천 수질 관측소",
			CHECKED: true,
			EVENT_TYPE: "Point",
			DATA_LAYER_ID: 5,
			ORIGIN_LAYER_ID: null,
			PE_LAYER_ID: 6,
			LE_LAYER_ID: 7,
			AE_LAYER_ID: 8
		}, {
			EXT_DATA_ID: "ACCD_1024_EV",
			TITLE: "오염사고경로",
			CHECKED: true,
			EVENT_TYPE: "Line",
			DATA_LAYER_ID: 3,
			ORIGIN_LAYER_ID: 2,
			PE_LAYER_ID: 0,
			LE_LAYER_ID: 1,
			AE_LAYER_ID: 4
		}];
		/* khLee Test 임시 설정 개발완료 후 삭제할것.. 끝 */
		
		require(["esri/symbols/SimpleMarkerSymbol",
		         "dojo/_base/Color",
		         "esri/layers/GraphicsLayer"],
				function(SimpleMarkerSymbol,
						Color,
						GraphicsLayer){
			
			/* 심볼 설정 */
			me.basicSymbol_P = new SimpleMarkerSymbol();
			me.basicSymbol_P.setStyle(SimpleMarkerSymbol.STYLE_CIRCLE);
			me.basicSymbol_P.setSize(10);
			me.basicSymbol_P.setColor(new Color([255,0,0,1]));
			
			me.mouseOverSymbol_P = new SimpleMarkerSymbol();
			me.mouseOverSymbol_P.setStyle(SimpleMarkerSymbol.STYLE_CIRCLE);
			me.mouseOverSymbol_P.setSize(30);
			me.mouseOverSymbol_P.setColor(new Color([255,0,0,1]));
			
			me.mouseOutSymbol_P = new SimpleMarkerSymbol();
			me.mouseOutSymbol_P.setStyle(SimpleMarkerSymbol.STYLE_CIRCLE);
			me.mouseOutSymbol_P.setSize(10);
			me.mouseOutSymbol_P.setColor(new Color([255,0,0,1]));
			
			me.drawSymbol_P = new SimpleMarkerSymbol();
			me.drawSymbol_P.setStyle(SimpleMarkerSymbol.STYLE_CIRCLE);
			me.drawSymbol_P.setSize(10);
			me.drawSymbol_P.setColor(new Color([255,0,0,1]));
			/* 심볼 설정 끝 */
			
			me.kradPointLayer = new GraphicsLayer();
			me.kradPointLayer.id = "kradPointLayer";
			me.kradPointLayer.visible = true;
			me.map.addLayer(me.kradPointLayer);
		});
    },
    
    drawDataGrp: function(rchIds, evtType, drawOption, rchMouseEvt){
    	
    	var me = this;
    	var coreMap = GetCoreMap();
    	
    	me.drawOption = drawOption;
    	me.rchMouseEvt = rchMouseEvt;
    	me.rchIds = rchIds;
    	
    	if(me.drawOption == "startPoint"){
    		me.mousSymbol = coreMap.reachLayerAdmin_v3_New.startSymbol;
    	}
    	if(me.drawOption == "startPoint"){
    		me.mousSymbol = coreMap.reachLayerAdmin_v3_New.endSymbol;
    	}
    	
    	var where = "";
    	
    	if(rchIds.length == 1){
			where = "RCH_ID = #RCH_ID#";
		}
		else{
			where = "RCH_ID IN (#RCH_ID#)";
		}
    	
    	var strRchId = "";
		
		for(var i = 0; i < rchIds.length; i++){
			strRchId += "'" + rchIds[i] + "', ";
		}
		
		strRchId = strRchId.substring(0, strRchId.length - 2);
		
		where = where.replace("#RCH_ID#", strRchId);
    	
    	require(["esri/tasks/QueryTask",
		         "esri/tasks/query",
		         "esri/symbols/SimpleMarkerSymbol",
		         "dojo/_base/Color",
		         "esri/layers/GraphicsLayer"],
		         function(QueryTask,
		        		 Query,
		        		 SimpleMarkerSymbol,
		        		 Color,
		        		 GraphicsLayer){
    		
	    	for(var i = 0; i < me.kradInfo.length; i++){
	    		
	    		if(me.kradInfo[i].CHECKED == true && evtType == me.kradInfo[i].EVENT_TYPE){
    				
    				var queryTask = new QueryTask(_kradInfo.kradServiceUrl + "/" + me.kradInfo[i].DATA_LAYER_ID);
    				var query = new Query();
    				query.returnGeometry = true;
    				query.outFields = ["*"];
    				query.where = where + " AND EXT_DATA_ID = '" + me.kradInfo[i].EXT_DATA_ID + "'";
    				
    				queryTask.execute(query, function(featureSet){
    					
    					me.drawGraphic(featureSet, evtType);
    				});
    			}
    		}
	    	
	    	me.onMouseOver(evtType);
	    	me.onMouseOut(evtType);
    	});
    },
    drawGraphic: function(featureSet, evtType){
    	
    	var me = this;
    	
    	for(var i = 0; i < featureSet.features.length; i++){
			
			var graphic = featureSet.features[i];
			
			if(evtType == "Point"){
				graphic.setSymbol(me.basicSymbol_P);
				me.kradPointLayer.add(graphic);
			}
		}
    },
    onMouseOver: function(evtType){
    	
    	var me = this;
    	
    	require(["dojo/on"],
				function(on){
    		
	    	if(evtType == "Point"){
	    		
		    	me.mouseOverObj_P = on(me.kradPointLayer, "mouse-over", function(evt){
		    		
		    		evt.graphic.setSymbol(me.mouseOverSymbol_P);
		    	});
	    	}
    	});
    },
    onMouseOut: function(evtType){
    	
    	var me = this;
    	
    	require(["dojo/on"],
				function(on){
    		
	    	if(evtType == "Point"){
	    		
		    	me.mouseOutObj_P = on(me.kradPointLayer, "mouse-out", function(evt){
		    		
		    		evt.graphic.setSymbol(me.mouseOutSymbol_P);
		    	});
	    	}
    	});
    },
    onMouseClick: function(evtType){
    	
    	var me = this;
    	var coreMap = GetCoreMap();
    	
    	var where = "";
		if(me.rchIds.length == 1){
			where = "RCH_ID = #RCH_ID#";
		}
		else{
			where = "RCH_ID IN (#RCH_ID#)";
		}
		
		var strRchId = "";
		for(var i = 0; i < me.rchIds.length; i++){
			strRchId += "'" + me.rchIds[i] + "', ";
		}
		
		strRchId = strRchId.substring(0, strRchId.length - 2);
		
		where = where.replace("#RCH_ID#", strRchId);
    	
    	require(["dojo/on"],
				function(on){
    		
    		me.mouseClickObj_P = on(me.kradPointLayer, "click", function(evt){
	    		
		    	coreMap.reachLayerAdmin_v3_New.drawEnd(btnId);
				coreMap.reachLayerAdmin_v3_New.drawSymbol(evt.graphic.geometry, me.mousSymbol, me.drawOption); // 심볼 그리기
				coreMap.reachLayerAdmin_v3_New.selectLineWithWhere(where, me.drawOption); // 라인 검색
				
				kradPELayer_mouseout.remove();
				kradPELayer_mouseover.remove();
				kradPELayer_click.remove();
				
				evt.graphic.setSymbol(outSymbol);
				kradPELayer.setVisibility(false);
				
				me.close();
	    	});
    	});
    }
});