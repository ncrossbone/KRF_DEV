Ext.define('KRF_DEV.store.south.SearchResultGrid_I', {
    extend : 'Ext.data.Store',
    //extend : 'Ext.data.BufferedStore', 
    
    fields: [
        'PT_NO',
        {name: 'PT_NM', type: 'string'}
    ],
    
    siteId: '',
    
    autoLoad: true,
    
    //buffered: true, // 버퍼드 스토어 지정
    pageSize: 100,

	//remoteSort: true,
	
	siteIds: "",
	parentIds: [],
	gridCtl: null,
	
	listeners: {
		load: function(store) {
			
			var me = this;
			
			var firstSearch =  KRF_DEV.getApplication().btnFlag;
			
			
			var startYear = startMonth = endYear = endMonth = "";
			
			var sYearCtl = Ext.getCmp("cmbStartYear");
			if(sYearCtl != undefined)
				startYear = Ext.getCmp("cmbStartYear").value;
			var sMonthCtl = Ext.getCmp("cmbStartMonth");
			if(sMonthCtl != undefined)
				startMonth = Ext.getCmp("cmbStartMonth").value;
			var eYearCtl = Ext.getCmp("cmbEndYear");
			if(eYearCtl != undefined)
				endYear = Ext.getCmp("cmbEndYear").value;
			var eMonthCtl = Ext.getCmp("cmbEndMonth");
			if(eMonthCtl != undefined)
				endMonth = Ext.getCmp("cmbEndMonth").value;
			
			var jsonData = "";
			var arrData = [];
			
			// 로딩바 표시
			//Ext.getCmp("searchResultWindow").mask("loading", "loading...");
			//Ext.getBody().mask("loading", "loading...");
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
	        		url: _API.GetSearchResultData_I, //'./resources/jsp/GetSearchResultData.jsp',
	        		params: {startYear: startYear, startMonth: startMonth, endYear: endYear, endMonth: endMonth
	        			, ADM_CD: ADM_CD, siteIds: store.siteIds, firstSearch: firstSearch},
	        		async: false, // 비동기 = async: true, 동기 = async: false
	        		//rootProperty : 'items',
	        		success : function(response, opts) {
	        			
	        			// JSON Object로 변경
	        			jsonData = Ext.util.JSON.decode( response.responseText );
	        			
	        			if(jsonData.data.length > 0){
	        				
		        			if(jsonData.data[0].msg == undefined || jsonData.data[0].msg == ""){
		        				
		        				
		        				var dateSplit = jsonData.data[0].WMCYMD;
		        				
		        				if(dateSplit == null){
		        					me.gridCtl.addCls("dj-mask-noneimg");
		        					me.gridCtl.mask("해당기간에 데이터가 존재하지 않습니다. <br> 다른기간으로 검색해 보세요.", "noData");
		        					return;
		        				}
		        				
		        				var afterVal = dateSplit.split(".");
		        				
		        				
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
        		url: _API.GetSearchResultData_I, //'./resources/jsp/GetSearchResultData.jsp',
        		params: { WS_CD: WS_CD, AM_CD: AM_CD, AS_CD: AS_CD
        			, startYear: startYear, startMonth: startMonth, endYear: endYear, endMonth: endMonth
        			, ADM_CD: ADM_CD, siteIds: store.siteIds, firstSearch: firstSearch},
        		async: true, // 비동기 = async: true, 동기 = async: false
        		//rootProperty : 'items',
        		success : function(response, opts) {
        			store.startYear = startYear;
        			store.startMonth = startMonth;
        			store.endYear = endYear;
        			store.endMonth = endMonth;
        			// JSON Object로 변경
        			jsonData = Ext.util.JSON.decode( response.responseText );
        			//console.info(jsonData.data);
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
			
			//store.setData(jsonData.items);
			//store.data.items.add(jsonData.data);
			//store.data.items = jsonData.items;
			////console.info(store.data);
		}
    }
});