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
			'CHART_MXWL',
			'CHART_MNWL'
    ],
    
    siteId: '',
    
    autoLoad: true,
    
    buffered: true,
    pageSize: 100,

	remoteSort: true,
	
	siteIds: "",
	parentIds: [],
	gridCtl: null,
	orgParentIds: "",
	
	listeners: {
		load: function(store) {
			
			var me = this;
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
										'CURR_RF'
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
										'CURR_INF',
										'CURR_OTF',
										'CURR_SFW',
										'CURR_ECPC'
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
										'CURR_WS',
										'CURR_TA',
										'CURR_HM',
										'CURR_PA',
										'CURR_PS',
										'CURR_RNYN',
										'CURR_RN1HR',
										'CURR_RNDAY'
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
										'CURR_TA',
										'CURR_SIDAY'
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
										'CURR_OWL',
										'CURR_SFW',
										'CURR_ECPC',
										'CURR_INF',
										'CURR_TOTOTF',
										'CURR_EGOTF',
										'CURR_GTOTF',
										'CURR_CBOTF',
										'CURR_FWOTF',
										'CURR_ETCOTF'
				                       ]
			}
			
			
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
        		url: requestUrl,
        		params: { WS_CD: WS_CD, AM_CD: AM_CD, AS_CD: AS_CD
        			, startYear: startYear, startMonth: startMonth, endYear: endYear, endMonth: endMonth
        			, ADM_CD: ADM_CD, siteIds: store.siteIds},
        		async: true, // 비동기 = async: true, 동기 = async: false
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