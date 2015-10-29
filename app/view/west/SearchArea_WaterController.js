Ext.define('KRF_DEV.view.west.SearchArea_WaterController', {
	
	extend: 'Ext.app.ViewController',

	alias: 'controller.searchArea_WaterController',
	
	control: {
		'#cmbWater1': {
			afterrender: 'onCombo1Render',
			select: 'onAreaChange'
		},
		'#cmbWater2': {
			select: 'onAreaChange'
		},
		'#cmbWater3': {
			select: 'onAreaChange'
		},
		'#btnWater1': {
			click: 'onAreaSearch'
		},
		'#btnWater2': {
			click: 'onAreaSearch'
		},
		'#btnWater3': {
			click: 'onAreaSearch'
		},
		'#btnWaterSelect': {
			click: 'onWaterSelect'
		},
		'#btnWaterReset': {
			click: 'onWaterReset'
		}
	},
	
	// 시도 랜더링 후
	onCombo1Render: function(combo){
		this.setComboData(combo.id, "");
	},
	
	// 콤보 체인지
	onAreaChange: function(combo, record, eOpts) {
		
		if(combo.tarCmbId != undefined && combo.tarCmbId != "")
			this.setComboData(combo.tarCmbId, record.data.id);
		
		var lnkBtn = Ext.getCmp(combo.lnkBtnId);
		lnkBtn.setDisabled(false);
		
	},
	
	setComboData: function(comboId, id){
		var combo = Ext.getCmp(comboId);
		var store = combo.getStore();
		
		store.layerId = combo.layerId; // 타겟 콤보 레이어 아이디
		store.parentId = id;
		
		store.load(); // 데이터 로드
		combo.reset();
		//console.info(store);
		combo.setDisabled(false);
		
		while(true){
			
			// linked button disabled
			var lnkBtn = Ext.getCmp(combo.lnkBtnId);
			lnkBtn.setDisabled(true);
			
			// 하위 콤보 없으면 빠져나가기
			if(combo.tarCmbId == undefined || combo.tarCmbId == "")
				break;
			
			// 하위 콤보 disabled
			combo = Ext.getCmp(combo.tarCmbId);
			combo.reset();
			//combo.setDisabled(true);
			
		}
	},
	
	onAreaSearch: function(button, eOpts, c){
		var combo = Ext.getCmp(button.lnkCmbId);
		var searchLayerId = combo.layerId;
		var searchText = combo.getValue();
		
		//console.info(searchLayerId);
		
		
		var idColumn, nameColumn, whereStr;
		
		var centerCtl = Ext.getCmp("center_container");
		
		if(searchLayerId == '54'){
			idColumn = "WS_CD";
			centerCtl.setTitle('&nbsp;&nbsp;<img src="./resources/images/button/icon_home.png" /> ' + combo.rawValue);
		}
		if(searchLayerId == '55'){ 
			idColumn = "MW_CODE";
			
			var wsCtl = Ext.getCmp("cmbWater1");
			centerCtl.setTitle('&nbsp;&nbsp;<img src="./resources/images/button/icon_home.png" /> ' + wsCtl.rawValue + " > " + combo.rawValue);
		}
		if(searchLayerId == '56'){ 
			idColumn = "SW_CODE";
			
			var wsCtl = Ext.getCmp("cmbWater1");
			var msCtl = Ext.getCmp("cmbWater2");
			centerCtl.setTitle('&nbsp;&nbsp;<img src="./resources/images/button/icon_home.png" /> ' + wsCtl.rawValue + " > " + msCtl.rawValue + " > " + combo.rawValue);
		}
		//console.info(idColumn);
		KRF_DEV.getApplication().fireEvent('areaSelect', {idField: idColumn, idValue: searchText, layerId: searchLayerId});
	},
	
	onAreaSearch2: function(a, b){
		console.info(a);
	},
	
	onWaterSelect: function(button, eOpts){
		
		//if(ChkSearchCondition("수계찾기")){
			
			var btnCtl = null;
			
			var btn1 = Ext.getCmp("btnWater1");
			if(btn1.disabled == false){
				btnCtl = btn1;
			}
			
			var btn2 = Ext.getCmp("btnWater2");
			if(btn2.disabled == false){
				btnCtl = btn2;
			}
			
			var btn3 = Ext.getCmp("btnWater3");
			if(btn3.disabled == false){
				btnCtl = btn3;
			}
			
			if(btnCtl != null){	
				this.onAreaSearch(btnCtl, null, null);
		
				//대역권 선택창 레이어 정보
				var buttonInfo = Ext.getCmp("cmbWater1");
				
				//중역권
				var buttonInfo2 = Ext.getCmp("cmbWater2");
				
				//소역권
				var buttonInfo3 = Ext.getCmp("cmbWater3");
				
				if(btnCtl.lnkCmbId == "cmbWater1"){
					alert("중권역을 선택하여 주세요");
					return;
				}
				
				if(buttonInfo.rawValue != ""){
					
					var treeResach = Ext.getCmp("siteListTree");
	 				if(treeResach != undefined){
	 					var store = treeResach.getStore();
	 					store.buttonInfo = buttonInfo.lastValue;
	 					store.buttonInfo2 = buttonInfo2.lastValue;
	 					store.buttonInfo3 = buttonInfo3.lastValue;
	 					console.info(store);
	 					store.load();
	 					treeResach.getView().refresh();
	 					//return;
	 				}
				}
				
				// 버튼 On/Off
				var currCtl = Ext.getCmp("btnSiteListWindow");
				if(currCtl.btnOnOff == "off"){
					SetBtnOnOff("btnSiteListWindow");
				}
				
				// 지점목록 창 띄우기
				Ext.ShowSiteListWindow("waterSearch");
				
				// 버튼 On/Off
				/*
				currCtl = Ext.getCmp("btnSearchResult");
				if(currCtl.btnOnOff == "off"){
					SetBtnOnOff("btnSearchResult");
				}
				*/
				
				// 검색결과창 띄우기
				// ShowSearchResult(); // 선택버튼 클릭 시 검색결과창 안띄우는걸로.. 20151008
			}
		//}
		
	},
	
	onWaterReset: function(button, eOpts){
		
		/*
		Ext.HideSiteListWindow(null);
		Ext.HideSiteInfoWindow();
		Ext.HideChartResult();
		//KRF_DEV.getApplication().fireEvent('drawEnd');
		
		var combo1 = Ext.getCmp("cmbWater1");
		var combo2 = Ext.getCmp("cmbWater2");
		var combo3 = Ext.getCmp("cmbWater3");
		combo1.setValue("");
		combo2.setValue("");
		combo3.setValue("");
		this.setCtlDisable("cmbWater1");
		this.setCtlDisable("cmbWater2");
		this.setCtlDisable("cmbWater3");
		*/
		
		ResetButtonClick();
		
	}
	
});
