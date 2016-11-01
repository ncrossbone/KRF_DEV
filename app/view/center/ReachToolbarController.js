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
		
		// 본류, 지류 설정창
		var popCtl = Ext.getCmp("searchConfig");
		if(popCtl == undefined){
			popCtl = Ext.create("KRF_DEV.view.center.SearchConfig");
		}
		
		/*var kradConf = Ext.getCmp("kradSchConf");
		if(kradConf == undefined){
			kradConf = Ext.create("KRF_DEV.view.krad.kradSchConf");
		}*/
		var kradConf = Ext.getCmp("kradSchConf");
		if(kradConf == undefined){
			kradConf = Ext.create("KRF_DEV.view.krad.kradSchConf");
		}
		
		// 설정창 show
		if(currCtl.btnOnOff == "on"){
			popCtl.show();
			
			var confInfo = localStorage['_searchConfigInfo_'];
			if(confInfo != undefined){
				var jsonConf = JSON.parse(confInfo);
				if(jsonConf.isKrad == true){
					kradConf.show();
				}else{
					kradConf.hide();
				}
				
			}
			
			
			
			//kradConf.show();
			SetWestCollapseXY("show");
		}
		else{
			popCtl.close();
			kradConf.close();
			kradConf.hide();
		}
		
		// 부하량 주제도 off
		catTMLayerOnOff("off");
		
	},
	
	// 리치추가 버튼 클릭
	onClickAddReach: function(obj, el, evt){
		
		// 리치 선택 종료
		//GetCoreMap().reachLayerAdmin.drawEnd();
		//GetCoreMap().reachLayerAdmin_v3.drawEnd();
		GetCoreMap().reachLayerAdmin_v3_New.drawEnd();
		
		// 버튼 On/Off
		var currCtl = SetBtnOnOff(el.id);
		
		if(currCtl.btnOnOff == "on"){
			// 리치 선택 시작
			//GetCoreMap().reachLayerAdmin.pointDraw("ADD", el.id);
			//GetCoreMap().reachLayerAdmin_v3.pointDraw("ADD", el.id); // v3
			GetCoreMap().reachLayerAdmin_v3_New.startDraw("addPoint"); // v3
		}
		
		// 부하량 주제도 off
		catTMLayerOnOff("off");
	},
	
	// 구간제거 버튼 클릭
	onClickRemoveReach: function(obj, el, evt){
		
		// 리치 선택 종료
		//GetCoreMap().reachLayerAdmin.drawEnd();
		GetCoreMap().reachLayerAdmin_v3_New.drawEnd();
		
		// 버튼 On/Off
		var currCtl = SetBtnOnOff(el.id);
		
		if(currCtl.btnOnOff == "on"){
			// 리치 선택 시작
			//GetCoreMap().reachLayerAdmin.pointDraw("REMOVE", el.id);
			//GetCoreMap().reachLayerAdmin_v3.pointDraw("REMOVE", el.id); // v3
			GetCoreMap().reachLayerAdmin_v3_New.startDraw("removePoint"); // v3
		}
		
		// 부하량 주제도 off
		catTMLayerOnOff("off");
	},
	
	// 시작위치 버튼 클릭
	onClickStartReach: function(obj, el, evt){
		
		var me = GetCoreMap().reachLayerAdmin_v3_New;
		
		// 리치 선택 종료
		//GetCoreMap().reachLayerAdmin.drawEnd();
		//GetCoreMap().reachLayerAdmin_v3.drawEnd();
		me.drawEnd();
		// 버튼 On/Off
		var currCtl = SetBtnOnOff(el.id);
		
		if(currCtl.btnOnOff == "on"){
			//GetCoreMap().reachLayerAdmin.pointStartDraw("STARTPOINT", el.id); // v2
			//GetCoreMap().reachLayerAdmin_v3.pointDraw("STARTPOINT", el.id); // v3
			me.onClickStartPoint(); // v3 New
		}
		
	},
	
	// 끝위치 버튼 클릭
	onClickEndReach: function(obj, el, evt){
		
		var me = GetCoreMap().reachLayerAdmin_v3_New;
		// 리치 선택 종료
		//GetCoreMap().reachLayerAdmin.drawEnd();
		//GetCoreMap().reachLayerAdmin_v3.drawEnd();
		me.drawEnd();
		
		// 버튼 On/Off
		var currCtl = SetBtnOnOff(el.id);
		
		if(currCtl.btnOnOff == "on"){
			//GetCoreMap().reachLayerAdmin.pointEndDraw("ENDPOINT", el.id); // v2
			//GetCoreMap().reachLayerAdmin_v3.pointDraw("ENDPOINT", el.id); // v3
			me.onClickEndPoint(); // v3 New
		}
	},
	
	// 초기화 버튼 클릭
	onClickReset: function(obj, el, evt){
		
		ResetButtonClick();
		
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
		
		if(popCtl.hidden == true)
			popCtl.show();
		else
			popCtl.hide();
		
		// 부하량 주제도 off
		catTMLayerOnOff("off");
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
		
		if(popCtl.hidden == true)
			popCtl.show();
		else
			popCtl.hide();
		
		// 부하량 주제도 off
		catTMLayerOnOff("off");
	},
	
	// 드래그 선택 버튼
	onClickDrag: function(obj, el, evt){
		
		// 버튼 On/Off
		var currCtl = SetBtnOnOff(el.id);
		
		var me = KRF_DEV.getApplication().coreMap;
		
		// 리치 선택 종료
		//me.reachLayerAdmin.drawEnd();
		//me.reachLayerAdmin_v3.drawEnd();
		me.reachLayerAdmin_v3_New.drawEnd();
		
		if(currCtl.btnOnOff == "on"){
			//GetCoreMap().reachLayerAdmin.extentDraw("ADD", el.id);
			//GetCoreMap().reachLayerAdmin_v3.pointDraw("EXTENT", el.id); // v3
			GetCoreMap().reachLayerAdmin_v3_New.startDraw("extent"); // v3
		}
		
		// 부하량 주제도 off
		catTMLayerOnOff("off");
	},
	
	// 반경 선택 버튼
	onClickRadius: function(obj, el, evt){
		
		// 버튼 On/Off
		var currCtl = SetBtnOnOff(el.id);
		
		var me = KRF_DEV.getApplication().coreMap;
		
		// 리치 선택 종료
		//me.reachLayerAdmin.drawEnd();
		//me.reachLayerAdmin_v3.drawEnd();
		me.reachLayerAdmin_v3_New.drawEnd();
		
		//SetBtnOnOff("btnSearchResult");
		if(currCtl.btnOnOff == "on"){
			//GetCoreMap().reachLayerAdmin.radiusDraw("ADD", el.id);
			//GetCoreMap().reachLayerAdmin_v3.pointDraw("CIRCLE", el.id); // v3
			GetCoreMap().reachLayerAdmin_v3_New.startDraw("circle"); // v3
		}
		
		// 부하량 주제도 off
		catTMLayerOnOff("off");
	},

	onClickButton: function(btn, el, evt) {
		
		// 버튼 On/Off
		var currCtl = SetBtnOnOff(el.id);
		
		var me = KRF_DEV.getApplication().coreMap;
		var currCtl = Ext.getCmp(el.id);
		
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
		
		// 부하량 주제도 off
		catTMLayerOnOff("off");
	}
});
