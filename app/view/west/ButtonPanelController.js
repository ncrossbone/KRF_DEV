Ext.define('KRF_DEV.view.west.ButtonPanelController', {
	
	extend: 'Ext.app.ViewController',

	alias: 'controller.buttonpanel',
	
	endBtnOnOff: 'off',
	
	//btnSearchDrone
	// 조류항공사진버튼
	onClickDrone: function(obj, el, evt){
		// 버튼 On/Off

		var currCtl = SetBtnOnOff(el.id);
		var droneCtl = Ext.getCmp("droneToolbar");
        var btnModeReach = Ext.getCmp("btnModeReach");

		//console.info(droneCtl);
		
		if(currCtl.btnOnOff == "on"){
            
            droneCtl.show();
            
            if(btnModeReach.btnOnOff=="on" && droneCtl.getY()==97){
                droneCtl.setY(droneCtl.getY() + 105);
            }

            if(btnModeReach.btnOnOff=="off" && droneCtl.getY()==202){
                droneCtl.setY(droneCtl.getY() - 105);
            }
            

			droneCtl.show();
			Layer01OnOff(_reachNodeLayerId, "off");
			Layer01OnOff(_reachLineLayerId, "off");
			Layer01OnOff(_reachFlowLayerId, "off");
            SetBtnOnOff("btnFlowLayer","off");
            SetBtnOnOff("btnReachLayer","off");

		}else{
			// 항공영상 초기화
			KRF_DEV.global.DroneFn.onClickResetButton();
			droneCtl.hide();
			Ext.defer(function(){
				Layer01OnOff(_reachNodeLayerId, "on");
				Layer01OnOff(_reachLineLayerId, "on");
				Layer01OnOff(_reachFlowLayerId, "on");
				
	            SetBtnOnOff("btnFlowLayer","on");
	            SetBtnOnOff("btnReachLayer","on");

			}, 100);
		}
		
        // 물환경 연동 마커 초기화
        var coreMap = GetCoreMap();
        var paramMarker = coreMap.map.getLayer("siteSymbolGraphic");
        if(paramMarker!=undefined){
            paramMarker.hide();
        }
	},
	
	
	
	// 주제도 선택
	onClickLayer: function(obj, el, evt){
		// 버튼 On/Off
		//console.info(el.id);
		var currCtl = SetBtnOnOff(el.id);
		
		if(currCtl.btnOnOff == "on"){
			Ext.WestTabChange(0);
		}else{
			Ext.WestTabChange(1);
		}
	},
	
	// 정보창 클릭
	onClickInfo: function(obj, el, evt){
		// 버튼 On/Off
		
		
		//추가 160704 pdj
		var listWinCtl = Ext.getCmp("siteListWindow");
		var windowSiteNChart = Ext.getCmp("windowSiteNChart");
		
		if(listWinCtl != undefined){
			
			var currCtl = SetBtnOnOff(el.id);
			
			if(currCtl.btnOnOff == "off"){
				listWinCtl.hide();
				if(windowSiteNChart != undefined){
					windowSiteNChart.hide();
				}	
				/*Ext.HideSiteListWindow(currCtl);
				HideWindowSiteNChart();*/
			}
			else{
				listWinCtl.show();
				
				if(windowSiteNChart != undefined){
					windowSiteNChart.show();
				}
					
				//Ext.ShowSiteListWindow("test");
			}
		}else{
			alert("검색된 정보가 없습니다.");
		}
		
	},
	
	// 검색결과창 클릭
	onClickResult: function(obj, el, evt){
		// 버튼 On/Off
		
		//console.info(el.id);
		var searchResultWindow = Ext.getCmp("searchResultWindow");
		/*
		if(currCtl.btnOnOff == "off"){
			Ext.HideSearchResult();
		}
		else{
			Ext.ShowSearchResult("grid-tab-2", "하천수");
		}
		*/
		if(searchResultWindow != undefined){
			var currCtl = SetBtnOnOff(el.id);
			if(currCtl.btnOnOff == "on"){
				//ShowSearchResult(_searchType);
				searchResultWindow.show();
			}
			else{
				//HideSearchResult();
				searchResultWindow.hide();
			}
		}else{
			alert("검색된 검색결과가 없습니다.");
		}
			
		
	},
	
	onClickFavorite: function(obj, el, evt){
		
		// 버튼 On/Off
		var currCtl = SetBtnOnOff(el.id);
		
		var popSaveCtl = Ext.getCmp("popSave");
		if(popSaveCtl != undefined)
			popSaveCtl.hide();
		
		var popOpenCtl = Ext.getCmp("popOpen");
		if(popOpenCtl != undefined)
			popOpenCtl.hide();
		
		// 즐겨찾기 팝업
		var popCtl = Ext.getCmp("Favorite");
		
		if(popCtl == undefined){
			
			popCtl = Ext.create('KRF_DEV.view.east.FavoriteWindow_v3');
		}
		
		////console.info(popCtl.hidden);
		if(popCtl.hidden == true)
			popCtl.show();
		else
			popCtl.hide();
		
	},

	onClickButton: function(evtArgs, el) {
		
		var me = KRF_DEV.getApplication().coreMap;
		var currCtl = Ext.getCmp(el.id);
		
		////console.info(evtArgs);
		
		// 이미지 셋팅
		//Ext.SetSrc(currCtl);
		// 버튼 On/Off
		var currCtl = SetBtnOnOff(el.id, "on");
		
		// 주제도선택
		/*if(el.id == "btnLayer"){
			Ext.WestTabChange(0);
		}
		
		// 위치검색
		if(el.id == "btnSearchArea"){
			Ext.WestTabChange(1);
		}
		*/
		// 리치모드 버튼
		if(el.id == "btnModeReach" || el.id == "btnModeReach_center"){
			
			//var btn = SetBtnOnOff("btnModeReach_center");
			//if(btn.btnOnOff == "off")
				//SetBtnOnOff("btnModeReach_center");
			
			/* 리치 레이어 켜기 */
			/*
	    	if(me.map.getLevel() < 11){
	    		alert("리치모드는 11레벨 이상이어야 합니다.");
	    		var btnNormal = Ext.getCmp("btnModeNomal");
				this.onClickButton(evtArgs, btnNormal.el);
	    		return;
	    	}
	    	*/
	    	
	    	var westContents = Ext.getCmp("searchAreaContents");
	    	var btnName = Ext.getCmp("btnNameSearch");
			if(btnName.btnOnOff == "off"){
				btnName = SetBtnOnOff("btnNameSearch");
			}
			westContents.setActiveItem(3); // 명칭찾기 리치모드 인덱스
			
			var aEl = Ext.get('reachTable');
			if(aEl != null){
				aEl.dom.hidden = false;
			}
			
			
	    	
	    	// Dim 처리 서비스 레이어
	    	var activeLayer = me.map.getLayer("ReachLayerAdminBackground");
	    	if(activeLayer != undefined){
	    		activeLayer.setVisibleLayers([0]);
	    		activeLayer.setVisibility(true);
	    	}
	    	
	    	// 시뮬레이션용 서비스 레이어
	    	activeLayer = me.map.getLayer("DynamicLayerAdmin_ReachTest");
	    	if(activeLayer != undefined)
	    		activeLayer.setVisibility(true);
	    	
	    	////console.info(activeLayer.visibleLayers);
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

			var droneToolbar = Ext.getCmp("droneToolbar");
            var reachToolbar = Ext.getCmp("reachToolbar");
            //Ext.getCmp("");
            //console.info(droneToolbar.getY());
            if(!reachToolbar.hidden && droneToolbar.getY()==97){
                
                droneToolbar.setY(droneToolbar.getY() + 105);
                
            }

			//Ext.HideSiteListWindow();
			//HideWindowSiteNChart();
			//Ext.HideSiteInfoWindow();
			//Ext.HideChartResult();
			//HideSearchResult();
			//ShowReachInfoWindow();
			
			var kradMetaInfo = Ext.getCmp("kradMetaInfo");
			var kradSchConf = Ext.getCmp("kradSchConf");
			
			if(kradMetaInfo!=undefined) kradMetaInfo.close();
			if(kradSchConf!=undefined) kradSchConf.close();
			
			
			
			
			
			//KRAD 레이어 로컬스토리지 내용으로 Visibility
			var confInfo2 = localStorage['_kradExtInfo2_'];  //사용자지정 로컬스토리지
			var kradLayer = [];
			if(confInfo2 != undefined || confInfo2 != null){
				var jsonConf2 = JSON.parse(confInfo2);
				
				if(jsonConf2.length > 0){
					for(var i =0 ; i < jsonConf2.length;i++){
						if(jsonConf2[i].EVENT_TYPE == "Point"){
							kradLayer.push(jsonConf2[i].PE_LAYER_ID);
						}
						if(jsonConf2[i].EVENT_TYPE == "Line"){
							kradLayer.push(jsonConf2[i].LO_LAYER_ID);
						}
					}
				}
				
				_krad.setKradOnOff(kradLayer);
				_krad.kradInfo = jsonConf2;
			}
			
			
			
		}
		
		// 일반모드 버튼
		if(el.id == "btnModeNomal" || el.id == "btnModeNomal_center"){
			
			//var btn = SetBtnOnOff("btnModeNormal_center");
			//if(btn.btnOnOff == "off")
				//SetBtnOnOff("btnModeNormal_center");
			
			// 리치 선택 종료
			//GetCoreMap().reachLayerAdmin.drawEnd();
			//GetCoreMap().reachLayerAdmin_v3.drawEnd();
			GetCoreMap().reachLayerAdmin_v3_New.drawEnd();
			
			//일반모드 선택시 수계찾기로 이동
			var westContents = Ext.getCmp("searchAreaContents");
			var btnWater = Ext.getCmp("btnWaterSearch");
			if(btnWater.btnOnOff == "off"){
				btnName = SetBtnOnOff("btnWaterSearch");
				westContents.setActiveItem(0); // 일반모드시 수계찾기로 바꿈
			}
			
			
			var aEl = Ext.get('reachTable');
			if(aEl != null){
				aEl.dom.hidden = true;
			}
			
			
				
			
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
			var kradMetaInfo = Ext.getCmp("kradMetaInfo");
			var kradSchConf = Ext.getCmp("kradSchConf");
			
			if(kradMetaInfo!=undefined) kradMetaInfo.close();
			if(kradSchConf!=undefined) kradSchConf.close();
			
			
			var searchConfigHeader = Ext.getCmp("searchConfigHeader");
			if(searchConfigHeader != undefined){
				searchConfigHeader.close();
			}
			
			//KRAD 레이어 해제
			var kradLayer = [];
			_krad.setKradOnOff(kradLayer);
			
		}
		
		////console.info("dd");
		// 리치 툴바 스마트검색 버튼
		if(el.id == "btnMenu01"){
			////console.info("dd");
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
			//console.info(ctl);
			ctl.show();
		}
		
		// 리치 추가 버튼
		if(el.id == "btnMenu02"){
			// 리치 선택
			me.reachLayerAdmin.pointDraw("dd", "btnMenu02");
		}
		
		// 리치 툴바 시작위치 버튼
		if(el.id == "btnMenu04"){
			Ext.get('_mapDiv__gc').setStyle('cursor','url(./resources/images/symbol/btn_start01.png) 13 38,auto');
			KRF_DEV.getApplication().fireEvent('pointDrawClick', "point", el.id, false);
		}
		
		// 리치 툴바 끝위치 버튼
		if(el.id == "btnMenu05"){
			Ext.get('_mapDiv__gc').setStyle('cursor','url(./resources/images/symbol/btn_end01.png) 13 38,auto');
			KRF_DEV.getApplication().fireEvent('pointDrawClick', "point", el.id, true);
			
			//console.info(this.endBtnOnOff);
			
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
		
        
        // 물환경 연동 마커 초기화
        var coreMap = GetCoreMap();
        var paramMarker = coreMap.map.getLayer("siteSymbolGraphic");
        if(paramMarker!=undefined){
            paramMarker.hide();
        }
	}
});
