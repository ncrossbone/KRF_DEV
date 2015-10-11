Ext.define('KRF_DEV.view.map.FeatureLayerAdmin1', {
	map:null, 
	layerId: null,
	
	constructor: function(map) {
        var me = this;
        me.map = map;
        
        KRF_DEV.getApplication().addListener('setSelectedSite', me.setSelectedSiteHandler, me);
    },
    
    setSelectedSiteHandler: function(layerId, siteId){
		
		me = this;
		
		if(me.map.getLevel() < 12)
			me.map.setLevel(12);
		
		me.layer = new esri.layers.FeatureLayer(_mapServiceUrl + "/" + layerId, {
			outFields: ["*"]
		});
		me.layer.setDefinitionExpression("측정소코드='" + siteId + "'");
		me.layer.id = "FeatureLayer" + layerId;
		
		/* 심볼 설정 */
		
		
		
		var selectedSymbol = new esri.symbol.PictureMarkerSymbol({
		    "angle": 0,
		    //"xoffset": 10,
		    //"yoffset": 35,
		    "type": "esriPMS",
		    "url": "./resources/images/symbol/symbol_1_1_48x48.png",
		    "contentType": "image/png",
		    "width": 48,
		    "height": 48
		});
		
		var renderer = new esri.renderer.SimpleRenderer(selectedSymbol);
		me.layer.setRenderer(renderer);
		
		
		
		
		/* 심볼 설정 끝 */
		
		var layer = me.map.getLayer(me.layer.id);
		
		//console.info(me.layer);
		//console.info(layer);
		
		if(layer == undefined){
			me.map.addLayer(me.layer);
		}
		else{
			me.map.removeLayer(layer);
			me.map.addLayer(me.layer);
		}
		Ext.defer(function(){
			var x = me.layer.graphics[0].geometry.x;
			var y = me.layer.graphics[0].geometry.y;
			var point = new esri.geometry.Point(x, y, me.layer.graphics[0].geometry.spatialReference)
			me.map.centerAndZoom(point, 12);
		}, 1000, this);
		
		
		
    }
});