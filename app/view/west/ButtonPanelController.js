Ext.define('KRF_DEV.view.west.ButtonPanelController', {
	
	extend: 'Ext.app.ViewController',

	alias: 'controller.buttonpanel',
	
	endBtnOnOff: 'off',

	onClickButton: function(evtArgs, el) {
		var currCtl = Ext.getCmp(el.id);
		
		//console.info(evtArgs);
		
		// 이미지 셋팅
		Ext.SetSrc(currCtl);
		
		// 주제도선택
		if(el.id == "btnLayer"){
			Ext.WestTabChange(0);
		}
		
		// 위치검색
		if(el.id == "btnSearchArea"){
			Ext.WestTabChange(1);
		}
		
		// 정보 창
		if(currCtl.id == "btnSiteListWindow"){
			//console.info(currCtl.src.indexOf("_on"));
			if(currCtl.src.indexOf("_on") == -1){
				Ext.HideSiteListWindow(currCtl);
				Ext.HideSiteInfoWindow();
				Ext.HideChartResult();
			}
			else{
				Ext.ShowSiteListWindow("test");
			}
		}
		
		// 검색결과 창
		if(el.id == "btnSearchResult"){
			if(currCtl.src.indexOf("_on") == -1){
				Ext.HideSearchResult();
			}
			else{
				Ext.ShowSearchResult("grid-tab-2", "하천수");
			}
		}
		
		// 리치모드 버튼
		if(el.id == "btnModeReach" || el.id == "btnModeReach_center"){
			/* 리치 레이어 켜기 */
	    	var me = KRF_DEV.getApplication().coreMap;
	    	if(me.map.getLevel() < 11){
	    		alert("리치모드는 11레벨 이상이어야 합니다.");
	    		var btnNormal = Ext.getCmp("btnModeNomal");
				this.onClickButton(evtArgs, btnNormal.el);
	    		return;
	    	}
	    	var activeLayer = me.map.getLayer("DynamicLayer_Reach");
	    	activeLayer.setVisibility(true);
	    	
	    	activeLayer = me.map.getLayer("DynamicLayer_Reach_Test");
	    	activeLayer.setVisibility(true);
	    	//console.info(activeLayer.visibleLayers);
	    	//var visibleLyaer = activeLayer.visibleLayers;
	    	//activeLayer.setVisibleLayers([12]);
	    	
	    	//activeLayer = me.map.getLayer("DynamicLayer1");
	    	//var layers = [45, 46]; // Reach Layer Id
	    	//activeLayer.setVisibleLayers([45, 46]);
	    	//activeLayer.setVisibility(false);
	    	//me.graphicsLayerAdmin = Ext.create('KRF_DEV.view.map.GraphicsLayerAdmin', me.map);
	    	//me.map.setLevel(12);
	    	/* 리치 레이어 켜기 끝 */
	    	
	    	var me = KRF_DEV.getApplication().coreMap;
			me.map.graphics.clear();
	    	KRF_DEV.getApplication().fireEvent('drawEnd');
	    	
			Ext.ShowReachToolbar(evtArgs, el);
			Ext.HideSiteListWindow();
			Ext.HideSiteInfoWindow();
			Ext.HideChartResult();
			Ext.HideSearchResult();
		}
		
		// 일반모드 버튼
		if(el.id == "btnModeNomal" || el.id == "btnModeNomal_center"){
			/* 전체 레이어 끄기 */
	    	var me = KRF_DEV.getApplication().coreMap;
	    	var activeLayer = me.map.getLayer("DynamicLayer_Reach");
	    	activeLayer.setVisibility(false);
	    	//activeLayer = me.map.getLayer("DynamicLayer_Reach_Test");
	    	//activeLayer.setVisibility(false);
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
			Ext.HideSiteListWindow();
			Ext.HideSiteInfoWindow();
			Ext.HideChartResult();
			Ext.HideSearchResult();
		}
		
		//console.info("dd");
		// 리치 툴바 스마트검색 버튼
		if(el.id == "btnMenu01"){
			//console.info("dd");
			// 이미지 셋팅, 이미지 변화 없게 할라구.. 시연 뒤에 삭제할 것..
			Ext.SetSrc(currCtl);
			
			var ctl = Ext.getCmp("popSmart");
			if(ctl == undefined){
				ctl = Ext.create("Ext.window.Window", {
							title: '스마트검색',
							id: 'popSmart',
							cls: 'khLee-window-panel-header khLee-x-window-default ',
							items: [{
								xtype: 'image',
								src: './resources/images/popup/20150812_smart.gif',
								width: 307,
								height: 475
							}],
							x: 410,
							y: 170
						});
			}
			console.info(ctl);
			ctl.show();
		}
		
		// 리치 툴바 시작위치 버튼
		if(el.id == "btnMenu04"){
			Ext.get('_mapDiv__gc').setStyle('cursor','url(./resources/images/symbol/btn_start01.png),auto');
			KRF_DEV.getApplication().fireEvent('pointDrawClick', "point", el.id, false);
		}
		
		// 리치 툴바 끝위치 버튼
		if(el.id == "btnMenu05"){
			Ext.get('_mapDiv__gc').setStyle('cursor','url(./resources/images/symbol/btn_end01.png),auto');
			KRF_DEV.getApplication().fireEvent('pointDrawClick', "point", el.id, true);
			
			console.info(this.endBtnOnOff);
			
			if(this.endBtnOnOff == "off"){
				if(Ext.getCmp("btnMenu05").src.indexOf("_on") > -1)
					this.endBtnOnOff = "on";
			}
			else{
				if(Ext.getCmp("btnMenu05").src.indexOf("_on") > -1){
					// 끝위치 버튼 셋팅
					Ext.getCmp("btnMenu05").setSrc(Ext.getCmp("btnMenu05").src.replace("_on.png", ".png"));
					Ext.get('_mapDiv__gc').setStyle('cursor','default');
					KRF_DEV.getApplication().fireEvent('drawEnd');
					this.endBtnOnOff = "off";
					// 끝위치 버튼 셋팅 끝
				}
			}
		}
		
		// 드래그 선택 버튼
		if(el.id == "btnMenu06"){
			var me = KRF_DEV.getApplication().coreMap;
			me.map.graphics.clear();
			
			// 끝위치 버튼 셋팅
			Ext.getCmp("btnMenu05").setSrc(Ext.getCmp("btnMenu05").src.replace("_on.png", ".png"));
			Ext.get('_mapDiv__gc').setStyle('cursor','default');
			KRF_DEV.getApplication().fireEvent('drawEnd');
			this.endBtnOnOff = "off";
			// 끝위치 버튼 셋팅 끝
			
			// 레이어 On/Off
        	KRF_DEV.getApplication().fireEvent("Reach_TestOnOff", "DynamicLayer_Reach_Test", "reset", 1);
        	
        	// 모든 창닫기
        	Ext.HideSiteListWindow(currCtl);
			Ext.HideSiteInfoWindow();
			Ext.HideChartResult();
		}
		
		// 반경 선택 버튼
		if(el.id == "btnMenu07"){
			var me = KRF_DEV.getApplication().coreMap;
			me.map.graphics.clear();
			
			// 끝위치 버튼 셋팅
			Ext.getCmp("btnMenu05").setSrc(Ext.getCmp("btnMenu05").src.replace("_on.png", ".png"));
			Ext.get('_mapDiv__gc').setStyle('cursor','default');
			KRF_DEV.getApplication().fireEvent('drawEnd');
			this.endBtnOnOff = "off";
			// 끝위치 버튼 셋팅 끝
			
			// 레이어 On/Off
        	KRF_DEV.getApplication().fireEvent("Reach_TestOnOff", "DynamicLayer_Reach_Test", "reset", 1);
        	
        	// 모든 창닫기
        	Ext.HideSiteListWindow(currCtl);
			Ext.HideSiteInfoWindow();
			Ext.HideChartResult();
		}
		
		// 초기화 버튼
		if(el.id == "btnMenu08"){
			// 이미지 셋팅, 이미지 변화 없게 할라구.. 시연 뒤에 삭제할 것..
			Ext.SetSrc(currCtl);
			
			var me = KRF_DEV.getApplication().coreMap;
			me.map.graphics.clear();
			
			// 끝위치 버튼 셋팅
			Ext.getCmp("btnMenu05").setSrc(Ext.getCmp("btnMenu05").src.replace("_on.png", ".png"));
			Ext.get('_mapDiv__gc').setStyle('cursor','default');
			KRF_DEV.getApplication().fireEvent('drawEnd');
			this.endBtnOnOff = "off";
			// 끝위치 버튼 셋팅 끝
			
			// 레이어 On/Off
        	KRF_DEV.getApplication().fireEvent("Reach_TestOnOff", "DynamicLayer_Reach_Test", "reset", 1);
        	
        	// 모든 창닫기
        	Ext.HideSiteListWindow(currCtl);
			Ext.HideSiteInfoWindow();
			Ext.HideChartResult();
		}
		
		// 설정저장 버튼
		if(el.id == "btnMenuSave"){
			// 이미지 셋팅, 이미지 변화 없게 할라구.. 시연 뒤에 삭제할 것..
			Ext.SetSrc(currCtl);
			
			// 끝위치 버튼 셋팅
			Ext.getCmp("btnMenu05").setSrc(Ext.getCmp("btnMenu05").src.replace("_on.png", ".png"));
			Ext.get('_mapDiv__gc').setStyle('cursor','default');
			KRF_DEV.getApplication().fireEvent('drawEnd');
			this.endBtnOnOff = "off";
			// 끝위치 버튼 셋팅 끝
			
			// 레이어 On/Off
        	KRF_DEV.getApplication().fireEvent("Reach_TestOnOff", "DynamicLayer_Reach_Test", "save", 1);
        	
        	// 지점목록 보여주기
    		Ext.ShowSiteListWindow("test");
		}
	}
});
