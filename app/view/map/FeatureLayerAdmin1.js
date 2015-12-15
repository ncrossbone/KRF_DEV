Ext.define('KRF_DEV.view.map.FeatureLayerAdmin1', {
	map:null, 
	layerId: null,
	siteId: null,
	
	constructor: function(map) {
        var me = this;
        me.map = map;
        
        // 지점 이동 그래픽 레이어
        me.moveGraphicLayer = new esri.layers.GraphicsLayer();
		me.moveGraphicLayer.id="moveGraphicLayer";
		me.map.addLayer(me.moveGraphicLayer);
		
		// 집수구역 이동 그래픽 레이어
		me.moveCatGraphicLayer = new esri.layers.GraphicsLayer();
		me.moveCatGraphicLayer.id = "moveCatGraphicLayer";
		me.map.addLayer(me.moveCatGraphicLayer);
		
		// 리치라인 이동 그래픽 레이어
		me.moveRchGraphicLayer = new esri.layers.GraphicsLayer();
		me.moveRchGraphicLayer.id = "moveRchGraphicLayer";
		me.map.addLayer(me.moveRchGraphicLayer);
		
		me.movePopGraphicLayer = new esri.layers.GraphicsLayer();
		me.movePopGraphicLayer.id = "movePopGraphicLayer";
		me.map.addLayer(me.movePopGraphicLayer);
        
        KRF_DEV.getApplication().addListener('setSelectedSite', me.setSelectedSiteHandler, me);
        KRF_DEV.getApplication().addListener('setSelectedCatArea', me.setSelectedCatAreaHandler, me);
        KRF_DEV.getApplication().addListener('setSelectedRchLine', me.setSelectedRchLineHandler, me);
        
        KRF_DEV.getApplication().addListener('setSelectedPopSite', me.setSelectedPopSiteHandler, me);
    },
    
    
    
    
    setSelectedPopSiteHandler: function(layerId, siteId){
    	console.info("##");
		
    	var me = this;
    	
		var queryTask = new esri.tasks.QueryTask(_mapServiceUrl + "/" + layerId);
		var query = new esri.tasks.Query();
		query.returnGeometry = true;
		query.outSpatialReference = {"wkid":102100};
		query.outFields = ["*"];
		
		
		
		
		
		/*var selectedSymbol = new esri.symbol.PictureMarkerSymbol({
		    "angle": 0,
		    //"xoffset": 10,
		    //"yoffset": 35,
		    "type": "esriPMS",
		    //"url": "./resources/images/symbol/symbol_"+layerId+"_42x42.gif",
		    "url": "./resources/images/symbol/spot_09.png",
		    "contentType": "image/png",
		    "width": 25,
		    "height": 61,
		    "yoffset": 16,
		    "xoffset": 4
		});*/
		
		if(layerId == "11"){ // 사업장 TMS
			query.where =  "사업장코드='" + siteId + "'";
		}
		else if(layerId == "25" || layerId == "26" || layerId == "27"
			|| layerId == "28" || layerId == "29" || layerId == "30"
			|| layerId == "31" || layerId == "32"){ // 환경기초시설
			query.where = "시설코드='" + siteId + "'";
		}
		else if(layerId == "15" || layerId == "16" || layerId == "17"
			|| layerId == "18" || layerId == "19" || layerId == "20"
			|| layerId == "21"){ // 기타측정지점
			query.where = "관측소코드='" + siteId + "'";
		}
		else if(layerId == "23"){ // 수생태계조사지점
			query.where = "조사지코드='" + siteId + "'";
		}
		else{
			query.where = "측정소코드='" + siteId + "'";
		}
		
		queryTask.execute(query,  function(results){
			
			Ext.each(results.features, function(obj, index) {
				//console.info(obj);
				//me.map.on("click", function(evt){
					Ext.create("Ext.window.Window", {
						//renderTo: Ext.getBody(),
						header: false,
						shadow: false,
						//frame: true,
						plain: true, // 요게 있어야 background: transparent 먹음..
						//cls: 'khLee-x-window-default',
						style: 'border-style: none !important; background: transparent none !important;',
						layout: {
							type: 'absolute'
						},
						//x: evt.pageX,
						//y: evt.pageY,
						html: "<b>" + obj.attributes.채수지점 + "</b>"
					}).show();
				//});
				
				
//				me.movePopGraphicLayer.clear();
//				me.movePopGraphicLayer.id = "moveGraphicLayer" + siteId;
//				
//				if(me.map.getLevel() < 12)
//					me.map.setLevel(12);
//				
//				//obj.setSymbol(selectedSymbol);
//				
//				var dialog, highlightSymbol;
//				
//				require(["dijit/TooltipDialog"], function(TooltipDialog){
//					dialog = new TooltipDialog({
//			          //id: "tooltipDialog",
//			          style: "position: absolute; top: 300px; left: 500px; width: 377px; font: normal normal normal 10pt Helvetica;z-index:100"
//			        });
//			        dialog.startup();
//				});
//				
//				
//				var t = "testetestewtetet";
//				/*me.map.infoWindow =
//					setInfo*/
//				
//				
//				
//				var content, highlightGraphic;
//		          
//		          require(["esri/lang"], function(esriLang){
//		        	 content = esriLang.substitute(obj.attributes,t);
//		        	 console.info(obj);
//		        	 console.info(obj.attributes);
//		          });
//				    
//				//me.movePopGraphicLayer.add(obj);
//				dialog.setContent(content);
//				
				var x = obj.geometry.x;
				var y = obj.geometry.y;
				
				var tileInfo = KRF_DEV.getApplication().coreMap.tileInfo;
				var curLevel = me.map.getLevel();
				var resolution = tileInfo.lods[curLevel].resolution;
				
				x = x + ((1920 - Ext.getBody().getWidth()) / 2 * resolution);
				y = y - ((1080 - Ext.getBody().getHeight()) / 4 * resolution);
				
				var point = new esri.geometry.Point(x, y, obj.geometry.spatialReference);
				me.map.centerAt(point);
			});
			
		});
		
    },
    
    
    
    
    
    
    
    
    
    setSelectedSiteHandler: function(layerId, siteId){
		
    	var me = this;
    	
		var queryTask = new esri.tasks.QueryTask(_mapServiceUrl + "/" + layerId);
		var query = new esri.tasks.Query();
		query.returnGeometry = true;
		query.outSpatialReference = {"wkid":102100};
		query.outFields = ["*"];
		
		var selectedSymbol = new esri.symbol.PictureMarkerSymbol({
		    "angle": 0,
		    //"xoffset": 10,
		    //"yoffset": 35,
		    "type": "esriPMS",
		    //"url": "./resources/images/symbol/symbol_"+layerId+"_42x42.gif",
		    "url": "./resources/images/symbol/spot_09.png",
		    "contentType": "image/png",
		    "width": 25,
		    "height": 61,
		    "yoffset": 16,
		    "xoffset": 4
		});
		
		if(layerId == "11"){ // 사업장 TMS
			query.where =  "사업장코드='" + siteId + "'";
		}
		else if(layerId == "25" || layerId == "26" || layerId == "27"
			|| layerId == "28" || layerId == "29" || layerId == "30"
			|| layerId == "31" || layerId == "32"){ // 환경기초시설
			query.where = "시설코드='" + siteId + "'";
		}
		else if(layerId == "15" || layerId == "16" || layerId == "17"
			|| layerId == "18" || layerId == "19" || layerId == "20"
			|| layerId == "21"){ // 기타측정지점
			query.where = "관측소코드='" + siteId + "'";
		}
		else if(layerId == "23"){ // 수생태계조사지점
			query.where = "조사지코드='" + siteId + "'";
		}
		else{
			query.where = "측정소코드='" + siteId + "'";
		}
		
		queryTask.execute(query,  function(results){
			
			Ext.each(results.features, function(obj, index) {
				
				me.moveGraphicLayer.clear();
				me.moveGraphicLayer.id = "moveGraphicLayer" + siteId;
				
				if(me.map.getLevel() < 12)
					me.map.setLevel(12);
				
				obj.setSymbol(selectedSymbol);
				me.moveGraphicLayer.add(obj);
				
				var x = obj.geometry.x;
				var y = obj.geometry.y;
				var point = new esri.geometry.Point(x, y, obj.geometry.spatialReference);
				console.info(obj.geometry.spatialReference);
				//me.map.centerAndZoom(point, 12);
				me.map.centerAt(point);
				
				//console.info(me.moveGraphicLayer);
				
				// 10초뒤 레이어(이미지) 제거
				Ext.defer(function(){
					me.moveGraphicLayer.clear();
					//me.map.removeLayer(obj);
				}, 10000, this);
			});
			
		});
		
    },
    
    // 집수구역 선택
    setSelectedCatAreaHandler: function(layerId, catId){
    	var me = this;
    	
    	// 집수구역 심볼 설정
		var selectedSymbol = new esri.symbol.SimpleFillSymbol(
			esri.symbol.SimpleFillSymbol.STYLE_SOLID,
			me.smpLineSymbol,
			new dojo.Color([255,0,0,0.5])
		);
    	
		var queryTask = new esri.tasks.QueryTask(_mapServiceUrl + "/" + layerId);
		var query = new esri.tasks.Query();
		query.returnGeometry = true;
		query.outSpatialReference = {"wkid":102100};
		query.outFields = ["*"];
		
		query.where =  "CAT_ID='" + catId + "'";
		
		queryTask.execute(query,  function(results){
			
			Ext.each(results.features, function(obj, index) {
				
				me.moveCatGraphicLayer.clear();
				me.moveCatGraphicLayer.id = "moveCatGraphicLayer" + catId;
				
				if(me.map.getLevel() < 12)
					me.map.setLevel(12);
				
				obj.setSymbol(selectedSymbol);
				me.moveCatGraphicLayer.add(obj);
				
				var extent = esri.geometry.Polygon(obj.geometry).getExtent();
				//me.map.setExtent(extent, true);
				me.map.centerAt(extent.getCenter());
				
				// 10초뒤 레이어(이미지) 제거
				Ext.defer(function(){
					me.moveCatGraphicLayer.clear();
					//me.map.removeLayer(obj);
				}, 10000, this);
			});
		});
    },
    
    // 리치라인 선택
    setSelectedRchLineHandler: function(layerId, catId){
    	var me = this;
    	
    	// 집수구역 심볼 설정
		var selectedSymbol = new esri.symbol.SimpleLineSymbol(
			esri.symbol.SimpleLineSymbol.STYLE_SOLID,
			new dojo.Color([0, 0, 0, 1]),
			5
		);
    	
		var queryTask = new esri.tasks.QueryTask(_mapServiceUrl + "/" + layerId);
		var query = new esri.tasks.Query();
		query.returnGeometry = true;
		query.outSpatialReference = {"wkid":102100};
		query.outFields = ["*"];
		
		query.where =  "CAT_ID='" + catId + "'";
		
		queryTask.execute(query,  function(results){
			
			me.moveRchGraphicLayer.clear();
			
			Ext.each(results.features, function(obj, index) {
				
				me.moveRchGraphicLayer.id = "moveRchGraphicLayer" + catId;
				
				if(me.map.getLevel() < 12)
					me.map.setLevel(12);
				
				obj.setSymbol(selectedSymbol);
				me.moveRchGraphicLayer.add(obj);
				
				//var extent = esri.geometry.Polygon(obj.geometry).getExtent();
				//me.map.setExtent(extent, true);
				//me.map.centerAt(extent.getCenter());
				
				// 10초뒤 레이어(이미지) 제거
				Ext.defer(function(){
					me.moveRchGraphicLayer.clear();
					//me.map.removeLayer(obj);
				}, 10000, this);
			});
		});
    }
});