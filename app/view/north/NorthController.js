/**
 *   작성자 : khLee <ncrossbone@gmail.com>
 *   작성일 : 2015-06-10
 * 수정이력 : 날짜		내용
 */
Ext.define('KRF_DEV.view.north.NorthController', {
	extend: 'Ext.app.ViewController',

    alias: 'controller.north',

    onButtonClick: function (button, e) {
    	if(button.params.msgBox == 'alert')
    		Ext.Msg.alert(button.params.title, button.params.contents);
    	else if(button.params.msgBox == 'confirm')
    		Ext.Msg.confirm(button.params.title, button.params.contents, 'onConfirm', this);
    },
    onConfirm: function (choice){
    	//console.log(choice);
    	if (choice === 'yes') {
           // console.log(choice);
        }//
    },
    
    // 배경맵 on/off
    onClickBaseLayer: function(obj, el, evt){
    	// 버튼 On/Off
		var currCtl = SetBtnOnOff(el.id);
		if(currCtl.btnOnOff == "on"){
			GetCoreMap().baseMap.setVisibility(true);
		}
		else{
			GetCoreMap().baseMap.setVisibility(false);
		}
    },
    
    // 리치 버튼 클릭
	onClickReachLayer: function(obj, el, evt){
		
		// 리치레이어 On/Off
		//ReachLayerOnOff(el.id, "46");
		
		// 버튼 On/Off
		var currCtl = SetBtnOnOff(el.id);
		var me = GetCoreMap();
		
		if(me.reachLayerAdmin_v3_New.lineGrpLayer != null && me.reachLayerAdmin_v3_New.lineGrpLayer != undefined){
			if(currCtl.btnOnOff == "on"){
				//me.reachLayerAdmin.reachLineGraphics.setVisibility(true);
				me.reachLayerAdmin_v3_New.lineGrpLayer.setVisibility(true);
			}
			else{
				//me.reachLayerAdmin.reachLineGraphics.setVisibility(false);
				me.reachLayerAdmin_v3_New.lineGrpLayer.setVisibility(false);
			}
		}
		
	},
	
	// 집수구역 버튼 클릭
	onClickAreaLayer: function(obj, el, evt){
		
		// 리치레이어 On/Off
		//ReachLayerOnOff(el.id, "47");
		
		// 버튼 On/Off
		var currCtl = SetBtnOnOff(el.id);
		var me = GetCoreMap();
		
		//if(me.reachLayerAdmin.reachAreaGraphics != null && me.reachLayerAdmin.reachAreaGraphics != undefined){
		if(me.reachLayerAdmin_v3_New.areaGrpLayer != null && me.reachLayerAdmin_v3_New.areaGrpLayer != undefined){
			if(currCtl.btnOnOff == "on"){
				console.info("on");
				//me.reachLayerAdmin.reachAreaGraphics.setVisibility(true);
				me.reachLayerAdmin_v3_New.areaGrpLayer.setVisibility(true);
				//console.info(me.reachLayerAdmin_v3_New);
			}
			else{
				console.info("off");
				//me.reachLayerAdmin.reachAreaGraphics.setVisibility(false);
				me.reachLayerAdmin_v3_New.areaGrpLayer.setVisibility(false);
			}
		}
		
	},
	
	onClickFlowLayer: function(obj, el, evt){
		
		// 버튼 On/Off
		var currCtl = SetBtnOnOff(el.id);
		
		var me = GetCoreMap();
		var activeLayer = me.map.getLayer("DynamicLayer1");
    	var layers = activeLayer.visibleLayers;
    	var visibleLayer = [];
    	activeLayer.setVisibleLayers([]);
    	
    	for(var i = 0; i < layers.length; i++){
    		//o(layers[i]);
			if(layers[i] != 45 && layers[i] != 44){
				visibleLayer.push(layers[i]);
			}
    	}
    	
		if(currCtl.btnOnOff == "on"){
			visibleLayer.push(45);
	    	activeLayer.setVisibleLayers(visibleLayer);
		}
		else{
			//o(visibleLayer);
			activeLayer.setVisibleLayers(visibleLayer);
		}
		
	},
	
	// 초기화 버튼 클릭
	onClickReset: function(obj, el, evt){
		
		ResetButtonClick();
		
	}
});