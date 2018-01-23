Ext.define('KRF_DEV.view.map.DynamicLayerAdmin', {
	map:null, 
	layer:null,
	dynamicLayer1:null,
	dynamicLayer2:null,
	
	dynamicLayerSRiver:null,
	//읍면동 / 식생도 / 특밸대책지역 / 오수처리대책 / 상수원보고구역 / 배출시설제한 / 수변구역 / 그린벨트 /총량관리
	fLayers: [67, 71, 79, 80, 81, 82, 83, 84, 88], // 투명도 주기위한 레이어 아이디
	
	constructor: function(map) {
        var me = this;
        me.map = map;
        
        me.dynamicLayer1 = new esri.layers.ArcGISDynamicMapServiceLayer(_mapServiceUrl_v3);
		me.dynamicLayer1.id = "DynamicLayer1"; // view.west.WestTabLayer의 각 탭 페이지 id와 일치시키자..
		me.dynamicLayer1.visible = true;
		me.map.addLayer(me.dynamicLayer1);
		
		me.dynamicLayer2 = new esri.layers.ArcGISDynamicMapServiceLayer(_mapServiceUrl_v3);
		me.dynamicLayer2.id = "DynamicLayer2"; // view.west.WestTabLayer의 각 탭 페이지 id와 일치시키자..
		me.dynamicLayer2.visible = true;
		me.dynamicLayer2.opacity = 0.5;
		me.dynamicLayer2.setVisibleLayers([-1]);
		me.map.addLayer(me.dynamicLayer2);
		
		me.dynamicLayerSRiver = new esri.layers.ArcGISDynamicMapServiceLayer(_mapServiceUrl_SRiver);
		me.dynamicLayerSRiver.id = "DynamicLayerSRiver"; // view.west.WestTabLayer의 각 탭 페이지 id와 일치시키자..
		me.dynamicLayerSRiver.visible = true;
		me.dynamicLayerSRiver.setVisibleLayers([0,2]);
		me.map.addLayer(me.dynamicLayerSRiver);
			
//		me.featureLayer71 = new esri.layers.FeatureLayer(_mapServiceUrl_v3 + "/71", {
//			opacity: 0.5
//		});
//		
//		me.featureLayer71.setVisibility(false);
//		me.map.addLayer(me.featureLayer71);
		
		KRF_DEV.getApplication().addListener('dynamicLayerOnOff', me.dynamicLayerOnOffHandler, me); // 레이어 on/off 핸들러 추가
		KRF_DEV.getApplication().addListener('drondynamicLayerOnOff', me.drondynamicLayerOnOffHandler, me); // 레이어 on/off 핸들러 추가
    },
    applyRenderer: function(renderer){
    	
    	
    },
    
    // 레이어 on/off 핸들러 정의
    drondynamicLayerOnOffHandler: function(selectInfo){
    	
    	
    	
    	
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
    		
    		if(selectObj.data.id == _toLegend){
    			
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
    		
    		if(selectObj.data.id == _sicLegend){
    			
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