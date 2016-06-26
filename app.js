var _testUrl = null;
var _serviceUrl = null;
var _mapServiceUrl = null; // 리치 맵 서비스
var _mapServiceUrl_v3 = null; // 리치 맵 서비스 v3
var _mapServiceUrl_v3_2 = null; // 리치 맵 서비스 v3 (투명도적용)
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
var _isOffsetPoint = null; // 포인트 찍을때 offset 적용 여부


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
		_arcServiceUrl = record.data.arcServiceUrl;
		_isOffsetPoint = record.data.isOffsetPoint;
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

			// //console.info(searchText);
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
		
		
		
		
		/******* 레이어 정보 가져오기 *******/
		// 표시될 레이어 전역 변수
		Ext.visibleLayers = [];

		// 좌상단 레이어 버튼 관련 전역 변수
		Ext.btn1LayerIds = [];
		Ext.btn2LayerIds = [];
		Ext.btn3LayerIds = [];
		Ext.btn4LayerIds = [];
		Ext.btn5LayerIds = [];
		Ext.btn6LayerIds = [];

		// 좌상단 레이어 버튼 기본 이미지 관련 전역 변수
		Ext.btn1DefaultImg = "";
		Ext.btn2DefaultImg = "";
		Ext.btn3DefaultImg = "";
		Ext.btn4DefaultImg = "";
		Ext.btn5DefaultImg = "";
		Ext.btn6DefaultImg = "";

		// 좌상단 레이어 버튼 On/Off 여부 관련 전역 변수
		//좌상단 레이어 버튼 기본 이미지 관련 전역 변수
		Ext.btn1OnOff = "off";
		Ext.btn2OnOff = "off";
		Ext.btn3OnOff = "off";
		Ext.btn4OnOff = "off";
		Ext.btn5OnOff = "off";
		Ext.btn6OnOff = "off";

		// 낙동강 항공영상 관련 전역 변수
		//Ext.nakdongDroneDate = ["촬영일자선택"];
		//Ext.nakdongDroneLayerId = [""];
		Ext.nakdongDroneDate = [""];
		Ext.nakdongDroneLayerId = [""];
		Ext.nakdongDroneDefaultValue = "";
		Ext.nakdongDroneOnOffVar = "Ext.btn5OnOff"; // 낙동강 항공영상 버튼 On/Off 변수 명

		// 북한강 항공영상 관련 전역 변수
		//Ext.northHanDroneDate = ["촬영일자선택"];
		//Ext.northHanDroneLayerId = [""];
		Ext.northHanDroneDate = [""];
		Ext.northHanDroneLayerId = [""];
		Ext.northHanDroneDefaultValue = "";
		Ext.northHanDroneOnOffVar = "Ext.btn5OnOff"; // 북한강 항공영상 버튼 On/Off 변수 명

		//금강 항공영상 관련 전역 변수
		//Ext.geumDroneDate = ["촬영일자선택"];
		//Ext.geumDroneLayerId = [""];
		Ext.geumDroneDate = [""];
		Ext.geumDroneLayerId = [""];
		Ext.geumDroneDefaultValue = "";
		Ext.geumDroneOnOffVar = "Ext.btn5OnOff"; // 북한강 항공영상 버튼 On/Off 변수 명

		//한강 항공영상 관련 전역 변수
		//Ext.northHanDroneDate = ["촬영일자선택"];
		//Ext.northHanDroneLayerId = [""];
		Ext.hangangDroneDate = [""];
		Ext.hangangDroneLayerId = [""];
		Ext.hangangDroneDefaultValue = "";
		Ext.hangangDroneOnOffVar = "Ext.btn5OnOff"; // 한강 항공영상 버튼 On/Off 변수 명

		Ext.featureLayerVar = "Ext.btn2OnOff"; // 측정지점 버튼 On/Off 변수 명
		Ext.featureLayerId = "3";

		//Ext.nakdongWMCYMW = ["측정일자선택"];
		//Ext.nakdongWMCYMWDefaultValue = "";
		//Ext.northHanWMCYMW = ["측정일자선택"];
		//Ext.northHanWMCYMWDefaultValue = "";
		Ext.nakdongWMCYMW = [""];
		Ext.nakdongWMCYMWDefaultValue = "";
		Ext.northHanWMCYMW = [""];
		Ext.northHanWMCYMWDefaultValue = "";
		Ext.geumWMCYMW = [""];
		Ext.geumWMCYMWDefaultValue = "";
		Ext.hangangWMCYMW = [""];
		Ext.hangangWMCYMWDefaultValue = "";

		Ext.nakdongChlDate = ["선택하세요."];
		Ext.nakdongChlLayerId = [""];
		Ext.nakdongChlDefaultValue = "선택하세요.";
		Ext.nakdongChlOnOffVar = "Ext.btn6OnOff"; // 낙동강 초분광(클로로필a) 버튼 On/Off 변수 명
		Ext.nakdongChlLegendImg = "";

		Ext.northHanChlDate = ["선택하세요."];
		Ext.northHanChlLayerId = [""];
		Ext.northHanChlDefaultValue = "선택하세요.";
		Ext.northHanChlOnOffVar = "Ext.btn6OnOff"; // 북한강 초분광(클로로필a) 버튼 On/Off 변수 명
		Ext.northHanChlLegendImg = "";

		Ext.geumChlDate = ["선택하세요."];
		Ext.geumChlLayerId = [""];
		Ext.geumChlDefaultValue = "선택하세요.";
		Ext.geumChlOnOffVar = "Ext.btn6OnOff"; // 금강 초분광(클로로필a) 버튼 On/Off 변수 명
		Ext.geumChlLegendImg = "";

		Ext.hangangChlDate = ["선택하세요."];
		Ext.hangangChlLayerId = [""];
		Ext.hangangChlDefaultValue = "선택하세요.";
		Ext.hangangChlOnOffVar = "Ext.btn6OnOff"; // 금강 초분광(클로로필a) 버튼 On/Off 변수 명
		Ext.hangangChlLegendImg = "";

		var responseLayer = Ext.Ajax.request({
			async: false, // 동기화
		    url: './resources/data/LayerMapper.json'
		});

		var itemsLayer = Ext.decode(responseLayer.responseText);

		for(var i = 0; i < itemsLayer.length; i++){
			if(itemsLayer[i].layerBtnId == "btn1"){
				// 레이어 아이디 전역변수
				Ext.btn1LayerIds.push(itemsLayer[i].layerId);
				
				// 레이어 On/Off 여부
				if(itemsLayer[i].defaultOn == true || itemsLayer[i].defaultOn == "true"){
					Ext.btn1OnOff = "on";
					Ext.visibleLayers.push(itemsLayer[i].layerId);
				}
				else
					Ext.btn1OnOff = "off";
				
				if(itemsLayer[i].defaultImg != undefined){
					// 버튼 이미지 셋팅
					Ext.btn1DefaultImg = itemsLayer[i].defaultImg;
				}
			}
			
			if(itemsLayer[i].layerBtnId == "btn2"){
				// 레이어 아이디 전역변수
				Ext.btn2LayerIds.push(itemsLayer[i].layerId);
				
				// 레이어 On/Off 여부
				if(itemsLayer[i].defaultOn == true || itemsLayer[i].defaultOn == "true"){
					Ext.btn2OnOff = "on";
					Ext.visibleLayers.push(itemsLayer[i].layerId);
				}
				else{
					Ext.btn2OnOff = "off";
				}
				
				if(itemsLayer[i].defaultImg != undefined){
					// 버튼 이미지 셋팅
					Ext.btn2DefaultImg = itemsLayer[i].defaultImg;
				}
			}
			
			if(itemsLayer[i].layerBtnId == "btn3"){
				// 레이어 아이디 전역변수
				Ext.btn3LayerIds.push(itemsLayer[i].layerId);
				
				// 레이어 On/Off 여부
				if(itemsLayer[i].defaultOn == true || itemsLayer[i].defaultOn == "true"){
					Ext.btn3OnOff = "on";
					Ext.visibleLayers.push(itemsLayer[i].layerId);
				}
				else
					Ext.btn3OnOff = "off";
				
				if(itemsLayer[i].defaultImg != undefined){
					// 버튼 이미지 셋팅
					Ext.btn3DefaultImg = itemsLayer[i].defaultImg;
				}
			}
			
			if(itemsLayer[i].layerBtnId == "btn4"){
				// 레이어 아이디 전역변수
				Ext.btn4LayerIds.push(itemsLayer[i].layerId);
				
				// 레이어 On/Off 여부
				if(itemsLayer[i].defaultOn == true || itemsLayer[i].defaultOn == "true"){
					Ext.btn4OnOff = "on";
					Ext.visibleLayers.push(itemsLayer[i].layerId);
				}
				else
					Ext.btn4OnOff = "off";
				
				if(itemsLayer[i].defaultImg != undefined){
					// 버튼 이미지 셋팅
					Ext.btn4DefaultImg = itemsLayer[i].defaultImg;
				}
			}
			
			if(itemsLayer[i].layerBtnId == "btn5"){
				// 레이어 아이디 전역변수
				Ext.btn5LayerIds.push(itemsLayer[i].layerId);
				
				// 레이어 On/Off 여부
				if(itemsLayer[i].defaultOn == true || itemsLayer[i].defaultOn == "true"){
					Ext.btn5OnOff = "on";
					//Ext.visibleLayers.push(itemsLayer[i].layerId);
				}
				else
					Ext.btn5OnOff = "off";
				
				if(itemsLayer[i].defaultImg != undefined){
					// 버튼 이미지 셋팅
					Ext.btn5DefaultImg = itemsLayer[i].defaultImg;
				}
			}
			
			if(itemsLayer[i].layerBtnId == "btn6"){
				// 레이어 아이디 전역변수
				Ext.btn6LayerIds.push(itemsLayer[i].layerId);
				
				// 레이어 On/Off 여부
				if(itemsLayer[i].defaultOn == true || itemsLayer[i].defaultOn == "true"){
					Ext.btn6OnOff = "on";
					//Ext.visibleLayers.push(itemsLayer[i].layerId);
				}
				else
					Ext.btn6OnOff = "off";
				
				if(itemsLayer[i].defaultImg != undefined){
					// 버튼 이미지 셋팅
					Ext.btn6DefaultImg = itemsLayer[i].defaultImg;
				}
			}
			
			// 매핑되는 버튼이 없을경우
			if(itemsLayer[i].layerBtnId == ""){
				// 레이어 On/Off 여부
				if(itemsLayer[i].defaultOn == true || itemsLayer[i].defaultOn == "true"){
					Ext.visibleLayers.push(itemsLayer[i].layerId);
				}
			}
			
			// 항공 영상 전역 변수 셋팅
			if(itemsLayer[i].layerType == "항공"){
				
				if(itemsLayer[i].layerArea == "낙동강"){
					
					Ext.nakdongDroneLayerId.push(itemsLayer[i].layerId); // 항공영상 레이어 아이디
					
					// 항공영상 날짜
					if(itemsLayer[i].layerDate != undefined && itemsLayer[i].layerDate != "")
						Ext.nakdongDroneDate.push(itemsLayer[i].layerDate);
					else
						Ext.nakdongDroneDate.push("");
					
					// 조류측정자료 날짜
					if(itemsLayer[i].mesureDate != undefined && itemsLayer[i].mesureDate != "")
						Ext.nakdongWMCYMW.push(itemsLayer[i].mesureDate);
					else
						Ext.nakdongWMCYMW.push("");
					
					// 클로로필a 레이어 아이디
					if(itemsLayer[i].chlLayerId != undefined && itemsLayer[i].chlLayerId != "")
						Ext.nakdongChlLayerId.push(itemsLayer[i].chlLayerId);
					else
						Ext.nakdongChlLayerId.push("");
					
					// 클로로필a 날짜
					if(itemsLayer[i].chlDate != undefined && itemsLayer[i].chlDate != "")
						Ext.nakdongChlDate.push(itemsLayer[i].chlDate);
					else
						Ext.nakdongChlDate.push("");
		    		//console.info(Ext.nakdongChlDate);
		    		if(itemsLayer[i].defaultOn == true){
		    			// 항공영상 날짜 기본값
		    			if(itemsLayer[i].layerDate != undefined && itemsLayer[i].layerDate != "")
		    				Ext.nakdongDroneDefaultValue = itemsLayer[i].layerDate;
		    			// 조류측정자료 날짜 기본값
		    			if(itemsLayer[i].mesureDate != undefined && itemsLayer[i].mesureDate != "")
		    				Ext.nakdongWMCYMWDefaultValue = itemsLayer[i].mesureDate;
		    			// 클로로필a 날짜 기본값
		    			if(itemsLayer[i].chlDate != undefined && itemsLayer[i].chlDate != "")
		    				Ext.nakdongChlDefaultValue = itemsLayer[i].chlDate;
		    		}
		    		//Ext.nakdongDroneBtnId = itemsLayer[i].layerBtnId;
				}
				
				if(itemsLayer[i].layerArea == "북한강"){
					
					Ext.northHanDroneLayerId.push(itemsLayer[i].layerId); // 항공영상 레이어 아이디
					
					// 항공영상 날짜
					if(itemsLayer[i].layerDate != undefined && itemsLayer[i].layerDate != "")
						Ext.northHanDroneDate.push(itemsLayer[i].layerDate);
					else
						Ext.northHanDroneDate.push("");
					
					// 조류측정자료 날짜
					if(itemsLayer[i].mesureDate != undefined && itemsLayer[i].mesureDate != "")
						Ext.northHanWMCYMW.push(itemsLayer[i].mesureDate);
					else
						Ext.northHanWMCYMW.push("");
					
					// 클로로필a 레이어 아이디
					if(itemsLayer[i].chlLayerId != undefined && itemsLayer[i].chlLayerId != "")
						Ext.northHanChlLayerId.push(itemsLayer[i].chlLayerId);
					else
						Ext.northHanChlLayerId.push("");
					
					// 클로로필a 날짜
					if(itemsLayer[i].chlDate != undefined && itemsLayer[i].chlDate != "")
						Ext.northHanChlDate.push(itemsLayer[i].chlDate);
					else
						Ext.northHanChlDate.push("");
					//console.info(Ext.northHanChlDate);
		    		if(itemsLayer[i].defaultOn == true){
		    			// 항공영상 날짜 기본값
		    			if(itemsLayer[i].layerDate != undefined && itemsLayer[i].layerDate != "")
		    				Ext.northHanDroneDefaultValue = itemsLayer[i].layerDate;
		    			// 조류측정자료 날짜 기본값
		    			if(itemsLayer[i].mesureDate != undefined && itemsLayer[i].mesureDate != "")
		    				Ext.northHanWMCYMWDefaultValue = itemsLayer[i].mesureDate;
		    			// 클로로필a 날짜 기본값
		    			if(itemsLayer[i].chlDate != undefined && itemsLayer[i].chlDate != "")
		    				Ext.northHanChlDefaultValue = itemsLayer[i].chlDate;
		    		}
		    		//Ext.northHanDroneBtnId = itemsLayer[i].layerBtnId;
				}
				
				if(itemsLayer[i].layerArea == "금강"){
					
					Ext.geumDroneLayerId.push(itemsLayer[i].layerId); // 항공영상 레이어 아이디
					
					// 항공영상 날짜
					if(itemsLayer[i].layerDate != undefined && itemsLayer[i].layerDate != "")
						Ext.geumDroneDate.push(itemsLayer[i].layerDate);
					else
						Ext.geumDroneDate.push("");
					
					// 조류측정자료 날짜
					if(itemsLayer[i].mesureDate != undefined && itemsLayer[i].mesureDate != "")
						Ext.geumWMCYMW.push(itemsLayer[i].mesureDate);
					else
						Ext.geumWMCYMW.push("");
					
					// 클로로필a 레이어 아이디
					if(itemsLayer[i].chlLayerId != undefined && itemsLayer[i].chlLayerId != "")
						Ext.geumChlLayerId.push(itemsLayer[i].chlLayerId);
					else
						Ext.geumChlLayerId.push("");
					
					// 클로로필a 날짜
					if(itemsLayer[i].chlDate != undefined && itemsLayer[i].chlDate != "")
						Ext.geumChlDate.push(itemsLayer[i].chlDate);
					else
						Ext.geumChlDate.push("");
		    		
		    		if(itemsLayer[i].defaultOn == true){
		    			// 항공영상 날짜 기본값
		    			if(itemsLayer[i].layerDate != undefined && itemsLayer[i].layerDate != "")
		    				Ext.geumDroneDefaultValue = itemsLayer[i].layerDate;
		    			// 조류측정자료 날짜 기본값
		    			if(itemsLayer[i].mesureDate != undefined && itemsLayer[i].mesureDate != "")
		    				Ext.geumWMCYMWDefaultValue = itemsLayer[i].mesureDate;
		    			// 클로로필a 날짜 기본값
		    			if(itemsLayer[i].chlDate != undefined && itemsLayer[i].chlDate != "")
		    				Ext.geumChlDefaultValue = itemsLayer[i].chlDate;
		    		}
		    		//Ext.geumDroneBtnId = itemsLayer[i].layerBtnId;
				}
				
				if(itemsLayer[i].layerArea == "한강"){
					
					Ext.hangangDroneLayerId.push(itemsLayer[i].layerId); // 항공영상 레이어 아이디
					
					// 항공영상 날짜
					if(itemsLayer[i].layerDate != undefined && itemsLayer[i].layerDate != "")
						Ext.hangangDroneDate.push(itemsLayer[i].layerDate);
					else
						Ext.hangangDroneDate.push("");
					
					// 조류측정자료 날짜
					if(itemsLayer[i].mesureDate != undefined && itemsLayer[i].mesureDate != "")
						Ext.hangangWMCYMW.push(itemsLayer[i].mesureDate);
					else
						Ext.hangangWMCYMW.push("");
					
					// 클로로필a 레이어 아이디
					if(itemsLayer[i].chlLayerId != undefined && itemsLayer[i].chlLayerId != "")
						Ext.hangangChlLayerId.push(itemsLayer[i].chlLayerId);
					else
						Ext.hangangChlLayerId.push("");
					
					// 클로로필a 날짜
					if(itemsLayer[i].chlDate != undefined && itemsLayer[i].chlDate != "")
						Ext.hangangChlDate.push(itemsLayer[i].chlDate);
					else
						Ext.hangangChlDate.push("");
		    		
		    		if(itemsLayer[i].defaultOn == true){
		    			// 항공영상 날짜 기본값
		    			if(itemsLayer[i].layerDate != undefined && itemsLayer[i].layerDate != "")
		    				Ext.hangangDroneDefaultValue = itemsLayer[i].layerDate;
		    			// 조류측정자료 날짜 기본값
		    			if(itemsLayer[i].mesureDate != undefined && itemsLayer[i].mesureDate != "")
		    				Ext.hangangWMCYMWDefaultValue = itemsLayer[i].mesureDate;
		    			// 클로로필a 날짜 기본값
		    			if(itemsLayer[i].chlDate != undefined && itemsLayer[i].chlDate != "")
		    				Ext.hangangChlDefaultValue = itemsLayer[i].chlDate;
		    		}
		    		//Ext.geumDroneBtnId = itemsLayer[i].layerBtnId;
				}
			}
			
			// 초분광 영상 전역 변수 셋팅
			if(itemsLayer[i].layerType == "초분광"){
				
				if(itemsLayer[i].layerArea == "낙동강"){
					//Ext.nakdongChlDate.push(itemsLayer[i].layerDate);
		    		//Ext.nakdongChlLayerId.push(itemsLayer[i].layerId);
		    		//if(Ext.nakdongChlDefaultValue == undefined || Ext.nakdongChlDefaultValue == ""){
		    			//Ext.nakdongChlDefaultValue = itemsLayer[i].layerDate;
		    		//}
					if(itemsLayer[i].legendImg != undefined && itemsLayer[i].legendImg != ""){
						Ext.nakdongChlLegendImg = itemsLayer[i].legendImg;
					}
				}
				
				if(itemsLayer[i].layerArea == "북한강"){
					//Ext.northHanChlDate.push(itemsLayer[i].layerDate);
		    		//Ext.northHanChlLayerId.push(itemsLayer[i].layerId);
		    		//if(Ext.northHanChlDefaultValue == undefined || Ext.northHanChlDefaultValue == ""){
		    			//Ext.northHanChlDefaultValue = itemsLayer[i].layerDate;
		    		//}
		    		if(itemsLayer[i].legendImg != undefined && itemsLayer[i].legendImg != ""){
		    			Ext.northHanChlLegendImg = itemsLayer[i].legendImg;
		    		}
				}
				
				if(itemsLayer[i].layerArea == "금강"){
					//Ext.geumChlDate.push(itemsLayer[i].layerDate);
		    		//Ext.geumChlLayerId.push(itemsLayer[i].layerId);
		    		//if(Ext.geumChlDefaultValue == undefined || Ext.geumChlDefaultValue == ""){
		    			//Ext.geumChlDefaultValue = itemsLayer[i].layerDate;
		    		//}
		    		if(itemsLayer[i].legendImg != undefined && itemsLayer[i].legendImg != ""){
		    			Ext.geumChlLegendImg = itemsLayer[i].legendImg;
		    		}
				}
				
				if(itemsLayer[i].layerArea == "한강"){
		    		if(itemsLayer[i].legendImg != undefined && itemsLayer[i].legendImg != ""){
		    			Ext.hangangChlLegendImg = itemsLayer[i].legendImg;
		    		}
				}
			}
		}
		
		
		
		
		
		
		

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
			var sConfig = Ext.getCmp("searchConfig");
			cContainer.remove(rToolbar, false);
			if(rNameToolbar != undefined && rNameToolbar != null)
				rNameToolbar.close();
			if(sConfig != undefined && sConfig != null)
				sConfig.close();
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
