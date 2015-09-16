Ext.define('KRF_DEV.view.map.DynamicLayerAdmin', {
	map:null, 
	layer:null,
	dynamicLayer1:null,
	dynamicLayer2:null,
	
	constructor: function(map) {
        var me = this;
        me.map = map;
        
        me.dynamicLayer1 = new esri.layers.ArcGISDynamicMapServiceLayer(_mapServiceUrl);
        //me.layer = dynamicLayer1;
		me.dynamicLayer1.id = "DynamicLayer1"; // view.west.WestTabLayer의 각 탭 페이지 id와 일치시키자..
		me.dynamicLayer1.visible = true;
		//me.layer.setVisibleLayers([45, 46, 53]); // 리치노드, 리치라인, 대권역 default
		//me.layer.setVisibleLayers([53]); // 테스트
		me.map.addLayer(me.dynamicLayer1);
		
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
    dynamicLayerOnOffHandler: function(selectInfo){
    	var me = this;
    	var activeLayer = me.dynamicLayer1;
    	
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