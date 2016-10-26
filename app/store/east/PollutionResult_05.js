Ext.define('KRF_DEV.store.east.PollutionResult_05', {
    extend : 'Ext.data.Store',
    //extend : 'Ext.data.BufferedStore', 
    //  ,{name: '' type: 'number'}
    fields: [
			
    ],
    
    remoteSort: true,	
    
    async:false,
    
    listeners: {
		load: function(store) {
			
			var jsonData = "";
			var url = ""
			
			if(store.selectValue == "11" || store.selectValue == ""){
				url= './resources/jsp/pollution/PollutionSelect_05_01.jsp';
			}else if(store.selectValue == "22"){
				url= './resources/jsp/pollution/PollutionSelect_05_02.jsp';
			}else if(store.selectValue == "33"){
				url= './resources/jsp/pollution/PollutionSelect_05_03.jsp';
			}else{
				url= './resources/jsp/pollution/PollutionSelect_05_04.jsp';
			}
			
			Ext.Ajax.request({
        		url: url,
        		params: { 
        			catDid: store.catDid
        		},
        		async: true, // 비동기 = async: true, 동기 = async: false
        		//rootProperty : 'items',
        		success : function(response, opts) {
        			
        			jsonData = Ext.util.JSON.decode( response.responseText );

        			if(jsonData.data[0].msg == undefined || jsonData.data[0].msg == ""){
        				store.setData(jsonData.data);
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