Ext.define('KRF_DEV.store.east.SiteListWindow', {
	//extend: 'Ext.data.Store',
	extend: 'Ext.data.TreeStore',
	/*
	proxy: {
	    type: 'ajax',
	    url: 'resources/data/east/SiteListWindow.json',
	    reader: {
	        type: 'json',
	        root: 'result'
	    }
	},*/

	autoLoad: true,

	remoteSort: true,
    
	initComponent: function(){
		console.info(this.params)
		this.callParent();		
	},	
	bbb : '',
	listeners: {
		load: function(store) {
			
			
			//console.info(store.bbb);
			
			var nameInfo = Ext.getCmp("textSearchText");
			
			//대권역
			var buttonInfo1 = Ext.getCmp("cmbWater1");
			
			//중권역
			var buttonInfo2 = Ext.getCmp("cmbWater2");
			
			//소권역
			var buttonInfo3 = Ext.getCmp("cmbWater3");
			
			//시도
			var amdBtn1 = Ext.getCmp("cmbArea1");
			
			//시군구
			var amdBtn2 = Ext.getCmp("cmbArea2");
			
			//읍변동
			var amdBtn3 = Ext.getCmp("cmbArea3");
			//http://cetech.iptime.org:6080/arcgis/rest/services/Layer2/MapServer
			//var queryTask = new esri.tasks.QueryTask('http://112.218.1.243:20002/arcgis/rest/services/reach/MapServer/84'); // 레이어 URL
			var queryTask = new esri.tasks.QueryTask('http://cetech.iptime.org:6080/arcgis/rest/services/reach/MapServer/84'); // 레이어 URL
			var query = new esri.tasks.Query();
			query.returnGeometry = false;
			
			if(buttonInfo1.lastValue != null ){
				if(buttonInfo3.lastValue == null || buttonInfo3.lastValue == ""){
					query.where = "CAT_ID like '"+buttonInfo2.lastValue+"%'";
				}else{
					query.where = "CAT_ID like '"+buttonInfo3.lastValue+"%'";
				}
			}else if(buttonInfo1.lastValue == null && nameInfo.rawValue == ""){
				if(amdBtn2.lastValue == null){
					query.where = "ADM_CD like '"+amdBtn1.lastValue+"%'";
				}else if(amdBtn2.lastValue != null && amdBtn3.lastValue == null){
					query.where = "ADM_CD like '"+amdBtn2.lastValue.substring(0,5)+"%'";
				}else{    
					query.where = "ADM_CD like '"+amdBtn3.lastValue.substring(0,7)+"%'";
				}
				
			}else{
				query.where = "JIJUM_NM like '"+nameInfo.rawValue+"%'";
			}
			
			/*if(buttonInfo2.lastValue != null){
				
			}else{*/
				//query.where = "1=1";	
			//} 
			//query.where = "CAT_ID like '1001%'";
			query.outFields = ["*"];
			queryTask.execute(query, function(result){
				//console.info(result);
				var jsonStr = "[";
				Ext.each(result, function(objLayer, idx, objLayers){
					// 상위 node일때					
						jsonStr += "{\n";
						jsonStr += "	\"id\": \"하천수\",\n";
						jsonStr += "	\"text\": \"하천수\",\n";
						jsonStr += "	\"cls\": "+'"'+"khLee-x-tree-node-text-bold"+'"'+",\n";
						jsonStr += "	\"iconCls\": 'layerNoneImg',\n";
						jsonStr += "	\"checked\": false,\n";
						
						// children node가 있을때
						if(objLayer != null){
							jsonStr += "	\"expanded\": false,\n"; // 펼치기..
							jsonStr += "\n	\"children\": [";
							for(i = 0; i < result.features.length; i++){
								jsonStr += "{\n";
								jsonStr += "		\"id\": \"" + result.features[i].attributes.JIJUM_CODE + "\",\n";
								jsonStr += "		\"text\": \"" + result.features[i].attributes.JIJUM_NM + "\",\n";
								jsonStr += "		\"cls\": "+'"'+"khLee-x-tree-node-text-small-nounder"+'"'+",\n";
								//jsonStr += "		\"iconCls\": "+'"'+"layerIconSize layer"+result.features[i].attributes.CAT_ID+'"'+",\n";
								jsonStr += "		\"leaf\": true,\n";
								jsonStr += "		\"checked\": false\n";
								jsonStr += "	}, ";
								if(i == result.features.length - 1){
									jsonStr = jsonStr.substring(0, jsonStr.length - 2); // 마지막에 "," 빼기
									jsonStr += "]\n}, ";
								}
							}
						}
						// children node가 없을때
						else{
							jsonStr += "	\"leaf\": true"; 
							jsonStr += "\n}, "
						}
					
						
				});
				
				//console.info(jsonStr);
				jsonStr = jsonStr.substring(0, jsonStr.length - 2); // 마지막에 "," 빼기
				jsonStr += "]";
				
				//console.info(jsonStr);
				var jsonData = "";
				jsonData = Ext.util.JSON.decode(jsonStr);
				console.info("before");
				store.setData(jsonData);
				//store.setData(JSON.parse(jsonStr));
				console.info("khLee");
	        });
	  	}
	}
});
