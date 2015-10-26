//  버튼 on/off
SetBtnOnOff = function(btnId){
	var currCtl = Ext.getCmp(btnId);
	var parentCtl = currCtl.findParentByType('container');
	var items = parentCtl.items.items;
	var groupCnt = 0;
	
	var btnOnOff = currCtl.btnOnOff;
	
	if(currCtl.btnOnOff == "on"){
		currCtl.btnOnOff = "off";
	}
	else{
		currCtl.btnOnOff = "on";
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
	
	//console.info(infoWinCtl.visible);
	
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
	var graphics = me.reachLayerAdmin.reachLinelayer.getSelectedFeatures();
	
	//console.info(record);
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
				//console.info(catIds);
				
				require(["esri/tasks/query", "esri/tasks/QueryTask"], function(Query, QueryTask){
					queryTask = new QueryTask(KRF_DEV.app.arcServiceUrl + "/rest/services/reach/MapServer/47");
		    		query = new Query();
					query.returnGeometry = true;
					query.outFields = ["*"];
					
					query.where = "CAT_ID IN (" + catIds + ")";
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
	//console.info(featureSet);
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
        	selectQuery.where = "CAT_ID = '" + featureSet.features[i].attributes.CAT_ID + "'";
        	me.reachLayerAdmin.reachArealayer.selectFeatures(selectQuery, FeatureLayer.SELECTION_ADD); // 집수구역 셀렉트
    	}
	});
}

// 리치정보 바인딩
ReachInfoBinding = function(objs){
	//console.info(objs);
	if(objs == undefined || objs[0] == undefined)
		return;
	
	var RCH_ID = objs[0].attributes.RCH_ID; // 리치코드
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
	var CAT_AREA = objs[0].attributes.CAT_AREA; // 집수면적
	// 상류면적?
	
	// 리치 정보창 띄우기
	var reachInfoCtl = ShowReachInfoWindow();
	
	if(Ext.getCmp("RCH_ID") != undefined) { Ext.getCmp("RCH_ID").setHtml(RCH_ID) };
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
	if(Ext.getCmp("CAT_AREA") != undefined) { Ext.getCmp("CAT_AREA").setHtml(CAT_AREA) };
}



//지점/차트 정보 창 띄우기
ShowWindowSiteNChart = function(tabIdx, title, test, parentId){
	console.info(tabIdx);
	console.info(title);
	
	//console.info(parentId);
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
	var siteText = Ext.getCmp("selectName");  //
	//지점명 표출
	siteText.setText(test);
	
	//각쿼리당 초기값 설정
	var series = siteChartCtl.series[0];
	if(parentId == "A"){
		series.setXField("yearMonth");
		series.setYField("ITEM_BOD");
	}else if(parentId == "B"){
		series.setXField("WMCYMD");
		series.setYField("ITEM_COD");
	}else if(parentId == "C"){
		series.setXField("WMCYMD");
		series.setYField("ITEM_DOW");
	}else if(parentId == "F"){
		series.setXField("WORK_DT");
		series.setYField("ITEM_BOD");
	}
	
	
	if(siteinfoCtl != undefined){
		var store = siteinfoCtl.getStore();
		var chartStore = siteChartCtl.getStore();
		
		
		
		
		store.siteCD = title;
		chartStore.siteCD = title;
		
		store.load();
		chartStore.parentId = parentId;
		chartStore.load();
		console.info(chartStore.config.fields);
		siteinfoCtl.getView().refresh();
		
	}
	
	ChangeTabIndex(tabIdx);

}

// 지점/차트 정보 창 닫기
HideWindowSiteNChart = function(){
	
	var winCtl = Ext.getCmp("windowSiteNChart");
	//console.info(winCtl);
	if(winCtl != undefined)
		winCtl.close();

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
ShowSearchResult = function(siteIds, parentIds, titleText, gridId, test){
	
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
	
	//centerContainer.add(searchResultWindow.show()); // window 보이기
	//console.info(gridId);
	if(gridId == undefined)
		return;
	
	options = {
			id: 'searchResultTab',
			//title: '결과탭1',
			header: false
	};
	
	var tabCtl = Ext.getCmp("searchResultTab");
	//console.info(KRF_DEV.getApplication().btnFlag);
	// TabControl 생성
	var searchResultTab = GetTabControl(options);
	//console.info(searchResultTab);
	
	if(tabCtl == undefined)
		searchResultWindow.add(searchResultTab); // window에 tab추가
	
	//console.info(searchResultTab.items.items[1]);
	
	options = {
			//id: "searchResultContainer",
			id: gridId + "_container",
			title: titleText, //_searchType,
			autoResize: true
	};
	
	var tab = searchResultTab.items.items[1];
	
	var gridStore = null;
	var grdContainer = Ext.getCmp(gridId + "_container");
	
	if(parentIds[0].parentId == undefined){
		var parentCheck = parentIds.substring(0,1);
	}else{
		var parentCheck = parentIds[0].parentId.substring(0,1);
	}	
	
	
	var hiddenGrid = Ext.getCmp("F_CHANGE");	
		//var parentCheck = parentIds.substring(0.1);  
	
	
	console.info(parentCheck);
	//console.info(parentIds[0].parentId.substring(0,1));
	
	
	if(parentCheck == "A"){	
		
		//환경기초시설 검색값 히든처리
		hiddenGrid.setHidden(true);
		if(grdContainer == null || grdContainer == undefined){
			grdContainer = Ext.create("KRF_DEV.view.south.SearchResultGrid", options);
			//searchResultTab.add(grdContainer);
			tab.add(grdContainer);
		}
		
		tab.setActiveTab(gridId + "_container");
		
		var grdCtl = grdContainer.items.items[0]; // 그리드 컨테이너
		grdCtl = grdCtl.items.items[0]; // 그리드 컨트롤
		
		//grdCtl.id = gridId; // 그리드 아이디를 주면 창 닫을때 죽어버린다.. 일단 주지 말자..
		//return;
		if(siteIds != ""){
			grdCtl.siteIds = siteIds;
		}
		if(parentIds != ""){
			grdCtl.parentIds = parentIds;
		}
		//console.info(grdCtl.parentIds)
		//console.info(grdCtl.siteIds);
		
		
		gridStore = Ext.create("KRF_DEV.store.south.SearchResultGrid", {
			siteIds: grdCtl.siteIds,
			parentIds: grdCtl.parentIds
		});
		
		grdCtl.getView().bindStore(gridStore);
	
	}else if(parentCheck == "F"){
		
		//환경기초시설 검색값 히든처리
		hiddenGrid.setHidden(false);
		if(grdContainer == null || grdContainer == undefined){
			
			grdContainer = Ext.create("KRF_DEV.view.south.SearchResultGrid_F", options);
			
			
			tab.add(grdContainer);
		}
		//console.info(grdContainer);
		
		
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
		
		console.info(grdCtl.parentIds)
		console.info(grdCtl.siteIds);
		console.info(test);
		console.info(grdCtl);
		
		//0~2 , 11~16 공통
		if(test == "" ||test == "1" || test == "관거이송량"){
			test = "";
			grdCtl.columns[3].setHidden(false);
			grdCtl.columns[4].setHidden(false);
			
			grdCtl.columns[5].setHidden(true);
			grdCtl.columns[6].setHidden(true);
			grdCtl.columns[7].setHidden(true);
			grdCtl.columns[8].setHidden(true);
			grdCtl.columns[9].setHidden(true);
			grdCtl.columns[10].setHidden(true);
			grdCtl.columns[11].setHidden(true);
			grdCtl.columns[12].setHidden(true);
			
			grdCtl.columns[13].setHidden(false);
			grdCtl.columns[14].setHidden(false);
			
			grdCtl.columns[27].setHidden(false);
			grdCtl.columns[28].setHidden(false);
			grdCtl.columns[29].setHidden(false);
			
			grdCtl.columns[30].setHidden(true);
			grdCtl.columns[31].setHidden(true);
			
			
			
			
		}else if(test == "2"){   //ResultGrid_F.columns[].setHidden(false);
			grdCtl.columns[3].setHidden(true);
			grdCtl.columns[4].setHidden(true);
			grdCtl.columns[5].setHidden(true);
			
			grdCtl.columns[6].setHidden(false);
			grdCtl.columns[7].setHidden(false);
			grdCtl.columns[8].setHidden(false);
			grdCtl.columns[9].setHidden(false);
			grdCtl.columns[10].setHidden(false);
			grdCtl.columns[11].setHidden(false);
			grdCtl.columns[12].setHidden(false);
			
			grdCtl.columns[13].setHidden(true);
			grdCtl.columns[14].setHidden(true);
			grdCtl.columns[27].setHidden(true);
			grdCtl.columns[28].setHidden(true);
			grdCtl.columns[29].setHidden(true);
			
			grdCtl.columns[30].setHidden(false);
			grdCtl.columns[31].setHidden(false);
			
		}else if(test == "3"){
			grdCtl.columns[3].setHidden(true);
			grdCtl.columns[4].setHidden(true);
			
			grdCtl.columns[5].setHidden(false);
			
			grdCtl.columns[6].setHidden(true);
			grdCtl.columns[7].setHidden(true);
			grdCtl.columns[8].setHidden(true);
			grdCtl.columns[9].setHidden(true);
			grdCtl.columns[10].setHidden(true);
			grdCtl.columns[11].setHidden(true);
			grdCtl.columns[12].setHidden(true);
			
			grdCtl.columns[13].setHidden(false);
			grdCtl.columns[14].setHidden(false);
			
			grdCtl.columns[27].setHidden(true);
			grdCtl.columns[28].setHidden(true);
			grdCtl.columns[29].setHidden(true);
			grdCtl.columns[30].setHidden(true);
			grdCtl.columns[31].setHidden(true);
		}else{
			grdCtl.columns[3].setHidden(false);
			
			grdCtl.columns[4].setHidden(true);
			grdCtl.columns[5].setHidden(true);
			
			grdCtl.columns[6].setHidden(true);
			grdCtl.columns[7].setHidden(true);
			grdCtl.columns[8].setHidden(true);
			grdCtl.columns[9].setHidden(true);
			grdCtl.columns[10].setHidden(true);
			grdCtl.columns[11].setHidden(true);
			grdCtl.columns[12].setHidden(true);
			
			grdCtl.columns[13].setHidden(false);
			grdCtl.columns[14].setHidden(false);
			
			grdCtl.columns[27].setHidden(true);
			grdCtl.columns[28].setHidden(true);
			grdCtl.columns[29].setHidden(true);
			grdCtl.columns[30].setHidden(true);
			grdCtl.columns[31].setHidden(true);
		}
		console.info(test);
		
		gridStore = Ext.create("KRF_DEV.store.south.SearchResultGrid_F_"+test+"", {
			siteIds: grdCtl.siteIds,
			parentIds: grdCtl.parentIds,
			firstSession: test
		});
		
		grdCtl.getView().bindStore(gridStore);
		
	}else if(parentCheck == "B"){
		hiddenGrid.setHidden(true);
		if(grdContainer == null || grdContainer == undefined){
			
			grdContainer = Ext.create("KRF_DEV.view.south.SearchResultGrid_B", options);
			
			
			tab.add(grdContainer);
		}
		
		tab.setActiveTab(gridId + "_container");
		
		var grdCtl = grdContainer.items.items[0]; // 그리드 컨테이너
		grdCtl = grdCtl.items.items[0]; // 그리드 컨트롤
		grdCtl.id = gridId;
		
		if(siteIds != ""){
			grdCtl.siteIds = siteIds;
		}
		if(parentIds != ""){
			grdCtl.parentIds = parentIds;
		}
		
		console.info(grdCtl.parentIds)
		console.info(grdCtl.siteIds);
		
		gridStore = Ext.create("KRF_DEV.store.south.SearchResultGrid_B", {
			siteIds: grdCtl.siteIds,
			parentIds: grdCtl.parentIds,
			firstSession: test
		});
		
		grdCtl.getView().bindStore(gridStore);
	
	}else{

		hiddenGrid.setHidden(true);
		if(grdContainer == null || grdContainer == undefined){
			
			grdContainer = Ext.create("KRF_DEV.view.south.SearchResultGrid_C", options);
			
			
			tab.add(grdContainer);
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
		
		console.info(grdCtl.parentIds)
		console.info(grdCtl.siteIds);
		
		gridStore = Ext.create("KRF_DEV.store.south.SearchResultGrid_C", {
			siteIds: grdCtl.siteIds,
			parentIds: grdCtl.parentIds,
			firstSession: test
		});
		
		grdCtl.getView().bindStore(gridStore);
	
	
	}
}

// 검색결과창 닫기
HideSearchResult = function(){
	
	var searchResultWindow = KRF_DEV.getApplication().searchResultWindow;
	
	if(searchResultWindow != undefined){
		//searchResultWindow.close();
		searchResultWindow.hide();
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


siteMovePoint = function(parentNodeId, nodeId){
	
	//console.info(parentNodeId);
	var layerId = "";
	if(parentNodeId == "A001"){
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
	KRF_DEV.getApplication().fireEvent('setSelectedSite', layerId, nodeId);	
}