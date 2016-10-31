drawPointData = function(rchIds, extDataId, evt, drawOption){
	
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
		
		var queryTask = new QueryTask(_kradInfo.kradServiceUrl + "/" + _kradInfo.수질측정소_하천수_PD_RAD);
		var query = new Query();
		query.returnGeometry = true;
		query.outFields = ["*"];
		
		if(rchIds.length == 1){
			query.where = "RCH_ID = #RCH_ID#";
		}
		else{
			query.where = "RCH_ID IN (#RCH_ID#)";
		}
		
		var strRchId = "";
		for(var i = 0; i < rchIds.length; i++){
			strRchId += "'" + rchIds[i] + "', ";
		}
		
		strRchId = strRchId.substring(0, strRchId.length - 2);
		
		query.where = query.where.replace("#RCH_ID#", strRchId);
		query.where += " AND DATA_FLAG = 'D' AND EXT_DATA_ID = '" + extDataId + "'";
		
		queryTask.execute(query, function(featureSet){
			
			var symbol = new SimpleMarkerSymbol();
			symbol.setStyle(SimpleMarkerSymbol.STYLE_SQUARE);
			symbol.setSize(20);
			symbol.setColor(new Color([0,255,0,1]));
			
			var coreMap = GetCoreMap();
			
			// 포인트 데이터 레이어
			var kradPDLayer = new GraphicsLayer();
			kradPDLayer.id = "kradPDLayer";
			kradPDLayer.visible = false;
			coreMap.map.addLayer(kradPDLayer);
			
			for(var i = 0; i < featureSet.features.length; i++){
				
				var graphic = featureSet.features[i];
				graphic.setSymbol(symbol);
				
				kradPDLayer.add(graphic);
			}
			
			/* 이벤트 포인트 그리기 */
			drawPointEvent(rchIds, extDataId, evt, drawOption);
		});
		
	});
}

drawPointEvent = function(rchIds, extDataId, evt, drawOption){
	
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
		
		var queryTask = new QueryTask(_kradInfo.kradServiceUrl + "/" + _kradInfo.수질측정소_하천수_PE_RAD);
		var query = new Query();
		query.returnGeometry = true;
		query.outFields = ["*"];

		if(rchIds.length == 1){
			query.where = "RCH_ID = #RCH_ID#";
		}
		else{
			query.where = "RCH_ID IN (#RCH_ID#)";
		}
		
		var strRchId = "";
		for(var i = 0; i < rchIds.length; i++){
			strRchId += "'" + rchIds[i] + "', ";
		}
		
		strRchId = strRchId.substring(0, strRchId.length - 2);
		
		query.where = query.where.replace("#RCH_ID#", strRchId);
		query.where += " AND DATA_FLAG = 'E' AND EXT_DATA_ID = '" + extDataId + "'";
		
		queryTask.execute(query, function(featureSet){
			
			var symbol = new SimpleMarkerSymbol();
			symbol.setStyle(SimpleMarkerSymbol.STYLE_CIRCLE);
			symbol.setSize(10);
			symbol.setColor(new Color([255,0,0,1]));
			
			var coreMap = GetCoreMap();
			
			// 포인트 이벤트 레이어
			var kradPELayer = new GraphicsLayer();
			kradPELayer.id = "kradPELayer";
			kradPELayer.visible = false;
			coreMap.map.addLayer(kradPELayer);
			
			for(var i = 0; i < featureSet.features.length; i++){
				
				var graphic = featureSet.features[i];
				graphic.setSymbol(symbol);
				
				kradPELayer.add(graphic);
			}

			/* 이벤트 라인 그리기 */
			drawLineEvent(rchIds, extDataId, evt, drawOption);
		});
		
	});
}

drawLineEvent = function(rchIds, extDataId, evt, drawOption){
	
	require(["esri/tasks/QueryTask",
	         "esri/tasks/query",
	         "esri/symbols/SimpleLineSymbol",
	         "dojo/_base/Color",
	         "esri/layers/GraphicsLayer"],
	         function(QueryTask,
	        		 Query,
	        		 SimpleLineSymbol,
	        		 Color,
	        		 GraphicsLayer){
		
		var queryTask = new QueryTask(_kradInfo.kradServiceUrl + "/" + _kradInfo.수질측정소_하천수_LE_RAD);
		var query = new Query();
		query.returnGeometry = true;
		query.outFields = ["*"];

		if(rchIds.length == 1){
			query.where = "RCH_ID = #RCH_ID#";
		}
		else{
			query.where = "RCH_ID IN (#RCH_ID#)";
		}
		
		var strRchId = "";
		for(var i = 0; i < rchIds.length; i++){
			strRchId += "'" + rchIds[i] + "', ";
		}
		
		strRchId = strRchId.substring(0, strRchId.length - 2);
		
		query.where = query.where.replace("#RCH_ID#", strRchId);
		query.where += " AND DATA_FLAG = 'E' AND EXT_DATA_ID = '" + extDataId + "'";
		
		queryTask.execute(query, function(featureSet){
			
			var coreMap = GetCoreMap();
			
			// 라인 이벤트 레이어
			var kradLELayer = new GraphicsLayer();
			kradLELayer.id = "kradLELayer";
			kradLELayer.visible = false;
			coreMap.map.addLayer(kradLELayer);
			
			for(var i = 0; i < featureSet.features.length; i++){
				
				var graphic = featureSet.features[i];
				
				if(graphic.attributes.EVENT_ORDER % 2 == 0)
					symbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 255, 0]), 5);
				else
					symbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 255, 255]), 5);
				
				graphic.setSymbol(symbol);
				
				kradLELayer.add(graphic);
			}
			
			/* 이벤트 집수구역 그리기 */
			drawAreaEvent(rchIds, extDataId, evt, drawOption);
		});
		
	});
}

drawAreaEvent = function(rchIds, extDataId, evt, drawOption){
	
	require(["esri/tasks/QueryTask",
	         "esri/tasks/query",
	         "esri/symbols/SimpleFillSymbol",
	         "esri/symbols/SimpleLineSymbol",
	         "dojo/_base/Color",
	         "esri/layers/GraphicsLayer"],
	         function(QueryTask,
	        		 Query,
	        		 SimpleFillSymbol,
	        		 SimpleLineSymbol,
	        		 Color,
	        		 GraphicsLayer){
		
		var queryTask = new esri.tasks.QueryTask(_kradInfo.kradServiceUrl + "/" + _kradInfo.수질측정소_하천수_AE_RAD);
		var query = new esri.tasks.Query();
		query.returnGeometry = true;
		query.outFields = ["*"];

		if(rchIds.length == 1){
			query.where = "RCH_ID = #RCH_ID#";
		}
		else{
			query.where = "RCH_ID IN (#RCH_ID#)";
		}
		
		var strRchId = "";
		for(var i = 0; i < rchIds.length; i++){
			strRchId += "'" + rchIds[i] + "', ";
		}
		
		strRchId = strRchId.substring(0, strRchId.length - 2);
		
		query.where = query.where.replace("#RCH_ID#", strRchId);
		query.where += " AND DATA_FLAG = 'E' AND EXT_DATA_ID = '" + extDataId + "'";
		
		queryTask.execute(query, function(featureSet){
			
			var coreMap = GetCoreMap();
			
			// 라인 이벤트 레이어
			var kradAELayer = new GraphicsLayer();
			kradAELayer.id = "kradAELayer";
			kradAELayer.visible = false;
			coreMap.map.addLayer(kradAELayer);
			
			for(var i = 0; i < featureSet.features.length; i++){
				
				var graphic = featureSet.features[i];
				
				if(graphic.attributes.EVENT_ORDER % 2 == 0)
					symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT, new Color([0, 0, 0]), 2), new Color([0, 255, 0, 0.2]));
				else
					symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT, new Color([0, 0, 0]), 2), new Color([0, 0, 255, 0.2]));
				
				graphic.setSymbol(symbol);
				
				kradAELayer.add(graphic);
			}
			
			/* 팝업 메뉴 보이기 로직 작성.. */
			showKRADEvtPop(rchIds, evt, drawOption);
		});
	});
}

drawKRADEvtGrp = function(rchIds, evt, drawOption){
	
	//console.info(_kradInfo);
	//var rchId = "10071017";
	var extDataId = "OBS_WQ_STR_EV";
	// <== 리치검색 됐다고 치고..
	
	/* 실 지점 그리기 */
	drawPointData(rchIds, extDataId, evt, drawOption);
}

showKRADEvtPop = function(rchIds, evt, drawOption){
	
	var cursorX = _cursorX;
	var cursorY = _cursorY;
	var bodyWidth = Ext.getBody().getWidth();
	var bodyHeight = Ext.getBody().getHeight();
	var popWidth = 80;
	var popHeight = 120;
	
	if(_cursorX > bodyWidth - popWidth){
		cursorX = bodyWidth - popWidth;
	}
	if(_cursorY > bodyHeight - popHeight){
		cursorY = bodyHeight - popHeight;
	}
	
	var popupMenu = Ext.getCmp("kradEvtPop");
	if(popupMenu == undefined){
		popupMenu = Ext.create("KRF_DEV.view.krad.kradEvtPop", {
			width: popWidth,
			height: popHeight,
			x: cursorX,
			y: cursorY,
			rchIds: rchIds,
			evt: evt,
			drawOption: drawOption,
			style:"background-image: url(./resources/images/button/option_bg1.png); border:0px;"
		}).show();
	}
	else{
		popupMenu.setX(cursorX);
		popupMenu.setY(cursorY);
	}
}

drawKRADLayer = function(){
	
	var coreMap = GetCoreMap();
	
	var kradStRchId = coreMap.kradLayerAdmin.stRchId;
	var kradEdRchId = coreMap.kradLayerAdmin.edRchId;
	
	var reachLineGraphics = coreMap.reachLayerAdmin_v3_New.lineGrpLayer.graphics;
	
	for(var i = 0; i < reachLineGraphics.length; i++){
		
		var rchId = reachLineGraphics[i].attributes.RCH_ID;
		if(rchId == kradStRchId || rchId == kradEdRchId){
			
			coreMap.reachLayerAdmin_v3_New.removeLine(reachLineGraphics[i], "lineGrpLayer");
		}
	}
	
	coreMap.kradLayerAdmin.drawKRADLayer();
	
	return;
	
	var kradPELayer = coreMap.map.getLayer("kradPELayer");
	var kradStRchId = kradPELayer.ST_RCH_ID;
	var kradEdRchId = kradPELayer.ED_RCH_ID;
	
	var comDownRchId = coreMap.reachLayerAdmin_v3_New.grpCommDownLine.attributes.RCH_ID;
	var reachLineGraphics = coreMap.reachLayerAdmin_v3_New.lineGrpLayer.graphics;
	
	for(var i = 0; i < reachLineGraphics.length; i++){
		
		var rchId = reachLineGraphics[i].attributes.RCH_ID;
		if(rchId == kradStRchId || rchId == kradEdRchId){
			
			coreMap.reachLayerAdmin_v3_New.removeLine(reachLineGraphics[i], "lineGrpLayer");
		}
	}
	
	var kradLEGraphics = coreMap.map.getLayer("kradLELayer").graphics;
	var kradAEGraphics = coreMap.map.getLayer("kradAELayer").graphics;
	
	// 시작위치 KRAD
	if(kradPELayer.ST_RCH_ID == comDownRchId){
	
		for(var i = 0; i < kradLEGraphics.length; i++){
		
			if(kradLEGraphics[i].attributes.EVENT_ORDER <= kradPELayer.ST_EVENT_ORDER){
				
				coreMap.reachLayerAdmin_v3_New.addGraphics(kradLEGraphics[i], "lineGrpLayer");
			}
		}
		
		for(var i = 0; i < kradAEGraphics.length; i++){
			
			if(kradAEGraphics[i].attributes.EVENT_ORDER <= kradPELayer.ST_EVENT_ORDER){
				
				coreMap.reachLayerAdmin_v3_New.addGraphics(kradAEGraphics[i], "areaGrpLayer");
			}
		}
	}
	else{
		
		for(var i = 0; i < kradLEGraphics.length; i++){
			
			if(kradLEGraphics[i].attributes.EVENT_ORDER > kradPELayer.ST_EVENT_ORDER){
				
				coreMap.reachLayerAdmin_v3_New.addGraphics(kradLEGraphics[i], "lineGrpLayer");
			}
		}
		
		for(var i = 0; i < kradAEGraphics.length; i++){
			
			if(kradAEGraphics[i].attributes.EVENT_ORDER > kradPELayer.ST_EVENT_ORDER){
				
				coreMap.reachLayerAdmin_v3_New.addGraphics(kradAEGraphics[i], "areaGrpLayer");
			}
		}
	}
}