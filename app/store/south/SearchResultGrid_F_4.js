Ext.define('KRF_DEV.store.south.SearchResultGrid_F_4', {
    extend : 'Ext.data.Store',
    //extend : 'Ext.data.BufferedStore', 
    
    fields: [
        'FACI_CD',
        'FACI_NM',
        'WORK_DT_VAL',
        'WORK_DT_GRAPH',
        {name: 'PIPE_NUM', type: 'number'},
        {name: 'AMT_VAL', type: 'number'},
        'AMT_GRAPH',
        {name: 'BOD_VAL', type: 'number'},
        'BOD_GRAPH',
        {name: 'COD_VAL', type: 'number'},
        'COD_GRAPH',
        {name: 'SS_VAL', type: 'number'},
        'SS_GRAPH',
        {name: 'TN_VAL', type: 'number'},
        'TN_GRAPH',
        {name: 'TP_VAL', type: 'number'},
        'TP_GRAPH',
        {name: 'COLI_VAL', type: 'number'},
        'COLI_GRAPH'
        
    ],
    
    siteId: '',
    
    autoLoad: true,
    
    buffered: true,
    pageSize: 100,

	remoteSort: true,
	
	siteIds: "",
	parentIds: [],
	
	listeners: {
		load: function(store) {
			
			var startYear = startMonth = endYear = endMonth = "";
			
			startYear = Ext.getCmp("cmbStartYear").value;
			startMonth = Ext.getCmp("cmbStartMonth").value;
			endYear = Ext.getCmp("cmbEndYear").value;
			endMonth = Ext.getCmp("cmbEndMonth").value;
			var firstSearch =  KRF_DEV.getApplication().btnFlag;
			
			var jsonData = "";
			var arrData = [];
			//console.info(store.parentIds);
			
			// 로딩바 표시
			var winCtl = Ext.getCmp("searchResultWindow");
			var tabContainer = winCtl.items.items[0];
			var tabCtl = tabContainer.items.items[1];
			var activeTab = tabCtl.getActiveTab();
			activeTab.mask("loading", "loading...");
			
			Ext.Ajax.request({
        		url: './resources/jsp/GetSearchResultData_F_4.jsp',
        		params: { WS_CD: WS_CD, AM_CD: AM_CD, AS_CD: AS_CD
        			, startYear: startYear, startMonth: startMonth, endYear: endYear, endMonth: endMonth
        			, ADM_CD: ADM_CD, siteIds: store.siteIds, firstSearch: firstSearch},
        		async: true, // 비동기 = async: true, 동기 = async: false
        		//rootProperty : 'items',
        		success : function(response, opts) {
        			
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