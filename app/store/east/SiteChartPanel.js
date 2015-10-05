Ext.define('KRF_DEV.store.east.SiteChartPanel', {
    extend  : 'Ext.data.Store',
    
    fields: [
        'month',
        {name: 'data1', type: 'float'}
    ],
    

    autoLoad: true,
	remoteSort: true,
	
	siteCD: '',
	
	//constructor: function() {
	listeners: {
		load: function(store) { 
			var siteCd= Ext.getCmp("siteCd");
			var recordId = "";
			if(store.siteCD == "")
				recordId = siteCd.params;
			else
				recordId = store.siteCD;
			
			//console.info(recordId);
			
			var jsonData = "";
			
			Ext.Ajax.request({
        		url: './resources/jsp/GetRWMDT1.jsp',    // To Which url you wanna POST.
        		params: {recordId: recordId},
        		async: false, // 비동기 = async: true, 동기 = async: false
        		success : function(response, opts) {
        			
        			// JSON Object로 변경
        			jsonData = Ext.util.JSON.decode( response.responseText );
        			//console.info(response.responseText);
        			store.setData(jsonData.data);
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