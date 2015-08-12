Ext.define('KRF_DEV.view.map.DynamicLayerAdmin_Reach', {
	map:null, 
	layer:null,
	dynamicLayer1:null,
	dynamicLayer2:null,
	
	constructor: function(map) {
        var me = this;
        me.map = map;
        
        dynamicLayer1 = new esri.layers.ArcGISDynamicMapServiceLayer(KRF_DEV.app.arcServiceUrl + "/rest/services/Gray/MapServer", {
        	"opacity": 0.6
        });
        me.layer = dynamicLayer1;
        dynamicLayer1.id = "DynamicLayer_Reach"; // view.west.WestTabLayer의 각 탭 페이지 id와 일치시키자..
        dynamicLayer1.visible = false;
		me.map.addLayer(dynamicLayer1);
		//me.layer.setVisibility(true);
		
		me.dynamicLayerAdmin = Ext.create('KRF_DEV.view.map.DynamicLayerAdmin', me.map);
		
		dynamicLayer2 = new esri.layers.ArcGISDynamicMapServiceLayer(KRF_DEV.app.arcServiceUrl + "/rest/services/reach_test/MapServer", {
        	//"opacity": 0.5
        });
        //me.layer = dynamicLayer1;
		dynamicLayer2.id = "DynamicLayer_Reach_Test"; // view.west.WestTabLayer의 각 탭 페이지 id와 일치시키자..
		dynamicLayer2.visible = true;
		me.map.addLayer(dynamicLayer2);
		dynamicLayer2.setVisibleLayers([12]);
		
		KRF_DEV.getApplication().addListener('Reach_TestOnOff', me.Reach_TestOnOffHandler, me); // 레이어 on/off 핸들러 추가
    },
    
    // 레이어 on/off 핸들러 정의
    Reach_TestOnOffHandler: function(layerId, btnType, stepCnt){
    	//var me = this; // 핸들러 추가 시 보낸 파라메터값으로 사용가능
    	var me = KRF_DEV.getApplication().coreMap; // CoreMap에서 설정한 값으로 사용 가능
    	
    	var activeLayer = me.map.getLayer(layerId);
    	//console.info(activeLayer.visibleLayers);
    	
    	var visibleLayers = [12];
    	
    	if(btnType == "start"){
    		if(Ext.getCmp("btnMenu06").src.indexOf("_on") > -1){
    			visibleLayers.push(0);
    		}
    		else if(Ext.getCmp("btnMenu07").src.indexOf("_on") > -1){
    			visibleLayers.push(4);
    		}
    		else{
    			visibleLayers.push(0);
    		}
    	}
    	
    	if(btnType == "end"){
    		if(Ext.getCmp("btnMenu06").src.indexOf("_on") > -1){
    			if(stepCnt == 1){
    				visibleLayers.push(1);
    			}
    			if(stepCnt == 2){
    				visibleLayers.push(2);
    			}
    		}
    		else if(Ext.getCmp("btnMenu07").src.indexOf("_on") > -1){
    			if(stepCnt == 1){
    				visibleLayers.push(5);
    			}
    			if(stepCnt == 2){
    				visibleLayers.push(6);
    			}
    		}
    		else{
    			if(stepCnt == 1){
    				visibleLayers.push(1);
    			}
    			if(stepCnt == 2){
    				visibleLayers.push(2);
    			}
    		}
    	}
    	
    	if(btnType == "save"){
    		if(Ext.getCmp("btnMenu06").src.indexOf("_on") > -1){
    			visibleLayers.push(2);
    			visibleLayers.push(3);
    		}
    		else if(Ext.getCmp("btnMenu07").src.indexOf("_on") > -1){
    			visibleLayers.push(6);
    			visibleLayers.push(7);
    		}
    		else{
    			visibleLayers.push(2);
    			visibleLayers.push(3);
    		}
    	}
    	
    	if(btnType == "BOD"){
    		visibleLayers = activeLayer.visibleLayers; // BOD, DO라벨 클릭시 기존 레이어 변경 없어야함..
    		if(visibleLayers.indexOf(13) > -1){
    			visibleLayers.splice(visibleLayers.indexOf(13), 1); // index번째부터 1자리 삭제
    		}
    		if(visibleLayers.indexOf(14) > -1){
    			visibleLayers.splice(visibleLayers.indexOf(14), 1); // index번째부터 1자리 삭제
    		}
    		visibleLayers.push(13);
    	}
    	
    	if(btnType == "DO"){
    		visibleLayers = activeLayer.visibleLayers; // BOD, DO라벨 클릭시 기존 레이어 변경 없어야함..
    		if(visibleLayers.indexOf(13) > -1){
    			visibleLayers.splice(visibleLayers.indexOf(13), 1); // index번째부터 1자리 삭제
    		}
    		if(visibleLayers.indexOf(14) > -1){
    			visibleLayers.splice(visibleLayers.indexOf(14), 1); // index번째부터 1자리 삭제
    		}
    		visibleLayers.push(14);
    	}
    	
    	if(btnType == "라벨선택"){
    		visibleLayers = activeLayer.visibleLayers; // BOD, DO라벨 클릭시 기존 레이어 변경 없어야함..
    		if(visibleLayers.indexOf(13) > -1){
    			visibleLayers.splice(visibleLayers.indexOf(13), 1); // index번째부터 1자리 삭제
    		}
    		if(visibleLayers.indexOf(14) > -1){
    			visibleLayers.splice(visibleLayers.indexOf(14), 1); // index번째부터 1자리 삭제
    		}
    	}
    	
		activeLayer.setVisibleLayers(visibleLayers);
    }
});