Ext.define('KRF_DEV.store.south.SearchResultGrid_F_2', {
    extend : 'Ext.data.Store',
    //extend : 'Ext.data.BufferedStore', 
    
    fields: [
        'FACI_CD',
        'FACI_NM',
        'WORK_DT_VAL',
        'WORK_DT_GRAPH',
        {name: 'DISCHARGE_NUM', type: 'number'},
        {name: 'DISCHARGE_AMT_PHYS_VAL', type: 'number'},
        'DISCHARGE_AMT_PHYS_GRAPH',
        {name: 'DISCHARGE_AMT_BIO_VAL', type: 'number'},
        'DISCHARGE_AMT_BIO_GRAPH',
        {name: 'DISCHARGE_AMT_HIGHTEC_VAL', type: 'number'},
        'DISCHARGE_AMT_HIGHTEC_GRAPH',
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
        'COLI_GRAPH',
        'DISCHARGE_DISINFECT',
        'DISCHARGE_FACI_NM'
    ],
    
    siteId: '',
    
    autoLoad: true,

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
			Ext.Ajax.request({
        		url: './resources/jsp/GetSearchResultData_F_2.jsp',
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