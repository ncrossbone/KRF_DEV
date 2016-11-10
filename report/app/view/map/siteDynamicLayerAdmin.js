Ext.define('Report.view.map.siteDynamicLayerAdmin', {
	
	map: null,
	siteDynamicLayer: null,
	
	constructor: function(map) {
		
        var me = this;
        me.map = map;
		
		/* 지점 레이어 */
		me.siteDynamicLayer = new esri.layers.ArcGISDynamicMapServiceLayer(_mapServiceUrl_Rpt_Site);
		me.siteDynamicLayer.id = "siteDynamicLayer"; // view.west.WestTabLayer의 각 탭 페이지 id와 일치시키자..
		me.siteDynamicLayer.visible = true;
		//visibleLayers = [1, 2, 3, 4, 5, 6, 7, 26, 28, 20];
		//me.siteDynamicLayer.setVisibleLayers(visibleLayers);
        
		me.map.addLayer(me.siteDynamicLayer);
    }
});