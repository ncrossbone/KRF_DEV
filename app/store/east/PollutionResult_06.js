Ext.define('KRF_DEV.store.east.PollutionResult_06', {
    extend : 'Ext.data.Store',
    //extend : 'Ext.data.BufferedStore', 
    //  ,{name: '' type: 'number'},
    fields: [
			'YYYY'
			,'WS_NM'
			,'MB_NM'
			,'SB_NM'
			,'FACI_NM'
			,'ADDR'
			,{name: 'FINAL_PERCENTAGE' ,type: 'number'}
			,'WORK_DT'
			,{name: 'PRODUCT_AMT' ,type: 'number'}
			
			,{name: 'DISCHARGE_AMT', type: 'number'}
			
			,{name: 'PRODUCT_BOD' ,type: 'number'}
			
			,{name: 'PRODUCT_COD' ,type: 'number'}
			
			,{name: 'PRODUCT_TN' ,type: 'number'}
			
			,{name: 'PRODUCT_TP' ,type: 'number'}
			
			,{name: 'DISCHARGE_BOD' ,type: 'number'}
			
			,{name: 'DISCHARGE_COD' ,type: 'number'}
			
			,{name: 'DISCHARGE_TN' ,type: 'number'}
			
			,{name: 'DISCHARGE_TP' ,type: 'number'}
			
    ],
    
    remoteSort: true,	
    
    async:false,
    
    listeners: {
		load: function(store) {
			
			var jsonData = "";
			var url = ""
			
			if(store.selectValue == "11"){
				url= './resources/jsp/pollution/PollutionSelect_06_01.jsp';
			}else if(store.selectValue == "22"){
				url= './resources/jsp/pollution/PollutionSelect_06_02.jsp';
			}else if(store.selectValue == "33"){
				url= './resources/jsp/pollution/PollutionSelect_06_03.jsp';
			}else{
				url= './resources/jsp/pollution/PollutionSelect_06_04.jsp';
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