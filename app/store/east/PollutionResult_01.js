Ext.define('KRF_DEV.store.east.PollutionResult_01', {
    extend : 'Ext.data.Store',
    //extend : 'Ext.data.BufferedStore', 
    //  {name:  type: 'number'},
    fields: [
			'YYYY'
			,'WS_NM'
			,'MB_NM'
			,'SB_NM'
			,'CAT_DID'
			,'ADDR'
			,'FINAL_PERCENTAGE'
			,'AREA_A1'
			,'AREA_A2'
			,'AREA_SUM'
			,'REGION'
			,'REGION_DATE'
			,'U_A1_TP_CODE'
			,'U_A1_TP_DATE'
			,'U_A1_TP_NAME'
			,'U_A3_TP_CODE'
			,'U_A3_TP_DATE'
			,'U_A3_TP_NAME'
			,'POP_SUM'
			,'UPOP_SUM'
			,'UPOP_A1_SUM'
			,'UPOP_A1_SEPARATE_WT_SUM'
			,'UPOP_A1_SEPARATE_IT_SUM'
			,'UPOP_A1_COMBINED_WT_SUM'
			,'UPOP_A1_COMBINED_IT_SUM'
			,'UPOP_A2_SUM'
			,'UPOP_A2_SANITARY'
			,'UPOP_A2_SEPTIC'
			,'UPOP_A2_REMOVAL'
			,'SPOP_SUM'
			,'SPOP_A1_SUM'
			,'SPOP_A1_SEPARATE_WT_SUM'
			,'SPOP_A1_SEPARATE_IT_SUM'
			,'SPOP_A1_COMBINED_WT_SUM'
			,'SPOP_A1_COMBINED_IT_SUM'
			,'SPOP_A2_SUM'
			,'SPOP_A2_SANITARY'
			,'SPOP_A2_SEPTIC'
			,'SPOP_A2_REMOVAL'
    ],
    
    remoteSort: true,	
    
    async:false,
    
    listeners: {
		load: function(store) {
			
			var jsonData = "";
			var url = ""
			
			
			if(store.selectValue == "11"){
				url= './resources/jsp/pollution/PollutionSelect_01_01.jsp';
			}else if(store.selectValue == "22"){
				url= './resources/jsp/pollution/PollutionSelect_01_02.jsp';
			}else if(store.selectValue == "33"){
				url= './resources/jsp/pollution/PollutionSelect_01_03.jsp';
			}else{
				url= './resources/jsp/pollution/PollutionSelect_01_04.jsp';
			}
			
			
			Ext.Ajax.request({
        		url: url,
        		params: { 
        			catDid: store.catDid
        		},
        		async: false, // 비동기 = async: true, 동기 = async: false
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