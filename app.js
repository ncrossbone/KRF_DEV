var _testUrl = null;
var _serviceUrl = null;
/**
 * testlkj
 * @param ljkdfjsad flkjdsl
 * @return string
 * */
var _mapServiceUrl = null; // 리치 맵 서비스
var _mapServiceUrl_v3 = null; // 리치 맵 서비스 v3
var _mapServiceUrl_v3_2 = null; // 리치 맵 서비스 v3 (투명도적용)
var _mapServiceUrl_v3_TM = null; // 리치 맵 서비스 v3 (투명도적용)
var _mapServiceUrl_Aviation = null; // 
var _mapServiceUrl_Chlo = null; // 
var _mapServiceUrl_Phyco = null; // 
var _mapServiceUrl_reachtest = null; // 시연용 테스트 맵 서비스
var _mapServiceUrl_dim = null; // dim처리 맵 서비스
var _baseMapUrl_vworld = null; // 배경맵 서비스 URL
var _reachFlowLayerId = null; // 리치흐름 레이어 아이디
var _reachNodeLayerId = null; // 리치노드 레이어 아이디
var _reachLineLayerId = null; // 리치라인 레이어 아이디
var _reachAreaLayerId = null; // 집수구역 레이어 아이디
var _admSidoLayerId = null; // 시도 레이어 아이디
var _admSigunguLayerId = null; // 시군구 레이어 아이디
var _admDongLayerId = null; // 읍면동 레이어 아이디
var _admRiLayerId = null; // 리 레이어 아이디
var _areaWSLayerId = null; // 대권역 레이어 아이디
var _areaAMLayerId = null; // 중권역 레이어 아이디
var _areaASLayerId = null; // 소권역 레이어 아이디
var _nameLayerId = null; // 시도 레이어 아이디
var _siteInfoLayerId = null; // 지점정보 레이어 아이디
var _arcServiceUrl = null;
var _isOffsetPoint = null; // 포인트 찍을때 offset 적용 여부
var _MapserviceUrl1 = null;
var _kradMapserviceUrl = null;
var _kradCatSearchId = null;
var _kradCatExtDataInfo = null;
var _kradCatExtMetaData = null;
var _paramInfo = null; // 물환경 상세자료검색에서 넘기는 파라메터 정보

var _pollution03_01 = null;
var _pollution03_02 = null;
var _pollution03_03 = null;
var _pollution03_04 = null;

/* Reach, KRAD 관련 object */
var _krad = null; // Reach검색, KRAD검색 관련 object (공통)
var _rchUpSearch = null; // 상류검색 관련 object (검색설정 "상류" 체크 시)
var _rchNode = null; // ReachNode검색 관련 object
var _rchLine = null; // ReachLine검색 관련 object
var _rchArea = null; // ReachArea검색 관련 object

var _toolbarCtl = null;

/* Reach, KRAD 관련 object 끝 */
var store = Ext.create('Ext.data.Store', {
	autoLoad : true,

	fields : [ {
		name : 'MapserviceUrl'
	} ],

	proxy : {
		type : 'ajax',
		url : './resources/data/AppVariable.json',
		reader : {
			type : 'json'
		}
	},

	listeners : {
		beforeload : function(a, b, c) {
			// //console.info(this.data.record);
			_testUrl = "sss";
		}
	}
});

store.load(function(a, b, c) {
	
	this.each(function(record, cnt, totCnt) {
		
		_mapServiceUrl = record.data.reachServiceUrl;
		_mapServiceUrl_v3 = record.data.reachServiceUrl_v3;
		_mapServiceUrl_v3_2 = record.data.reachServiceUrl_v3_2;
		_mapServiceUrl_v3_TM = record.data.reachServiceUrl_v3_TM;
		_mapServiceUrl_Aviation = record.data.MapserviceUrlAviation;
		_mapServiceUrl_Chlo = record.data.MapserviceUrlChlo;
		_mapServiceUrl_Phyco = record.data.MapserviceUrlPhyco;
		_mapServiceUrl_reachtest = record.data.reachTestServiceUrl;
		_mapServiceUrl_dim = record.data.dimServiceUrl;
		_baseMapUrl_vworld = record.data.baseMapUrl_vworld;
		_reachFlowLayerId = record.data.reachFlowLayerId;
		_reachNodeLayerId = record.data.reachNodeLayerId;
		_reachLineLayerId = record.data.reachLineLayerId;
		_reachAreaLayerId = record.data.reachAreaLayerId;
		_admSidoLayerId = record.data.admSidoLayerId;
		_admSigunguLayerId = record.data.admSigunguLayerId;
		_admDongLayerId = record.data.admDongLayerId;
		_admRiLayerId = record.data.admRiLayerId;
		_areaWSLayerId = record.data.areaWSLayerId;
		_areaAMLayerId = record.data.areaAMLayerId;
		_areaASLayerId = record.data.areaASLayerId;
		_siteInfoLayerId = record.data.siteInfoLayerId;
		_arcServiceUrl = record.data.arcServiceUrl;
		_isOffsetPoint = record.data.isOffsetPoint;
		_MapserviceUrl1 = record.data.MapserviceUrl1;
		_kradMapserviceUrl = record.data.kradMapservicUrl;
		_kradCatSearchId = record.data.kradCatSearchId;
		_kradCatExtDataInfo = record.data.kradCatExtDataInfo;
		_kradCatExtMetaData = record.data.kradCatExtMetaData;
		_cursorX = "";
		_cursorY = "";
		
		$(document).bind("click", function(event){
			
			_cursorX = event.pageX;
			_cursorY = event.pageY;
			
			var str = "";
	        str = "offsetX: " + (event.offsetX == undefined ? event.layerX : event.offsetX);
	        str += ", offsetY: " + (event.offsetY == undefined ? event.layerY : event.offsetY);
	        str += "<br/>screenX: " + event.screenX;
	        str += ", screenY : " + event.screenY;
	        str += "<br/>clientX : " + event.clientX;
	        str += ", clientY : " + event.clientY;
	        str += "<br/>pageX : " + event.pageX;
	        str += ", pageY : " + event.pageY;
	        
			//console.info(str);
			
			/*offset: 이벤트가 걸려있는 DOM 객체를 기준으로 좌표를 출력한다.

			layer: offset과 같음. 파폭에서 사용한다.

			screen: 화면 출력 크기가 기준인 절대좌표. 브라우저를 움직여도 값은 같다.

			client: 브라우저가 기준인 좌표. 브라우저 상에서 어느 지점에 위치하는지를 의미하기 때문에 스크롤해도 값은 변하지 않는다.

			page: 문서가 기준인 좌표. client와 비슷하지만 문서 전체 크기가 기준이라 스크롤 시 값이 바뀐다.*/
		});

		_paramInfo = record.data.paramInfo; // 물환경 상세자료검색에서 넘기는 파라메터 정보
	});
});

var _kradInfo = null;

var kradStore = Ext.create('Ext.data.Store', {
	
	autoLoad : true,
	
	fields : [{
		name : 'kradServiceUrl'
	}],
	
	proxy : {
		type : 'ajax',
		url : './resources/data/krad/kradLayerVar.json',
		reader : {
			type : 'json'
		}
	}
});

kradStore.load(function(a, b, c) {
	
	_kradInfo = a[0].data;
	//console.info(_kradInfo);
});

/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by Sencha
 * Cmd when upgrading.
 */
Ext.application({
	name : 'KRF_DEV',
	requires: ["KRF_DEV.global.Obj",
				"KRF_DEV.global.DroneFn",
				"KRF_DEV.global.CommFn",
				"KRF_DEV.global.TabFn"],
	
	// extend: 'KRF_DEV.Application',

	autoCreateViewport : 'KRF_DEV.view.main.Main',

	stores : [
	/*
	 * 'KRF_DEV.store.south.PrototypeGrid',
	 * 'KRF_DEV.store.east.SiteInfoPanel',
	 * 'KRF_DEV.store.south.SearchResultGrid'
	 */
	/*
	 * 'KRF_DEV.store.dev_test.GridStoreTest',
	 * 'KRF_DEV.store.dev_test.WestTabLayerStore',
	 * 'KRF_DEV.store.west.WestTabSearch_ADM_GRID'
	 */
	],
	launch : function() {
		
		Ext.onReady(function(){
			//console.info(encodeURIComponent("121342134|fsljdk|ffff"));
			/* 물환경 상세조회 시 화면 이동 및 심볼 표시
			 * station, stationType 필수 파라메터 */
			var params = Ext.urlDecode(location.search.substring(1));
			if(params.stationType != undefined){
				/*var paramIdx = _paramInfo.map(function(obj){
					
					return obj.stationType;
				}).indexOf(params.stationType);*/
				var paramIdx = 0;
				if(paramIdx > -1){
					
					/*var colNm = _paramInfo[paramIdx].colName;
					var layerId = _paramInfo[paramIdx].layerId;*/
					var siteIds = params.station.split("|");
					var where = "JIJUM_CODE IN (";
					
					for(var i = 0; i < siteIds.length; i++){
						
						if(siteIds[i] != ""){
							
							where += "'" + siteIds[i] + "', ";
						}
					}
					where = where.substring(0, where.length - 2) + ")";
					
					require(["esri/tasks/query",
		    	         "esri/tasks/QueryTask",
		    	         "esri/graphic",
		    	         "esri/layers/GraphicsLayer",
		    	         "esri/symbols/PictureMarkerSymbol",
		    	         "esri/graphicsUtils"],
		    	         function(Query,
		    	        		 QueryTask,
		    	        		 Graphic,
		    	        		 GraphicsLayer,
		    	        		 PictureMarkerSymbol,
		    	        		 graphicsUtils){
						
						var queryTask = new QueryTask(_mapServiceUrl_v3 + "/88");
						var query = new Query();
						query.returnGeometry = true;
						query.outFields = ["*"];
						query.where = where;
						// 리치라인 조회
						
						queryTask.execute(query, function(featureSet){
							
							if(featureSet.features.length > 0){
								
								var coreMap = GetCoreMap();
								
								var symbol = new PictureMarkerSymbol({
						 		    "angle": 0,
						 		    "yoffset": 22,
						 		    "type": "esriPMS",
						 		    "url": "./resources/images/symbol/spot_99.gif",
						 		    "contentType": "image/png",
						 		    "width": 30,
						 		    "height": 44
						 		});
								
								var graphicLayer = new GraphicsLayer();
								graphicLayer.id = "siteSymbolGraphic";
								
								for(var i = 0; i < featureSet.features.length; i++){
									
									var graphic = new Graphic(featureSet.features[i].geometry, symbol);
									graphicLayer.add(graphic);
								}
								var extent = graphicsUtils.graphicsExtent(graphicLayer.graphics);
								coreMap.map.setExtent(extent);
								
								Ext.defer(function(){
									
									var level = coreMap.map.getLevel() - 1;
									
									if(level > 12){
										coreMap.map.setLevel(12);
									}
									else{
										coreMap.map.setLevel(level);
									}
									
									//coreMap.map.addLayer(graphicLayer);
								}, 500);
								coreMap.map.addLayer(graphicLayer);
								Ext.ShowSiteListWindow("paramSearch");
								//var timer = window.setInterval(function(){
									/*var cenPoint = new esri.geometry.Point({ "x": featureSet.features[0].attributes.TM_X, "y": featureSet.features[0].attributes.TM_Y});
									coreMap.map.centerAt(cenPoint);*/
									//console.info(coreMap.map.extent);
									//window.clearInterval(timer);
								//}, 1000);
								
								/*Ext.defer(function(){
									
									var level = coreMap.map.getLevel() - 1;
									
									if(level > 12){
										coreMap.map.setLevel(12);
									}
									else{
										coreMap.map.setLevel(level);
									}
									
									//coreMap.map.addLayer(graphicLayer);
								}, 500);*/
							}
						});
					});
				}
			}
			/* 물환경 상세조회 시 화면 이동 및 심볼 표시 끝 */
		});
		
		/*
		 * Ext.Ajax.on('beforerequest', function (con, opt) {
		 * //console.info(con); //console.info(opt);
		 * Ext.getBody().mask("loading", "loading..."); });
		 * 
		 * Ext.Ajax.on('success', function(){ Ext.getBody().unmask();
		 * });
		 * 
		 * //Ext.Ajax.on('failure', Ext.getBody().unmask,
		 * Ext.getBody());
		 */
		Ext.WestTabChange = function(tabIdx) {
			var westContents = Ext.getCmp("westContents");
			westContents.setActiveItem(tabIdx);
		}
		// Ext.WestTabChange(1);

		// 이미지 on/off
		Ext.SetSrc = function(currCtl) {
			var parentCtl = currCtl.findParentByType('container');
			var items = parentCtl.items.items;
			var groupCnt = 0;

			for (i = 0; i < items.length; i++) {
				if (currCtl.groupId == items[i].groupId) {
					var srcPath = items[i].src;

					if (currCtl != items[i]) {
						items[i].setSrc(srcPath.replace("_on", ""));
					}

					groupCnt++;
				}
			}

			if (groupCnt > 1) {
				if (currCtl.src.indexOf("_on") == -1)
					currCtl.setSrc(currCtl.src.replace(".png",
							"_on.png"));
			} else {
				if (currCtl.src.indexOf("_on") == -1)
					currCtl.setSrc(currCtl.src.replace(".png",
							"_on.png"));
				else
					currCtl.setSrc(currCtl.src.replace("_on.png",
							".png"));
			}
		}

		var listWinCtl = null;
		var infoWinCtl = null;

		// 지점 목록 창 띄우기
		Ext.ShowSiteListWindow = function(searchText, searchType) {

			var me = GetCoreMap();

			//console.info(searchText);

			// 검샋시 다른 더튼값 초기화
			var cmbArea1 = Ext.getCmp("cmbArea1");
			var cmbArea2 = Ext.getCmp("cmbArea2");
			var cmbArea3 = Ext.getCmp("cmbArea3");
			var cmbWater1 = Ext.getCmp("cmbWater1");
			var cmbWater2 = Ext.getCmp("cmbWater2");
			var cmbWater3 = Ext.getCmp("cmbWater3");
			var txtSearch = Ext.getCmp("textSearchText");
			
			var textSearchText_Start = Ext.getCmp("textSearchText_Start");
			var textSearchText_End = Ext.getCmp("textSearchText_End");

			if (searchText == 'waterSearch') {// 수계검색시 행정구역 초기화
				cmbArea1.setValue("");
				cmbArea2.setValue("");
				cmbArea3.setValue("");
				txtSearch.setValue("");

				textSearchText_Start.setValue("");
				textSearchText_End.setValue("");
				//me.reachLayerAdmin.amCD_temp = "";
			} else if (searchText == 'admSearch') {// 행정구역검색시 수계
				// 초기화
				cmbWater1.setValue("");
				cmbWater2.setValue("");
				cmbWater3.setValue("");
				txtSearch.setValue("");
				textSearchText_Start.setValue("");
				textSearchText_End.setValue("");
				//me.reachLayerAdmin.amCD_temp = "";
			} else if (searchText == "nameSearch") {// 명칭찾기시 수계 행정구역
				// 초기화
				cmbArea1.setValue("");
				cmbArea2.setValue("");
				cmbArea3.setValue("");
				cmbWater1.setValue("");
				cmbWater2.setValue("");
				cmbWater3.setValue("");
				textSearchText_Start.setValue("");
				textSearchText_End.setValue("");
				//me.reachLayerAdmin.amCD_temp = "";
			} else if("SEnameSearch"){
				cmbArea1.setValue("");
				cmbArea2.setValue("");
				cmbArea3.setValue("");
				cmbWater1.setValue("");
				cmbWater2.setValue("");
				cmbWater3.setValue("");
				txtSearch.setValue("");
			} else {
				//me.reachLayerAdmin.amCD_temp = searchText;
			}

			// //console.info(searchText);
			listWinCtl = Ext.getCmp("siteListWindow");
			//console.info(listWinCtl);
			if (listWinCtl == undefined){
				listWinCtl = Ext.create('KRF_DEV.view.east.SiteListWindow');
			}	

			listWinCtl.show();
			// alert("dd");
			var store = null;
			var treeCtl = Ext.getCmp("siteListTree");
			//alert(searchType);
			if(searchType == "krad"){
				store = Ext.create('KRF_DEV.store.east.KradListWindow');
			}
			else{
				store = Ext.create('KRF_DEV.store.east.SiteListWindow',{
					async:false
				});
			}
			
			//var store = treeCtl.getStore();
			store.searchType = searchText;
			store.load();
			treeCtl.setStore(store);

			var listWinX = Ext.getBody().getViewSize().width - listWinCtl.width;
			var listWinY = 98;

			listWinCtl.setX(listWinX);
			listWinCtl.setY(listWinY);

			// 좌측 정보창 버튼 on
			SetBtnOnOff("btnSiteListWindow", "on");

		}

		// 지점 목록 창 닫기
		Ext.HideSiteListWindow = function(currCtl) {

			listWinCtl = Ext.getCmp("siteListWindow");
			//console.info(listWinCtl);

			if (listWinCtl != undefined)
				//listWinCtl.hide();
				listWinCtl.close();


			listWinCtl = Ext.getCmp("siteListWindow_reach");

			if (listWinCtl != undefined)
				//listWinCtl.hide();
				listWinCtl.close();
			

			// 좌측 정보창 버튼 off
			SetBtnOnOff("btnSiteListWindow", "off");

		}

		// 지점 정보 창 띄우기
		Ext.ShowSiteInfoWindow = function(siteId) {

			infoWinCtl = Ext.getCmp("siteInfoWindow");

			if (infoWinCtl == undefined)
				infoWinCtl = Ext.create('KRF_DEV.view.east.SiteInfoWindow');

			infoWinCtl.show();

			// //console.info(infoWinCtl.visible);

			var infoWinX = Ext.getBody().getViewSize().width
					- infoWinCtl.width;
			if (listWinCtl != null && listWinCtl != undefined) {
				infoWinX = infoWinX - listWinCtl.width;
			}
			var infoWinY = 98;

			infoWinCtl.setX(infoWinX);
			infoWinCtl.setY(infoWinY);

		}

		// 지점 정보 창 닫기
		Ext.HideSiteInfoWindow = function() {

			var infoWinCtl = Ext.getCmp("siteInfoWindow");

			if (infoWinCtl != undefined)
				infoWinCtl.hide();

		}

		// 차트정보창 띄우기
		Ext.ShowChartResult = function(siteId, title) {

			var chartWinCtl = Ext.getCmp("chartWindow");

			if (chartWinCtl == undefined)
				chartWinCtl = Ext
						.create("KRF_DEV.view.east.ChartWindow");

			chartWinCtl.show();

			var chartWinX = Ext.getBody().getViewSize().width
					- chartWinCtl.width;
			var chartWinY = 388;

			chartWinCtl.setX(chartWinX);
			chartWinCtl.setY(chartWinY);

		}

		// 차트정보창 닫기
		Ext.HideChartResult = function() {

			var chartWinCtl = Ext.getCmp("chartWindow");

			if (chartWinCtl != undefined)
				chartWinCtl.hide();

		}
		
		
		
		Ext.mapServiceUrl = "";

		var responseApp = Ext.Ajax.request({
		    async: false, // 동기화
		    url: './resources/data/AppVariable.json'
		});

		var itemsApp = Ext.decode(responseApp.responseText);
		//console.info(itemsApp);

		for(var i = 0; i < itemsApp.length; i++){
			//console.info(itemsApp[i].MapserviceUrl5);
			if(itemsApp[i].MapserviceUrl1 != undefined)
				Ext.mapServiceUrl = itemsApp[i].MapserviceUrl1;
		}
		//console.info(Ext.mapServiceUrl);
		
		
		
		/******* 레이어 정보 가져오기 *******/
		// 표시될 레이어 전역 변수
		Ext.visibleLayers = [];
		
		Ext.featureLayerId = "3";

		var responseLayer = Ext.Ajax.request({
			async: false, // 동기화
		    url: './resources/data/drone/LayerMapper.json'
		});

		/*
		 * // 검색결과창 띄우기 Ext.ShowSearchResult = function(tabId, title){
		 * ////console.info(tabId); var tabCtl = Ext.getCmp(tabId);
		 * 
		 * if(tabCtl == undefined){
		 * Ext.create('KRF_DEV.view.common.Window', { params: { xtype:
		 * 'south-grid-prototype', id: tabId, title: title } }); } else{
		 * var tabContainer = Ext.getCmp("datawindow-tabpanel");
		 * if(tabContainer != undefined){
		 * tabContainer.setActiveTab(tabCtl); } }
		 * 
		 * var winContainer = Ext.getCmp("datawindow-container");
		 * winContainer.setTitle("검색결과"); winContainer.show();
		 * //winContainerY = Ext.getBody().getViewSize().height -
		 * winContainer.height; //winContainer.setY(winContainerY); } //
		 * 검색결과창 닫기 Ext.HideSearchResult = function(){
		 * 
		 * var winContainer = Ext.getCmp("datawindow-container");
		 * 
		 * if(winContainer != undefined) winContainer.close(); }
		 */

		Ext.ShowReachToolbar = function(evtArgs, el) {
			
			var rNameToolbar = Ext.getCmp("ReachNameToolbar");
			
			var rCountToolbar = Ext.getCmp("ReachCountToolbar");
			
			//var rCountSToolbar = Ext.getCmp("ReachCountSToolbar");
			//var rCountEToolbar = Ext.getCmp("ReachCountEToolbar");
			
			var rToolbar = Ext.getCmp("reachToolbar");
			var sConfig = Ext.getCmp("searchConfig");
			
			 //console.info(rToolbar);
				if (rToolbar == undefined) {
					rToolbar = Ext.create('KRF_DEV.view.center.ReachToolbar',{
										// region: 'north',
										id : 'reachToolbar',
										cls : 'khLee-x-reachtoolbar khLee-x-reachtollbar-default khLee-x-box-target'
									});
				
				
			}
				
			////console.info(rNameToolbar);
			if(rNameToolbar == undefined){
				rNameToolbar = Ext.create('KRF_DEV.view.center.ReachNameToolbar');
				rNameToolbar.show();
			}
			
			/*if(rCountToolbar == undefined){
				rCountToolbar = Ext.create('KRF_DEV.view.center.ReachCountToolbar');
				rCountToolbar.show();
			}*/
			
			var rCountSToolbar = Ext.getCmp("ReachCountSToolbar");
			var rCountEToolbar = Ext.getCmp("ReachCountEToolbar");
			if(rCountSToolbar == undefined){
				rCountSToolbar = Ext.create('KRF_DEV.view.center.ReachCountSToolbar');
				rCountSToolbar.show();
				
			}
			
			if(rCountEToolbar == undefined){
				rCountEToolbar = Ext.create('KRF_DEV.view.center.ReachCountEToolbar');
				rCountEToolbar.show();
				
			}
			
			if(sConfig == undefined){
				sConfig = Ext.create("KRF_DEV.view.center.SearchConfig");
				//sConfig.show();
			}
			
			var cContainer = Ext.getCmp("center_container");
			cContainer.add(rToolbar);

		}

		Ext.HideReachToolbar = function() {
			var cContainer = Ext.getCmp("center_container");
			var rToolbar = Ext.getCmp("reachToolbar");
			var rNameToolbar = Ext.getCmp("reachNameToolbar");
			var rCountToolbar = Ext.getCmp("reachCountToolbar");
			var sConfig = Ext.getCmp("searchConfig");
			var kConfig = Ext.getCmp("kradSchConf");
			              
			var droneToolbar = Ext.getCmp("droneToolbar");
			if(droneToolbar.getY()==202){
			   droneToolbar.setY(droneToolbar.getY() - 105);
			}
			              

			cContainer.remove(rToolbar, false);
			if(rNameToolbar != undefined && rNameToolbar != null)
				rNameToolbar.close();
			if(rCountToolbar != undefined && rCountToolbar != null)
				rCountToolbar.close();
			if(sConfig != undefined && sConfig != null)
				sConfig.close();
			if(kConfig != undefined && kConfig != null)
				kConfig.hide();
				
		}
	},
	// session정보 없을 시 로그인 창 이동. 2015.11.27 hyeok
	constructor : function() {
		/*
		var sessionInfo = "";
		Ext.Ajax.request({
			
			url : "./resources/jsp/sessionMng.jsp",
			async: false,
			method : "GET",
			success : function(result, request) {
				sessionInfo = result.responseText;
			},
			failure : function(result, request) {
				Ext.Msg.alert("Failed", "Ajax");
			}

		});
		//console.info(sessionInfo.trim());
		if (sessionInfo.trim() == "false") {

			this.callParent();
			//Ext.create('KRF_DEV.view.main.LoginBack').show();
		} else {

			this.callParent();
		}
		*/
		this.callParent();
	}
});

Ext.on('resize', function(){
	var loadWidth = window.outerWidth;
	var loadHeight = window.outerHeight;
	var siteListWindow = Ext.getCmp('siteListWindow');
	var searchResultWindow = Ext.getCmp('searchResultWindow');
	var setX;
	var setY;

	if(siteListWindow!=undefined){
		setX = loadWidth - siteListWindow.width;
		siteListWindow.setPosition(setX,98);
	}
	
	if(searchResultWindow!=undefined){
		setY = loadHeight - searchResultWindow.height - 120;
		searchResultWindow.setPosition(0,setY);
        searchResultWindow.setWidth(setX+65);
	}
	
	
	
});
