Ext.define('KRF_DEV.view.map.DynamicLayerAdmin', {
	map:null, 
	layer:null,
	dynamicLayer1:null,
	dynamicLayer2:null,
	
	constructor: function(map) {
        var me = this;
        me.map = map;
        
        dynamicLayer1 = new esri.layers.ArcGISDynamicMapServiceLayer(KRF_DEV.app.arcServiceUrl + "/rest/services/reach/MapServer");
        me.layer = dynamicLayer1;
		me.layer.id = "DynamicLayer1"; // view.west.WestTabLayer의 각 탭 페이지 id와 일치시키자..
		me.layer.visible = true;
		me.layer.setVisibleLayers([45, 46, 53]); // 리치노드, 리치라인, 대권역 default
		me.map.addLayer(me.layer);
		
		/*
		dynamicLayer2 = new esri.layers.ArcGISDynamicMapServiceLayer(KRF_DEV.app.arcServiceUrl + "/rest/services/Layer2/MapServer");
		me.layer = dynamicLayer2;
		me.layer.id = "DynamicLayer2"; // view.west.WestTabLayer의 각 탭 페이지 id와 일치시키자..
		me.layer.visible = true;
		me.map.addLayer(me.layer);
		*/
		
		KRF_DEV.getApplication().addListener('dynamicLayerOnOff', me.dynamicLayerOnOffHandler, me); // 레이어 on/off 핸들러 추가
    },
    
    // 레이어 on/off 핸들러 정의
    dynamicLayerOnOffHandler: function(selectInfo, tabID){
    	//var me = this; // 핸들러 추가 시 보낸 파라메터값으로 사용가능
    	var me = KRF_DEV.getApplication().coreMap; // CoreMap에서 설정한 값으로 사용 가능
    	
    	//console.info(KRF_DEV.getApplication().coreMap.map);
    	
    	var activeLayer = me.map.getLayer(tabID);
    	
    	if(selectInfo.length==0){
    		activeLayer.setVisibleLayers([]);
    		return;
    	}
    	var layers = [];
    	Ext.each(selectInfo, function(selectObj, index, eObjs) {
    		if(!isNaN(selectObj.data.id)){
    			layers.push(selectObj.data.id);
    		}
			if(index==selectInfo.length-1){
				activeLayer.setVisibleLayers(layers);
			}
		});
    }
});