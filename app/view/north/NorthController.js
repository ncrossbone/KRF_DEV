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
		var me = this;
		me.searchNodeId(el.id);
		
		
		// 버튼 On/Off
		//var currCtl = SetBtnOnOff(el.id);
		
		/*if(_krad.lineGrpLayer != null && _krad.lineGrpLayer != undefined){
			if(currCtl.btnOnOff == "on"){
				_krad.lineGrpLayer.setVisibility(true);
			}
			else{
				_krad.lineGrpLayer.setVisibility(false);
			}
		}*/
		
	},
	
	// 집수구역 버튼 클릭
	onClickAreaLayer: function(obj, el, evt){
		var me = this;
		me.searchNodeId(el.id);
		// 버튼 On/Off
		/*var currCtl = SetBtnOnOff(el.id);
		
		if(_krad.areaGrpLayer != null && _krad.areaGrpLayer != undefined){
			
			if(currCtl.btnOnOff == "on"){
				
				_krad.areaGrpLayer.setVisibility(true);
			}
			else{
				
				_krad.areaGrpLayer.setVisibility(false);
			}
		}*/
		
	},
	
	onClickFlowLayer: function(obj, el, evt){
		var me = this;
		// 버튼 On/Off
		
		var currCtl = SetBtnOnOff(el.id);
		
		var coreMap = GetCoreMap();
		var activeLayer = coreMap.map.getLayer("DynamicLayer1");
    	var layers = activeLayer.visibleLayers;
    	
    	var layer = Ext.getCmp("layer01").getView().getChecked();
    	console.info(Ext.getCmp("layer01").getStore());
    	
    	for(var x = 0;x < Ext.getCmp("layer01").getStore().data.length;x++){
    		console.info(Ext.getCmp("layer01").getStore().data.items[x].id);
    		if(Ext.getCmp("layer01").getStore().data.items[x].id == "48"){
    			console.info(Ext.getCmp("layer01").getStore().data.items[x]);
    		}
    	}
    	
    	var visibleLayer = [];
    	activeLayer.setVisibleLayers([]);
    	for(var i = 0; i < layers.length; i++){
			if(layers[i] != 48 || layers[i] != "48"){
				visibleLayer.push(layers[i]);
			}
    	}
    	
		if(currCtl.btnOnOff == "on"){
			me.searchNodeId(el.id);
		}
		else{
		      var a = "";
		      for(var i =0; i < layer.length;i++){
		         if(layer[i].id == "48"){
		        	 layer[i].data.checked = false;
		            a = i;
		         }
		      }
		      layer.splice(a,1);
		      KRF_DEV.getApplication().fireEvent('dynamicLayerOnOff', layer);
		}
		
	},
	
	// 초기화 버튼 클릭
	onClickReset: function(obj, el, evt){
		
		ResetButtonClick();
		
	},
	//-----------------------------------------------------------------------------------------
	//상위 메뉴바, 주제도 연동 tree node id 값 클릭 function
	//-----------------------------------------------------------------------------------------
	searchNodeId: function(btn){
		var layerObj = Ext.getCmp("layer01");
		var nodeObj = "";
		var lyrId = "";
		
		switch (btn) {
		case "btnReachLayer": lyrId = "RCH_DID"; break;
		case "btnAreaLayer": lyrId = "CAT_DID"; break;
		//case "btnFlowLayer": lyrId = "RCH_FLW"; break;
		default: break;
		}
		
		for(var i = 0; i<layerObj.store.data.items.length; i++){
			if(layerObj.store.data.items[i].data.siteIdCol==lyrId){
				nodeObj = layerObj.store.data.items[i];
			}
		}
		
		var isChecked = nodeObj.get('checked');
		
		nodeObj.set('checked', !isChecked);
		layerObj.fireEvent('checkchange',nodeObj, !isChecked);
		
	}
});