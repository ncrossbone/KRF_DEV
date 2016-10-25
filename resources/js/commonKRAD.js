drawPointData = function(rchId, extDataId){
	
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
		query.where = "RCH_ID = '" + rchId + "' AND DATA_FLAG = 'D' AND EXT_DATA_ID = '" + extDataId + "'";
		
		queryTask.execute(query, function(featureSet){
			
			console.info(featureSet);
			
			var symbol = new SimpleMarkerSymbol();
			symbol.setStyle(SimpleMarkerSymbol.STYLE_SQUARE);
			symbol.setSize(20);
			symbol.setColor(new Color([0,255,0,1]));
			
			var coreMap = GetCoreMap();
			
			// 포인트 데이터 레이어
			var kradPDLayer = new GraphicsLayer();
			kradPDLayer.id = "kradPDLayer";
			coreMap.map.addLayer(kradPDLayer);
			
			for(var i = 0; i < featureSet.features.length; i++){
				
				var graphic = featureSet.features[i];
				graphic.setSymbol(symbol);
				
				kradPDLayer.add(graphic);
			}
			
		});
		
	});
}

drawPointEvent = function(rchId, extDataId){
	
	require(["esri/tasks/QueryTask",
	         "esri/tasks/query",
	         "esri/symbols/SimpleMarkerSymbol",
	         "dojo/_base/Color"],
	         function(QueryTask,
	        		 Query,
	        		 SimpleMarkerSymbol,
	        		 Color){
		
		var queryTask = new QueryTask(_kradInfo.kradServiceUrl + "/" + _kradInfo.수질측정소_하천수_PE_RAD);
		var query = new Query();
		query.returnGeometry = true;
		query.outFields = ["*"];
		query.where = "RCH_ID = '" + rchId + "' AND DATA_FLAG = 'E' AND EXT_DATA_ID = '" + extDataId + "'";
		
		queryTask.execute(query, function(featureSet){
			
			console.info(featureSet);
			
			var symbol = new SimpleMarkerSymbol();
			symbol.setStyle(SimpleMarkerSymbol.STYLE_CIRCLE);
			symbol.setSize(10);
			symbol.setColor(new Color([255,0,0,1]));
			
			for(var i = 0; i < featureSet.features.length; i++){
				var graphic = featureSet.features[i];
				graphic.setSymbol(symbol);
				
				var map = GetCoreMap().map;
				map.graphics.add(graphic);
			}
			
		});
		
	});
}

drawLineEvent = function(rchId, extDataId){
	
	require(["esri/tasks/QueryTask",
	         "esri/tasks/query",
	         "esri/symbols/SimpleLineSymbol",
	         "dojo/_base/Color"],
	         function(QueryTask,
	        		 Query,
	        		 SimpleLineSymbol,
	        		 Color){
		
		var queryTask = new QueryTask(_kradInfo.kradServiceUrl + "/" + _kradInfo.수질측정소_하천수_LE_RAD);
		var query = new Query();
		query.returnGeometry = true;
		query.outFields = ["*"];
		query.where = "RCH_ID = '" + rchId + "' AND DATA_FLAG = 'E' AND EXT_DATA_ID = '" + extDataId + "'";
		
		queryTask.execute(query, function(featureSet){
			
			console.info(featureSet);
			
			for(var i = 0; i < featureSet.features.length; i++){
				
				var symbol = null;
				
				if(i % 4 == 0)
					symbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 255, 0]), 5);
				else if(i % 4 == 1)
					symbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 0, 255]), 5);
				else if(i % 4 == 2)
					symbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 0, 0]), 5);
				else
					symbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 255, 0]), 5);
				
				var graphic = featureSet.features[i];
				graphic.setSymbol(symbol);
				
				var map = GetCoreMap().map;
				map.graphics.add(graphic);
			}
			
		});
		
	});
}

drawAreaEvent = function(rchId, extDataId){
	
	require(["esri/tasks/QueryTask",
	         "esri/tasks/query",
	         "esri/symbols/SimpleFillSymbol",
	         "esri/symbols/SimpleLineSymbol",
	         "dojo/_base/Color"],
	         function(QueryTask,
	        		 Query,
	        		 SimpleFillSymbol,
	        		 SimpleLineSymbol,
	        		 Color){
		
		var queryTask = new esri.tasks.QueryTask(_kradInfo.kradServiceUrl + "/" + _kradInfo.수질측정소_하천수_AE_RAD);
		var query = new esri.tasks.Query();
		query.returnGeometry = true;
		query.outFields = ["*"];
		query.where = "RCH_ID = '" + rchId + "' AND DATA_FLAG = 'E' AND EXT_DATA_ID = '" + extDataId + "'";
		
		queryTask.execute(query, function(featureSet){
			
			console.info(featureSet);
			
			for(var i = 0; i < featureSet.features.length; i++){
				
				var symbol = null;
				
				if(i % 4 == 0)
					symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT, new Color([0, 0, 0]), 2), new Color([0, 255, 0, 0.5]));
				else if(i % 4 == 1)
					symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT, new Color([0, 0, 0]), 2), new Color([0, 0, 255, 0.5]));
				else if(i % 4 == 2)
					symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT, new Color([0, 0, 0]), 2), new Color([255, 0, 0, 0.5]));
				else
					symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT, new Color([0, 0, 0]), 2), new Color([255, 255, 0, 0.5]));
				
				var graphic = featureSet.features[i];
				graphic.setSymbol(symbol);
				
				var map = GetCoreMap().map;
				map.graphics.add(graphic);
			}
		});
	});
}

showPopMenu = function(){
	
	console.info(_kradInfo);
	var rchId = "10071017";
	var extDataId = "OBS_WQ_STR_EV";
	// <== 리치검색 됐다고 치고..
	
	// 실 지점 그리기
	drawPointData(rchId, extDataId);
	// 이벤트 포인트 그리기
	drawPointEvent(rchId, extDataId);
	// 이벤트 라인 그리기
	drawLineEvent(rchId, extDataId);
	// 이벤트 집수구역 그리기
	drawAreaEvent(rchId, extDataId);
	
	var cursorX = _cursorX;
	var cursorY = _cursorY;
	var bodyWidth = Ext.getBody().getWidth();
	var bodyHeight = Ext.getBody().getHeight();
	var popWidth = 200;
	var popHeight = 300;
	
	if(_cursorX > bodyWidth - popWidth){
		cursorX = bodyWidth - popWidth;
	}
	if(_cursorY > bodyHeight - popHeight){
		cursorY = bodyHeight - popHeight;
	}
	
	var popupMenu = Ext.getCmp("kradPopMenu");
	if(popupMenu == undefined){
		popupMenu = Ext.create("KRF_DEV.view.krad.kradPopMenu", {
			store: Ext.create('KRF_DEV.store.west.Layer01Store'),
			width: popWidth,
			height: popHeight,
			x: cursorX,
			y: cursorY
		}).show();
	}
	else{
		popupMenu.setX(cursorX);
		popupMenu.setY(cursorY);
	}
	
	//popupMenu.close();
	popupMenu.show();
}