Ext.define('KRF_DEV.store.east.PollutionResult_03_Catdid', {
    extend : 'Ext.data.Store',
    //extend : 'Ext.data.BufferedStore', 
    //  {name:  type: 'number'},
    fields: [
			'YYYY'
			,'WS_NM'
			,'MB_NM'
			,'SB_NM'
			,'CAT_DID'
			,'WUSE_W_SUM'
    ],
    
    remoteSort: true,	
    
    async:false,
    
    listeners: {
		load: function(store) {
			
			var jsonData = "";
			var arrData = [];
			
			
			Ext.Ajax.request({
				url: './resources/jsp/pollution/PollutionSelect_03_Catdid.jsp',
        		params: { 
        			catDid: store.catDid
        		},
        		async: false, // 비동기 = async: true, 동기 = async: false
        		//rootProperty : 'items',
        		success : function(response, opts) {
        			
        			jsonData = Ext.util.JSON.decode( response.responseText );
        			
        			if(jsonData.data.length != 0){
        				store.setData(jsonData.data);
        			}else{
        				return;
        			}
        			
        		},
        		failure: function(form, action) {
        			// 
        			
        			alert("오류가 발생하였습니다.");
        		}
        	});
			
		}
    }
});