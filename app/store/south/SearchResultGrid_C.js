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
			'ITEM_DOW_VAL',
			'ITEM_TEMP_VAL',
			'ITEM_DO_VAL',
			'ITEM_PH_VAL',
			'ITEM_EC_VAL',
			'ITEM_FSD_VAL',
			'ITEM_FST_VAL',
			'ITEM_FCL_VAL',
			'ITEM_WTC_VAL',
			'ITEM_PCA_VAL',
			'ITEM_COD_VAL',
			'ITEM_TOC_VAL',
			'ITEM_TN_VAL',
			'ITEM_TP_VAL',
			'ITEM_SRP_VAL',
			'ITEM_PB_VAL',
			'ITEM_ZN_VAL',
			'ITEM_CU_VAL',
			'ITEM_CR_VAL',
			'ITEM_NI_VAL',
			'ITEM_AS_VAL',
			'ITEM_CD_VAL',
			'ITEM_HG_VAL',
			'ITEM_AL_VAL',
			'ITEM_LI_VAL'
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
			
			var jsonData = "";
			var arrData = [];
			
			// 로딩바 표시
			var winCtl = Ext.getCmp("searchResultWindow");
			var tabContainer = winCtl.items.items[0];
			var tabCtl = tabContainer.items.items[1];
			var activeTab = tabCtl.getActiveTab();
			activeTab.mask("loading", "loading...");
			
			Ext.Ajax.request({
        		url: './resources/jsp/GetSearchResultData_C.jsp',
        		params: { WS_CD: WS_CD, AM_CD: AM_CD, AS_CD: AS_CD
        			, startYear: startYear, startMonth: startMonth, endYear: endYear, endMonth: endMonth
        			, ADM_CD: ADM_CD, siteIds: store.siteIds, firstSearch:firstSearch},
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