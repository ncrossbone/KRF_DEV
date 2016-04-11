//  버튼 on/off
SetBtnOnOff = function(btnId, strOnOff){
	var currCtl = Ext.getCmp(btnId);
	var parentCtl = currCtl.findParentByType('container');
	var items = parentCtl.items.items;
	var groupCnt = 0;
	
	var btnOnOff = currCtl.btnOnOff;
	
	if(strOnOff == undefined || strOnOff == ""){
		if(currCtl.btnOnOff == "on"){
			currCtl.btnOnOff = "off";
		}
		else{
			currCtl.btnOnOff = "on";
		}
	}
	else{
		currCtl.btnOnOff = strOnOff;
	}
	
	for(i = 0; i < items.length; i++){
		
		if(currCtl.btnOnOff == "on"){
			
			if(currCtl.groupId == items[i].groupId){
				
				var itemSrc = items[i].src;
				
				if(currCtl != items[i]){
					items[i].setSrc(items[i].btnOffImg);
					items[i].btnOnOff = "off";
				}

			}
			
			currCtl.setSrc(currCtl.btnOnImg);
			
		}
		else{
			
			currCtl.setSrc(currCtl.btnOffImg);
			
		}
	}
	
	// 버튼 오브젝트 리턴
	return currCtl;
	
}

// 코어맵 오브젝트 가져오기
GetCoreMap = function(){
	var me = KRF_DEV.getApplication().coreMap;
	return me;
}

//리치 정보 창 띄우기
ShowReachInfoWindow = function(){
	
	reachWinCtl = Ext.getCmp("reachInfoWindow");
	
	if(reachWinCtl == undefined)
		reachWinCtl = Ext.create('KRF_DEV.view.east.ReachInfoWindow');
	
	reachWinCtl.show();
	
	////console.info(infoWinCtl.visible);
	
	var reachWinX = Ext.getBody().getViewSize().width - reachWinCtl.width;
	var reachWinY = Ext.getBody().getViewSize().height - reachWinCtl.height;
	
	reachWinCtl.setX(reachWinX);
	reachWinCtl.setY(reachWinY);
	
	return reachWinCtl;

}

// 리치레이어 On/Off
ReachLayerOnOff = function(btnId, layerId){
	// 버튼 On/Off
	var currCtl = SetBtnOnOff(btnId);
	
	var treeCtl = Ext.getCmp("layer01");
	var node = treeCtl.getStore().getNodeById(layerId);
	
	var me = GetCoreMap();
	//var graphics = me.reachLayerAdmin.reachLinelayer.getSelectedFeatures();
	var graphics = me.reachLayerAdmin_v3_New.lineGrpLayer.getSelectedFeatures();
	
	////console.info(record);
	if(currCtl.btnOnOff == "on"){
		
		if(layerId == "46"){
			node.set("checked", true);
			treeCtl.fireEvent('checkchange', node, true, btnId);
		}
		
		if(layerId == "47"){
			node.set("checked", false);
			treeCtl.fireEvent('checkchange', node, false, btnId);
			
			me.reachLayerAdmin.reachArealayer.setVisibility(true);
			
			var catIds = "";
			
			if(graphics != undefined && graphics.length > 0){
				
				for(var i = 0; i < graphics.length; i++){
					catIds += "'" + graphics[i].attributes.INODE_ID + "', ";
				}
				
				catIds = catIds.substring(0, catIds.length - 2);
				////console.info(catIds);
				
				require(["esri/tasks/query", "esri/tasks/QueryTask"], function(Query, QueryTask){
					queryTask = new QueryTask(KRF_DEV.app.arcServiceUrl + "/rest/services/reach/MapServer/47");
		    		query = new Query();
					query.returnGeometry = true;
					query.outFields = ["*"];
					
					query.where = "CAT_DID IN (" + catIds + ")";
					queryTask.execute(query, AreaLayerDraw);
				});
			}
			else{
				node.set("checked", true);
				treeCtl.fireEvent('checkchange', node, true, btnId);
			}
		}
	}
	else{
		
		if(layerId == "46"){
			node.set("checked", false);
			treeCtl.fireEvent('checkchange', node, false, btnId);
		}
		
		if(layerId == "47"){
			me.reachLayerAdmin.reachArealayer.setVisibility(false);
			
			if(graphics != undefined && graphics.length > 0){
				
			}
			else{
				node.set("checked", false);
				treeCtl.fireEvent('checkchange', node, false, btnId);
			}
		}
	}
}

// 집수구역 레이어 그리기
AreaLayerDraw = function(featureSet){
	////console.info(featureSet);
	var me = GetCoreMap();
	
	require([
             "esri/layers/FeatureLayer",
             "esri/tasks/query"             
           ],
             function (
            		 FeatureLayer, Query
             ) {
    	
    	var selectQuery = new Query();
    	
    	for(var i = 0; i < featureSet.features.length; i++){
        	selectQuery.where = "CAT_DID = '" + featureSet.features[i].attributes.CAT_DID + "'";
        	me.reachLayerAdmin.reachArealayer.selectFeatures(selectQuery, FeatureLayer.SELECTION_ADD); // 집수구역 셀렉트
    	}
	});
}

// 리치정보 바인딩
ReachInfoBinding = function(objs){
	////console.info(objs);
	if(objs == undefined || objs[0] == undefined)
		return;
	
	var RCH_DID = objs[0].attributes.RCH_DID; // 리치코드
	var RIV_ID = objs[0].attributes.RIV_ID; // 하천코드
	var RIV_NM = objs[0].attributes.RIV_NM; // 하천명
	var SB_ID = objs[0].attributes.SB_ID; // 표준유역코드
	var SB_NM = objs[0].attributes.SB_NM; // 표준유역명
	var LO_RIV_ID = objs[0].attributes.LO_RIV_ID; // 하류연결하천코드
	var LO_RIV_NM = objs[0].attributes.LO_RIV_NM; // 하류연결하천명
	var SN = objs[0].attributes.SN; // 순차번호
	var GEO_TRIB = objs[0].attributes.GEO_TRIB; // 하천차수
	var RCH_LEN = objs[0].attributes.RCH_LEN; // 리치길이
	var CUM_LEN = objs[0].attributes.CUM_LEN; // 누적거리
	//var CAT_AREA = objs[0].attributes.CAT_AREA; // 집수면적
	var CUM_AREA = objs[0].attributes.CUM_AREA; // 집수면적
	// 상류면적?
	
	// 리치 정보창 띄우기
	var reachInfoCtl = ShowReachInfoWindow();
	
	if(Ext.getCmp("RCH_DID") != undefined) { Ext.getCmp("RCH_DID").setHtml(RCH_DID) };
	if(Ext.getCmp("RIV_ID") != undefined) { Ext.getCmp("RIV_ID").setHtml(RIV_ID) };
	if(Ext.getCmp("RIV_NM") != undefined) { Ext.getCmp("RIV_NM").setHtml(RIV_NM) };
	if(Ext.getCmp("SB_ID") != undefined) { Ext.getCmp("SB_ID").setHtml(SB_ID) };
	if(Ext.getCmp("SB_NM") != undefined) { Ext.getCmp("SB_NM").setHtml(SB_NM) };
	if(Ext.getCmp("LO_RIV_ID") != undefined) { Ext.getCmp("LO_RIV_ID").setHtml(LO_RIV_ID) };
	if(Ext.getCmp("LO_RIV_NM") != undefined) { Ext.getCmp("LO_RIV_NM").setHtml(LO_RIV_NM) };
	if(Ext.getCmp("SN") != undefined) { Ext.getCmp("SN").setHtml(SN) };
	if(Ext.getCmp("GEO_TRIB") != undefined) { Ext.getCmp("GEO_TRIB").setHtml(GEO_TRIB) };
	if(Ext.getCmp("RCH_LEN") != undefined) { Ext.getCmp("RCH_LEN").setHtml(RCH_LEN) };
	if(Ext.getCmp("CUM_LEN") != undefined) { Ext.getCmp("CUM_LEN").setHtml(CUM_LEN) };
	//if(Ext.getCmp("CAT_AREA") != undefined) { Ext.getCmp("CAT_AREA").setHtml(CAT_AREA) };
	if(Ext.getCmp("CUM_AREA") != undefined) { Ext.getCmp("CUM_AREA").setHtml(CUM_AREA) };
}



//지점/차트 정보 창 띄우기
ShowWindowSiteNChart = function(tabIdx, title, test, parentId){
	
	var yFieldName = "";
	//console.info(parentId);
	////console.info(tabIdx);
	
	if(parentId != ""){ // 기간설정 검색 버튼 클릭 시 공백
		var orgParentId = parentId
		
		parentId = parentId.substring(0,1);
		
		if(parentId == "D"){
			KRF_DEV.getApplication().chartFlag_D = orgParentId;
		}
		
		KRF_DEV.getApplication().parentFlag = parentId;
		KRF_DEV.getApplication().chartFlag = "1";
		
		var winCtl = Ext.getCmp("windowSiteNChart");
		
		if(winCtl == undefined){
			winCtl = Ext.create('KRF_DEV.view.east.WindowSiteNChart',{
				
			});
		}
	
		winCtl.show();
		
	
		var winX = Ext.getBody().getViewSize().width - winCtl.width;
		var winY = 98;
		
		var listCtl = Ext.getCmp("siteListWindow");
		if(listCtl != undefined){
			winY = listCtl.height + winY;
		}
		
		winCtl.setX(winX);
		winCtl.setY(winY);
		
		var siteinfoCtl = Ext.getCmp("siteinfotest");  // 지점정보 ID
		var siteChartCtl = Ext.getCmp("siteCharttest");  //차트 ID
		
		var siteText = Ext.getCmp("selectName");  // 지점명
		//지점명 표출
		siteText.setText(test);
		
		//각쿼리당 초기값 설정
		var series = siteChartCtl.series[0];
		
		if(parentId == "A"){
			series.setXField("WMCYMD");
			yFieldName = "ITEM_BOD";
		}else if(parentId == "B"){
			series.setXField("WMCYMD");
			yFieldName = "ITEM_COD";
		}else if(parentId == "C"){
			series.setXField("WMCYMD");
			yFieldName = "ITEM_DOW";
		}else if(parentId == "F"){
			series.setXField("WMCYMD");
			yFieldName = "ITEM_BOD";
		}else if(orgParentId == "D001"){
			series.setXField("WMCYMD");
			yFieldName = "WL";
		}else if(orgParentId == "D002"){
			series.setXField("WMCYMD");
			yFieldName = "RF";
		}else if(orgParentId == "D003"){
			series.setXField("WMCYMD");
			yFieldName = "FW";
		}else if(orgParentId == "D004"){
			series.setXField("WMCYMD");
			yFieldName = "SWL";
		}else if(orgParentId == "D005"){
			series.setXField("WMCYMD");
			yFieldName = "WD";
		}else if(orgParentId == "D006"){
			series.setXField("WMCYMD");
			yFieldName = "RND";
		}else if(orgParentId == "D007"){
			series.setXField("WMCYMD");
			yFieldName = "SWL";
		}
		//console.info(yFieldName);
		// 정보창 탭 체인지
		ChangeTabIndex(tabIdx);
		
		// 지점정보 스토어 로드
		if(siteinfoCtl != undefined){
			//var store = siteinfoCtl.getStore();
			var store = Ext.create('KRF_DEV.store.east.SiteInfoPanel');
			store.siteCD = title;
			store.load();
			siteinfoCtl.setStore(store);
		}
		
		// 차트정보 스토어 로드
		if(siteChartCtl != undefined){
			//var chartStore = siteChartCtl.getStore();
			var chartStore = Ext.create('KRF_DEV.store.east.SiteChartPanel');
			chartStore.siteCD = title;
			chartStore.yFieldName = yFieldName;
			chartStore.parentId = parentId;
			chartStore.load();
			siteChartCtl.setStore(chartStore);
		}
	}
	else{
		KRF_DEV.getApplication().chartFlag = "0";
		var siteChartCtl = Ext.getCmp("siteCharttest");  //차트 ID
		var chartStore = siteChartCtl.getStore();
		chartStore.load();
	}
	
	//console.info(yFieldName);
	SetItemLabelText(yFieldName);

}

// 지점/차트 정보 창 닫기
HideWindowSiteNChart = function(){
	
	var winCtl = Ext.getCmp("windowSiteNChart");
	////console.info(winCtl);
	if(winCtl != undefined)
		winCtl.close();
	
	winCtl = Ext.getCmp("datePanel1");
	if(winCtl != undefined)
		winCtl.close();

}

SetItemLabelText = function(itemNm){
	
	if(itemNm == undefined || itemNm == ""){
		//item 선택
		var selectItem = Ext.getCmp("selectItem");
		itemNm = selectItem.lastValue;
	}
	//console.info(itemNm);
	//var itemNm = "";
	//var itemNm = "ITEM_VALUE";
	
	if(itemNm == "ITEM_BOD"){
		itemNm = "BOD(㎎/L)";
	}else if(itemNm == "ITEM_COD"){
		itemNm = "COD(㎎/L)";
	}else if(itemNm == "ITEM_DOC"){
		itemNm = "DO(㎎/L)";
	}else if(itemNm == "ITEM_DOW"){
		itemNm = "수심(cm)";
	}else if(itemNm == "WL"){
		itemNm = "수위(cm)";
	}else if(itemNm == "RF"){
		itemNm = "우량(mm)";
	}else if(itemNm == "FW"){
		itemNm = "유량(CMS)";
	}else if(itemNm == "SWL"){
		itemNm = "저수위(cm)";
	}else if(itemNm == "WD"){
		itemNm = "풍향(m/s)";
	}else if(itemNm == "RND"){
		itemNm = "강수량(mm)";
	}else if(itemNm == "SWL"){
		itemNm = "보 상류수위(m)";
	}else if(itemNm == "ITEM_TN"){
		itemNm = "T-N (㎎/L)";
	}else if(itemNm == "ITEM_TP"){
		itemNm = "T-P (㎎/L)";
	}else if(itemNm == "ITEM_TEMP"){
		itemNm = "수온(℃)";
	}else if(itemNm == "ITEM_PH"){
		itemNm = "pH";
	}else if(itemNm == "ITEM_SS"){
		itemNm = "SS(㎎/ℓ)";
	}else if(itemNm == "ITEM_CLOA"){
		itemNm = "클로로필a(㎎/㎥)";
	}else if(itemNm == "ITEM_EC"){
		itemNm = "전기전도도";
	}else if(itemNm == "ITEM_CLOA"){
		itemNm = "클로로필a(㎎/㎥)";
	}else if(itemNm == "AMT_PHYS"){
		itemNm = "방류량_물리학적";
	}else if(itemNm == "AMT_BIO"){
		itemNm = "방류량_생물학적";
	}else if(itemNm == "AMT_HIGHTEC"){
		itemNm = "방류량_고도";
	}else if(itemNm == "ITEM_COLI"){
		itemNm = "ITEM_COLI";
	}else if(itemNm == "ITEM_BYPASS_AMT"){
		itemNm = "미처리배제유량(㎥/일)";
	}else if(itemNm == "OWL"){
		itemNm = "보 하류수위(m)";
	}else if(itemNm == "SFW"){
		itemNm = "저수량(백만㎥)";
	}else if(itemNm == "ECPC"){
		itemNm = "공용량(백만㎥)";
	}else if(itemNm == "INF"){
		itemNm = "유입량(백만㎥)";
	}else if(itemNm == "TOTOTF"){
		itemNm = "총 방류량(㎥/sec)";
	}else if(itemNm == "EGOTF"){
		itemNm = "발전 방류량(㎥/sec)";
	}else if(itemNm == "GTOTF"){
		itemNm = "가동보 방류량(㎥/sec)";
	}else if(itemNm == "CBOTF"){
		itemNm = "고정보 방류량(㎥/sec)";
	}else if(itemNm == "FWOTF"){
		itemNm = "어도 방류량(㎥/sec)";
	}else if(itemNm == "ETCOTF"){
		itemNm = "기타 방류량(㎥/sec)";
	}
	
	var chartCtl = Ext.getCmp("siteCharttest");
	var axes   = chartCtl.axes[0];
	var series = chartCtl.series[0];
	
	series.setYField("ITEM_VALUE");
	axes.fields = "ITEM_VALUE";
	//console.info(itemNm)
	var siteItemText = Ext.getCmp("selectItemName");  // 항목명
	siteItemText.setText(itemNm);
}

// 차트 라벨 맥시멈 등 셋팅 및 스토어 로드
// 기간설정 검색 시 파라메터 모두 공백으로.. 지점목록에서 검색 시 해당 값 파라메터
SetChartMaxData = function(store){
	
	var ITEM_VALUE = parseFloat(store.arrMax[0].ITEM_VALUE);
	//console.info(store);
	
	
	var chartCtl = Ext.getCmp("siteCharttest");
	var axes   = chartCtl.axes[0];
	//var series = chartCtl.series[0];
	//var s = series.getYField();
	//console.info(ITEM_VALUE);
	axes.setMaximum(ITEM_VALUE);
	
		
	chartCtl.redraw();

	var win = Ext.getCmp("datePanel1");
	if(win != undefined)
		win.close();
	
}

// 정보창 탭 체인지
ChangeTabIndex = function(tabIdx){
	
	if(tabIdx == 0){
		var chartCtl = Ext.getCmp("tabChart");
		chartCtl.setSrc("./resources/images/tab/tap_01_ov.gif");
		
		var siteCtl = Ext.getCmp("tabSite");
		siteCtl.setSrc("./resources/images/tab/tap_02_off.gif");
	}
	else{
		var chartCtl = Ext.getCmp("tabChart");
		chartCtl.setSrc("./resources/images/tab/tap_01_off.gif");
		
		var siteCtl = Ext.getCmp("tabSite");
		siteCtl.setSrc("./resources/images/tab/tap_02_ov.gif");
	}
	
	var contCtl = Ext.getCmp("infoContents");
	contCtl.setActiveItem(tabIdx);
}

// 검색결과창 띄우기
ShowSearchResult = function(siteIds, parentIds, titleText, gridId, test, tooltipCk){
	
	if(parentIds == ""){
		parentIds = [{parentId : tooltipCk , siteId : siteIds}];
	}
	
	if(tooltipCk != undefined){
		siteIds = "'"+siteIds+"'";
	}
	
	//console.info("==================================");
	//console.info("siteIds::"+siteIds);
	//console.info("parentIds::"+parentIds);
	//console.info("titleText::"+titleText);
	//console.info("gridId::"+gridId);
	//console.info(test);
	//console.info(tooltipCk);
	//console.info("==================================");
	// 리치검색 khLee 20151102 추가
	if(siteIds == "CAT"){
		ShowSearchResultReach();
		return;
	}
	
	var centerContainer = KRF_DEV.getApplication().contCenterContainer; // view.main.Main.js 전역
	var windowWidth = centerContainer.getWidth();
	var windowHeight = 300;
	var windowY = centerContainer.getHeight() - windowHeight;
	// window 창 옵션
	var options = {
			renderTo: centerContainer.el,
			id: 'searchResultWindow',
			title: '검색결과',
			width: windowWidth,
			y: windowY
	};
	
	// window 창 생성
	var searchResultWindow = this.GetWindowControl(options);
	//console.info(searchResultWindow);
	searchResultWindow.show();
	KRF_DEV.getApplication().searchResultWindow = searchResultWindow;
	
	//console.info(siteIds);
	//console.info(parentIds);
	//console.info(gridId);
	
	//centerContainer.add(searchResultWindow.show()); // window 보이기
	////console.info(gridId);
	if(gridId == undefined)
		return;
	
	options = {
			id: 'searchResultTab',
			//title: '결과탭1',
			header: false
	};
	
	var tabCtl = Ext.getCmp("searchResultTab");
	////console.info(KRF_DEV.getApplication().btnFlag);
	// TabControl 생성
	var searchResultTab = GetTabControl(options);
	
	if(tabCtl == undefined)
		searchResultWindow.add(searchResultTab); // window에 tab추가
	
	////console.info(searchResultTab.items.items[1]);
	
	var orgParentId = parentIds[0].parentId;
	
	if(parentIds[0].parentId == undefined){
		var parentCheck = parentIds.substring(0,1);
	}else{
		var parentCheck = parentIds[0].parentId.substring(0,1);
	}
	
	options = {
			//id: "searchResultContainer",
			id: gridId + "_container",
			title: titleText, //_searchType,
			parentId: parentCheck,
			//closable : true,
			autoResize: true
	};
	
	var tab = searchResultTab.items.items[1];
	
	//console.info(tab);
	var gridStore = null;
	var grdContainer = Ext.getCmp(gridId + "_container");
	
		
	
	
	var hiddenGrid = Ext.getCmp("F_CHANGE");
	var cmbStartYear = Ext.getCmp("cmbStartYear");
	var cmbStartMonth = Ext.getCmp("cmbStartMonth");
	var cmbEndYear = Ext.getCmp("cmbEndYear");
	var cmbEndMonth = Ext.getCmp("cmbEndMonth");
	
	if(parentCheck == "A"){	
		
		////console.info(sYearCtl.setValue("2013"));
		//환경기초시설 검색값 히든처리
		//hiddenGrid.setHidden(true);
		if(grdContainer == null || grdContainer == undefined){
			grdContainer = Ext.create("KRF_DEV.view.south.SearchResultGrid", options);
			//searchResultTab.add(grdContainer);
			tab.add(grdContainer);
			//tab.insert(0, grdContainer);
		}
		tab.setActiveTab(gridId + "_container");
		var grdCtl = grdContainer.items.items[0]; // 그리드 컨테이너
		grdCtl = grdCtl.items.items[0]; // 그리드 컨트롤
		//console.info(parentIds);
		if(siteIds != ""){
			grdCtl.siteIds = siteIds;
		}
		if(parentIds != ""){
			grdCtl.parentIds = parentIds;
		}
		////console.info(grdCtl.parentIds)
		////console.info(grdCtl.siteIds);
		
		
		gridStore = Ext.create("KRF_DEV.store.south.SearchResultGrid", {
			siteIds: grdCtl.siteIds,
			parentIds: grdCtl.parentIds
		});
		
		//grdCtl.getView().bindStore(gridStore);
		grdCtl.setStore(gridStore);
	
	}else if(parentCheck == "F"){
		
		var firstSearch =  KRF_DEV.getApplication().btnFlag;
		if(firstSearch == "noDate"){
			cmbStartYear.setValue("2012");
			cmbStartMonth.setValue("09");
			cmbEndYear.setValue("2012");
			cmbEndMonth.setValue("12");
		}
		
		//cmbStartYear.setValue("2015");
		//cmbStartMonth.setValue("2015");
		//cmbEndYear.setValue("2015");
		//cmbEndMonth.setValue("2015");
		
		//환경기초시설 검색값 히든처리
		//hiddenGrid.setHidden(false);
		if(grdContainer == null || grdContainer == undefined){
			
			grdContainer = Ext.create("KRF_DEV.view.south.SearchResultGrid_F", options);
			tab.add(grdContainer);
			//tab.insert(0, grdContainer);
		}
		////console.info(grdContainer);
		
		
		var ResultGrid_F = Ext.getCmp(gridId + "_container");
		
		tab.setActiveTab(gridId + "_container");
		
		var grdCtl = grdContainer.items.items[0]; // 그리드 컨테이너
		grdCtl = grdCtl.items.items[0]; // 그리드 컨트롤
		//grdCtl.id = gridId;  // 그리드 아이디를 주면 창 닫을때 죽어버린다.. 일단 주지 말자..
		
		if(siteIds != ""){
			grdCtl.siteIds = siteIds;
		}
		if(parentIds != ""){
			grdCtl.parentIds = parentIds;
		}
		
		var hiddenF = "";
		var hiddenT = "";
		var pointArray = "";
		var pointValue = "";
		
		//DISCHARGE_AMT_PHYS_VAL.hideable = false;
		
		//0~2 , 11~16 공통
		if(test == "" ||test == "1" || test == "관거이송량"){
			test = "";
			var arrayF = ['3','4','13','14','27','28','29'];
			var arrayT = ['5','6','7','8','9','10','11','12','30','31'];
			var point = ['14','16','18','20','22','24','26','28'];
			
			for(hiddenF = 0 ; hiddenF<arrayF.length ; hiddenF++){
				grdCtl.columns[arrayF[hiddenF]].setHidden(false);
			}
			
			for(hiddenT = 0 ; hiddenT<arrayT.length ; hiddenT++){
				grdCtl.columns[arrayT[hiddenT]].setHidden(true);
			}
			
			for(pointArray = 0 ; pointArray<point.length ; pointArray++){
				
				if(point[pointArray] == 14){
					pointValue = 13.2;
				}else if(point[pointArray] == 16){
					pointValue = 17.6;
				}else if(point[pointArray] == 18){
					pointValue = 9.9;
				}else if(point[pointArray] == 20){
					pointValue = 418.0;
				}else if(point[pointArray] == 22){
					pointValue = 110.0;
				}else if(point[pointArray] == 24){
					pointValue = 49.5;
				}else if(point[pointArray] == 26){
					pointValue = 5.5;
				}else{
					pointValue = 33.0;
				}
				grdCtl.columns[point[pointArray]].widget.chartRangeMax = pointValue;
				console.info(grdCtl.columns[point[pointArray]].widget.chartRangeMax);
			}
			
			
			
		}else if(test == "2"){   //ResultGrid_F.columns[].setHidden(false);
			
			var arrayT = ['3','4','5','13','14','27','28','29'];
			var arrayF = ['6','7','8','9','10','11','12','30','31'];
			var point = ['8','10','12','16','18','20','22','24','26'];
			
			for(hiddenF = 0 ; hiddenF<arrayF.length ; hiddenF++){
				grdCtl.columns[arrayF[hiddenF]].setHidden(false);
			}
			for(hiddenT = 0 ; hiddenT<arrayT.length ; hiddenT++){
				grdCtl.columns[arrayT[hiddenT]].setHidden(true);
			}
			
			for(pointArray = 0 ; pointArray<point.length ; pointArray++){
				
				if(point[pointArray] == 8){
					pointValue = 4094.2;
				}else if(point[pointArray] == 10){
					pointValue = 4094.2;
				}else if(point[pointArray] == 12){
					pointValue = 12744.6;
				}else if(point[pointArray] == 16){
					pointValue = 10.1;
				}else if(point[pointArray] == 18){
					pointValue = 20.7;
				}else if(point[pointArray] == 20){
					pointValue = 9.4;
				}else if(point[pointArray] == 22){
					pointValue = 22.6;
				}else if(point[pointArray] == 24){
					pointValue = 2.0;
				}else if(point[pointArray] == 26){
					pointValue = 462.0;
				}
				grdCtl.columns[point[pointArray]].widget.chartRangeMax = pointValue;
				console.info(grdCtl.columns[point[pointArray]].widget.chartRangeMax);
			}
			
			
		}else if(test == "3"){
			
			var arrayT = ['3','4','6','7','8','9','10','11','12','27','28','29','30','31'];
			var arrayF = ['5','13','14'];
			var point = ['14','16','18','20','22','24','26'];
			
			for(hiddenF = 0 ; hiddenF<arrayF.length ; hiddenF++){
				grdCtl.columns[arrayF[hiddenF]].setHidden(false);
			}
			for(hiddenT = 0 ; hiddenT<arrayT.length ; hiddenT++){
				grdCtl.columns[arrayT[hiddenT]].setHidden(true);
			}
			
			for(pointArray = 0 ; pointArray<point.length ; pointArray++){
				
				if(point[pointArray] == 14){
					pointValue = 385.0;
				}else if(point[pointArray] == 16){
					pointValue = 19384.2;
				}else if(point[pointArray] == 18){
					pointValue = 11194.7;
				}else if(point[pointArray] == 20){
					pointValue = 19690.0;
				}else if(point[pointArray] == 22){
					pointValue = 3993.0;
				}else if(point[pointArray] == 24){
					pointValue = 534.6;
				}else if(point[pointArray] == 26){
					pointValue = 184800.0;
				}
				grdCtl.columns[point[pointArray]].widget.chartRangeMax = pointValue;
				console.info(grdCtl.columns[point[pointArray]].widget.chartRangeMax);
			}
			
			
		}else{
			
			var arrayT = ['4','5','6','7','8','9','10','11','12','27','28','29','30','31'];
			var arrayF = ['3','13','14'];
			var point = ['14','16','18','20','22','24','26'];
			
			for(hiddenF = 0 ; hiddenF<arrayF.length ; hiddenF++){
				grdCtl.columns[arrayF[hiddenF]].setHidden(false);
			}
			for(hiddenT = 0 ; hiddenT<arrayT.length ; hiddenT++){
				grdCtl.columns[arrayT[hiddenT]].setHidden(true);
			}
			
			for(pointArray = 0 ; pointArray<point.length ; pointArray++){
				
				if(point[pointArray] == 14){
					pointValue = 385.0;
				}else if(point[pointArray] == 16){
					pointValue = 19384.2;
				}else if(point[pointArray] == 18){
					pointValue = 11194.7;
				}else if(point[pointArray] == 20){
					pointValue = 19690.0;
				}else if(point[pointArray] == 22){
					pointValue = 3993.0;
				}else if(point[pointArray] == 24){
					pointValue = 534.6;
				}else if(point[pointArray] == 26){
					pointValue = 184800.0;
				}
				grdCtl.columns[point[pointArray]].widget.chartRangeMax = pointValue;
				console.info(grdCtl.columns[point[pointArray]].widget.chartRangeMax);
			}
			
		}
		
		//console.info(test);
		
		gridStore = Ext.create("KRF_DEV.store.south.SearchResultGrid_F_"+test+"", {
			siteIds: grdCtl.siteIds,
			parentIds: grdCtl.parentIds,
			firstSession: test
		});
		
		grdCtl.getView().bindStore(gridStore);
		
	}else if(parentCheck == "B"){
		//hiddenGrid.setHidden(true);
		if(grdContainer == null || grdContainer == undefined){
			
			grdContainer = Ext.create("KRF_DEV.view.south.SearchResultGrid_B", options);
			
			
			tab.add(grdContainer);
			//tab.insert(0, grdContainer);
		}
		
		tab.setActiveTab(gridId + "_container");
		
		var grdCtl = grdContainer.items.items[0]; // 그리드 컨테이너
		grdCtl = grdCtl.items.items[0]; // 그리드 컨트롤
		//grdCtl.id = gridId;
		
		if(siteIds != ""){
			grdCtl.siteIds = siteIds;
		}
		if(parentIds != ""){
			grdCtl.parentIds = parentIds;
		}
		
		//console.info(grdCtl.parentIds)
		//console.info(grdCtl.siteIds);
		
		gridStore = Ext.create("KRF_DEV.store.south.SearchResultGrid_B", {
			siteIds: grdCtl.siteIds,
			parentIds: grdCtl.parentIds,
			firstSession: test
		});
		
		grdCtl.getView().bindStore(gridStore);
	
	}else if(parentCheck == "C"){
		
		var firstSearch =  KRF_DEV.getApplication().btnFlag;
		if(firstSearch == "noDate"){
			cmbStartYear.setValue("2013");
			cmbStartMonth.setValue("10");
			cmbEndYear.setValue("2013");
			cmbEndMonth.setValue("12");
		}

		//hiddenGrid.setHidden(true);
		if(grdContainer == null || grdContainer == undefined){
			
			grdContainer = Ext.create("KRF_DEV.view.south.SearchResultGrid_C", options);
			
			
			tab.add(grdContainer);
			//tab.insert(0, grdContainer);
		}
		
		tab.setActiveTab(gridId + "_container");
		
		var grdCtl = grdContainer.items.items[0]; // 그리드 컨테이너
		grdCtl = grdCtl.items.items[0]; // 그리드 컨트롤
		//grdCtl.id = gridId;  // 그리드 아이디를 주면 창 닫을때 죽어버린다.. 일단 주지 말자..
		
		if(siteIds != ""){
			grdCtl.siteIds = siteIds;
		}
		if(parentIds != ""){
			grdCtl.parentIds = parentIds;
		}
		
		//console.info(grdCtl.parentIds)
		//console.info(grdCtl.siteIds);
		
		gridStore = Ext.create("KRF_DEV.store.south.SearchResultGrid_C", {
			siteIds: grdCtl.siteIds,
			parentIds: grdCtl.parentIds,
			firstSession: test
		});
		
		grdCtl.getView().bindStore(gridStore);
	
	
	}else if(parentCheck == "D"){

		//console.info(orgParentId);
		//hiddenGrid.setHidden(true);
		if(grdContainer == null || grdContainer == undefined){
			
			if(orgParentId == "D001"){
				grdContainer = Ext.create("KRF_DEV.view.south.SearchResultGrid_D", options);
			}else if(orgParentId == "D002"){
				grdContainer = Ext.create("KRF_DEV.view.south.SearchResultGrid_D_2", options);
			}else if(orgParentId == "D003"){
				grdContainer = Ext.create("KRF_DEV.view.south.SearchResultGrid_D_3", options);
			}else if(orgParentId == "D004"){
				grdContainer = Ext.create("KRF_DEV.view.south.SearchResultGrid_D_4", options);
			}else if(orgParentId == "D005"){
				grdContainer = Ext.create("KRF_DEV.view.south.SearchResultGrid_D_5", options);
			}else if(orgParentId == "D006"){
				grdContainer = Ext.create("KRF_DEV.view.south.SearchResultGrid_D_6", options);
			}else if(orgParentId == "D007"){
				grdContainer = Ext.create("KRF_DEV.view.south.SearchResultGrid_D_7", options);
			}
			
			tab.add(grdContainer);
			//tab.insert(0, grdContainer);
		}
		
		tab.setActiveTab(gridId + "_container");
		
		var grdCtl = grdContainer.items.items[0]; // 그리드 컨테이너
		
		grdCtl = grdCtl.items.items[0]; // 그리드 컨트롤
		//console.info(grdCtl);
		//console.info(grdCtl.parentIds);
		//console.info(parentIds);
		//console.info(orgParentId);
		//grdCtl.id = gridId;  // 그리드 아이디를 주면 창 닫을때 죽어버린다.. 일단 주지 말자..
		
		if(siteIds != ""){
			grdCtl.siteIds = siteIds;
		}
		if(parentIds != ""){
			grdCtl.parentIds = parentIds;
		}
		
		if(orgParentId == undefined){
			orgParentId = parentIds;
		}
		
		//console.info(grdCtl.parentIds)
		//console.info(grdCtl.siteIds);
		
		gridStore = Ext.create("KRF_DEV.store.south.SearchResultGrid_D", {
			siteIds: grdCtl.siteIds,
			parentIds: grdCtl.parentIds,
			orgParentIds: orgParentId
		});
		
		grdCtl.getView().bindStore(gridStore);
	
	
	
	}
}

// 검색결과창 닫기
HideSearchResult = function(){
	
	var searchResultWindow = KRF_DEV.getApplication().searchResultWindow;
	
	if(searchResultWindow != undefined){
		searchResultWindow.close();
		//searchResultWindow.hide();
	}
}

// WindowControl 오브젝트 리턴
GetWindowControl = function(options){
	
	var winCtl = Ext.getCmp(options.id);
	
	if(winCtl == undefined){
		
		winCtl = Ext.create('KRF_DEV.view.common.WindowControl', options);
		//winCtl = Ext.create('KRF_DEV.view.common.WindowControl');
		
	}
	
	return winCtl;
	
}

// TabControl 오브젝트 리턴
GetTabControl = function(options){
	
	var tabCtl = Ext.getCmp(options.id);
	
	if(tabCtl == undefined){
		
		tabCtl = Ext.create('KRF_DEV.view.common.TabControl', options);
		
	}
	
	return tabCtl;
	
}

// 리치정보 검색결과 탭 추가
// catIds : 집수구역 아이디 문자열 (공백이면 리치 선택했을때..)
ShowSearchResultReach = function(catIds){
	//console.info(catIds);
	
	var centerContainer = KRF_DEV.getApplication().contCenterContainer; // view.main.Main.js 전역
	var windowWidth = centerContainer.getWidth();
	var windowHeight = 300;
	var windowY = centerContainer.getHeight() - windowHeight;
	
	// window 창 옵션
	var options = {
			renderTo: centerContainer.el,
			id: 'searchResultWindow',
			title: '검색결과',
			width: windowWidth,
			y: windowY
	};
	
	// window 창 생성
	var searchResultWindow = this.GetWindowControl(options);
	searchResultWindow.show();
	KRF_DEV.getApplication().searchResultWindow = searchResultWindow;
	
	options = {
			id: 'searchResultTab',
			//title: '결과탭1',
			header: false
	};
	
	var tabCtl = Ext.getCmp("searchResultTab");
	// TabControl 생성
	var searchResultTab = GetTabControl(options);
	////console.info(searchResultTab);
	
	if(tabCtl == undefined)
		searchResultWindow.add(searchResultTab); // window에 tab추가
	
	options = {
			//id: "searchResultContainer",
			id: "searchResultReach_container",
			title: '리치정보',
			autoResize: true
	};
	
	var tab = searchResultTab.items.items[1];
	
	var gridStore = null;
	var grdContainer = Ext.getCmp("searchResultReach_container");
	
	if(grdContainer == null || grdContainer == undefined){
		grdContainer = Ext.create("KRF_DEV.view.south.SearchResultGrid_Reach", options);
		//tab.add(grdContainer);
		tab.insert(0, grdContainer);
	}
	//console.info(catIds);
	tab.setActiveTab("searchResultReach_container");
	
	var grdCtl = grdContainer.items.items[0]; // 그리드 컨테이너
	grdCtl = grdCtl.items.items[0]; // 그리드 컨트롤
	
	var coreMap = GetCoreMap();
	
	var storeData = [];
	
	if(catIds == ""){ // 리치검색에서 넘어왔을때
    	var rchMap = GetCoreMap();
    	var sumRchLen = 0;
    	var sumCatArea = 0;
    	
    	// 상류 데이터
    	//var tmpGraphics = rchMap.reachLayerAdmin.upRchGraphics;
    	var tmpGraphics = rchMap.reachLayerAdmin_v3_New.arrLineGrp;
    	for(var i = 0; i < tmpGraphics.length; i++){
    		var rowData = [];
    		rowData.push(tmpGraphics[i].attributes.RCH_DID);
    		rowData.push(tmpGraphics[i].attributes.RCH_LEN);
    		sumRchLen += tmpGraphics[i].attributes.RCH_LEN;
    		rowData.push(tmpGraphics[i].attributes.CAT_DID);
//    		var catIdx = rchMap.reachLayerAdmin.getCatGraphicIndex(tmpGraphics[i].attributes.CAT_ID, rchMap.reachLayerAdmin.selAreaGraphics);
//    		if(catIdx != -1){
//	    		var catArea = rchMap.reachLayerAdmin.selAreaGraphics[catIdx].attributes.AREA;
//	    		rowData.push(catArea);
//    		}
//    		else{
//    			rowData.push(0);
//    		}
    		rowData.push(tmpGraphics[i].attributes.CUM_AREA);
    		sumCatArea += tmpGraphics[i].attributes.CUM_AREA;
    		rowData.push(tmpGraphics[i].attributes.RIV_NM);
    		rowData.push(tmpGraphics[i].attributes.CUM_LEN);
    		var geoTrib = tmpGraphics[i].attributes.GEO_TRIB;
    		if(geoTrib == "0")
    			rowData.push("본류");
    		else{
    			//rowData.push(geoTrib + "지류");
    			rowData.push("지류");
    		}
    		storeData.push(rowData);
    	}
    	
    	/*
    	// 시작위치 데이터
    	tmpGraphics = rchMap.reachLayerAdmin.startRchGraphics;
    	for(var i = 0; i < tmpGraphics.length; i++){
    		var rowData = [];
    		rowData.push(tmpGraphics[i].attributes.RCH_ID);
    		rowData.push(tmpGraphics[i].attributes.RCH_LEN);
    		sumRchLen += tmpGraphics[i].attributes.RCH_LEN;
    		rowData.push(tmpGraphics[i].attributes.CAT_ID);
//    		var catIdx = rchMap.reachLayerAdmin.getCatGraphicIndex(tmpGraphics[i].attributes.CAT_ID, rchMap.reachLayerAdmin.selAreaGraphics);
//    		if(catIdx != -1){
//	    		var catArea = rchMap.reachLayerAdmin.selAreaGraphics[catIdx].attributes.AREA;
//	    		rowData.push(catArea);
//    		}
//    		else{
//    			rowData.push(0);
//    		}
    		rowData.push(tmpGraphics[i].attributes.CAT_AREA);
    		sumCatArea += tmpGraphics[i].attributes.CAT_AREA;
    		rowData.push(tmpGraphics[i].attributes.RIV_NM);
    		rowData.push(tmpGraphics[i].attributes.CUM_LEN);
    		var geoTrib = tmpGraphics[i].attributes.GEO_TRIB;
    		if(geoTrib == "0")
    			rowData.push("본류");
    		else{
    			//rowData.push(geoTrib + "지류");
    			rowData.push("지류");
    		}
    		storeData.push(rowData);
    	}
    	*/
    	
    	////console.info(tmpGraphics);
    	
    	/*
    	// 하류 데이터
    	tmpGraphics = rchMap.reachLayerAdmin.downRchGraphics;
    	for(var i = 0; i < tmpGraphics.length; i++){
    		var rowData = [];
    		rowData.push(tmpGraphics[i].attributes.RCH_ID);
    		rowData.push(tmpGraphics[i].attributes.RCH_LEN);
    		sumRchLen += tmpGraphics[i].attributes.RCH_LEN;
    		rowData.push(tmpGraphics[i].attributes.CAT_ID);
//    		var catIdx = rchMap.reachLayerAdmin.getCatGraphicIndex(tmpGraphics[i].attributes.CAT_ID, rchMap.reachLayerAdmin.selAreaGraphics);
//    		if(catIdx != -1){
//	    		var catArea = rchMap.reachLayerAdmin.selAreaGraphics[catIdx].attributes.AREA;
//	    		rowData.push(catArea);
//    		}
//    		else{
//    			rowData.push(0);
//    		}
    		rowData.push(tmpGraphics[i].attributes.CAT_AREA);
    		sumCatArea += tmpGraphics[i].attributes.CAT_AREA;
    		rowData.push(tmpGraphics[i].attributes.RIV_NM);
    		rowData.push(tmpGraphics[i].attributes.CUM_LEN);
    		var geoTrib = tmpGraphics[i].attributes.GEO_TRIB;
    		if(geoTrib == "0")
    			rowData.push("본류");
    		else{
    			//rowData.push(geoTrib + "지류");
    			rowData.push("지류");
    		}
    		storeData.push(rowData);
    	}
    	*/
    	
    	/*
    	// 선택 데이터
    	tmpGraphics = rchMap.reachLayerAdmin.selRchGraphics;
    	for(var i = 0; i < tmpGraphics.length; i++){
    		var rowData = [];
    		rowData.push(tmpGraphics[i].attributes.RCH_ID);
    		rowData.push(tmpGraphics[i].attributes.RCH_LEN);
    		sumRchLen += tmpGraphics[i].attributes.RCH_LEN;
    		rowData.push(tmpGraphics[i].attributes.CAT_ID);
//    		var catIdx = rchMap.reachLayerAdmin.getCatGraphicIndex(tmpGraphics[i].attributes.CAT_ID, rchMap.reachLayerAdmin.selAreaGraphics);
//    		if(catIdx != -1){
//	    		var catArea = rchMap.reachLayerAdmin.selAreaGraphics[catIdx].attributes.AREA;
//	    		rowData.push(catArea);
//    		}
//    		else{
//    			rowData.push(0);
//    		}
    		rowData.push(tmpGraphics[i].attributes.CAT_AREA);
    		sumCatArea += tmpGraphics[i].attributes.CAT_AREA;
    		rowData.push(tmpGraphics[i].attributes.RIV_NM);
    		rowData.push(tmpGraphics[i].attributes.CUM_LEN);
    		var geoTrib = tmpGraphics[i].attributes.GEO_TRIB;
    		if(geoTrib == "0")
    			rowData.push("본류");
    		else{
    			//rowData.push(geoTrib + "지류");
    			rowData.push("지류");
    		}
    		storeData.push(rowData);
    	}
    	*/
    	
    	var rowData = [];
		rowData.push("총계");
		rowData.push(sumRchLen);
		rowData.push("");
		rowData.push(sumCatArea);
		rowData.push("");
		rowData.push(0);
		rowData.push("");
		
		storeData.splice(0, 0, rowData);
    	
    	var store = new Ext.data.ArrayStore({
    		fields: [{name: 'RCH_DID', type: 'string'},
    		         {name: 'RCH_LEN', type: 'float'},
    		         {name: 'CAT_DID', type: 'string'},
//    		         {name: 'CAT_AREA', type: 'float'},
    		         {name: 'CUM_AREA', type: 'float'},
    		         {name: 'RIV_NM', type: 'string'},
    		         {name: 'CUM_LEN', type: 'float'},
    		         {name: 'GEO_TRIB', type: 'string'}]
    	});
    	store.loadData(storeData);
    	grdCtl.setStore(store); // 그리드 스토어 셋팅
	}
	else{ // 정보창에서 넘어왔을때
		var queryTask = new esri.tasks.QueryTask(_mapServiceUrl_v3 + '/' + _reachLineLayerId); // 레이어 URL
		
		//console.info(queryTask);
		var query = new esri.tasks.Query();
		query.returnGeometry = false;
		
		//
		if(catIds.indexOf("'")== -1){
			catIds = "'" + catIds + "'";
		}
		
		query.where = "CAT_DID IN (" + catIds + ")";
		
		query.outFields = ["*"];
		//console.info(query.where);
		queryTask.execute(query, function(result){
			Ext.each(result, function(objLayer, idx, objLayers){
				var sumRchLen = 0;
				var sumCatArea = 0;
				for(var i = 0; i < objLayer.features.length; i++){
					var rowData = [];
					//var retVal = GetCatArea(objLayer.features[i].attributes.CAT_ID);
					////console.info(retVal);
					////console.info("after");
					rowData.push(objLayer.features[i].attributes.RCH_DID);
		    		rowData.push(objLayer.features[i].attributes.RCH_LEN);
		    		sumRchLen += objLayer.features[i].attributes.RCH_LEN;
		    		rowData.push(objLayer.features[i].attributes.CAT_DID);
		    		//rowData.push(objLayer.features[i].attributes.CAT_AREA);
		    		//sumCatArea += objLayer.features[i].attributes.CAT_AREA;
		    		rowData.push(objLayer.features[i].attributes.CUM_AREA);
		    		sumCatArea += objLayer.features[i].attributes.CUM_AREA;
		    		rowData.push(objLayer.features[i].attributes.RIV_NM);
		    		rowData.push(objLayer.features[i].attributes.CUM_LEN);
		    		var geoTrib = objLayer.features[i].attributes.GEO_TRIB;
		    		if(geoTrib == "0")
		    			rowData.push("본류");
		    		else{
		    			//rowData.push(geoTrib + "지류");
		    			rowData.push("지류");
		    		}
		    		storeData.push(rowData);
				}
				
				var rowData = [];
				rowData.push("총계");
				rowData.push(sumRchLen);
				rowData.push("");
				rowData.push(sumCatArea);
				rowData.push("");
				rowData.push(0);
				rowData.push("");
				
				storeData.splice(0, 0, rowData);
				
				var store = new Ext.data.ArrayStore({
	        		fields: [{name: 'RCH_DID', type: 'string'},
	        		         {name: 'RCH_LEN', type: 'float'},
	        		         {name: 'CAT_DID', type: 'string'},
	        		         //{name: 'CAT_AREA', type: 'float'},
	        		         {name: 'CUM_AREA', type: 'float'},
	        		         {name: 'RIV_NM', type: 'string'},
	        		         {name: 'CUM_LEN', type: 'float'},
	        		         {name: 'GEO_TRIB', type: 'string'}]
	        	});
				
	        	store.loadData(storeData);
	        	grdCtl.setStore(store); // 그리드 스토어 셋팅
			});
		});
	}
	
}

ReachSelectedFocus = function(catId){
	
	if(catId == undefined || catId == null || catId == ""){
		return;
	}
	
	var rchGridContainer = Ext.getCmp("searchResultReach_container");
	var gridCtl = rchGridContainer.items.items[0];
	gridCtl = gridCtl.items.items[0];
	//console.info(gridCtl.getSelectionModel().getSelection()[0].get(''))
	//console.info(catId);
	var rowIdx = gridCtl.getStore().find("CAT_DID", catId);
	//console.info(rowIdx);
	gridCtl.getSelectionModel().select(rowIdx);
	gridCtl.getView().getRow(rowIdx).scrollIntoView();
}

GetCatArea = function(catDId){
	
	var queryTask = new esri.tasks.QueryTask(_mapServiceUrl_v3 + '/' + _reachAreaLayerId); // 레이어 URL
	var query = new esri.tasks.Query();
	query.returnGeometry = false;
	
	query.where = "CAT_DID IN '" + catDId + "'";
	
	var test = "";
	
	query.outFields = ["*"];
	var retVal = queryTask.execute(query);
	
	retVal.then(function(featureSet){
		return featureSet;
	});
	
	//console.info("ddd");
	
	/*
	for(var i = 0; i < 1000000; i++){
		if(test == ""){
			Ext.defer(function(){
				//console.info("fldskjfa");
			}, 1000, this);
		}
	}
	*/
	
	//console.info(test);
	
	return test;
	
}

var _searchType = "";
var WS_CD = AM_CD = AS_CD = "";
var ADM_CD = "";
var PT_NM = "";
var _siteIds = "";
var _parentId = "";
var _titleText = "";
var _gridId = "";

// 좌측 위치검색 조회 조건 체크 및 셋팅 (구분이 동일할 경우 _searchType을 파라메터로..)
ChkSearchCondition = function(sType, siteIds, parentId, titleText, gridId){
	
	// 찾기 구분 셋팅 ("수계찾기", "행정구역찾기", "명칭찾기")
	if(_searchType == "" || _searchType != sType){
		_searchType = sType;
	}
	
	WS_CD = AM_CD = AS_CD = "";
	ADM_CD = "";
	PT_NM = "";
	_siteIds = ""; // 지점코드
	_parentId = ""; // 부모코드(레이어구분코드)
	_titleText = titleText;
	_gridId = "searchGrid_" + gridId;
	
	if(_searchType == "수계찾기"){
		WS_CD = Ext.getCmp("cmbWater1").value;
		if(WS_CD == null){
			WS_CD = "";
		}
		AM_CD = Ext.getCmp("cmbWater2").value;
		if(AM_CD == null){
			AM_CD = "";
		}
		AS_CD = Ext.getCmp("cmbWater3").value;
		if(AS_CD == null){
			AS_CD = "";
		}
		
		if(WS_CD == ""){
			alert("대권역을 선택해주세요.");
			return false;
		}
		
		if(AM_CD == ""){
			alert("중권역을 선택해주세요.");
			return false;
		}
	}
	
	if(_searchType == "행정구역찾기"){
		
		ADM_CD = Ext.getCmp("cmbArea3").value;
		
		if(ADM_CD == null || ADM_CD == ""){
			
			ADM_CD = Ext.getCmp("cmbArea2").value;
			
			if(ADM_CD == null || ADM_CD == ""){
				
				ADM_CD = Ext.getCmp("cmbArea1").value;
				
				if(ADM_CD == null || ADM_CD == ""){
					alert("시/도를 선택해주세요.")
				}
				else{
					alert("시/군/구를 선택해주세요.");
				}
				
				return false;
			}
			else{
				ADM_CD = ADM_CD.substring(0, 5)
			}
		}
		else{
			ADM_CD = ADM_CD.substring(0, 8)
		}
	}
	
	if(_searchType == "지점코드찾기"){
		
		_siteIds = siteIds;
		_parentId = parentId;
		
	}
	
	return true;
	
}


siteMovePoint = function(parentNodeId, nodeId , clickValue){
	
	//console.info(nodeId);
	if(nodeId == undefined || nodeId == null || nodeId == ""){
		return;
	}
	
	var layerId = "";
	
	if(parentNodeId == "Cat"){ // 집수구역
		layerId = "48";
		KRF_DEV.getApplication().fireEvent('setSelectedCatArea', layerId, nodeId);
		layerId = "47";
		KRF_DEV.getApplication().fireEvent('setSelectedRchLine', layerId, nodeId);
		return;
	}else if(parentNodeId == "A001"){
		layerId = "1";
	}else if(parentNodeId == "A002"){
		layerId = "2";
	}else if(parentNodeId == "A003"){
		layerId = "3";
	}else if(parentNodeId == "A004"){
		layerId = "4";
	}else if(parentNodeId == "A005"){
		layerId = "5";
	}else if(parentNodeId == "B002"){
		layerId = "11"; // 사업장TMS
	}else if(parentNodeId == "C001"){
		layerId = "13"; // 퇴적물
	}else if(parentNodeId == "D001"){
		layerId = "15"; // 수위관측소
	}else if(parentNodeId == "D002"){
		layerId = "16"; // 우량관측소
	}else if(parentNodeId == "D003"){
		layerId = "17"; // 유량관측소
	}else if(parentNodeId == "D004"){
		layerId = "18"; // 댐관측소
	}else if(parentNodeId == "D005"){
		layerId = "19"; // AWS기상관측소
	}else if(parentNodeId == "D006"){
		layerId = "20"; // 지상기상관측소
	}else if(parentNodeId == "D007"){
		layerId = "21"; // 보관측소
	}else if(parentNodeId == "E001"){
		layerId = "23"; // 수생태계조사지점
	}else if(parentNodeId == "F001"){
		layerId = "31"; // 농공단지처리시설
	}else if(parentNodeId == "F002"){
		layerId = "32"; // 기타공동처리시설
	}else if(parentNodeId == "F003"){
		layerId = "28"; // 분뇨처리시설
	}else if(parentNodeId == "F004"){
		layerId = "27"; // 산업폐수종말처리시설
	}else if(parentNodeId == "F006"){
		layerId = "25"; // 축산폐수공공처리시설
	}else if(parentNodeId == "F007"){
		layerId = "30"; // 마을하수도
	}else if(parentNodeId == "F008"){
		layerId = "26"; // 하수종말처리시설
	}
	
	// 피처 레이어 생성/갱신
	KRF_DEV.getApplication().fireEvent('setSelectedSite', layerId, nodeId, clickValue);	
	
	// 주제도 레이어 키기
	Layer01OnOff(layerId);
}

OpenMenualPop = function(){
	window.open("./resources/menual/KRF_USER_MANUAL.html", "하천망 분석도 사용자 메뉴얼", "width=1024, height=768, toolbar=no, status=no, menubar=no, scrollbars=yes, resizable=no, left=150, top=150");
}

ResetButtonClick = function(){
	
	var me = GetCoreMap();
	
	// 리치 선택 종료
	//me.reachLayerAdmin.drawEnd();
	//me.reachLayerAdmin_v3_New.drawEnd();
	me.reachLayerAdmin_v3_New.drawEnd();
	// 리치라인, 집수구역 그래픽 레이어 및 전역 변수 clear
	//me.reachLayerAdmin.clearGraphicsLayer("reset");
	//me.reachLayerAdmin_v3_New.clearGraphicsLayer("reset");
	me.reachLayerAdmin_v3_New.clearGraphicsLayer();
	
	Ext.HideSiteListWindow();
	HideWindowSiteNChart();
	HideSearchResult();
	
	var combo = Ext.getCmp("cmbWater1");
	combo.setValue("");
	combo = Ext.getCmp("cmbWater2");
	combo.setValue("");
	combo.setDisabled(true);
	combo = Ext.getCmp("cmbWater3");
	combo.setValue("");
	combo.setDisabled(true);
	var btn = Ext.getCmp("btnWater1");
	btn.setDisabled(true);
	btn = Ext.getCmp("btnWater2");
	btn.setDisabled(true);
	btn = Ext.getCmp("btnWater3");
	btn.setDisabled(true);
	
	combo = Ext.getCmp("cmbArea1");
	combo.setValue("");
	combo = Ext.getCmp("cmbArea2");
	combo.setValue("");
	combo.setDisabled(true);
	combo = Ext.getCmp("cmbArea3");
	combo.setValue("");
	combo.setDisabled(true);
	btn = Ext.getCmp("btnSearch1");
	btn.setDisabled(true);
	btn = Ext.getCmp("btnSearch2");
	btn.setDisabled(true);
	btn = Ext.getCmp("btnSearch3");
	btn.setDisabled(true);
	
	var txtBox = Ext.getCmp("textSearchText");
	txtBox.setValue("");
	
}

// 주제도 레이어 on/off
Layer01OnOff = function(layerId){
	
	//console.info(layerId);
	if(layerId == undefined || layerId == null || layerId == ""){
		return;
	}
	
	var treeCtl = Ext.getCmp("layer01");
	var node = treeCtl.getStore().getNodeById(layerId);
	if(node.data.checked == false){
		////console.info(node);
		node.set("checked", true);
		treeCtl.fireEvent('checkchange', node, true, null);
	}
}

runStartEnd = function(option){
	
	var coreMap = GetCoreMap();
	
	if(option == "start" || option == "end"){
		
		var option = "";
		var btnId = "";
		
		if(option == "start"){
			// 심볼설정
			coreMap.reachLayerAdmin_v3_New.startSymbol.url = coreMap.reachLayerAdmin_v3_New.getStartSymbolUrl();
			coreMap.reachLayerAdmin_v3_New.startSymbol.width = 48;
			coreMap.reachLayerAdmin_v3_New.startSymbol.height = 38;
			
			option = "STARTPOINT";
			btnId = "btnMenu04";
		}
		if(option == "end"){
			// 심볼설정
			coreMap.reachLayerAdmin_v3_New.endSymbol.url = coreMap.reachLayerAdmin_v3_New.getEndSymbolUrl();
			coreMap.reachLayerAdmin_v3_New.endSymbol.width = 48;
			coreMap.reachLayerAdmin_v3_New.endSymbol.height = 38;
			
			option = "ENDPOINT";
			btnId = "btnMenu05";
		}
		
		coreMap.reachLayerAdmin_v3_New.drawSymbol(option, point); // 심볼 그리기
		var currCtl = Ext.getCmp(btnId);
		if(currCtl != undefined && currCtl.btnOnOff == "on")
			SetBtnOnOff(btnId);
		coreMap.reachLayerAdmin_v3_New.runStartEnd(); // 검색 실행
		closePopSiteInfo(); // 툴팁 닫기
	}
}

// 시작지점 끝지점 값 셋팅
SetStEdSiteName = function(option, value){
	
	if(value != undefined && value != ""){
		var reachNameToolbar = Ext.getCmp("reachNameToolbar");
		var textSearchText_Start = Ext.getCmp("textSearchText_Start");
		var textSearchText_End = Ext.getCmp("textSearchText_End");
		
		if(option == "start"){
			reachNameToolbar.items.items[0].setValue(value);
			textSearchText_Start.setValue(value);
		}
		if(option == "end"){
			reachNameToolbar.items.items[1].setValue(value);
			textSearchText_End.setValue(value);
		}
	}
}

//시작지점 끝지점 값 초기화
ResetStEdSiteName = function(){
	
	var reachNameToolbar = Ext.getCmp("reachNameToolbar");
	var textSearchText_Start = Ext.getCmp("textSearchText_Start");
	var textSearchText_End = Ext.getCmp("textSearchText_End");
	
	reachNameToolbar.items.items[0].setValue("");
	textSearchText_Start.setValue("");

	reachNameToolbar.items.items[1].setValue("");
	textSearchText_End.setValue("");
}

var westPreWidth = 0;

// 좌측 숨기거나 펼때 컨트롤 XY 셋팅
SetWestCollapseXY = function(option){
	
	// west_container, west_buttonpanel
	var westContainer = Ext.getCmp("west_container");
	var westWidth = westContainer.getWidth();
	var initWidth = westContainer.initWidth;
	var offsetWidth = westWidth;

	if(option == "show"){
		
		offsetWidth = westWidth - initWidth;
	}
	
	if(option == "resize"){

		if(westPreWidth != westWidth){
			
			offsetWidth = westWidth - westPreWidth;
			westPreWidth = westWidth;
		}
	}
	
	if(westContainer.collapsed == false){
		
		// 숨기기 버튼 셋팅
		Ext.get("west_container-splitter-collapseEl").dom.innerHTML = "<img src='./resources/images/button/btn_arrow_close.png' />";
		offsetWidth = 0 + offsetWidth; // 플러스
	}
	else{
		
		// 보이기 버튼 셋팅
		Ext.get("west_container-splitter-collapseEl").dom.innerHTML = "<img src='./resources/images/button/btn_arrow_open.png' />";
		offsetWidth = 0 - offsetWidth; // 마이너스
	}
	
	var sConfig = Ext.getCmp("searchConfig");
	
	if(sConfig != undefined){
		
		if(sConfig.hidden == false){
			
			sConfig.setX(sConfig.getX() + offsetWidth);
		}
	}
	
	if(option != "show"){
		
		var reachNameToolbar = Ext.getCmp("reachNameToolbar");
		
		if(reachNameToolbar != undefined){
			
			reachNameToolbar.setX(reachNameToolbar.getX() + offsetWidth);
		}
		
		// 툴팁 XY 셋팅
		setTooltipXY();
	}
}

// offset 적용한 센터이동
centerAtWithOffset = function(x, y, spatialReferrence){
	
	var coreMap = GetCoreMap();
	
	var tileInfo = KRF_DEV.getApplication().coreMap.tileInfo;
	var curLevel = coreMap.map.getLevel();
	
	if(coreMap.map.getLevel() < 12){
		coreMap.map.setLevel(12);
		curLevel = 12;
	}
	//alert(x);
	var reachToolHeight = 0;
	if(Ext.getCmp("reachToolbar") != undefined)
		reachToolHeight = Ext.getCmp("reachToolbar").getHeight();
	var resolution = tileInfo.lods[curLevel].resolution;
	var xoffset = (1920 - Ext.getBody().getWidth()) / 2 * resolution;
	var yoffset = (1080 - Ext.getBody().getHeight()) / 2 * resolution;
	
	x = x + xoffset;
	y = y - yoffset + (reachToolHeight * resolution);
	
	// 2016-04-05 추가
	x = x + (225 * resolution); // center.js map width 2200 -> 2650으로 변경 (450/2만큼 좌측으로)
	y = y - (50 * resolution); // center.js map width 1000 -> 1100으로 변경 (100/2만큼 위로)
	
	var point = new esri.geometry.Point(x, y, spatialReferrence);
	//console.info(xoffset);
	coreMap.map.centerAt(point);
}

// 툴팁 XY 셋팅
setTooltipXY = function(){
	
	var me = GetCoreMap();
	
	if(me != undefined)
		me.setX(9); // 좌측 패널 resize, collapse, expand시 맵 left 고정 2016-04-05
	
	var popCtl = Ext.getCmp("popSiteInfo");
	
	if(popCtl != undefined && popCtl != null){
		
		var curLevel = me.map.getLevel();
		var resolution = me.tileInfo.lods[curLevel].resolution;
		var extent = me.map.extent;
		
		var siteX = popCtl.point.x;
		var siteY = popCtl.point.y;
		
		var xPx = ((extent.xmax - extent.xmin) - (extent.xmax - siteX)) / resolution;
		var yPx = ((extent.ymax - extent.ymin) - (siteY - extent.ymin)) / resolution;
		
		var popWidth = popCtl.getWidth();
		var popHeight = popCtl.getHeight();
		
		xPx = xPx - popWidth / 2;
		yPx = yPx - popHeight;
		
		/* 상단 map left 고정으로인해 필요없게 되었음.. 2016-04-05
		var westContainer = Ext.getCmp("west_container");
		
		if(westContainer.collapsed != false){
			
			xPx = xPx - westContainer.initWidth;
		}
		else{
			
			xPx = xPx - (westContainer.initWidth - westContainer.getWidth());
		}
		*/
		
		popCtl.setX(xPx);
		popCtl.setY(yPx);
	}
}

//지점정보 툴팁 닫기
closePopSiteInfo = function(){
	var popCtl = Ext.getCmp("popSiteInfo");
	
	if(popCtl != undefined){
		popCtl.close();
	}
}