var _mapServiceUrl_Rpt = null; // 리포트 맵 서비스 URL
var _mapServiceUrl_v3_2 = null; // 지점 맵 서비스 URL (면 투명도 셋팅 위함 및 지점 visible 레벨제한 없는거)
var _baseMapUrl_vworld = null; // 배경맵 서비스 URL
var _arcServiceUrl = null;

var _WS_CD = null; // 대권역 코드
var _WS_NM = null; // 대권역 명
var _MW_CD = null; // 중권역 코드
var _MW_NM = null; // 중권역 명
var _SW_CD = null; // 소권역 코드
var _SW_NM = null; // 소권역 명

var _ADM_SIDO_CD = null; // 시도 코드
var _ADM_SIDO_NM = null; // 시도 명
var _ADM_SIGUNGU_CD = null; // 시군구 코드
var _ADM_SIGUNGU_NM = null; // 시군구 명
var _ADM_DONGRI_CD = null; // 읍면동 코드
var _ADM_DONGRI_NM = null; // 읍면동 명

var store = Ext.create('Ext.data.Store', {
	autoLoad : true,

	fields : [ {
		name : 'MapserviceUrl'
	} ],

	proxy : {
		type : 'ajax',
		url : '../resources/data/AppVariable.json',
		reader : {
			type : 'json'
		}
	}
});

store.load(function(a, b, c) {
	
	this.each(function(record, cnt, totCnt) {
		
		_mapServiceUrl_Rpt = record.data.mapServiceUrl_Rpt;
		_mapServiceUrl_v3_2 = record.data.reachServiceUrl_v3_2;
		_baseMapUrl_vworld = record.data.baseMapUrl_vworld;
		_arcServiceUrl = record.data.arcServiceUrl;
		
		var selWS = opener.Ext.getCmp("cmbWater1").lastSelection;
		if(selWS != undefined && selWS != null & selWS.length > 0){
			_WS_CD = selWS[0].data.id;
			_WS_NM = selWS[0].data.name;
		}
		
		var selMW = opener.Ext.getCmp("cmbWater2").lastSelection;
		if(selMW != undefined && selMW != null & selMW.length > 0){
			_MW_CD = selMW[0].data.id;
			_MW_NM = selMW[0].data.name;
		}
		
		var selSW = opener.Ext.getCmp("cmbWater3").lastSelection;
		if(selSW != undefined && selSW != null & selSW.length > 0){
			_SW_CD = selSW[0].data.id;
			_SW_NM = selSW[0].data.name;
		}
		
		var selSIDO = opener.Ext.getCmp("cmbArea1").lastSelection;
		if(selSIDO != undefined && selSIDO != null & selSIDO.length > 0){
			_ADM_SIDO_CD = selSIDO[0].data.id;
			_ADM_SIDO_NM = selSIDO[0].data.name;
		}
		
		var selSIGUNGU = opener.Ext.getCmp("cmbArea2").lastSelection;
		if(selSIGUNGU != undefined && selSIGUNGU != null & selSIGUNGU.length > 0){
			_ADM_SIGUNGU_CD = selSIGUNGU[0].data.id;
			_ADM_SIGUNGU_NM = selSIGUNGU[0].data.name;
		}
		
		var selDONGRI = opener.Ext.getCmp("cmbArea3").lastSelection;
		if(selDONGRI != undefined && selDONGRI != null & selDONGRI.length > 0){
			_ADM_DONGRI_CD = selDONGRI[0].data.id;
			_ADM_DONGRI_NM = selDONGRI[0].data.name;
		}
	});
});

Ext.application({
	
	name : 'Report',
	
	//appFolder: "./app",
	
	launch : function() {
		
		Ext.create("Report.view.main.rptExtViewMain", {
			renderTo: Ext.getBody()
		});
	}
});