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
    

    autoLoad: true,
	remoteSort: true,
	arrMax: [],
	
	siteCD: '',
	
	//constructor: function() {
	listeners: {
		load: function(store) { 
			//var siteCd= Ext.getCmp("siteCd");
			
			//
			
			var selectYear = Ext.getCmp("selectYear");
			var selectMonth = Ext.getCmp("selectMonth");
			
			var selectYear2 = Ext.getCmp("selectYear2");
			var selectMonth2 = Ext.getCmp("selectMonth2");
			
			var defaultChart = "";
			
			console.info(selectYear);
			var recordYear = "";
			if( selectYear == undefined){
				defaultChart = '1';
				recordYear = '2014'
			}else{
				defaultChart = '0';
				recordYear = selectYear.lastValue;
			}
			console.info(defaultChart);
			
			var recordYear2 = "";
			if(selectYear2 == undefined){
				//defaultChart = '0';
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
			
			//console.info(recordId);
			
			var jsonData = "";
			
			Ext.Ajax.request({
        		url: './resources/jsp/GetRWMDT1.jsp',    // To Which url you wanna POST.
        		params: {recordId: recordId
        			, recordYear: recordYear
        			, recordYear2: recordYear2
        			, recordMonth: recordMonth
        			, recordMonth2: recordMonth2
        			, defaultChart: defaultChart
        			},
        		async: false, // 비동기 = async: true, 동기 = async: false
        		success : function(response, opts) {
        			
        			//console.info(response.responseText);
        			// JSON Object로 변경
        			jsonData = Ext.util.JSON.decode( response.responseText );
        			//console.info(jsonData.data);
        			store.setData(jsonData.data);
        			var chart = Ext.getCmp("siteCharttest");
        			console.info(chart);
        			//chart.setupGrid();
        			//chart.draw();
        			store.arrMax = jsonData.maxdata;
        			//console.info(store.data);
        			//store.data = jsonData.data;
        			//store.load();
        			
        		},
        		failure: function(form, action) {
        			//alert(form.responseText);
        			alert("오류가 발생하였습니다.");
        		}
        	});
		}
    }
    
	
});