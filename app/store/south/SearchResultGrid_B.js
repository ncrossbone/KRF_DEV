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
	
	isFirst: true,
	
	listeners: {
		load: function(store) {
			
			var me = this;
			console.info(me.isFirst);
			var firstSearch =  KRF_DEV.getApplication().btnFlag;
			
			if(me.isFirst == true){
				Ext.defer(function(){
					
					var cmbStartYear = Ext.getCmp("cmbStartYear");
					var cmbStartMonth = Ext.getCmp("cmbStartMonth");
					var cmbEndYear = Ext.getCmp("cmbEndYear");
					var cmbEndMonth = Ext.getCmp("cmbEndMonth");
						
						var stDate = new Date();
						var edDate = new Date();
						stDate.setMonth(stDate.getMonth() - 3);
						console.info(stDate.getMonth());
						console.info(edDate.getMonth());
						cmbStartYear.setValue(stDate.getFullYear());
						cmbStartMonth.setValue(me.addZero(stDate.getMonth() + 1,2));
						
						cmbEndYear.setValue(edDate.getFullYear());
						cmbEndMonth.setValue(me.addZero(edDate.getMonth() + 1,2));
				}, 1000);
			}
			
			var startYear = startMonth = endYear = endMonth = "";
			
			startYear = Ext.getCmp("cmbStartYear").value;
			startMonth = Ext.getCmp("cmbStartMonth").value;
			endYear = Ext.getCmp("cmbEndYear").value;
			endMonth = Ext.getCmp("cmbEndMonth").value;
			
			console.info(startYear);
			console.info(startMonth);
			console.info(endYear);
			console.info(endMonth);
			
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
    },
    addZero: function(n, width) {
		n = n + '';
		return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
	}
});