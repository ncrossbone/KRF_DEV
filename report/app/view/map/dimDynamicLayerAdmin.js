Ext.define('Report.view.map.dimDynamicLayerAdmin', {
	
	map: null,
	dimDynamicLayer: null,
	
	constructor: function(map) {
		
        var me = this;
        me.map = map;
        
        /*console.info(_WS_CD);
		console.info(_WS_NM);
		
		console.info(_MW_CD);
		console.info(_MW_NM);
		
		console.info(_SW_CD);
		console.info(_SW_NM);
		
		console.info(_ADM_SIDO_CD);
		console.info(_ADM_SIDO_NM);
		
		console.info(_ADM_SIGUNGU_CD);
		console.info(_ADM_SIGUNGU_NM);
		
		console.info(_ADM_DONGRI_CD);
		console.info(_ADM_DONGRI_NM);*/
        
		var visibleLayers = [];
		var layerIds = [];
		var layerDefs = [];
		
		if(_WS_CD != null){
			layerDefs[1] = "WS_CD <> '" + _WS_CD + "'";
			layerIds = [1];
			visibleLayers = [0, 1];
		}
		
		if(_MW_CD != null){
			layerDefs[2] = "MW_CODE <> '" + _MW_CD + "'";
			layerIds = [2];
			visibleLayers = [0, 2];
		}
		
        var imageParameters = new esri.layers.ImageParameters();
        
        imageParameters.layerDefinitions = layerDefs;
        
        imageParameters.layerIds = layerIds;
        imageParameters.layerOption = esri.layers.ImageParameters.LAYER_OPTION_SHOW;
        imageParameters.transparent = true;
        
        /* Dim처리 레이어 */
        me.dimDynamicLayer = new esri.layers.ArcGISDynamicMapServiceLayer(_mapServiceUrl_Rpt,
        		{"imageParameters": imageParameters});
		me.dimDynamicLayer.id = "dimDynamicLayer"; // view.west.WestTabLayer의 각 탭 페이지 id와 일치시키자..
		me.dimDynamicLayer.visible = true;
		me.dimDynamicLayer.setVisibleLayers(visibleLayers);
		me.dimDynamicLayer.setOpacity(0.6)
        
		me.map.addLayer(me.dimDynamicLayer);
		
		/* 지점 레이어 */
		/*me.siteDynamicLayer = new esri.layers.ArcGISDynamicMapServiceLayer(_mapServiceUrl_v3_2);
		me.siteDynamicLayer.id = "siteDynamicLayer"; // view.west.WestTabLayer의 각 탭 페이지 id와 일치시키자..
		me.siteDynamicLayer.visible = true;
		visibleLayers = [1, 2, 3, 4, 5, 6, 7];
		me.siteDynamicLayer.setVisibleLayers(visibleLayers);
        
		me.map.addLayer(me.siteDynamicLayer);*/
    }
});