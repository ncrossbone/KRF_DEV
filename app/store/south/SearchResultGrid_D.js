Ext.define('KRF_DEV.store.south.SearchResultGrid_D', {
    extend : 'Ext.data.Store',
    //extend : 'Ext.data.BufferedStore', 
    //  {name:  type: 'number'},
    fields: [
			'WS_NM',
			'AM_NM',
			'AS_NM',
			'PT_NO',
			'PT_NM',
			'WMCYMD',
			'CHART_WL',
			{name: 'CURR_WL', type: 'number'},
			'CHART_MXWL',
			{name: 'CURR_MXWL', type: 'number'},
			'CHART_MNWL',
			{name: 'CURR_MNWL', type: 'number'}
    ],
    
    siteId: '',
    
    autoLoad: true,
    
    buffered: true,
    pageSize: 100,

	remoteSort: true,
	
	siteIds: "",
	parentIds: [],
	orgParentIds: "",
	
	listeners: {
		load: function(store) {
			
			var requestUrl = "";
			
			if(store.orgParentIds == "D001"){
				requestUrl = "./resources/jsp/GetSearchResultData_D_1.jsp";
			}else if(store.orgParentIds == "D002"){
				requestUrl = "./resources/jsp/GetSearchResultData_D_2.jsp";
				store.config.fields = [
										'WS_NM',
										'AM_NM',
										'AS_NM',
										'PT_NO',
										'PT_NM',
										'WMCYMD',
										'CURR_RF',
										{name: 'CHART_RF', type: 'number'}
				                       ]
			}else if(store.orgParentIds == "D003"){
				requestUrl = "./resources/jsp/GetSearchResultData_D_3.jsp";
				store.config.fields = [
										'WS_NM',
										'AM_NM',
										'AS_NM',
										'PT_NO',
										'PT_NM',
										'WMCYMD',
										'CURR_FW',
										{name: 'CHART_FW', type: 'number'}										
				                       ]
			}else if(store.orgParentIds == "D004"){
				requestUrl = "./resources/jsp/GetSearchResultData_D_4.jsp";
				store.config.fields = [
										'WS_NM',
										'AM_NM',
										'AS_NM',
										'PT_NO',
										'PT_NM',
										'WMCYMD',
										'CURR_SWL',
										{name: 'CHART_SWL', type: 'number'},
										'CURR_INF',
										{name: 'CHART_INF', type: 'number'},
										'CURR_OTF',
										{name: 'CHART_OTF', type: 'number'},
										'CURR_SFW',
										{name: 'CHART_SFW', type: 'number'},
										'CURR_ECPC',
										{name: 'CHART_ECPC', type: 'number'}
				                       ]
			}else if(store.orgParentIds == "D005"){
				requestUrl = "./resources/jsp/GetSearchResultData_D_5.jsp";
				store.config.fields = [
										'WS_NM',
										'AM_NM',
										'AS_NM',
										'PT_NO',
										'PT_NM',
										'WMCYMD',
										'CURR_WD',
										{name: 'CHART_WD', type: 'number'},
										'CURR_WS',
										{name: 'CHART_WS', type: 'number'},
										'CURR_TA',
										{name: 'CHART_TA', type: 'number'},
										'CURR_HM',
										{name: 'CHART_HM', type: 'number'},
										'CURR_PA',
										{name: 'CHART_PA', type: 'number'},
										'CURR_PS',
										{name: 'CHART_PS', type: 'number'},
										'CURR_RNYN',
										{name: 'CHART_RNYN', type: 'number'},
										'CURR_RN1HR',
										{name: 'CHART_RN1HR', type: 'number'},
										'CURR_RNDAY',
										{name: 'CHART_RNDAY', type: 'number'}
				                       ]
			}else if(store.orgParentIds == "D006"){
				requestUrl = "./resources/jsp/GetSearchResultData_D_6.jsp";
				store.config.fields = [
										'WS_NM',
										'AM_NM',
										'AS_NM',
										'PT_NO',
										'PT_NM',
										'WMCYMD',
										'CURR_RND',
										{name: 'CHART_RND', type: 'number'},
										'CURR_TA',
										{name: 'CHART_TA', type: 'number'},
										'CURR_SIDAY',
										{name: 'CHART_SIDAY', type: 'number'}
				                       ]
			}else if(store.orgParentIds == "D007"){
				requestUrl = "./resources/jsp/GetSearchResultData_D_7.jsp";
				store.config.fields = [
										'WS_NM',
										'AM_NM',
										'AS_NM',
										'PT_NO',
										'PT_NM',
										'WMCYMD',
										'CURR_SWL',
										{name: 'CHART_SWL', type: 'number'},
										'CURR_OWL',
										{name: 'CHART_OWL', type: 'number'},
										'CURR_SFW',
										{name: 'CHART_SFW', type: 'number'},
										'CURR_ECPC',
										{name: 'CHART_ECPC', type: 'number'},
										'CURR_INF',
										{name: 'CHART_INF', type: 'number'},
										'CURR_TOTOTF',
										{name: 'CHART_TOTOTF', type: 'number'},
										'CURR_EGOTF',
										{name: 'CHART_EGOTF', type: 'number'},
										'CURR_GTOTF',
										{name: 'CHART_GTOTF', type: 'number'},
										'CURR_CBOTF',
										{name: 'CHART_CBOTF', type: 'number'},
										'CURR_FWOTF',
										{name: 'CHART_FWOTF', type: 'number'},
										'CURR_ETCOTF',
										{name: 'CHART_ETCOTF', type: 'number'}
				                       ]
			}
			
			
			var startYear = startMonth = endYear = endMonth = "";
			
			startYear = Ext.getCmp("cmbStartYear").value;
			startMonth = Ext.getCmp("cmbStartMonth").value;
			endYear = Ext.getCmp("cmbEndYear").value;
			endMonth = Ext.getCmp("cmbEndMonth").value;
			
			var jsonData = "";
			var arrData = [];
			
			// 로딩바 표시
			var winCtl = Ext.getCmp("searchResultWindow");
			var tabContainer = winCtl.items.items[0];
			var tabCtl = tabContainer.items.items[1];
			var activeTab = tabCtl.getActiveTab();
			activeTab.mask("loading", "loading...");
			
			Ext.Ajax.request({
        		url: requestUrl,
        		params: { WS_CD: WS_CD, AM_CD: AM_CD, AS_CD: AS_CD
        			, startYear: startYear, startMonth: startMonth, endYear: endYear, endMonth: endMonth
        			, ADM_CD: ADM_CD, siteIds: store.siteIds},
        		async: true, // 비동기 = async: true, 동기 = async: false
        		success : function(response, opts) {

        			//console.info(response.responseText);
        			jsonData = Ext.util.JSON.decode( response.responseText );

        			if(jsonData.data[0].msg == undefined || jsonData.data[0].msg == ""){
        				store.setData(jsonData.data);
	        			// 로딩바 숨김
	        			activeTab.unmask();
        			}
        			else{
        				activeTab.mask(jsonData.data[0].msg, "noData");
        			}
        			
        		},
        		failure: function(form, action) {
        			// 로딩바 숨김
        			activeTab.unmask();
        			
        			alert("오류가 발생하였습니다.");
        		}
        	});
			
		}
    }
});