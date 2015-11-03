Ext.define('KRF_DEV.store.east.SiteChartPanel', {
    extend  : 'Ext.data.Store',
    
    fields: [
        'month',
        {name: 'ITEM_BOD', type: 'float'},
        {name: 'ITEM_DOC', type: 'float'},
        {name: 'ITEM_COD', type: 'float'},
        {name: 'ITEM_TN', type: 'float'},
        {name: 'ITEM_TP', type: 'float'},
        {name: 'ITEM_TEMP', type: 'float'},
        {name: 'ITEM_PH', type: 'float'},
        {name: 'ITEM_SS', type: 'float'},
        {name: 'ITEM_CLOA', type: 'float'},
        'ptNm',
        'year',
        'yearMonth'
    ],
    

    //autoLoad: true,
	remoteSort: true,
	arrMax: [],
	parentId: '',
	
	siteCD: '',
	
	//constructor: function() {
	listeners: {
		load: function(store) { 
			//var siteCd= Ext.getCmp("siteCd");
			var defaultChart = KRF_DEV.getApplication().chartFlag;
			var f_Chart = Ext.getCmp("f_Chart");
			var d_Chart = KRF_DEV.getApplication().chartFlag_D;
			if(d_Chart != undefined){
				var org_D_firstID = d_Chart.substring(0,1);
			}
			
			
			
			//console.info(KRF_DEV.getApplication().chartFlag_D);
			
			var f_parentId = "";
			
			if(store.parentId == "F" ){
				if(f_Chart == undefined || f_Chart.lastValue == "방류유량"){
					f_parentId = "F_1";
				}else if(f_Chart.lastValue == "1"){
					f_parentId = "F_1";
				}else if(f_Chart.lastValue == "2"){
					f_parentId = "F_2";
				}else if(f_Chart.lastValue == "3"){
					f_parentId = "F_3";
				}else if(f_Chart.lastValue == "4"){
					f_parentId = "F_4";
				}
			}else if(store.parentId == "D"){
				store.parentId = d_Chart;
			}
			
			 if(store.parentId == "A"){
					store.config.fields = [
					                       'month',
					                       {name: 'ITEM_BOD', type: 'float'},
					                       {name: 'ITEM_DOC', type: 'float'},
					                       {name: 'ITEM_COD', type: 'float'},
					                       {name: 'ITEM_TN', type: 'float'},
					                       {name: 'ITEM_TP', type: 'float'},
					                       {name: 'ITEM_TEMP', type: 'float'},
					                       {name: 'ITEM_PH', type: 'float'},
					                       {name: 'ITEM_SS', type: 'float'},
					                       {name: 'ITEM_CLOA', type: 'float'},
					                       'ptNm',
					                       'year',
					                       'yearMonth'
					                       ];
			}else if(store.parentId == "B"){
				store.config.fields = [
				                       'PT_NO',
				                       'PT_NM',
				                       'WAST_NO',
				                       'WMCYMD',
				                       {name: 'ITEM_BOD', type: 'float'},
				                       {name: 'ITEM_COD', type: 'float'},
				                       {name: 'ITEM_SS', type: 'float'},
				                       {name: 'ITEM_TN', type: 'float'},
				                       {name: 'ITEM_TP', type: 'float'},
				                       {name: 'ITEM_PH', type: 'float'},
				                       {name: 'ITEM_FLW', type: 'float'},
				                       {name: 'ITEM_TOC', type: 'float'}
				                       ];
			}else if(store.parentId == "C"){
				store.config.fields = [
				                       'PT_NO',
				                       'PT_NM',
				                       'WMYR',
				                       'WMOM',
				                       'WMCYMD',
				                       'JOSANAME',
				                       {name: 'ITEM_DOW', type: 'float'},
				                       {name: 'ITEM_TEMP', type: 'float'},
				                       {name: 'ITEM_DO', type: 'float'},
				                       {name: 'ITEM_PH', type: 'float'},
				                       {name: 'ITEM_EC', type: 'float'},
				                       {name: 'ITEM_COD', type: 'float'},
				                       {name: 'ITEM_TOC', type: 'float'},
				                       {name: 'ITEM_TN', type: 'float'},
				                       {name: 'ITEM_TP', type: 'float'},
				                       'AMDCODE'
				                       ];
				}else if(store.parentId == "F"){
										
					if(f_parentId == "F_1"){
						store.config.fields = [
						                       'FACI_CD',
						                       'FACI_NM',
						                       'WORK_DT',
						                       'DISCHARGE_NUM',
						                       {name: 'AMT_PHYS', type: 'float'},
						                       {name: 'AMT_BIO', type: 'float'},
						                       {name: 'AMT_HIGHTEC', type: 'float'},
						                       {name: 'ITEM_BOD', type: 'float'},
						                       {name: 'ITEM_COD', type: 'float'},
						                       {name: 'ITEM_SS', type: 'float'},
						                       {name: 'ITEM_TN', type: 'float'},
						                       {name: 'ITEM_TP', type: 'float'},
						                       {name: 'ITEM_COLI', type: 'float'}
						                       ];
					}else if(f_parentId == "F_2" || f_parentId == "F_3"){
						store.config.fields = [
						                       'FACI_NM',
						                       'WORK_DT',
						                       {name: 'ITEM_AMT', type: 'float'},
						                       {name: 'ITEM_BOD', type: 'float'},
						                       {name: 'ITEM_COD', type: 'float'},
						                       {name: 'ITEM_SS', type: 'float'},
						                       {name: 'ITEM_TN', type: 'float'},
						                       {name: 'ITEM_TP', type: 'float'},
						                       {name: 'ITEM_COLI', type: 'float'}
						                       ];
					}else if(f_parentId == "F_4"){
						store.config.fields = [
						                       'FACI_NM',
						                       'WORK_DT',
						                       {name: 'ITEM_AMT', type: 'float'},
						                       {name: 'ITEM_BOD', type: 'float'},
						                       {name: 'ITEM_COD', type: 'float'},
						                       {name: 'ITEM_SS', type: 'float'},
						                       {name: 'ITEM_TN', type: 'float'},
						                       {name: 'ITEM_TP', type: 'float'},
						                       {name: 'ITEM_COLI', type: 'float'},
						                       {name: 'ITEM_BYPASS_AMT', type: 'float'}
						                       ];
					}


				}else if(store.parentId == "D001"){
					store.config.fields = [
					                       'PT_NM',
					                       'WMCYMD',
					                       {name: 'WL', type: 'float'}
					                       ]
				}else if(store.parentId == "D002"){
					store.config.fields = [
					                       'PT_NM',
					                       'WMCYMD',
					                       {name: 'RF', type: 'float'}
					                       ]
				}else if(store.parentId == "D003"){
					store.config.fields = [
					                       'PT_NM',
					                       'WMCYMD',
					                       {name: 'FW', type: 'float'}
					                       ]
				}else if(store.parentId == "D004"){
					store.config.fields = [
					                       'PT_NM',
					                       'WMCYMD',
					                       {name: 'SWL', type: 'float'},
					                       {name: 'INF', type: 'float'},
					                       {name: 'OTF', type: 'float'},
					                       {name: 'SFW', type: 'float'},
					                       {name: 'ECPC', type: 'float'}
					                       ]
				}else if(store.parentId == "D005"){
					store.config.fields = [
					                       'PT_NM',
					                       'WMCYMD',
					                       {name: 'WD', type: 'float'},
					                       {name: 'WSL', type: 'float'},
					                       {name: 'TA', type: 'float'},
					                       {name: 'HM', type: 'float'},
					                       {name: 'PA', type: 'float'},
					                       {name: 'PS', type: 'float'},
					                       {name: 'RNYN', type: 'float'},
					                       {name: 'RN1HR', type: 'float'},
					                       {name: 'RNDAY', type: 'float'}
					                       ]
				}else if(store.parentId == "D006"){
					store.config.fields = [
					                       'PT_NM',
					                       'WMCYMD',
					                       {name: 'RND', type: 'float'},
					                       {name: 'TA', type: 'float'},
					                       {name: 'SIDAY', type: 'float'}
					                       ]
				}else if(store.parentId == "D007"){
					store.config.fields = [
					                       'PT_NM',
					                       'WMCYMD',
					                       {name: 'SWL', type: 'float'},
					                       {name: 'OWL', type: 'float'},
					                       {name: 'SFW', type: 'float'},
					                       {name: 'ECPC', type: 'float'},
					                       {name: 'INF', type: 'float'},
					                       {name: 'TOTOTF', type: 'float'},
					                       {name: 'EGOTF', type: 'float'},
					                       {name: 'CBOTF', type: 'float'},
					                       {name: 'FWOTF', type: 'float'},
					                       {name: 'ETOTF', type: 'float'}
					                       ]
				}
				
			 
			//
			
			var selectYear = Ext.getCmp("selectYear");
			var selectMonth = Ext.getCmp("selectMonth");
			
			var selectYear2 = Ext.getCmp("selectYear2");
			var selectMonth2 = Ext.getCmp("selectMonth2");
			
			var search_F = Ext.getCmp("");
			
			
			var recordYear = "";
			if( selectYear == undefined){
				recordYear = '2014'
			}else{
				recordYear = selectYear.lastValue;
			}
			
			
			var recordYear2 = "";
			if(selectYear2 == undefined){
				recordYear2 = '2015'
			}else{
				recordYear2 = selectYear2.lastValue;
			}
			
			var recordMonth = "";
			//console.info(selectMonth.value);
			if( selectMonth == undefined){
				recordMonth = '10'
			}else{
				recordMonth = selectMonth.value;
			}
			
			var recordMonth2 = "";
			if( selectMonth2 == undefined){
				recordMonth2 = '10'
			}else{
				recordMonth2 = selectMonth2.value;
			}
			
			//alert(recordYear +":::"+recordYear2);
			if(recordYear > recordYear2){
				alert("년도선택이 잘못되었습니다");
				return;
			}
			if(recordYear == recordYear2){
				if(recordMonth > recordMonth2){
					alert("월선택이 잘못되었습니다.");
					return;
					
				}
			}
			
			var recordId = "";
			if(store.siteCD != undefined && store.siteCD != "")
				recordId = store.siteCD;
			
			
			var jsonData = "";
			
			
			
			if(store.parentId == "A" || store.parentId == "B" || store.parentId == "C"){
			Ext.Ajax.request({
        		url: './resources/jsp/GetRWMDT_'+store.parentId+'.jsp',    // To Which url you wanna POST.
        		params: {recordId: recordId
        			, recordYear: recordYear
        			, recordYear2: recordYear2
        			, recordMonth: recordMonth
        			, recordMonth2: recordMonth2
        			, defaultChart: defaultChart
        			},
        		async: false, // 비동기 = async: true, 동기 = async: false
        		success : function(response, opts) {
        			
        			// JSON Object로 변경
        			jsonData = Ext.util.JSON.decode( response.responseText );
        			
        			store.loadData(jsonData.data);
        			store.arrMax = jsonData.maxdata;
        			
        		},
        		failure: function(form, action) {
        			//alert(form.responseText);
        			alert("오류가 발생하였습니다.");
        		}
        	});
			
			}else if(store.parentId == "F"){
				Ext.Ajax.request({
	        		url: './resources/jsp/GetRWMDT_'+f_parentId+'.jsp',    // To Which url you wanna POST.
	        		params: {recordId: recordId
	        			, recordYear: recordYear
	        			, recordYear2: recordYear2
	        			, recordMonth: recordMonth
	        			, recordMonth2: recordMonth2
	        			, defaultChart: defaultChart
	        			},
	        		async: false, // 비동기 = async: true, 동기 = async: false
	        		success : function(response, opts) {
	        			
	        			// JSON Object로 변경
	        			jsonData = Ext.util.JSON.decode( response.responseText );
	        			
	        			store.loadData(jsonData.data);
	        			store.arrMax = jsonData.maxdata;
	        			
	        		},
	        		failure: function(form, action) {
	        			//alert(form.responseText);
	        			alert("오류가 발생하였습니다.");
	        		}
	        	});
			}else if(org_D_firstID == "D"){
				Ext.Ajax.request({
	        		url: './resources/jsp/GetRWMDT_'+store.parentId+'.jsp',    // To Which url you wanna POST.
	        		params: {recordId: recordId
	        			, recordYear: recordYear
	        			, recordYear2: recordYear2
	        			, recordMonth: recordMonth
	        			, recordMonth2: recordMonth2
	        			, defaultChart: defaultChart
	        			},
	        		async: false, // 비동기 = async: true, 동기 = async: false
	        		success : function(response, opts) {
	        			
	        			// JSON Object로 변경
	        			jsonData = Ext.util.JSON.decode( response.responseText );
	        			
	        			store.loadData(jsonData.data);
	        			store.arrMax = jsonData.maxdata;
	        			
	        		},
	        		failure: function(form, action) {
	        			//alert(form.responseText);
	        			alert("오류가 발생하였습니다.");
	        		}
	        	});
			}
		}
    }
    
	
});