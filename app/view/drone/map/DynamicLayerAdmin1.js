Ext.define('KRF_DEV.view.drone.map.DynamicLayerAdmin1', {
	map:null, 
	layer:null,
	layerAviation:null,
	layerChl:null,
	layerPhyco:null,
	dynamicLayer1:null,
	dynamicLayer2:null,
	
	constructor: function(map) {
        var me = this;
        me.map = map;
        
        
		
		
		me.layerAviation = new esri.layers.ArcGISDynamicMapServiceLayer(_mapServiceUrl_Aviation);
		me.layerAviation.id = "AciationLayer";
		me.layerAviation.visible = true;
		me.map.addLayer(me.layerAviation);
		me.layerAviation.setVisibility(false);
		
		
		me.layerChl = new esri.layers.ArcGISDynamicMapServiceLayer(_mapServiceUrl_Chlo);
		me.layerChl.id = "Chlorophyll_a";
		me.layerChl.visible = true;
		me.map.addLayer(me.layerChl);
		me.layerChl.setVisibility(false);
		
		
		me.layerPhyco = new esri.layers.ArcGISDynamicMapServiceLayer(_mapServiceUrl_Phyco);
		me.layerPhyco.id = "Phycocyanin";
		me.layerPhyco.visible = true;
		me.map.addLayer(me.layerPhyco);
		me.layerPhyco.setVisibility(false);
		

        me.layer = new esri.layers.ArcGISDynamicMapServiceLayer(Ext.mapServiceUrl);
		me.layer.id = "DynamicLayer3";
		me.layer.visible = true;
		me.map.addLayer(me.layer);
		me.layer.setVisibility(false);
		
		
		
    }
});