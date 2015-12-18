var _testUrl = null;
var _serviceUrl = null;
var _mapServiceUrl = null; // 리치 맵 서비스
var _mapServiceUrl_v3 = null; // 리치 맵 서비스 v3
var _mapServiceUrl_reachtest = null; // 시연용 테스트 맵 서비스
var _mapServiceUrl_dim = null; // dim처리 맵 서비스
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
			// console.info(this.data.record);
			_testUrl = "sss";
		}
	}
});

store.load(function(a, b, c) {
	this.each(function(record, cnt, totCnt) {
		_mapServiceUrl = record.data.reachServiceUrl;
		_mapServiceUrl_v3 = record.data.reachServiceUrl_v3;
		_mapServiceUrl_reachtest = record.data.reachTestServiceUrl;
		_mapServiceUrl_dim = record.data.dimServiceUrl;
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
		_arcServiceUrl = record.data.arcServiceUrl
	});
});

/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by Sencha
 * Cmd when upgrading.
 */
Ext.application({
	name : 'KRF_DEV',
	
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

		/*
		 * Ext.Ajax.on('beforerequest', function (con, opt) {
		 * console.info(con); console.info(opt);
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
		Ext.ShowSiteListWindow = function(searchText) {

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

			// console.info(searchText);
			listWinCtl = Ext.getCmp("siteListWindow");
			if (listWinCtl == undefined)
				listWinCtl = Ext.create('KRF_DEV.view.east.SiteListWindow');

			listWinCtl.show();
			// alert("dd");
			var treeCtl = Ext.getCmp("siteListTree");
			var store = treeCtl.getStore();
			store.searchType = searchText;
			store.load();

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

			if (listWinCtl != undefined)
				listWinCtl.close();


			listWinCtl = Ext.getCmp("siteListWindow_reach");

			if (listWinCtl != undefined)
				listWinCtl.close();

			// 좌측 정보창 버튼 off
			SetBtnOnOff("btnSiteListWindow", "off");

		}

		// 지점 정보 창 띄우기
		Ext.ShowSiteInfoWindow = function(siteId) {

			infoWinCtl = Ext.getCmp("siteInfoWindow");

			if (infoWinCtl == undefined)
				infoWinCtl = Ext
						.create('KRF_DEV.view.east.SiteInfoWindow');

			infoWinCtl.show();

			// console.info(infoWinCtl.visible);

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

		/*
		 * // 검색결과창 띄우기 Ext.ShowSearchResult = function(tabId, title){
		 * //console.info(tabId); var tabCtl = Ext.getCmp(tabId);
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
			var rToolbar = Ext.getCmp("reachToolbar");
			
			 console.info(rToolbar);
				if (rToolbar == undefined) {
					rToolbar = Ext.create('KRF_DEV.view.center.ReachToolbar',{
										// region: 'north',
										id : 'reachToolbar',
										cls : 'khLee-x-reachtoolbar khLee-x-reachtollbar-default khLee-x-box-target'
									});
				
				
			}
				
			console.info(rNameToolbar);
			if(rNameToolbar == undefined){
				rNameToolbar = Ext.create('KRF_DEV.view.center.ReachNameToolbar');
				rNameToolbar.show();
			}
			
			
			var cContainer = Ext.getCmp("center_container");
			cContainer.add(rToolbar);

		}

		Ext.HideReachToolbar = function() {
			var cContainer = Ext.getCmp("center_container");
			var rToolbar = Ext.getCmp("reachToolbar");
			var rNameToolbar = Ext.getCmp("reachNameToolbar");
			cContainer.remove(rToolbar, false);
			rNameToolbar.close();
		}
	},
	// session정보 없을 시 로그인 창 이동. 2015.11.27 hyeok
	constructor : function() {
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
		console.info(sessionInfo.trim());
		if (sessionInfo.trim() == "false") {

			this.callParent();
			//Ext.create('KRF_DEV.view.main.LoginBack').show();
		} else {

			this.callParent();
		}
	}
});
