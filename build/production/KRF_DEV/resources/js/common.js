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

// 리치 레이어 초기화
ReachLayerReset = function(){
	var me = GetCoreMap();
	
	// 리치 선택 종료
	me.reachLayerAdmin.drawEnd();
	// 그래픽 초기화
	me.map.graphics.clear();
	
	// 레이어 제거
	me.map.removeLayer(me.reachLayerAdmin.reachLinelayer);
	me.map.removeLayer(me.reachLayerAdmin.reachArealayer);
	
	// 리치 레이어 클래스 생성
	me.reachLayerAdmin = Ext.create('KRF_DEV.view.map.ReachLayerAdmin', me.map);
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
ShowWindowSiteNChart = function(tabIdx, title){
	
	var winCtl = Ext.getCmp("windowSiteNChart");
	
	if(winCtl == undefined)
		winCtl = Ext.create('KRF_DEV.view.east.WindowSiteNChart');

	winCtl.show();

	var winX = Ext.getBody().getViewSize().width - winCtl.width;
	var winY = 98;
	
	var listCtl = Ext.getCmp("siteListWindow");
	if(listCtl != undefined){
		winY = listCtl.height + winY;
	}
	else{
		var listCtl = Ext.getCmp("siteListWindow_reach");
		if(listCtl != undefined){
			winY = listCtl.height + winY;
		}
	}
	
	winCtl.setX(winX);
	winCtl.setY(winY);
	
	ChangeTabIndex(tabIdx);

}

// 지점/차트 정보 창 닫기
HideWindowSiteNChart = function(){
	
	var winCtl = Ext.getCmp("windowSiteNChart");
	//console.info(winCtl);
	if(winCtl != undefined)
		winCtl.hide();

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

//검색결과창 띄우기
ShowSearchResult = function(){
		
	Ext.create('KRF_DEV.view.common.WindowControl');
	
}

// 검색결과창 닫기
HideSearchResult = function(){
	
	var winContainer = Ext.getCmp("datawindow-container");
	
	if(winContainer != undefined)
		winContainer.close();
	
}