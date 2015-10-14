Ext.define('KRF_DEV.view.center.ReachToolbarController', {
	
	extend: 'Ext.app.ViewController',

	alias: 'controller.reachToolbar',
	
	onClickButtonTemp: function(obj, el, evt){
		
		// 버튼 On/Off
		var currCtl = SetBtnOnOff(el.id);
		
	},
	
	// 스마트선택 버튼 클릭
	onClickSmart: function(obj, el, evt){
		
		// 버튼 On/Off
		var currCtl = SetBtnOnOff(el.id);
		
		// 팝업 이미지 (임시)
		var popCtl = Ext.getCmp("searchConfig");
		
		if(popCtl == undefined){
			
			popCtl = Ext.create("KRF_DEV.view.center.SearchConfig", {
				x: 390,
				y: 170
			});
			
			/*
			popCtl = Ext.create("Ext.window.Window", {
				
						title: '스마트검색',
						header: false,
						id: 'popSmart',
						cls: 'khLee-window-panel-header khLee-x-window-default ',
						layout: {
							type: 'absolute'
						},
						items: [{
							xtype: 'image',
							src: './resources/images/popup/20150812_smart.gif',
							width: 307,
							height: 257
						}, {
							xtype: 'image',
							title: '닫기',
							src: './resources/images/button/icon_close2.gif',
							listeners: {
								el: {
						            click: function(){
						            	var popCtl = Ext.getCmp("popSmart");
										popCtl.hide();
										SetBtnOnOff(el.id);
						            }
						        }
							},
							width: 10,
							height: 10,
							x: 277,
							y: 10
						}],
						x: 390,
						y: 170
						
					});
					*/
			
		}
		
		// 팝업 이미지 show, hide
		if(currCtl.btnOnOff == "on"){
			popCtl.show();
		}
		else{
			popCtl.hide();
		}
		
	},
	
	// 리치추가 버튼 클릭
	onClickAddReach: function(obj, el, evt){
		
		// 리치 선택 종료
		GetCoreMap().reachLayerAdmin.drawEnd();
		
		// 버튼 On/Off
		var currCtl = SetBtnOnOff(el.id);
		
		if(currCtl.btnOnOff == "on"){
			// 리치 선택 시작
			GetCoreMap().reachLayerAdmin.pointDraw("ADD", el.id);
		}
		else{
			// 리치 선택 종료
			GetCoreMap().reachLayerAdmin.drawEnd();
		}
		
	},
	
	// 구간제거 버튼 클릭
	onClickRemoveReach: function(obj, el, evt){
		
		// 리치 선택 종료
		GetCoreMap().reachLayerAdmin.drawEnd();
		
		// 버튼 On/Off
		var currCtl = SetBtnOnOff(el.id);
		
		if(currCtl.btnOnOff == "on"){
			// 리치 선택 시작
			GetCoreMap().reachLayerAdmin.pointDraw("REMOVE", el.id);
		}
		else{
			// 리치 선택 종료
			GetCoreMap().reachLayerAdmin.drawEnd();
		}
		
	},
	
	// 시작위치 버튼 클릭
	onClickStartReach: function(obj, el, evt){
		
		// 리치 선택 종료
		GetCoreMap().reachLayerAdmin.drawEnd();
		
		// 버튼 On/Off
		var currCtl = SetBtnOnOff(el.id);
		
		if(currCtl.btnOnOff == "on"){
			GetCoreMap().reachLayerAdmin.pointStartDraw("STARTPOINT", el.id);
		}
		else{
			// 리치 선택 종료
			GetCoreMap().reachLayerAdmin.drawEnd();
		}
		
	},
	
	// 끝위치 버튼 클릭
	onClickEndReach: function(obj, el, evt){
		
		// 리치 선택 종료
		GetCoreMap().reachLayerAdmin.drawEnd();
		
		// 버튼 On/Off
		var currCtl = SetBtnOnOff(el.id);
		
		if(currCtl.btnOnOff == "on"){
			GetCoreMap().reachLayerAdmin.pointEndDraw("ENDPOINT", el.id);
		}
		else{
			// 리치 선택 종료
			GetCoreMap().reachLayerAdmin.drawEnd();
		}
		
	},
	
	// 초기화 버튼 클릭
	onClickReset: function(obj, el, evt){
		
		var me = GetCoreMap();
		// 리치 선택 종료
		me.reachLayerAdmin.drawEnd();
		// 리치라인, 집수구역 그래픽 레이어 및 전역 변수 clear
		me.reachLayerAdmin.clearGraphicsLayer("reset");
		
		//Ext.HideSiteListWindow();
		//HideWindowSiteNChart();
		//HideSearchResult();
		
	},
	
	// 설정저장 버튼 클릭
	onClickSave: function(obj, el, evt){
		
		// 버튼 On/Off
		//var currCtl = SetBtnOnOff(el.id);
		
		var popOpenCtl = Ext.getCmp("popOpen");
		if(popOpenCtl != undefined)
			popOpenCtl.hide();
		
		var popFavoriteCtl = Ext.getCmp("Favorite");
		if(popFavoriteCtl != undefined)
			popFavoriteCtl.hide();
		
		// 팝업 이미지 (임시)
		var popCtl = Ext.getCmp("popSave");
		
		if(popCtl == undefined){
			
			popCtl = Ext.create("Ext.window.Window", {
				
						title: '설정저장',
						header: false,
						id: 'popSave',
						cls: 'khLee-window-panel-header khLee-x-window-default ',
						layout: {
							type: 'absolute'
						},
						items: [{
							xtype: 'image',
							src: './resources/images/popup/popSave.gif',
							width: 286,
							height: 114
						}, {
							xtype: 'image',
							title: '닫기',
							src: './resources/images/button/icon_close2.gif',
							listeners: {
								el: {
						            click: function(){
						            	var popCtl = Ext.getCmp("popSave");
										popCtl.hide();
						            }
						        }
							},
							width: 10,
							height: 10,
							x: 264,
							y: 10
						}],
						x: Ext.getBody().getViewSize().width - 286,
						y: 170
						
					});
			
		}
		
		//console.info(popCtl.hidden);
		if(popCtl.hidden == true)
			popCtl.show();
		else
			popCtl.hide();
		
	},
	
	// 설정불러오기 버튼 클릭
	onClickOpen: function(obj, el, evt){
		
		// 버튼 On/Off
		//var currCtl = SetBtnOnOff(el.id);
		
		var popSaveCtl = Ext.getCmp("popSave");
		if(popSaveCtl != undefined)
			popSaveCtl.hide();
		
		var popFavoriteCtl = Ext.getCmp("Favorite");
		if(popFavoriteCtl != undefined)
			popFavoriteCtl.hide();
		
		// 팝업 이미지 (임시)
		var popCtl = Ext.getCmp("popOpen");
		
		if(popCtl == undefined){
			
			popCtl = Ext.create("Ext.window.Window", {
				
						title: '설정불러오기',
						header: false,
						id: 'popOpen',
						cls: 'khLee-window-panel-header khLee-x-window-default ',
						layout: {
							type: 'absolute'
						},
						items: [{
							xtype: 'image',
							src: './resources/images/popup/popOpen.gif',
							width: 286,
							height: 215
						}, {
							xtype: 'image',
							title: '닫기',
							src: './resources/images/button/icon_close2.gif',
							listeners: {
								el: {
						            click: function(){
						            	var popCtl = Ext.getCmp("popOpen");
										popCtl.hide();
						            }
						        }
							},
							width: 10,
							height: 10,
							x: 264,
							y: 10
						}],
						x: Ext.getBody().getViewSize().width - 286,
						y: 170
						
					});
			
		}
		
		//console.info(popCtl.hidden);
		if(popCtl.hidden == true)
			popCtl.show();
		else
			popCtl.hide();
		
	},

	onClickButton: function(btn, el, evt) {
		
		// 버튼 On/Off
		var currCtl = SetBtnOnOff(el.id);
		
		var me = KRF_DEV.getApplication().coreMap;
		var currCtl = Ext.getCmp(el.id);
		
		alert("준비중입니다.");
		return;
		
		// 이미지 셋팅
		Ext.SetSrc(currCtl);
		
		// 드래그 선택 버튼
		if(el.id == "btnMenu06"){
			//me.map.graphics.clear();
			
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
			
			me.reachLayerAdmin.extentDraw();
		}
		
		// 반경 선택 버튼
		if(el.id == "btnMenu07"){
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
	}
});
