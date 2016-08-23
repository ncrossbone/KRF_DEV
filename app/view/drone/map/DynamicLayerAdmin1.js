Ext.define('KRF_DEV.view.drone.map.DynamicLayerAdmin1', {
	map:null, 
	layer:null,
	dynamicLayer1:null,
	dynamicLayer2:null,
	
	constructor: function(map) {
        var me = this;
        me.map = map;
        me.layer = new esri.layers.ArcGISDynamicMapServiceLayer(Ext.mapServiceUrl);
    	
		me.layer.id = "DynamicLayer3";
		me.layer.visible = true;
		me.map.addLayer(me.layer);
		
		me.layer.setVisibility(false);
		//console.info(Ext.visibleLayers);
		
		/*var visibleLayerIds = [];
		
		
		me.layer.setVisibleLayers(visibleLayerIds);*/
    }
});