Ext.define('KRF_DEV.store.south.SearchResultGrid_F_2', {
    extend : 'Ext.data.Store',
    //extend : 'Ext.data.BufferedStore', 
    
    fields: [
        'FACI_CD',
        'FACI_NM',
        'WORK_DT_VAL',
        'WORK_DT_GRAPH',
        {name: 'DISCHARGE_NUM', type: 'number'},
        'DISCHARGE_AMT_PHYS_VAL',
        'DISCHARGE_AMT_BIO_VAL',
        'DISCHARGE_AMT_HIGHTEC_VAL',
        'BOD_VAL',
        'COD_VAL',
        'SS_VAL',
        'TN_VAL',
        'TP_VAL',
        'COLI_VAL',
        'DISCHARGE_DISINFECT',
        'DISCHARGE_FACI_NM'
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
			var startYear = startMonth = endYear = endMonth = "";
			
			startYear = Ext.getCmp("cmbStartYear").value;
			startMonth = Ext.getCmp("cmbStartMonth").value;
			endYear = Ext.getCmp("cmbEndYear").value;
			endMonth = Ext.getCmp("cmbEndMonth").value;
			var firstSearch =  KRF_DEV.getApplication().btnFlag;
			
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
			
			if(firstSearch == "noDate"){
				Ext.Ajax.request({
	        		url: './resources/jsp/GetSearchResultData_F_2.jsp',
	        		params: { WS_CD: WS_CD, AM_CD: AM_CD, AS_CD: AS_CD
	        			, startYear: startYear, startMonth: startMonth, endYear: endYear, endMonth: endMonth
	        			, ADM_CD: ADM_CD, siteIds: store.siteIds, firstSearch: firstSearch},
	        		async: false, // 비동기 = async: true, 동기 = async: false
	        		//rootProperty : 'items',
	        		success : function(response, opts) {
	        			jsonData = Ext.util.JSON.decode( response.responseText );

	        			if(jsonData.data.length > 0){
	        				
		        			if(jsonData.data[0].msg == undefined || jsonData.data[0].msg == ""){
		        				
		        				var dateSplit = jsonData.data[0].WORK_DT_VAL;
		        				if(dateSplit == null){
		        					me.gridCtl.addCls("dj-mask-noneimg");
		        					me.gridCtl.mask("해당기간에 데이터가 존재하지 않습니다. <br> 다른기간으로 검색해 보세요.", "noData");
		        					return;
		        				}
		        				
		        				var afterVal = dateSplit.split("-");
		        				
		        				
		        				startYear = afterVal[0];
		        				if(afterVal[1] == "1" || afterVal[1] == "01"){
		        					startMonth = "12";
		        					startYear = startYear-1;
		        				}else{
		        					startMonth = afterVal[1]-1;
		        				}
		        				
		        				if(startMonth < 10){
		        					startMonth = "0"+startMonth;
		        				}
		        				
		        				endYear = afterVal[0];
		        				endMonth = afterVal[1];
		        			}
	        			}
	        		},
	        		failure: function(form, action) {
	        			console.info("error");
	        		}
	        	});
				
				//return;
				firstSearch = "date";
				Ext.getCmp("cmbStartYear").setValue(startYear); 
				Ext.getCmp("cmbStartMonth").setValue(startMonth);
				Ext.getCmp("cmbEndYear").setValue(endYear);
				Ext.getCmp("cmbEndMonth").setValue(endMonth);
			}
			
			Ext.Ajax.request({
        		url: './resources/jsp/GetSearchResultData_F_2.jsp',
        		params: { WS_CD: WS_CD, AM_CD: AM_CD, AS_CD: AS_CD
        			, startYear: startYear, startMonth: startMonth, endYear: endYear, endMonth: endMonth
        			, ADM_CD: ADM_CD, siteIds: store.siteIds, firstSearch: firstSearch},
        		async: false, // 비동기 = async: true, 동기 = async: false
        		//rootProperty : 'items',
        		success : function(response, opts) {
        			store.startYear = startYear;
        			store.startMonth = startMonth;
        			store.endYear = endYear;
        			store.endMonth = endMonth;
        			store.gubunNm = "직접이송량";
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
	        					startYear = "2013";
	        					startMonth = "01";
	        					endYear = "2013";
	        					endMonth = "12";
	        					
	        					store.startYear = startYear;
	                			store.startMonth = startMonth;
	                			store.endYear = endYear;
	                			store.endMonth = endMonth;
	        					
	        					Ext.getCmp("cmbStartYear").setValue("2013"); 
	        					Ext.getCmp("cmbStartMonth").setValue("01");
	        					Ext.getCmp("cmbEndYear").setValue("2013");
	        					Ext.getCmp("cmbEndMonth").setValue("12");
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