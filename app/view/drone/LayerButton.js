function SetBtnOnOff(btnId, varBtnOnOff){
	
	var btnCtl = Ext.getCmp(btnId);
	var onIdx = btnCtl.src.indexOf("on.");
	var imgSrc = "";
	
	if(onIdx == -1){
		imgSrc = btnCtl.src.replace("off.", "on.");
		eval(varBtnOnOff + " = 'on'");
	}
	else{
		imgSrc = btnCtl.src.replace("on.", "off.");
		eval(varBtnOnOff + " = 'off'");
	}
	
	btnCtl.setSrc(imgSrc);
}

function SetLayerOnOff(varBtnOnOff, layerIds){
	
	for(var i = 0; i < layerIds.length; i++){
		var arrIdx = Ext.visibleLayers.indexOf(layerIds[i]);
		// 레이어 배열에 값이 있으면 레이어 삭제
		if(arrIdx != -1){
			Ext.visibleLayers.splice(arrIdx, 1); // index번째부터 1자리 삭제
		}
	}
	
	if(eval(varBtnOnOff) == "on"){
		for(var i = 0; i < layerIds.length; i++){
			Ext.visibleLayers.push(layerIds[i]);
		}
	}
}

function LayerOnOffBtn(me, tabId){
	//console.info(me);
	if(me.map == null){
//		Ext.defer(function(){
//			LayerOnOffBtn(me, tabId);
//		}, 1, this);
		return;
	}
	
	var activeLayer = me.map.getLayer(tabId);
	//console.info(activeLayer);
	var layers = [];
	
	//if(btnId != ""){
		// 버튼 이미지 변경
		//SetBtnOnOff(btnId);
	//}
	
	// 레이어 On/Off
	//SetLayerOnOff("Ext.btn1OnOff", Ext.btn1LayerIds);
	/*SetLayerOnOff("Ext.btn2OnOff", Ext.btn2LayerIds);
	SetLayerOnOff("Ext.btn3OnOff", Ext.btn3LayerIds);
	SetLayerOnOff("Ext.btn4OnOff", Ext.btn4LayerIds);*/
	//SetLayerOnOff("Ext.btn5OnOff", Ext.btn5LayerIds);
	//SetLayerOnOff("Ext.btn6OnOff", Ext.btn6LayerIds);
	
	var tabCtl = Ext.getCmp('center_container');
	
	//console.info(tabCtl.getActiveTab().id);
	
	var ctlDate = Ext.getCmp('cmbDrone2').value;
	//console.info(ctlDate);
	
	// 낙동강 항공영상 레이어 아이디 셋팅
	for(var i = 0; i < Ext.nakdongDroneLayerId.length; i++){
		var arrIdx = Ext.visibleLayers.indexOf(Ext.nakdongDroneLayerId[i]);
		
		// 레이어 배열에 값이 있으면 레이어 삭제
		if(arrIdx != -1){
			Ext.visibleLayers.splice(arrIdx, 1); // index번째부터 1자리 삭제
		}
		
		var ctlDate = Ext.getCmp('cmbDrone2').value;
		
		//console.info(eval(Ext.nakdongDroneOnOffVar));
		if(eval(Ext.nakdongDroneOnOffVar) == "on"){
			if(ctlDate == Ext.nakdongDroneDate[i]){
				/*if(tabCtl.getActiveTab().id == "nakdong_map"){
					Ext.visibleLayers.push(Ext.nakdongDroneLayerId[i]);
				}*/
					Ext.visibleLayers.push(Ext.nakdongDroneLayerId[i]);
				
			}
		}
	}
	
	// 북한강 항공영상 레이어 아이디 셋팅
	for(var i = 0; i < Ext.northHanDroneLayerId.length; i++){
		var arrIdx = Ext.visibleLayers.indexOf(Ext.northHanDroneLayerId[i]);
		
		// 레이어 배열에 값이 있으면 레이어 삭제
		if(arrIdx != -1){
			Ext.visibleLayers.splice(arrIdx, 1); // index번째부터 1자리 삭제
		}
		
		var ctlDate = Ext.getCmp('cmbDrone2').value;
		
		//console.info(eval(Ext.nakdongDroneOnOffVar));
		if(eval(Ext.northHanDroneOnOffVar) == "on"){
			if(ctlDate == Ext.northHanDroneDate[i]){
					Ext.visibleLayers.push(Ext.northHanDroneLayerId[i]);
			}
		}
	}
	
	// 금강 항공영상 레이어 아이디 셋팅
	for(var i = 0; i < Ext.geumDroneLayerId.length; i++){
		var arrIdx = Ext.visibleLayers.indexOf(Ext.geumDroneLayerId[i]);
		
		// 레이어 배열에 값이 있으면 레이어 삭제
		if(arrIdx != -1){
			Ext.visibleLayers.splice(arrIdx, 1); // index번째부터 1자리 삭제
		}
		
		var ctlDate = Ext.getCmp('cmbDrone2').value;
		
		if(eval(Ext.geumDroneOnOffVar) == "on"){
			if(ctlDate == Ext.geumDroneDate[i]){
					Ext.visibleLayers.push(Ext.geumDroneLayerId[i]);
			}
		}
	}
	
	// 한강 항공영상 레이어 아이디 셋팅
	for(var i = 0; i < Ext.hangangDroneLayerId.length; i++){
		var arrIdx = Ext.visibleLayers.indexOf(Ext.hangangDroneLayerId[i]);
		
		// 레이어 배열에 값이 있으면 레이어 삭제
		if(arrIdx != -1){
			Ext.visibleLayers.splice(arrIdx, 1); // index번째부터 1자리 삭제
		}
		
		var ctlDate = Ext.getCmp('cmbDrone2').value;
		
		//console.info(eval(Ext.nakdongDroneOnOffVar));
		if(eval(Ext.hangangDroneOnOffVar) == "on"){
			if(ctlDate == Ext.hangangDroneDate[i]){
					Ext.visibleLayers.push(Ext.hangangDroneLayerId[i]);
			}
		}
	}
	
	// 낙동강 초분광(클로로필a)영상 레이어 아이디 셋팅
	for(var i = 0; i < Ext.nakdongChlLayerId.length; i++){
		var arrIdx = Ext.visibleLayers.indexOf(Ext.nakdongChlLayerId[i]);
		
		// 레이어 배열에 값이 있으면 레이어 삭제
		if(arrIdx != -1){
			Ext.visibleLayers.splice(arrIdx, 1); // index번째부터 1자리 삭제
		}
		
		var ctlDate = Ext.getCmp('cmbDrone3').value;
		
		//console.info(eval(Ext.nakdongDroneOnOffVar));
		if(eval(Ext.nakdongChlOnOffVar) == "on"){
			if(ctlDate != "" && ctlDate == Ext.nakdongChlDate[i]){
				if(tabCtl.getActiveTab().id == "nakdong_map"){
					Ext.visibleLayers.push(Ext.nakdongChlLayerId[i]);
				}
			}
		}
	}
	
	// 북한강 초분광(클로로필a)영상 레이어 아이디 셋팅
	/*for(var i = 0; i < Ext.northHanChlLayerId.length; i++){
		var arrIdx = Ext.visibleLayers.indexOf(Ext.northHanChlLayerId[i]);
		
		// 레이어 배열에 값이 있으면 레이어 삭제
		if(arrIdx != -1){
			Ext.visibleLayers.splice(arrIdx, 1); // index번째부터 1자리 삭제
		}
		
		var ctlDate = Ext.getCmp('cmbDrone3').value;
		
		//console.info(eval(Ext.nakdongDroneOnOffVar));
		if(eval(Ext.northHanChlOnOffVar) == "on"){
			if(ctlDate != "" && ctlDate == Ext.northHanChlDate[i]){
				if(tabCtl.getActiveTab().id == "northhan_map"){
					Ext.visibleLayers.push(Ext.northHanChlLayerId[i]);
				}
			}
		}
	}
	
	// 금강 초분광(클로로필a)영상 레이어 아이디 셋팅
	for(var i = 0; i < Ext.geumChlLayerId.length; i++){
		var arrIdx = Ext.visibleLayers.indexOf(Ext.geumChlLayerId[i]);
		
		// 레이어 배열에 값이 있으면 레이어 삭제
		if(arrIdx != -1){
			Ext.visibleLayers.splice(arrIdx, 1); // index번째부터 1자리 삭제
		}
		
		var ctlDate = Ext.getCmp('cmbDrone3').value;
		
		if(eval(Ext.geumChlOnOffVar) == "on"){
			if(ctlDate != "" && ctlDate == Ext.geumChlDate[i]){
				if(tabCtl.getActiveTab().id == "geum_map"){
					Ext.visibleLayers.push(Ext.geumChlLayerId[i]);
				}
			}
		}
	}
	
	// 한강 초분광(클로로필a)영상 레이어 아이디 셋팅
	for(var i = 0; i < Ext.hangangChlLayerId.length; i++){
		var arrIdx = Ext.visibleLayers.indexOf(Ext.hangangChlLayerId[i]);
		
		// 레이어 배열에 값이 있으면 레이어 삭제
		if(arrIdx != -1){
			Ext.visibleLayers.splice(arrIdx, 1); // index번째부터 1자리 삭제
		}
		
		var ctlDate = Ext.getCmp('cmbDrone3').value;
		
		//console.info(eval(Ext.nakdongDroneOnOffVar));
		if(eval(Ext.hangangChlOnOffVar) == "on"){
			if(ctlDate != "" && ctlDate == Ext.hangangChlDate[i]){
				if(tabCtl.getActiveTab().id == "hangang_map"){
					Ext.visibleLayers.push(Ext.hangangChlLayerId[i]);
				}
			}
		}
	}*/
	
	if(Ext.visibleLayers.length > 0)
		activeLayer.setVisibility(true);
	else
		activeLayer.setVisibility(false);
	//console.info(Ext.visibleLayers);
	activeLayer.setVisibleLayers(Ext.visibleLayers);
	
	/*if(tabId == "DynamicLayer3"){
		// Feature Layer visible
		activeLayer = me.map.getLayer("DroneFeatureLayer1");
		console.info(activeLayer);
		if(activeLayer != undefined){
			if(eval(Ext.featureLayerVar) == "on")
				activeLayer.setVisibility(true);
			else
				activeLayer.setVisibility(false);
		}
	}*/
	
	/*if(tabId == "DynamicLayer2"){
		// Feature Layer visible
		activeLayer = me.map.getLayer("FeatureLayer2");
		if(activeLayer != undefined){
			if(eval(Ext.featureLayerVar) == "on")
				activeLayer.setVisibility(true);
			else
				activeLayer.setVisibility(false);
		}
	}
	
	if(tabId == "DynamicLayer3"){
		activeLayer = me.map.getLayer("FeatureLayer3");
		if(activeLayer != undefined){
			if(eval(Ext.featureLayerVar) == "on")
				activeLayer.setVisibility(true);
			else
				activeLayer.setVisibility(false);
		}
	}
	
	if(tabId == "DynamicLayer4"){
		activeLayer = me.map.getLayer("FeatureLayer4");
		if(activeLayer != undefined){
			if(eval(Ext.featureLayerVar) == "on")
				activeLayer.setVisibility(true);
			else
				activeLayer.setVisibility(false);
		}
	}*/
	
	//LegendShowHide(tabCtl.getActiveTab().id);
}

function LegendShowHide(activeTabId){
	//alert(activeTabId)
	var isShowLegend = false;
	var tabCtl = Ext.getCmp('app_center_container');
	
	if(activeTabId == "nakdong_map"){
		var ctlDate = Ext.getCmp('cmbDrone4').value;
		if(eval(Ext.nakdongChlOnOffVar + " == 'on'")){
			if(ctlDate != "선택하세요."){
				isShowLegend = true;
			}
		}
	}
	
	/*if(activeTabId == "northhan_map"){
		var ctlDate = Ext.getCmp('cmbDrone4').value;
		if(eval(Ext.northHanChlOnOffVar + " == 'on'")){
			if(ctlDate != "선택하세요."){
				isShowLegend = true;
			}
		}
	}
	
	if(activeTabId == "geum_map"){
		var ctlDate = Ext.getCmp('cmbDrone4').value;
		if(eval(Ext.geumChlOnOffVar + " == 'on'")){
			if(ctlDate != "선택하세요."){
				isShowLegend = true;
			}
		}
	}
	
	if(activeTabId == "hangang_map"){
		var ctlDate = Ext.getCmp('cmbDrone4').value;
		if(eval(Ext.hangangChlOnOffVar + " == 'on'")){
			if(ctlDate != "선택하세요."){
				isShowLegend = true;
			}
		}
	}*/
	
	if(isShowLegend == true){
		LegendShow();
	}
	else{
		LegendHide();
	}
	
	//alert(isShowLegend);
}

function LegendShow(){
	
	var chlLegend = Ext.getCmp("chlLegend"); // 범례 이미지 컨트롤
	chlLegend.show();
}

function LegendHide(){
	
	var chlLegend = Ext.getCmp("chlLegend"); // 범례 이미지 컨트롤
	chlLegend.hide();
}

Ext.define('KRF_DEV.view.drone.LayerButton', {
	
	extend: 'Ext.panel.Panel',
	id: 'LayerButtonPanel',
	xtype: 'layerbutton-panel',
	
	height: 144,
	width: 100,
	
	title: '촬영일자 선택',
	header: false,
	//floating: true,
	
	layout: {
		type: 'vbox'
	},
	
	cls: 'khLee-x-panel-body-default',
	
	items: [{
		xtype: 'panel',
		header: false,
		layout: {
			type: 'hbox'
		},
		cls: 'khLee-x-panel-body-default',
		items: [{
			xtype: 'image',
			//text: '행정경계',
			id: 'btn1', // LayerMapper의 layerBtnId와 매핑
			src: Ext.btn1DefaultImg,
			style: 'cursor:pointer;border:0px !important;',
			listeners: {
		        el: {
		            click: function(){
		            	SetBtnOnOff("btn1", "Ext.btn1OnOff");
		            	LayerOnOffBtn(Ext.getCmp('_mapDiv_1'), "DynamicLayer1");
		            	LayerOnOffBtn(Ext.getCmp('_mapDiv_2'), "DynamicLayer2");
		            	LayerOnOffBtn(Ext.getCmp('_mapDiv_3'), "DynamicLayer3");
		            	LayerOnOffBtn(Ext.getCmp('_mapDiv_4'), "DynamicLayer4");
		            }
		        }
		    },
			width: 50,
			height: 48
		}, {
			xtype: 'image',
			//text: '측정지점',
			id: 'btn2', // LayerMapper의 layerBtnId와 매핑
			src: Ext.btn2DefaultImg,
			style: 'cursor:pointer; border:0px !important;',
			listeners: {
		        el: {
		        	click: function(){
		        		SetBtnOnOff("btn2", "Ext.btn2OnOff");
		            	LayerOnOffBtn(Ext.getCmp('_mapDiv_1'), "DynamicLayer1");
		            	LayerOnOffBtn(Ext.getCmp('_mapDiv_2'), "DynamicLayer2");
		            	LayerOnOffBtn(Ext.getCmp('_mapDiv_3'), "DynamicLayer3");
		            	LayerOnOffBtn(Ext.getCmp('_mapDiv_4'), "DynamicLayer4");
		            }
		        }
		    },
			width: 50,
			height: 48
		}]
	}, {
		xtype: 'panel',
		header: false,
		layout: {
			type: 'hbox'
		},
		cls: 'khLee-x-panel-body-default',
		items: [{
			xtype: 'image',
			//text: '취수장',
			id: 'btn3', // LayerMapper의 layerBtnId와 매핑
			src: Ext.btn3DefaultImg,
			style: 'cursor:pointer;border:0px !important;',
			listeners: {
		        el: {
		            click: function(){
		            	SetBtnOnOff("btn3", "Ext.btn3OnOff");
		            	LayerOnOffBtn(Ext.getCmp('_mapDiv_1'), "DynamicLayer1");
		            	LayerOnOffBtn(Ext.getCmp('_mapDiv_2'), "DynamicLayer2");
		            	LayerOnOffBtn(Ext.getCmp('_mapDiv_3'), "DynamicLayer3");
		            	LayerOnOffBtn(Ext.getCmp('_mapDiv_4'), "DynamicLayer4");
		            }
		        }
		    },
			width: 50,
			height: 48
		}, {
			xtype: 'image',
			//text: '정수장',
			id: 'btn4', // LayerMapper의 layerBtnId와 매핑
			src: Ext.btn4DefaultImg,
			style: 'cursor:pointer;border:0px !important;',
			listeners: {
		        el: {
		        	click: function(){
		        		SetBtnOnOff("btn4", "Ext.btn4OnOff");
		            	LayerOnOffBtn(Ext.getCmp('_mapDiv_1'), "DynamicLayer1");
		            	LayerOnOffBtn(Ext.getCmp('_mapDiv_2'), "DynamicLayer2");
		            	LayerOnOffBtn(Ext.getCmp('_mapDiv_3'), "DynamicLayer3");
		            	LayerOnOffBtn(Ext.getCmp('_mapDiv_4'), "DynamicLayer4");
		            }
		        }
		    },
			width: 50,
			height: 48
		}]
	}, {
		xtype: 'panel',
		header: false,
		layout: {
			type: 'hbox'
		},
		cls: 'khLee-x-panel-body-default',
		items: [{
			xtype: 'image',
			//text: '항공사진',
			id: 'btn5', // LayerMapper의 layerBtnId와 매핑
			src: Ext.btn5DefaultImg,
			style: 'cursor:pointer;border:0px !important;',
			listeners: {
		        el: {
		            click: function(){
		            	SetBtnOnOff("btn5", "Ext.btn5OnOff");
		            	LayerOnOffBtn(Ext.getCmp('_mapDiv_1'), "DynamicLayer1");
		            	LayerOnOffBtn(Ext.getCmp('_mapDiv_2'), "DynamicLayer2");
		            	LayerOnOffBtn(Ext.getCmp('_mapDiv_3'), "DynamicLayer3");
		            	LayerOnOffBtn(Ext.getCmp('_mapDiv_4'), "DynamicLayer4");
		            }
		        }
		    },
			width: 50,
			height: 48
		}, {
			xtype: 'image',
			//text: '초분광영상',
			id: 'btn6', // LayerMapper의 layerBtnId와 매핑
			src: Ext.btn6DefaultImg,
			style: 'cursor:pointer;border:0px !important;',
			listeners: {
		        el: {
		        	click: function(){
		        		SetBtnOnOff("btn6", "Ext.btn6OnOff");
		            	LayerOnOffBtn(Ext.getCmp('_mapDiv_1'), "DynamicLayer1");
		            	LayerOnOffBtn(Ext.getCmp('_mapDiv_2'), "DynamicLayer2");
		            	LayerOnOffBtn(Ext.getCmp('_mapDiv_3'), "DynamicLayer3");
		            	LayerOnOffBtn(Ext.getCmp('_mapDiv_4'), "DynamicLayer4");
		            }
		        }
		    },
			width: 50,
			height: 48
		}]
	}]
	
});