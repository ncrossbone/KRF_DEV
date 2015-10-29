Ext.define('KRF_DEV.view.map.FeatureLayerAdmin1', {
	map:null, 
	layerId: null,
	siteId: null,
	
	constructor: function(map) {
        var me = this;
        me.map = map;
        
        me.moveGraphicLayer = new esri.layers.GraphicsLayer();
		me.moveGraphicLayer.id="moveGraphicLayer";
		me.map.addLayer(me.moveGraphicLayer);
        
        KRF_DEV.getApplication().addListener('setSelectedSite', me.setSelectedSiteHandler, me);
    },
    
    setSelectedSiteHandler: function(layerId, siteId){
		
    	var me = this;
    	
		var queryTask = new esri.tasks.QueryTask(_mapServiceUrl + "/" + layerId);
		var query = new esri.tasks.Query();
		query.returnGeometry = true;
		query.outSpatialReference = {"wkid":102100};
		query.outFields = ["*"];
		
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
			
			Ext.each(results.features, function(obj, index) {
				
				me.moveGraphicLayer.clear();
				me.moveGraphicLayer.id = "moveGraphicLayer" + siteId;
				
				if(me.map.getLevel() < 12)
					me.map.setLevel(12);
				
				obj.setSymbol(selectedSymbol);
				me.moveGraphicLayer.add(obj);
				//console.info(obj);
				
				var x = obj.geometry.x;
				var y = obj.geometry.y;
				var point = new esri.geometry.Point(x, y, obj.geometry.spatialReference)
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
		
		return;
		
		me = this;
		
		if(me.map.getLevel() < 12)
			me.map.setLevel(12);

		me.layer = new esri.layers.FeatureLayer(_mapServiceUrl + "/" + layerId, {
			outFields: ["*"]
		});
		
		if(layerId == "11"){ // 사업장 TMS
			me.layer.setDefinitionExpression("사업장코드='" + siteId + "'");
		}
		else if(layerId == "25" || layerId == "26" || layerId == "27"
			|| layerId == "28" || layerId == "29" || layerId == "30"
			|| layerId == "31" || layerId == "32"){ // 환경기초시설
			me.layer.setDefinitionExpression("시설코드='" + siteId + "'");
		}
		else if(layerId == "15" || layerId == "16" || layerId == "17"
			|| layerId == "18" || layerId == "19" || layerId == "20"
			|| layerId == "21"){ // 기타측정지점
			me.layer.setDefinitionExpression("관측소코드='" + siteId + "'");
		}
		else if(layerId == "23"){ // 수생태계조사지점
			me.layer.setDefinitionExpression("조사지코드='" + siteId + "'");
		}
		else{
			me.layer.setDefinitionExpression("측정소코드='" + siteId + "'");
		}
		
		me.layer.id = "FeatureLayer" + layerId;
		
		/* 심볼 설정 */
		
		
		
		var selectedSymbol = new esri.symbol.PictureMarkerSymbol({
		    "angle": 0,
		    //"xoffset": 10,
		    //"yoffset": 35,
		    "type": "esriPMS",
		    //"url": "./resources/images/symbol/symbol_"+layerId+"_42x42.gif",
		    "url": "./resources/images/symbol/spot_09.png",
		    "contentType": "image/gif",
		    "width": 25,
		    "height": 61,
		    "yoffset": 16,
		    "xoffset": 4
		});
		
		var renderer = new esri.renderer.SimpleRenderer(selectedSymbol);
		me.layer.setRenderer(renderer);
		/* 심볼 설정 끝 */
		
		for(var i = 0; i < 100; i++){
			var tmpLayer =  me.map.getLayer("FeatureLayer" + i);
			if(tmpLayer != undefined){
				me.map.removeLayer(tmpLayer);
			}
		}
		
		var layer = me.map.getLayer(me.layer.id);
		me.map.addLayer(me.layer);
		
		Ext.defer(function(){
			var x = me.layer.graphics[0].geometry.x;
			var y = me.layer.graphics[0].geometry.y;
			var point = new esri.geometry.Point(x, y, me.layer.graphics[0].geometry.spatialReference)
			//me.map.centerAndZoom(point, 12);
			me.map.centerAt(point);
		}, 1000, this);
		
		// 10초뒤 레이어(이미지) 제거
		Ext.defer(function(){
			me.map.removeLayer(me.layer);
		}, 10000, this);
		
    }
});