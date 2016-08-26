Ext.define("KRF_DEV.view.map.DynamicLayerTMAdmin_Intersects_test", {
	
	map: null,
	layer: null,
	
	constructor: function(map, inStrCatDids) {
		
		var me = this;
        me.map = map;
        
        me.layer = new esri.layers.FeatureLayer("http://112.217.167.123:20002/arcgis/rest/services/reach_V3_TM/MapServer/2", {
        	outFields: ["*"],
        	showLabels: true
        });
        
        me.layer.id = "DynamicLayerTMAdmin";
        me.layer.visible = true;
        
        //me.layer.setVisibleLayers([2]);
		//var layerDefs = [];
		//layerDefs[2] = "CAT_DID IN (" + inStrCatDids + ")";
		//me.layer.setLayerDefinitions(layerDefs);
        
        me.layer.setDefinitionExpression("CAT_DID IN (" + inStrCatDids + ")");
		me.map.addLayer(me.layer);
		
		console.info(me.map.getLayer("DynamicLayerTMAdmin").graphics);
		
		require([
		         "esri/graphicsUtils"
		     ], function(
		         graphicsUtils
		     ) {
			
			var featureLayer = me.layer;
			var geometries = graphicsUtils.getGeometries(featureLayer.graphics);
			console.info(geometries);
		});
    }
});