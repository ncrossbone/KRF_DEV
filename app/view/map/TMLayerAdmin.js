Ext.define("KRF_DEV.view.map.TMLayerAdmin", {
	
	constructor: function(inStrCatDids) {
		
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
                 "esri/graphic"],
		        function(QueryTask,
                		 Query,
                		 GraphicsLayer,
                		 SimpleFillSymbol,
                		 SimpleLineSymbol,
                		 Color,
                		 TextSymbol,
                		 Font,
                		 Graphic){
			
			var queryTask = new QueryTask("http://112.217.167.123:20002/arcgis/rest/services/reach_V3_TM/MapServer/2");
			
			var query = new Query();
	        query.returnGeometry = true;
	        query.outFields = ["*"];
	        query.outSpatialReference = {
	          "wkid": 102100
	        };
	        query.where = "CAT_DID IN (" + inStrCatDids + ")";
	        
	        queryTask.execute(query, function(tmCatFeatureSet){
	        	
	        	console.info(tmCatFeatureSet);
	        	
	        	// 집수구역 부하량 그래픽 레이어 생성
	        	coreMap.tmGraphicLayerCat = new GraphicsLayer({
	        		opacity: 0.5
	        	});
	        	
	        	// 집수구역 부하량 라벨 레이어 생성
	        	coreMap.tmLabelLayerCat = new GraphicsLayer({
	        		opacity: 1
	        	});
	        	
	        	var tmCatFeatures = tmCatFeatureSet.features;
	        	
	        	for(var i = 0; i < tmCatFeatures.length; i++){
	        		
	        		// 집수구역 부햐량 그래픽 지정
	        		var tmCatGraphic = tmCatFeatures[i];
	        		
	        		// 집수구역 부햐량 그래픽 심볼 생성
	        		var tmCatFillSymbol = new SimpleFillSymbol(
	        				SimpleFillSymbol.STYLE_SOLID,
	        				new SimpleLineSymbol(
	        						SimpleFillSymbol.STYLE_SOLID,
	        						new esri.Color([100, 255, 100]),
	        						1
	        				),
	        				new Color([255, 0, 0, 1])
	        		);
	        		
	        		// 집수구역 부하량 그래픽 심볼 지정
	        		tmCatGraphic.setSymbol(tmCatFillSymbol);
	        		
	        		// 집수구역 부하량 그래픽 레이어에 그래픽 추가
	        		coreMap.tmGraphicLayerCat.add(tmCatGraphic);
	        		
	        		/* 라벨 레이어 설정 */
	        		var centerPoint = getCenterFromGraphic(tmCatGraphic);
	        		
	        		console.info(tmCatGraphic.attributes.GNR_BOD_SU);
	        		
	        		var tmCatLabelSymbol = new esri.symbol.TextSymbol("Hello World" + i).setColor(
	        				new esri.Color([128,0,0])).setAlign(esri.symbol.Font.ALIGN_START).setAngle(0).setFont(
	        						new esri.symbol.Font("12pt").setWeight(esri.symbol.Font.WEIGHT_BOLD));
	        		
	        		var tmCatLabelGraphic = new Graphic(centerPoint, tmCatLabelSymbol);
	        		coreMap.tmLabelLayerCat.add(tmCatLabelGraphic);
	        		/* 라벨 레이어 설정 끝 */
	        	}
	        	
	        	// 맵에 집수구역 부하량 그래픽 레이어 추가
	        	coreMap.map.addLayer(coreMap.tmGraphicLayerCat);
	        	coreMap.map.addLayer(coreMap.tmLabelLayerCat);
	        	
	        	//console.info(coreMap.tmGraphicLayerCat.graphics);
	        });
		});
        
		//coreMap.map.addLayer(coreMap.tmLayerCat);
		
		//console.info(coreMap.tmLayerCat.graphics);
		
		/*require([
		         "esri/graphicsUtils"
		     ], function(
		         graphicsUtils
		     ) {
			
			var featureLayer = me.layer;
			var geometries = graphicsUtils.getGeometries(featureLayer.graphics);
			console.info(geometries);
		});*/
    }
});