Ext.define('KRF_DEV.store.south.SearchResultGrid_B', {
    extend : 'Ext.data.Store',
    //extend : 'Ext.data.BufferedStore', 
    
    fields: [
        'WS_NM',
        'AM_NM',
        'AS_NM',
        'PT_NO',
        'PT_NM',
        'WAST_NO',
        'FACT_KIND_NAME',
        'FACT_CAPACITY',
        'WMCYMD',
        {name: 'CURR_BOD', type: 'number'},
        'CURR_BOD',
        {name: 'CURR_COD', type: 'number'},
        'CHART_COD',
        {name: 'CURR_SS', type: 'number'},
        'CHART_SS',
        {name: 'CURR_TN', type: 'number'},
        'CHART_TN',
        {name: 'CURR_TP', type: 'number'},
        'CHART_TP',
        {name: 'CURR_PH', type: 'number'},
        'CHART_PH',
        {name: 'CURR_FLW', type: 'number'},
        'CHART_FLW',
        {name: 'CURR_TOC', type: 'number'},
        'CHART_TOC',
        'DO_NM',
        'CTY_NM',
        'DONG_NM',
        'RI_NM'
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
			
			var firstSearch =  KRF_DEV.getApplication().btnFlag;
			console.info(firstSearch);
			
			var startYear = startMonth = endYear = endMonth = "";
			
			startYear = Ext.getCmp("cmbStartYear").value;
			startMonth = Ext.getCmp("cmbStartMonth").value;
			endYear = Ext.getCmp("cmbEndYear").value;
			endMonth = Ext.getCmp("cmbEndMonth").value;
			
			/*var firstSearch =  KRF_DEV.getApplication().btnFlag;
			console.info(firstSearch);*/
			
			var jsonData = "";
			var arrData = [];
			//console.info(store.parentIds);
			Ext.Ajax.request({
        		url: './resources/jsp/GetSearchResultData_B.jsp',
        		params: { WS_CD: WS_CD, AM_CD: AM_CD, AS_CD: AS_CD
        			, startYear: startYear, startMonth: startMonth, endYear: endYear, endMonth: endMonth
        			, ADM_CD: ADM_CD, siteIds: store.siteIds, firstSearch: firstSearch},
        		async: true, // 비동기 = async: true, 동기 = async: false
        		//rootProperty : 'items',
        		success : function(response, opts) {
        			
        			//console.info(response.responseText);
        			// JSON Object로 변경
        			jsonData = Ext.util.JSON.decode( response.responseText );
        			store.setData(jsonData.data);
        			console.info(jsonData.data);
        			//store.loadData(jsonData.data);
        			//for(var i = 0; i < jsonData.data.length; i++){
        				//arrData.push({name: jsonData.data[i].name});
        			//}
        			//store.setData(arrData);
        			//console.info(store.data.length);
        			//store.load();
        			
        		},
        		failure: function(form, action) {
        			alert(form.responseText);
        			alert("오류가 발생하였습니다.");
        		}
        	});
			
		}
    }
});