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
        'CURR_BOD',
        'CURR_COD',
        'CURR_SS',
        'CURR_TN',
        'CURR_TP',
        'CURR_PH',
        'CURR_FLW',
        'CURR_TOC',
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
			Ext.getCmp("searchResultContainer_B_Id").removeCls("dj-mask-noneimg");
			Ext.getCmp("searchResultContainer_B_Id").addCls("dj-mask-withimg");
			Ext.getCmp("searchResultContainer_B_Id").mask("loading", "loading...");
			
			Ext.Ajax.request({
        		url: './resources/jsp/GetSearchResultData_B.jsp',
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
        				Ext.getCmp("searchResultContainer_B_Id").unmask();
        			}
        			else{
        				Ext.getCmp("searchResultContainer_B_Id").addCls("dj-mask-noneimg");
        				Ext.getCmp("searchResultContainer_B_Id").mask("해당기간에 데이터가 존재하지 않습니다. <br> 다른기간으로 검색해 보세요.", "noData");
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