Ext.define('KRF_DEV.store.east.SiteInfoPanel', {
    extend  : 'Ext.data.Store',
    
    fields: [
        'column',
        'cont'
    ],
    

    //autoLoad: true,
	remoteSort: true,
	
	siteCD: '',
	
	//constructor: function() {
	listeners: {
		load: function(store) {
			
			var recordId = "";
			if(store.siteCD != undefined && store.siteCD != "")
				recordId = store.siteCD;
			
			var jsonData = "";
			
			// 로딩바 표시
			Ext.getCmp("siteinfotest").mask("loading", "loading...");
			
			Ext.Ajax.request({
        		url: _API.GetRWMDT, //'./resources/jsp/GetRWMDT.jsp',    // To Which url you wanna POST.
        		//params: { siteCodes: siteCodes, measureDate: measureDate, layerDate: layerDate },
        		params: {recordId: recordId},
        		async: true, // 비동기 = async: true, 동기 = async: false
        		success : function(response, opts) {
        			
        			// JSON Object로 변경
        			jsonData = Ext.util.JSON.decode( response.responseText );
        			store.setData(jsonData.data);
        			
        			// 로딩바 숨김
        			Ext.getCmp("siteinfotest").unmask();
        			
        		},
        		failure: function(form, action) {
        			// 로딩바 숨김
        			Ext.getCmp("siteinfotest").unmask();
        			
        			//alert(form.responseText);
        			alert("오류가 발생하였습니다.");
        		}
        	});
		}
    }
});