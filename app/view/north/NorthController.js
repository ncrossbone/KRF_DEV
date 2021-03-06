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
		
		// 버튼 On/Off
		var currCtl = SetBtnOnOff(el.id);
		
		if(_krad.lineGrpLayer != null && _krad.lineGrpLayer != undefined){
			
			if(currCtl.btnOnOff == "on"){
				
				_krad.lineGrpLayer.setVisibility(true);
			}
			else{
				
				_krad.lineGrpLayer.setVisibility(false);
			}
		}
		
	},
	
	// 집수구역 버튼 클릭
	onClickAreaLayer: function(obj, el, evt){
		
		// 버튼 On/Off
		var currCtl = SetBtnOnOff(el.id);
		
		if(_krad.areaGrpLayer != null && _krad.areaGrpLayer != undefined){
			
			if(currCtl.btnOnOff == "on"){
				
				_krad.areaGrpLayer.setVisibility(true);
			}
			else{
				
				_krad.areaGrpLayer.setVisibility(false);
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
			if(layers[i] != 48){
				visibleLayer.push(layers[i]);
			}
    	}
    	
		if(currCtl.btnOnOff == "on"){
			visibleLayer.push(48);
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