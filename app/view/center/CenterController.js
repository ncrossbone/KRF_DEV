Ext.define('KRF_DEV.view.center.CenterController', {
	
	extend: 'Ext.app.ViewController',

	alias: 'controller.center',
	
	// 일반모드 버튼 클릭
	onClickNormalMode: function(obj, el, evt){
		
		var me = KRF_DEV.getApplication().coreMap;
		
		// 버튼 On/Off
		var currCtl = SetBtnOnOff(el.id);
		if(currCtl.btnOnOff == "off")
			SetBtnOnOff(el.id);
		var btn = Ext.getCmp("btnModeNomal");
		Ext.SetSrc(btn); // 이미지 셋팅
		
		var btn = SetBtnOnOff("btnModeNormal_center");
		if(btn.btnOnOff == "off")
			SetBtnOnOff("btnModeNormal_center");
		
		/* 전체 레이어 끄기 */
    	var activeLayer = me.map.getLayer("DynamicLayerAdmin_ReachTest");
    	if(activeLayer != undefined)
    		activeLayer.setVisibility(false);
    	
    	activeLayer = me.map.getLayer("ReachLayerAdminBackground");
    	if(activeLayer != undefined)
    		activeLayer.setVisibility(false);
    	
    	/*
    	var activeLayer2 = me.map.getLayer("DynamicLayer1");
    	var layers = [];
    	activeLayer2.setVisibleLayers(layers);
    	me.map.setLevel(8);
    	*/
    	/* 전체 레이어 끄기 끝 */
    	
    	var me = KRF_DEV.getApplication().coreMap;
		me.map.graphics.clear();
    	KRF_DEV.getApplication().fireEvent('drawEnd');
    	
		Ext.HideReachToolbar(evtArgs, el);
		//Ext.HideSiteListWindow();
		//Ext.HideSiteInfoWindow();
		//Ext.HideChartResult();
		//Ext.HideSearchResult();
		
		/*
		Ext.get('_mapDiv__gc').setStyle('cursor','url(./resources/images/symbol/btn_start01.png),auto');
		KRF_DEV.getApplication().fireEvent('pointDrawClick', "point", el.id, false);
		*/
		
	},
	
	// 리치모드 버튼 클릭
	onClickReachMode: function(obj, el, evt){
		
		var me = KRF_DEV.getApplication().coreMap;
		
		/* 리치 레이어 켜기 */
    	if(me.map.getLevel() < 11){
    		alert("리치모드는 11레벨 이상이어야 합니다.");
    		return;
    	}
    	
    	// 버튼 On/Off
		var currCtl = SetBtnOnOff(el.id);
		if(currCtl.btnOnOff == "off")
			SetBtnOnOff(el.id);
		var btn = Ext.getCmp("btnModeReach");
		Ext.SetSrc(btn); // 이미지 셋팅
    	
    	// Dim 처리 서비스 레이어
    	var activeLayer = me.map.getLayer("ReachLayerAdminBackground");
    	if(activeLayer != undefined)
    		activeLayer.setVisibility(true);
    	
    	// 시뮬레이션용 서비스 레이어
    	activeLayer = me.map.getLayer("DynamicLayerAdmin_ReachTest");
    	if(activeLayer != undefined)
    		activeLayer.setVisibility(true);
    	
    	//var visibleLyaer = activeLayer.visibleLayers;
    	//activeLayer.setVisibleLayers([12]);
    	
    	//activeLayer = me.map.getLayer("DynamicLayer1");
    	//var layers = [45, 46]; // Reach Layer Id
    	//activeLayer.setVisibleLayers([45, 46]);
    	//activeLayer.setVisibility(false);
    	//me.graphicsLayerAdmin = Ext.create('KRF_DEV.view.map.GraphicsLayerAdmin', me.map);
    	//me.map.setLevel(12);
    	/* 리치 레이어 켜기 끝 */
    	
    	//me.reachLayerAdmin = Ext.create('KRF_DEV.view.map.ReachLayerAdmin', me.map);
    	
    	var me = KRF_DEV.getApplication().coreMap;
		me.map.graphics.clear();
    	KRF_DEV.getApplication().fireEvent('drawEnd');
    	
		Ext.ShowReachToolbar(evtArgs, el);
		//Ext.HideSiteListWindow();
		//HideWindowSiteNChart();
		//Ext.HideSiteInfoWindow();
		//Ext.HideChartResult();
		//HideSearchResult();
		//ShowReachInfoWindow();
		
	}
	
});
