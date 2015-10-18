Ext.define('KRF_DEV.store.south.SearchResultGrid_C', {
    extend : 'Ext.data.Store',
    //extend : 'Ext.data.BufferedStore', 
    //  {name:  type: 'number'},
    fields: [
			'PT_NO',
			'PT_NM',
			'WMYR',
			'WMOM',
			'WMCYMD_VAL',
			'WMCYMD_GRAPH',
			'MCNT',
			'JOSANAME',
			{name: 'ITEM_DOW_VAL', type: 'number'},
			'ITEM_DOW_GRAPH',
			{name: 'ITEM_TEMP_VAL', type: 'number'},			
			'ITEM_TEMP_GRAPH',
			{name: 'ITEM_DO_VAL', type: 'number'},			
			'ITEM_DO_GRAPH',
			{name: 'ITEM_PH_VAL', type: 'number'},			
			'ITEM_PH_GRAPH',
			{name: 'ITEM_EC_VAL', type: 'number'},			
			'ITEM_EC_GRAPH',
			{name: 'ITEM_FSD_VAL', type: 'number'},			
			'ITEM_FSD_GRAPH',
			{name: 'ITEM_FST_VAL', type: 'number'},			
			'ITEM_FST_GRAPH',
			{name: 'ITEM_FCL_VAL', type: 'number'},			
			'ITEM_FCL_GRAPH',
			{name: 'ITEM_WTC_VAL', type: 'number'},			
			'ITEM_WTC_GRAPH',
			{name: 'ITEM_PCA_VAL', type: 'number'},			
			'ITEM_PCA_GRAPH',
			{name: 'ITEM_COD_VAL', type: 'number'},			
			'ITEM_COD_GRAPH',
			{name: 'ITEM_TOC_VAL', type: 'number'},			
			'ITEM_TOC_GRAPH',
			{name: 'ITEM_TN_VAL', type: 'number'},			
			'ITEM_TN_GRAPH',
			{name: 'ITEM_TP_VAL', type: 'number'},			
			'ITEM_TP_GRAPH',
			{name: 'ITEM_SRP_VAL', type: 'number'},			
			'ITEM_SRP_GRAPH',
			{name: 'ITEM_PB_VAL', type: 'number'},			
			'ITEM_PB_GRAPH',
			{name: 'ITEM_ZN_VAL', type: 'number'},			
			'ITEM_ZN_GRAPH',
			{name: 'ITEM_CU_VAL', type: 'number'},			
			'ITEM_CU_GRAPH',
			{name: 'ITEM_CR_VAL', type: 'number'},			
			'ITEM_CR_GRAPH',
			{name: 'ITEM_NI_VAL', type: 'number'},			
			'ITEM_NI_GRAPH',
			{name: 'ITEM_AS_VAL', type: 'number'},			
			'ITEM_AS_GRAPH',
			{name: 'ITEM_CD_VAL', type: 'number'},			
			'ITEM_CD_GRAPH',
			{name: 'ITEM_HG_VAL', type: 'number'},			
			'ITEM_HG_GRAPH',
			{name: 'ITEM_AL_VAL', type: 'number'},			
			'ITEM_AL_GRAPH',
			{name: 'ITEM_LI_VAL', type: 'number'},			
			'ITEM_LI_GRAPH'
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
			
			var jsonData = "";
			var arrData = [];
			//console.info(store.parentIds);
			Ext.Ajax.request({
        		url: './resources/jsp/GetSearchResultData_C.jsp',
        		params: { WS_CD: WS_CD, AM_CD: AM_CD, AS_CD: AS_CD
        			, startYear: startYear, startMonth: startMonth, endYear: endYear, endMonth: endMonth
        			, ADM_CD: ADM_CD, siteIds: store.siteIds},
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