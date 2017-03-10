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
			/*'ITEM_TEMP_VAL',
			'ITEM_DO_VAL',
			'ITEM_PH_VAL',
			'ITEM_EC_VAL',*/
			
			'ITEM_DOW_SURF_VAL',
			'ITEM_TEMP_SURF_VAL',
			'ITEM_DO_SURF_VAL',
			'ITEM_PH_SURF_VAL',
			'ITEM_EC_SURF_VAL',
			'ITEM_DOW_LOW_VAL',
			'ITEM_TEMP_LOW_VAL',
			'ITEM_DO_LOW_VAL',
			'ITEM_PH_LOW_VAL',
			'ITEM_EC_LOW_VAL',
			'ITEM_TRANSPARENCY_VAL',
			
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
	gridCtl: null,
	
	listeners: {
		load: function(store) {
			
			var me = this;
			
			var firstSearch =  KRF_DEV.getApplication().btnFlag;
			
			var startYear = startMonth = endYear = endMonth = "";
			
			startYear = Ext.getCmp("cmbStartYear").value;
			startMonth = Ext.getCmp("cmbStartMonth").value;
			endYear = Ext.getCmp("cmbEndYear").value;
			endMonth = Ext.getCmp("cmbEndMonth").value;
			
			var jsonData = "";
			var arrData = [];
			
			var winCtl = Ext.getCmp("searchResultWindow");
			var tabContainer = winCtl.items.items[0];
			var tabCtl = tabContainer.items.items[1];
			var activeTab = tabCtl.getActiveTab();
			
			// 로딩중 메세지
			if(me.gridCtl != null){
				
				me.gridCtl.removeCls("dj-mask-noneimg");
				me.gridCtl.addCls("dj-mask-withimg");
				me.gridCtl.mask("loading", "loading...");
			}
			
			Ext.Ajax.request({
        		url: './resources/jsp/GetSearchResultData_C.jsp',
        		params: { WS_CD: WS_CD, AM_CD: AM_CD, AS_CD: AS_CD
        			, startYear: startYear, startMonth: startMonth, endYear: endYear, endMonth: endMonth
        			, ADM_CD: ADM_CD, siteIds: store.siteIds, firstSearch:firstSearch},
        		async: true, // 비동기 = async: true, 동기 = async: false
        		//rootProperty : 'items',
        		success : function(response, opts) {
        			
        			jsonData = Ext.util.JSON.decode( response.responseText );

        			if(jsonData.data.length > 0){
        				
	        			if(jsonData.data[0].msg == undefined || jsonData.data[0].msg == ""){
	        				
	        				store.setData(jsonData.data);
		        			
	        				// 로딩바 숨김
	        				if(me.gridCtl != null){
	        					
	        					me.gridCtl.unmask();
	        				}
	        			}
	        			else{
	        				
	        				if(me.gridCtl != null){
	        					
	        					me.gridCtl.addCls("dj-mask-noneimg");
	        					me.gridCtl.mask("해당기간에 데이터가 존재하지 않습니다. <br> 다른기간으로 검색해 보세요.", "noData");
	        				}
	        			}
        			}
        			else{
        				
        				if(me.gridCtl != null){
        					
        					me.gridCtl.addCls("dj-mask-noneimg");
        					me.gridCtl.mask("해당기간에 데이터가 존재하지 않습니다. <br> 다른기간으로 검색해 보세요.", "noData");
        				}
        			}
        		},
        		failure: function(form, action) {
        			
        			if(me.gridCtl != null){
    					
    					me.gridCtl.addCls("dj-mask-noneimg");
    					me.gridCtl.mask("오류가 발생하였습니다.");
    				}
        		}
        	});
			
		}
    }
});