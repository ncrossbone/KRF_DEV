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
			var siteCd= Ext.getCmp("siteCd");
			
			//
			
			var selectYear = Ext.getCmp("selectYear");
			
			//selectYear.lastMutatedValue
			console.info(Ext.getCmp("selectYear"));
			var recordYear = "";
			if(selectYear.lastMutatedValue == ""){
				recordYear = '2015'
			}else{
				recordYear = selectYear.lastMutatedValue;
			}
			var recordId = "";
			if(store.siteCD == "")
				recordId = siteCd.params;
			else
				recordId = store.siteCD;
			
			//console.info(recordId);
			
			var jsonData = "";
			
			Ext.Ajax.request({
        		url: './resources/jsp/GetRWMDT1.jsp',    // To Which url you wanna POST.
        		params: {recordId: recordId, recordYear: recordYear},
        		async: false, // 비동기 = async: true, 동기 = async: false
        		success : function(response, opts) {
        			
        			//console.info(response.responseText);
        			// JSON Object로 변경
        			jsonData = Ext.util.JSON.decode( response.responseText );
        			store.setData(jsonData.data);
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