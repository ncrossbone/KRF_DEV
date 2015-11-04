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
	var orgParentId = parentId
	
	parentId = parentId.substring(0,1);
	
	if(parentId == "D"){
		KRF_DEV.getApplication().chartFlag_D = orgParentId;
	}
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
	var siteItemText = Ext.getCmp("selectItemName");  //
	//지점명 표출
	siteText.setText(test);
	//각쿼리당 초기값 설정
	var labelName = "";
	var yFieldName = "";
	var series = siteChartCtl.series[0];
	if(parentId == "A"){
		series.setXField("yearMonth");
		siteItemText.setText("BOD(㎎/L)");
		//series.setYField("ITEM_BOD");
		labelName = "BOD";
		yFieldName = "ITEM_BOD";
	}else if(parentId == "B"){
		series.setXField("WMCYMD");
		siteItemText.setText("COD(㎎/L)");
		//series.setYField("ITEM_COD");
		labelName = "COD";
		yFieldName = "ITEM_COD";
	}else if(parentId == "C"){
		series.setXField("WMCYMD");
		siteItemText.setText("DO(㎎/L)");
		//series.setYField("ITEM_DOW");
		labelName = "DO";
		yFieldName = "ITEM_DOW";
	}else if(parentId == "F"){
		series.setXField("WORK_DT");
		siteItemText.setText("BOD(㎎/L)");
		//series.setYField("ITEM_BOD");
		labelName = "BOD";
		yFieldName = "ITEM_BOD";
	}else if(orgParentId == "D001"){
		series.setXField("WMCYMD");
		//series.setYField("WL");
		siteItemText.setText("수위(cm)");
		labelName = "수위(cm)";
		yFieldName = "WL";
		
	}else if(orgParentId == "D002"){
		series.setXField("WMCYMD");
		//series.setYField("RF");
		siteItemText.setText("우량자료(mm)");
		labelName = "우량자료(mm)";
		yFieldName = "RF";
		
	}else if(orgParentId == "D003"){
		series.setXField("WMCYMD");
		//series.setYField("FW");
		siteItemText.setText("유량(CMS)");
		labelName = "유량(CMS)";
		yFieldName = "FW";
		
	}else if(orgParentId == "D004"){
		series.setXField("WMCYMD");
		//series.setYField("SWL");
		siteItemText.setText("저수위(cm)");
		labelName = "저수위(cm)";
		yFieldName = "SWL";
		
	}else if(orgParentId == "D005"){
		series.setXField("WMCYMD");
		//series.setYField("WD");
		siteItemText.setText("풍향(m/s)");
		labelName = "풍향(m/s)";
		yFieldName = "WD";
		
	}else if(orgParentId == "D006"){
		series.setXField("WMCYMD");
		//series.setYField("RND");
		siteItemText.setText("강수량자료(mm)");
		labelName = "강수량자료(mm)";
		yFieldName = "RND";
		
	}else if(orgParentId == "D007"){
		series.setXField("WMCYMD");
		//series.setYField("SWL");
		siteItemText.setText("보 상류수위(m)");
		labelName = "보 상류수위(m)";
		yFieldName = "SWL";
	}
	
	
	if(siteinfoCtl != undefined){
		var store = siteinfoCtl.getStore();
		var chartStore = siteChartCtl.getStore();
		
		store.siteCD = title;
		chartStore.siteCD = title;
		
		store.load();
		chartStore.parentId = parentId;
		chartStore.load();
		
		SetChartData(labelName, yFieldName, title, parentId);
	}
	
	ChangeTabIndex(tabIdx);

}

// 지점/차트 정보 창 닫기
HideWindowSiteNChart = function(){
	
	var winCtl = Ext.getCmp("windowSiteNChart");
	//console.info(winCtl);
	if(winCtl != undefined)
		winCtl.close();
	
	winCtl = Ext.getCmp("datePanel1");
	if(winCtl != undefined)
		winCtl.close();

}

// 차트 라벨 맥시멈 등 셋팅 및 스토어 로드
// 기간설정 검색 시 파라메터 모두 공백으로.. 지점목록에서 검색 시 해당 값 파라메터
SetChartData = function(labelName, yFieldName, siteCd, parentId){
	
	var chartCtl = Ext.getCmp("siteCharttest");
	var axes   = chartCtl.axes[0];
	var series = chartCtl.series[0];
	
	//item 선택
	var selectItem = Ext.getCmp("selectItem");
	//년도
	//var selectYear = Ext.getCmp("selectYear");
	var s = "";
	
	// y필드 셋팅
	if(yFieldName == undefined || yFieldName == ""){
		series.setYField(selectItem.lastValue);
		axes.fields = selectItem.lastValue;
		s = selectItem.lastValue;
	}
	else{
		series.setYField(yFieldName);
		axes.fields = yFieldName;
		s = yFieldName;
	}
	
	console.info(axes);
	
	var store = chartCtl.getStore();
	// 사이트 코드 셋팅
	if(siteCd != undefined && siteCd != ""){
		store.siteCD = siteCd;
	}
	
	if(parentId != undefined && parentId != ""){
		store.parentId = parentId;
	}
	
	var labelNm = "";
	// 라벨 셋팅
	if(labelName == undefined || labelName == ""){
		labelNm= selectItem.lastMutatedValue;
		KRF_DEV.getApplication().chartFlag = "0";
	}
	else{
		labelNm = labelName;
	}
	
	if(labelNm == "BOD"){
		labelNm = "BOD(㎎/L)";
	}else if(labelNm == "DO"){
		labelNm = "DO(㎎/L)";
	}else if(labelNm == "COD"){
		labelNm = "COD(㎎/L)";
	}else if(labelNm == "T-N"){
		labelNm = "T-N (㎎/L)";
	}else if(labelNm == "T-P"){
		labelNm = "T-P (㎎/L)";
	}else if(labelNm == "수온"){
		labelNm = "수온(℃)";
	}else if(labelNm == "pH"){
		labelNm = "pH";
	}else if(labelNm == "SS"){
		labelNm = "SS(㎎/ℓ)";
	}else if(labelNm == "클로로필a"){
		labelNm = "클로로필a(㎎/㎥)";
	}
	
	store.load();
	
	var ITEM_BOD = parseFloat(store.arrMax[0].ITEM_BOD);
	var ITEM_DOC = parseFloat(store.arrMax[0].ITEM_DOC);
	var ITEM_COD = parseFloat(store.arrMax[0].ITEM_COD);
	var ITEM_TN = parseFloat(store.arrMax[0].ITEM_TN);
	var ITEM_TP = parseFloat(store.arrMax[0].ITEM_TP);
	var ITEM_TEMP = parseFloat(store.arrMax[0].ITEM_TEMP);
	var ITEM_PH = parseFloat(store.arrMax[0].ITEM_PH);
	var ITEM_SS = parseFloat(store.arrMax[0].ITEM_SS);
	var ITEM_CLOA = parseFloat(store.arrMax[0].ITEM_CLOA);
	var ITEM_DOW = parseFloat(store.arrMax[0].ITEM_DOW);
	var ITEM_FLW = parseFloat(store.arrMax[0].ITEM_FLW);
	var ITEM_EC = parseFloat(store.arrMax[0].ITEM_EC);
	var AMT_PHYS = parseFloat(store.arrMax[0].AMT_PHYS);
	var AMT_BIO = parseFloat(store.arrMax[0].AMT_BIO);
	var AMT_HIGHTEC = parseFloat(store.arrMax[0].AMT_HIGHTEC);
	var ITEM_COLI = parseFloat(store.arrMax[0].ITEM_COLI);
	var ITEM_AMT = parseFloat(store.arrMax[0].ITEM_AMT);
	var ITEM_BYPASS_AMT = parseFloat(store.arrMax[0].ITEM_BYPASS_AMT);
	
	
	var RF = parseFloat(store.arrMax[0].RF);
	var WL = parseFloat(store.arrMax[0].WL);
	var WDE = parseFloat(store.arrMax[0].WDE);
	var FW = parseFloat(store.arrMax[0].FW);
	var SWL = parseFloat(store.arrMax[0].SWL);
	var INF = parseFloat(store.arrMax[0].INF);
	var OTF = parseFloat(store.arrMax[0].OTF);
	var SFW = parseFloat(store.arrMax[0].SFW);
	var ECPC = parseFloat(store.arrMax[0].ECPC);
	var WD = parseFloat(store.arrMax[0].WD);
	var WS = parseFloat(store.arrMax[0].WS);
	var TA = parseFloat(store.arrMax[0].TA);
	var HM = parseFloat(store.arrMax[0].HM);
	var PA = parseFloat(store.arrMax[0].PA);
	var RNYN = parseFloat(store.arrMax[0].RNYN);
	var RN1HR = parseFloat(store.arrMax[0].RN1HR);
	var RNDAY = parseFloat(store.arrMax[0].RNDAY);
	var RND = parseFloat(store.arrMax[0].RND);
	var SIDAY = parseFloat(store.arrMax[0].SIDAY);
	var OWL = parseFloat(store.arrMax[0].OWL);
	var TOTOTF = parseFloat(store.arrMax[0].TOTOTF);
	var EGOTF = parseFloat(store.arrMax[0].EGOTF);
	var GTOTF = parseFloat(store.arrMax[0].GTOTF);
	var CBOTF = parseFloat(store.arrMax[0].CBOTF);
	var FWOTF = parseFloat(store.arrMax[0].FWOTF);
	var ETCOTF = parseFloat(store.arrMax[0].ETCOTF);
	
	if(s == "ITEM_BOD"){
		axes.setMaximum(ITEM_BOD);
		//axes.prevMax = 3;
		//axes.prevMax = ITEM_BOD;
	}else if(s == "ITEM_DOC"){
		axes.setMaximum(ITEM_DOC);
		//axes.prevMax = ITEM_DOC;
	}else if(s == "ITEM_COD"){
		axes.setMaximum(ITEM_COD);
		//axes.prevMax = ITEM_COD;
	}else if(s == "ITEM_TN"){
		axes.setMaximum(ITEM_TN);
		//axes.prevMax = ITEM_TN;
	}else if(s == "ITEM_TP"){
		axes.setMaximum(ITEM_TP);
		//axes.prevMax = ITEM_TP;
	}else if(s == "ITEM_TEMP"){
		axes.setMaximum(ITEM_TEMP);
		//axes.prevMax = ITEM_TEMP;
	}else if(s == "ITEM_PH"){
		axes.setMaximum(ITEM_PH);
		//axes.prevMax = ITEM_PH;
	}else if(s == "ITEM_SS"){
		axes.setMaximum(ITEM_SS);
		//axes.prevMax = ITEM_SS;
	}else if(s == "ITEM_CLOA"){
		axes.setMaximum(ITEM_CLOA);
		//axes.prevMax = ITEM_CLOA;
	}else if(s == "ITEM_DOW"){
		axes.setMaximum(ITEM_DOW);
		//axes.prevMax = ITEM_DOW;
	}else if(s == "ITEM_FLW"){
		axes.setMaximum(ITEM_FLW);
		//axes.prevMax = ITEM_FLW;
	}else if(s == "ITEM_EC"){
		axes.setMaximum(ITEM_EC);
		//axes.prevMax = ITEM_EC;
	}else if(s == "AMT_PHYS"){
		axes.setMaximum(AMT_PHYS);
		//axes.prevMax = AMT_PHYS;
	}else if(s == "AMT_BIO"){
		axes.setMaximum(AMT_BIO);
		//axes.prevMax = AMT_BIO;
	}else if(s == "AMT_HIGHTEC"){
		axes.setMaximum(AMT_HIGHTEC);
		//axes.prevMax = AMT_HIGHTEC;
	}else if(s == "ITEM_COLI"){
		axes.setMaximum(ITEM_COLI);
		//axes.prevMax = ITEM_COLI;
	}else if(s == "ITEM_AMT"){
		axes.setMaximum(ITEM_AMT);
		//axes.prevMax = ITEM_AMT;
	}else if(s == "ITEM_BYPASS_AMT"){
		axes.setMaximum(ITEM_BYPASS_AMT);
		//axes.prevMax = ITEM_BYPASS_AMT;
		
	}else if(s == "RF"){
		axes.setMaximum(RF);
	}else if(s == "WL"){
		axes.setMaximum(WL);
	}else if(s == "FW"){
		axes.setMaximum(FW);
	}else if(s == "SWL"){
		axes.setMaximum(SWL);
	}else if(s == "OTF"){
		axes.setMaximum(OTF);
	}else if(s == "SFW"){
		axes.setMaximum(SFW);
	}else if(s == "ECPC"){
		axes.setMaximum(ECPC);
	}else if(s == "WD"){
		axes.setMaximum(WD);
	}else if(s == "WS"){
		axes.setMaximum(WS);
	}else if(s == "TA"){
		axes.setMaximum(TA);
	}else if(s == "HM"){
		axes.setMaximum(HM);
	}else if(s == "PA"){
		axes.setMaximum(PA);
	}else if(s == "RNYN"){
		axes.setMaximum(RNYN);
	}else if(s == "RN1HR"){
		axes.setMaximum(RN1HR);
	}else if(s == "RNDAY"){
		axes.setMaximum(RNDAY);
	}else if(s == "RND"){
		axes.setMaximum(RND);
	}else if(s == "SIDAY"){
		axes.setMaximum(SIDAY);
	}else if(s == "OWL"){
		axes.setMaximum(OWL);
	}else if(s == "TOTOTF"){
		axes.setMaximum(TOTOTF);
	}else if(s == "EGOTF"){
		axes.setMaximum(EGOTF);
	}else if(s == "GTOTF"){
		axes.setMaximum(GTOTF);
	}else if(s == "CBOTF"){
		axes.setMaximum(CBOTF);
	}else if(s == "FWOTF"){
		axes.setMaximum(FWOTF);
	}else if(s == "ETCOTF"){
		axes.setMaximum(ETCOTF);
	}
	
	var selectItemName = Ext.getCmp("selectItemName")
	selectItemName.setText(labelNm);

	store.load();
	
	//chartCtl.getView().refresh();

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
ShowSearchResult = function(siteIds, parentIds, titleText, gridId, test){
	
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
	searchResultWindow.show();
	KRF_DEV.getApplication().searchResultWindow = searchResultWindow;
	
	console.info(siteIds);
	console.info(parentIds);
	console.info(gridId);
	
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
			//closable : true,
			autoResize: true
	};
	
	var tab = searchResultTab.items.items[1];
	
	var gridStore = null;
	var grdContainer = Ext.getCmp(gridId + "_container");
	
	var orgParentId = parentIds[0].parentId;
	
	if(parentIds[0].parentId == undefined){
		var parentCheck = parentIds.substring(0,1);
	}else{
		var parentCheck = parentIds[0].parentId.substring(0,1);
	}	
	
	
	var hiddenGrid = Ext.getCmp("F_CHANGE");	
		//var parentCheck = parentIds.substring(0.1);  
	
	
	console.info(parentCheck);
	//console.info(parentIds[0].parentId.substring(0,1));

	var cmbStartYear = Ext.getCmp("cmbStartYear");
	var cmbStartMonth = Ext.getCmp("cmbStartMonth");
	var cmbEndYear = Ext.getCmp("cmbEndYear");
	var cmbEndMonth = Ext.getCmp("cmbEndMonth");
	
	var firstSearch =  KRF_DEV.getApplication().btnFlag;
	console.info(firstSearch);
	if(parentCheck == "A"){	
		if(firstSearch == "noDate"){
			cmbStartYear.setValue("2015");
			cmbStartMonth.setValue("10");
			cmbEndYear.setValue("2015");
			cmbEndMonth.setValue("12");
		}
		//console.info(sYearCtl.setValue("2013"));
		
		//환경기초시설 검색값 히든처리
		hiddenGrid.setHidden(true);
		if(grdContainer == null || grdContainer == undefined){
			grdContainer = Ext.create("KRF_DEV.view.south.SearchResultGrid", options);
			//searchResultTab.add(grdContainer);
			tab.add(grdContainer);
			//tab.insert(0, grdContainer);
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
		hiddenGrid.setHidden(false);
		if(grdContainer == null || grdContainer == undefined){
			
			grdContainer = Ext.create("KRF_DEV.view.south.SearchResultGrid_F", options);
			
			
			tab.add(grdContainer);
			//tab.insert(0, grdContainer);
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
		
		if(firstSearch == "noDate"){
			cmbStartYear.setValue("2015");
			cmbStartMonth.setValue("10");
			cmbEndYear.setValue("2015");
			cmbEndMonth.setValue("12");
		}
		
		hiddenGrid.setHidden(true);
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
		
		console.info(grdCtl.parentIds)
		console.info(grdCtl.siteIds);
		
		gridStore = Ext.create("KRF_DEV.store.south.SearchResultGrid_B", {
			siteIds: grdCtl.siteIds,
			parentIds: grdCtl.parentIds,
			firstSession: test
		});
		
		grdCtl.getView().bindStore(gridStore);
	
	}else if(parentCheck == "C"){
		
		//var firstSearch =  KRF_DEV.getApplication().btnFlag;
		if(firstSearch == "noDate"){
			cmbStartYear.setValue("2012");
			cmbStartMonth.setValue("10");
			cmbEndYear.setValue("2012");
			cmbEndMonth.setValue("12");
		}

		hiddenGrid.setHidden(true);
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
		
		console.info(grdCtl.parentIds)
		console.info(grdCtl.siteIds);
		
		gridStore = Ext.create("KRF_DEV.store.south.SearchResultGrid_C", {
			siteIds: grdCtl.siteIds,
			parentIds: grdCtl.parentIds,
			firstSession: test
		});
		
		grdCtl.getView().bindStore(gridStore);
	
	
	}else if(parentCheck == "D"){
		
		if(firstSearch == "noDate"){
			cmbStartYear.setValue("2015");
			cmbStartMonth.setValue("10");
			cmbEndYear.setValue("2015");
			cmbEndMonth.setValue("12");
		}

		console.info(orgParentId);
		hiddenGrid.setHidden(true);
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
		console.info(grdCtl);
		console.info(grdCtl.parentIds);
		console.info(parentIds);
		console.info(orgParentId);
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
		
		console.info(grdCtl.parentIds)
		console.info(grdCtl.siteIds);
		
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
	//console.info(searchResultTab);
	
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
    	var tmpGraphics = rchMap.reachLayerAdmin.upRchGraphics;
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
    		else
    			rowData.push(geoTrib + "지류");
    		storeData.push(rowData);
    	}
    	
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
    		else
    			rowData.push(geoTrib + "지류");
    		storeData.push(rowData);
    	}
    	
    	//console.info(tmpGraphics);
    	
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
    		else
    			rowData.push(geoTrib + "지류");
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
    		fields: [{name: 'RCH_ID', type: 'string'},
    		         {name: 'RCH_LEN', type: 'float'},
    		         {name: 'CAT_ID', type: 'string'},
    		         {name: 'CAT_AREA', type: 'float'},
    		         {name: 'RIV_NM', type: 'string'},
    		         {name: 'CUM_LEN', type: 'float'},
    		         {name: 'GEO_TRIB', type: 'string'}]
    	});
    	store.loadData(storeData);
    	grdCtl.setStore(store); // 그리드 스토어 셋팅
	}
	else{ // 정보창에서 넘어왔을때
		var queryTask = new esri.tasks.QueryTask(_mapServiceUrl + '/' + _reachLineLayerId); // 레이어 URL
		var query = new esri.tasks.Query();
		query.returnGeometry = false;
		
		query.where = "CAT_ID IN (" + catIds + ")";
		
		query.outFields = ["*"];
		queryTask.execute(query, function(result){
			Ext.each(result, function(objLayer, idx, objLayers){
				var sumRchLen = 0;
				var sumCatArea = 0;
				for(var i = 0; i < objLayer.features.length; i++){
					var rowData = [];
					//var retVal = GetCatArea(objLayer.features[i].attributes.CAT_ID);
					//console.info(retVal);
					//console.info("after");
					rowData.push(objLayer.features[i].attributes.RCH_ID);
		    		rowData.push(objLayer.features[i].attributes.RCH_LEN);
		    		sumRchLen += objLayer.features[i].attributes.RCH_LEN;
		    		rowData.push(objLayer.features[i].attributes.CAT_ID);
		    		rowData.push(objLayer.features[i].attributes.CAT_AREA);
		    		sumCatArea += objLayer.features[i].attributes.CAT_AREA;
		    		rowData.push(objLayer.features[i].attributes.RIV_NM);
		    		rowData.push(objLayer.features[i].attributes.CUM_LEN);
		    		var geoTrib = objLayer.features[i].attributes.GEO_TRIB;
		    		if(geoTrib == "0")
		    			rowData.push("본류");
		    		else
		    			rowData.push(geoTrib + "지류");
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
	        		fields: [{name: 'RCH_ID', type: 'string'},
	        		         {name: 'RCH_LEN', type: 'float'},
	        		         {name: 'CAT_ID', type: 'string'},
	        		         {name: 'CAT_AREA', type: 'float'},
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

GetCatArea = function(catId){
	
	var queryTask = new esri.tasks.QueryTask(_mapServiceUrl + '/' + _reachAreaLayerId); // 레이어 URL
	var query = new esri.tasks.Query();
	query.returnGeometry = false;
	
	query.where = "CAT_ID IN '" + catId + "'";
	
	var test = "";
	
	query.outFields = ["*"];
	var retVal = queryTask.execute(query);
	
	retVal.then(function(featureSet){
		return featureSet;
	});
	
	console.info("ddd");
	
	/*
	for(var i = 0; i < 1000000; i++){
		if(test == ""){
			Ext.defer(function(){
				console.info("fldskjfa");
			}, 1000, this);
		}
	}
	*/
	
	console.info(test);
	
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


siteMovePoint = function(parentNodeId, nodeId){
	console.info("~~");
	console.info(parentNodeId);
	console.info(nodeId);
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
	KRF_DEV.getApplication().fireEvent('setSelectedSite', layerId, nodeId);	
}

OpenMenualPop = function(){
	window.open("./resources/menual/KRF_Menual.html", "하천망 분석도 사용자 메뉴얼", "width=300, height=300, toolbar=no, status=no, menubar=no, scrollbars=yes, resizable=no, left=150, top=150");
}

ResetButtonClick = function(){
	
	var me = GetCoreMap();
	// 리치 선택 종료
	me.reachLayerAdmin.drawEnd();
	// 리치라인, 집수구역 그래픽 레이어 및 전역 변수 clear
	me.reachLayerAdmin.clearGraphicsLayer("reset");
	
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