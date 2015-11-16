Ext.define('KRF_DEV.store.south.SearchResultGrid', {
    extend : 'Ext.data.Store',
    //extend : 'Ext.data.BufferedStore', 
    
    fields: [
        'PT_NO',
        {name: 'PT_NM', type: 'string'},
        'WMYR',
        'WMOD',
        'WMCYMD',
        'WMDEP',
        {name: 'CURR_BOD', type: 'number'},
        'CHART_BOD',
        {name: 'CURR_DO', type: 'number'},
        'CHART_DO',
        {name: 'CURR_COD', type: 'number'},
        'CHART_COD',
        {name: 'CURR_TN', type: 'number'},
        'CHART_TN',
        {name: 'CURR_TP', type: 'number'},
        'CHART_TP',
        {name: 'CURR_TEMP', type: 'number'},
        'CHART_TEMP',
        {name: 'CURR_PH', type: 'number'},
        'CHART_PH',
        {name: 'CURR_SS', type: 'number'},
        'CHART_SS',
        {name: 'CURR_CLOA', type: 'number'},
        'CHART_CLOA',
        {name: 'CURR_TOC', type: 'number'},
        'CHART_TOC',
        'CHART_TOC',
        'CHART_AMNT',
        'CHART_DTN',
        'CHART_NO3N',
        'CHART_NH3N',
        'CHART_DTP',
        'CHART_POP',
        'CHART_TRANS',
        'CHART_ALGOL',
        'CHART_TCOLI',
        'CHART_ECOLI',
        'CHART_ANTIMON',
        'CHART_PHENOL',
        'CHART_COL',
        'CHART_NHEX',
        'CHART_MN',
        'CHART_FE',
        'CHART_CD',
        'CHART_CN',
        'CHART_PB',
        'CHART_CR6',
        'CHART_CR',
        'CHART_AS',
        'CHART_HG',
        'CHART_CU',
        'CHART_ZN',
        'CHART_FL',
        'CHART_ABS',
        'CHART_CL',
        'CHART_TCE',
        'CHART_PCE',
        'CHART_CCL4',
        'CHART_DCETH',
        'CHART_DCM',
        'CHART_BENZENE',
        'CHART_CHCL3',
        'CHART_OP',
        'CHART_PCB',
        'CHART_DEHP',
        'CHART_HCHO',
        'CHART_HCB',
        {name:'CURR_AMNT',type:'number'},
        {name:'CURR_DTN',type:'number'},
        {name:'CURR_NO3N',type:'number'},
        {name:'CURR_NH3N',type:'number'},
        {name:'CURR_DTP',type:'number'},
        {name:'CURR_POP',type:'number'},
        {name:'CURR_TRANS',type:'number'},
        {name:'CURR_ALGOL',type:'number'},
        {name:'CURR_TCOLI',type:'number'},
        {name:'CURR_ECOLI',type:'number'},
        {name:'CURR_ANTIMON',type:'number'},
        {name:'CURR_PHENOL',type:'number'},
        {name:'CURR_COL',type:'number'},
        {name:'CURR_NHEX',type:'number'},
        {name:'CURR_MN',type:'number'},
        {name:'CURR_FE',type:'number'},
        {name:'CURR_CD',type:'number'},
        {name:'CURR_CN',type:'number'},
        {name:'CURR_PB',type:'number'},
        {name:'CURR_CR6',type:'number'},
        {name:'CURR_CR',type:'number'},
        {name:'CURR_AS',type:'number'},
        {name:'CURR_HG',type:'number'},
        {name:'CURR_CU',type:'number'},
        {name:'CURR_ZN',type:'number'},
        {name:'CURR_FL',type:'number'},
        {name:'CURR_ABS',type:'number'},
        {name:'CURR_CL',type:'number'},
        {name:'CURR_TCE',type:'number'},
        {name:'CURR_PCE',type:'number'},
        {name:'CURR_CCL4',type:'number'},
        {name:'CURR_DCETH',type:'number'},
        {name:'CURR_DCM',type:'number'},
        {name:'CURR_BENZENE',type:'number'},
        {name:'CURR_CHCL3',type:'number'},
        {name:'CURR_OP',type:'number'},
        {name:'CURR_PCB',type:'number'},
        {name:'CURR_DEHP',type:'number'},
        {name:'CURR_HCHO',type:'number'},
        {name:'CURR_HCB',type:'number'}
    ],
    
    siteId: '',
    
    autoLoad: true,
    
    //buffered: true, // 버퍼드 스토어 지정
    pageSize: 100,

	//remoteSort: true,
	
	siteIds: "",
	parentIds: [],
	
	listeners: {
		load: function(store, a, b, c, d, e) {
			
			var firstSearch =  KRF_DEV.getApplication().btnFlag;
			console.info(firstSearch);
			
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
			//console.info(store.parentIds);
			//var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"Please wait..."});
			//myMask.show();
			
			console.info(store);
			console.info(a);
			console.info(b);
			console.info(c);
			console.info(d);
			console.info(e);
			
			// 로딩바 표시
			//Ext.getCmp("searchResultWindow").mask("loading", "loading...");
			//Ext.getBody().mask("loading", "loading...");
			var winCtl = Ext.getCmp("searchResultWindow");
			var tabContainer = winCtl.items.items[0];
			var tabCtl = tabContainer.items.items[1];
			var activeTab = tabCtl.getActiveTab();
			activeTab.mask("loading", "loading...");
			
			Ext.Ajax.request({
        		url: './resources/jsp/GetSearchResultData.jsp',
        		params: { WS_CD: WS_CD, AM_CD: AM_CD, AS_CD: AS_CD
        			, startYear: startYear, startMonth: startMonth, endYear: endYear, endMonth: endMonth
        			, ADM_CD: ADM_CD, siteIds: store.siteIds, firstSearch: firstSearch},
        		async: true, // 비동기 = async: true, 동기 = async: false
        		//rootProperty : 'items',
        		success : function(response, opts) {
        			
        			//console.info(response.responseText);
        			// JSON Object로 변경
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
        			//Ext.getCmp("searchResultWindow").unmask();
        			console.info(form);
        			activeTab.unmask();
        			alert("오류가 발생하였습니다.");
        		}
        	});
			
			//store.setData(jsonData.items);
			//store.data.items.add(jsonData.data);
			//store.data.items = jsonData.items;
			//console.info(store.data);
		}
    }
});