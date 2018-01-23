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
		var west_container = Ext.getCmp("west_container");
		
		// 본류, 지류 설정창
		var popCtl = Ext.getCmp("searchConfig");
		var popHeader = Ext.getCmp("searchConfigHeader");
		var kradMetaInfo = Ext.getCmp("kradMetaInfo");
		
		if(popCtl == undefined){
			popCtl = Ext.create("KRF_DEV.view.center.SearchConfig");
			
		}
		
		if(popHeader == undefined){
			popHeader = Ext.create("KRF_DEV.view.center.SearchConfigHeader");
			
		}
		
		// 설정창 show
		if(currCtl.btnOnOff == "on"){
			popHeader.show();
			popCtl.show();
			if(west_container.collapsed=="left"){
				popCtl.setX(west_container.width - 212);	
				popHeader.setX(west_container.width - 212);
			}else{
				popCtl.setX(west_container.width + 86);	
				popHeader.setX(west_container.width + 86);
				
			}
			
			popCtl.setY(200);
			popHeader.setY(170);
			SetWestCollapseXY("show");
		}
		else{
			popHeader.hide();
			popCtl.hide();
			if(kradMetaInfo != undefined){
				kradMetaInfo.hide();
			}
			
		}
		
		// 부하량 주제도 off
		//catTMLayerOnOff("off");
		
	},
	
	onClickKrad: function(obj, el, evt){
		
		
		
		
		// 버튼 On/Off
		var currCtl = SetBtnOnOff(el.id);
		
		// 본류, 지류 설정창
		var kradConf = Ext.getCmp("kradSchConf");
		if(kradConf == undefined){
			kradConf = Ext.create("KRF_DEV.view.krad.kradSchConf");
		}
		
		// 설정창 show
		if(currCtl.btnOnOff == "on"){
			
			kradConf.show();
			//kradConf.show();
			SetWestCollapseXY("show");
		}
		else{
			kradConf.close();
			kradConf.hide();
		}
		
		// 부하량 주제도 off
		catTMLayerOnOff("off");
		
	},
	
	// 리치추가 버튼 클릭
	onClickAddReach: function(obj, el, evt){
		
		//SetBtnOnOff("btnMenu02", "off");
		
		var btnMenu02 = Ext.getCmp("btnMenu02");
		//console.info(btnMenu02.btnOnOff);
		
		if(btnMenu02.btnOnOff == "off"){
		
			// 맵 클릭 이벤트 켜기
			_krad.onMapClickEvt("addPoint", el.id);
			
			// 부하량 주제도 off
			catTMLayerOnOff("off");
			
		}else{
			
			//tmp에 저장되어 있는 graphic을 지우고 원래 graphic으로 배열을 넘겨준다.
			
			var reachAdmin = GetCoreMap().reachLayerAdmin_v3_New;
			for(var i = 0 ; i < _krad.arrLineGrpTmp.length; i++){
				_krad.drawGraphic2(_krad.arrLineGrpTmp[i], _krad.reachLineSym , _krad.lineGrpLayer , _krad.arrLineGrp, reachAdmin.arrLineGrp)
			};
			for(var j = 0 ; j < _krad.arrAreaGrpTmp.length; j++){
				_krad.drawGraphic2(_krad.arrAreaGrpTmp[j], _krad.reachAreaSym, _krad.areaGrpLayer, _krad.arrAreaGrp, reachAdmin.arrAreaGrp);
			};
			
			// 검색 종료 체크(지점목록,검색결과)
			_krad.isStopCheck();
			SetBtnOnOff("btnMenu02", "off");
			
			_krad.arrLineGrpTmp = [];
			_krad.arrAreaGrpTmp = [];
			reachAdmin.arrLineGrpTmp = [];
			reachAdmin.arrAreaGrpTmp = [];
			
						
		}
		
		
		
		
		//me.drawGraphic2(graphic, me.addReachLineSym, me.lineGrpLayer, me.arrLineGrpTmp, reachAdmin.arrLineGrpTmp);
		
		//me.drawGraphic2(graphic, me.reachLineSym, me.lineGrpLayer, me.arrLineGrp, reachAdmin.arrLineGrp);
		//graphic(tmp), symbol(기존), layer(기존), arrObj(기존), reachArr(기존)
		//me.drawGraphic2(graphic, me.addReachAreaSym, me.areaGrpLayer, me.arrAreaGrpTmp, reachAdmin.arrAreaGrpTmp);
		//graphic(tmp), symbol(기존), layer(기존), arrObj(기존), reachArr(기존)
		//me.drawGraphic2(graphic, me.reachAreaSym, me.areaGrpLayer, me.arrAreaGrp, reachAdmin.arrAreaGrp);
		
		
	},
	
	// 구간제거 버튼 클릭
	onClickRemoveReach: function(obj, el, evt){
		
		//console.info(el.id);
		// 맵 클릭 이벤트 켜기
		//_krad.onMapClickEvt("removePoint", el.id);
		//m.onMapClickEvt("removePoint", "btnMenu03");
		
		/*var btnMenu03 = Ext.getCmp("btnMenu03");
		//console.info(btnMenu03.btnOnOff);
		if(btnMenu03.btnOnOff == "off"){
			
		}else{
			SetBtnOnOff("btnMenu03", "off");
		}*/
		
		_krad.onMapClickEvt("removePoint", el.id);
		
		
		
		
		/*
		//SetBtnOnOff(me.btnObj.id, "off");
		
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
		}*/
		
		// 부하량 주제도 off
		catTMLayerOnOff("off");
	},
	
	//하류제거
	onClickRemoveReachLine: function(obj, el, evt){
		
		_krad.onMapClickEvt("reachLineRemove",el.id)
		
	},
	
	// 시작위치 버튼 클릭
	onClickStartReach: function(obj, el, evt){
		
		if(_krad.maxSelect == true){
    		alert("최대 5개 까지 선택 가능합니다.");
    		return;
    	}
		
		// 맵 클릭 이벤트 켜기
		_krad.clickCnt("startPoint");
		
		
		if(_krad.realTimeStBtnChk == false){
			return;
		}
		
		_krad.onMapClickEvt("startPoint", el.id);
		
		// 부하량 주제도 off
		catTMLayerOnOff("off");
			
		//Ext.get('_mapDiv__gc').setStyle('cursor','url(./resources/images/symbol/btn_start01.png) 13 38,auto');
		
		// 버튼 On/Off
		/*var currCtl = SetBtnOnOff(el.id);
		
		var coreMap = GetCoreMap();
		var kradLayerAdmin = coreMap.kradLayerAdmin;
		kradLayerAdmin.createMapClickEvtTest("startPoint");*/
	},
	
	// 끝위치 버튼 클릭
	onClickEndReach: function(obj, el, evt){
		if(_krad.maxSelect  == true){
    		alert("최대 5개 까지 선택 가능합니다.");
    		return;
    	}
		
		_krad.clickCnt("endPoint");
		if(_krad.realTimeEnBtnChk == false){
			return;
		}
		// 맵 클릭 이벤트 켜기
		_krad.onMapClickEvt("endPoint", el.id);
		
		// 부하량 주제도 off
		catTMLayerOnOff("off");
			
		//Ext.get('_mapDiv__gc').setStyle('cursor','url(./resources/images/symbol/btn_end01.png) 13 38,auto');
		
		// 버튼 On/Off
		/*var currCtl = SetBtnOnOff(el.id);
		var coreMap = GetCoreMap();
		var kradLayerAdmin = coreMap.kradLayerAdmin;
		kradLayerAdmin.createMapClickEvtTest("endPoint");*/
	},
	
	// 초기화 버튼 클릭
	onClickReset: function(obj, el, evt){
		////console.info("dkjdf");
		var reachs_close = Ext.getCmp("reachs_close");
		var reache_close = Ext.getCmp("reache_close");
		reachs_close.setHidden(true);
		reache_close.setHidden(true);
		
		_krad.stCnt = 0;
		_krad.edCnt = 0;
		_krad.arrCnt = 0;
		
		ResetButtonClick();
		initKradEvt();
		
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
		//var currCtl = SetBtnOnOff(el.id);
		
		//var me = KRF_DEV.getApplication().coreMap;
		
		// 리치 선택 종료
		//me.reachLayerAdmin.drawEnd();
		//me.reachLayerAdmin_v3.drawEnd();
		/*me.reachLayerAdmin_v3_New.drawEnd();
		
		if(currCtl.btnOnOff == "on"){
			//GetCoreMap().reachLayerAdmin.extentDraw("ADD", el.id);
			//GetCoreMap().reachLayerAdmin_v3.pointDraw("EXTENT", el.id); // v3
			GetCoreMap().reachLayerAdmin_v3_New.startDraw("extent"); // v3
		}*/
		
		_krad.onMapDragEvt("extent", el.id);
		
		// 부하량 주제도 off
		catTMLayerOnOff("off");
	},
	
	// 반경 선택 버튼
	onClickRadius: function(obj, el, evt){
		
		// 버튼 On/Off
		//var currCtl = SetBtnOnOff(el.id);
		
		//var me = KRF_DEV.getApplication().coreMap;
		
		// 리치 선택 종료
		//me.reachLayerAdmin.drawEnd();
		//me.reachLayerAdmin_v3.drawEnd();
		//me.reachLayerAdmin_v3_New.drawEnd();
		
		//SetBtnOnOff("btnSearchResult");
		//if(currCtl.btnOnOff == "on"){
			//GetCoreMap().reachLayerAdmin.radiusDraw("ADD", el.id);
			//GetCoreMap().reachLayerAdmin_v3.pointDraw("CIRCLE", el.id); // v3
			//GetCoreMap().reachLayerAdmin_v3_New.startDraw("circle"); // v3
		//}
		
		_krad.onMapDragEvt("circle", el.id);
		
		// 부하량 주제도 off
		catTMLayerOnOff("off");
	},
	
	// 반경 선택 버튼
	onClickRadius_2: function(obj, el, evt){
		
		
		var btnMenu07 = Ext.getCmp("btnMenu07");
		var btnMenu07_2 = Ext.getCmp("btnMenu07_2");
		
		
		var radiusToolbar = Ext.getCmp("radiusToolbar");
		if(radiusToolbar == undefined){
			radiusToolbar = Ext.create("KRF_DEV.view.center.RadiusToolbar");
		}
		
		//반경검색이 on일 경우 radiustoolbar show  , off일경우 툴바 hide
		if(btnMenu07.btnOnOff == "on"){
			radiusToolbar.show();
			_krad.onMapDragEvt("radius", el.id);
			// 부하량 주제도 off
			catTMLayerOnOff("off");
		}else{
			SetBtnOnOff(el.id,"off");
			radiusToolbar.hide();
		}
		
		// 클릭시 현제 버튼이 off됬을경우 toolbar hide
		if(btnMenu07_2.btnOnOff == "off"){
			radiusToolbar.hide();
		}
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
