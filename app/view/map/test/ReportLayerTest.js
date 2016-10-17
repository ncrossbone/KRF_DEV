Ext.define('KRF_DEV.view.map.test.ReportLayerTest', {
	
	map:null, 
	layer:null,
	
	constructor: function(map) {
		
        var me = this;
        me.map = map;
        
        me.layer = new esri.layers.ArcGISDynamicMapServiceLayer("http://112.217.167.123:20002/arcgis/rest/services/Gray_Report/MapServer", {
        	"opacity": 0.6
        });
        
        me.layer.id = "ReportLayerTest"; // view.west.WestTabLayer의 각 탭 페이지 id와 일치시키자..
        me.layer.visible = true;
        
        me.layer.setVisibleLayers([0, 2]);
		var layerDefs = [];
		layerDefs[2] = "MW_NAME<>'한강서울'";
		me.layer.setLayerDefinitions(layerDefs);
		
		me.map.addLayer(me.layer);
		
    }
});