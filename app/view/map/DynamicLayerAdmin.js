Ext.define('KRF_DEV.view.map.DynamicLayerAdmin', {
	map:null, 
	layer:null,
	dynamicLayer1:null,
	dynamicLayer2:null,
	
	fLayers: [63, 65, 71, 72, 73, 74, 75, 76, 80], // 투명도 주기위한 레이어 아이디
	
	constructor: function(map) {
        var me = this;
        me.map = map;
        
        me.dynamicLayer1 = new esri.layers.ArcGISDynamicMapServiceLayer(_mapServiceUrl_v3);
		me.dynamicLayer1.id = "DynamicLayer1"; // view.west.WestTabLayer의 각 탭 페이지 id와 일치시키자..
		me.dynamicLayer1.visible = true;
		//me.dynamicLayer1.setVisibleLayers([-1]);
		me.map.addLayer(me.dynamicLayer1);
		
		me.dynamicLayer2 = new esri.layers.ArcGISDynamicMapServiceLayer(_mapServiceUrl_v3_2);
        //me.layer = dynamicLayer1;
		me.dynamicLayer2.id = "DynamicLayer2"; // view.west.WestTabLayer의 각 탭 페이지 id와 일치시키자..
		me.dynamicLayer2.visible = true;
		me.dynamicLayer2.opacity = 0.5;
		//me.layer.setVisibleLayers([45, 46, 53]); // 리치노드, 리치라인, 대권역 default
		//me.layer.setVisibleLayers([53]); // 테스트
		me.dynamicLayer2.setVisibleLayers([-1]);
		me.map.addLayer(me.dynamicLayer2);
			
//		me.featureLayer71 = new esri.layers.FeatureLayer(_mapServiceUrl_v3 + "/71", {
//			opacity: 0.5
//		});
//		
//		me.featureLayer71.setVisibility(false);
//		me.map.addLayer(me.featureLayer71);
		
		KRF_DEV.getApplication().addListener('dynamicLayerOnOff', me.dynamicLayerOnOffHandler, me); // 레이어 on/off 핸들러 추가
    },
    
    // 레이어 on/off 핸들러 정의
    dynamicLayerOnOffHandler: function(selectInfo){
    	var me = this;
    	
    	var layers1 = [-1];
    	var layers2 = [-1];
    	
    	var legendWindow65 = Ext.getCmp("legendwindow_65");
    	if(legendWindow65 != undefined){
    		legendWindow65.close();
    	}
    	
    	var legendWindow63 = Ext.getCmp("legendwindow_63");
    	if(legendWindow63 != undefined){
    		legendWindow63.close();
    	}
    	
    	if(selectInfo.length==0){
    		me.dynamicLayer1.setVisibleLayers(layers1);
    		me.dynamicLayer2.setVisibleLayers(layers2);
    		return;
    	}
    	
    	var initX = 385;
    	var initY = Ext.getBody().getHeight();
    	
    	Ext.each(selectInfo, function(selectObj, index, eObjs) {
    		
    		if(selectObj.data.id == "63"){
    			
    			Ext.create("KRF_DEV.view.map.LegendWindow", {
    				
    				id: "legendwindow_63",
    				imgSrc: './resources/images/legend/standard02.png',
    				imgWidth: 548,
    				imgHeight: 329,
    				x: initX,
    				y: initY - 329
    			}).show();
    			
    			initX = initX + 550;
    		}
    		
    		if(selectObj.data.id == "65"){
    			
    			Ext.create("KRF_DEV.view.map.LegendWindow", {
    				
    				id: "legendwindow_65",
    				imgSrc: './resources/images/legend/standard01.png',
    				imgWidth: 209,
    				imgHeight: 275,
    				x: initX,
    				y: initY - 275
    			}).show();
    		}
    		
    		var layer2Idx = me.getLayerIdx(selectObj.data.id);
    		
    		if(layer2Idx > -1){
    			
    			layers2.push(selectObj.data.id);
    		}
    		else{
    			
    			layers1.push(selectObj.data.id);
    		}
		});
    	
    	me.dynamicLayer1.setVisibleLayers(layers1);
    	me.dynamicLayer2.setVisibleLayers(layers2);
    },
    
    getLayerIdx: function(layerId){
    	
    	for(var i = 0; i < this.fLayers.length; i++){
    		
    		if(layerId == this.fLayers[i]){
    			
    			return i;
    		}
    	}
    	
    	return -1;
    }
});