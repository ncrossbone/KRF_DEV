Ext.define('KRF_DEV.store.east.PollutionResult_04', {
    extend : 'Ext.data.Store',
    //extend : 'Ext.data.BufferedStore', 
    //  {name:  type: 'number'},
    fields: [
			'YYYY'
			,'WS_NM'
			,'MB_NM'
			,'SB_NM'
			,'CAT_DID'
			,'TP_TYPE'
			,'AREA_SUM'
			,'AREA_RICE'
			,'AREA_FIELD'
			,'AREA_FLUIT'
			,'AREA_STOCKFARM'
			,'AREA_FOREST'
			,'AREA_SPA'
			,'AREA_SALTFIELD'
			,'AREA_PLATEAU'
			,'AREA_FACTORY'
			,'AREA_EDUCATION'
			,'AREA_PARKING'
			,'AREA_OILING'
			,'AREA_WAREHOUSE'
			,'AREA_ROAD'
			,'AREA_RAILROAD'
			,'AREA_RIVER'
			,'AREA_EMBANKMENT'
			,'AREA_WATERROAD'
			,'AREA_WATERRANGE'
			,'AREA_FISHFARM'
			,'AREA_WATER'
			,'AREA_PARK'
			,'AREA_HEALTH'
			,'AREA_AMUSEMENTPARK'
			,'AREA_RELIGION'
			,'AREA_HISTORICAL'
			,'AREA_GRAVEYARD'
			,'AREA_MIXED'
			,'GOLF_RANGE'
    ],
    
    remoteSort: true,	
    
    async:false,
    
    listeners: {
		load: function(store) {
			
			var jsonData = "";
			var arrData = [];
			
			
			Ext.Ajax.request({
        		url: './resources/jsp/pollution/PollutionSelect_02.jsp',
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