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
	
	listeners: {
		load: function(store) {
			var a = Ext.getCmp("btnADMSelect");
			console.info(a);
					
			
			console.info(store);
			
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
			//var queryTask = new esri.tasks.QueryTask('http://cetech.iptime.org:6080/arcgis/rest/services/reach/MapServer/84'); // 레이어 URL
			var queryTask = new esri.tasks.QueryTask(_mapServiceUrl + '/' + _siteInfoLayerId); // 레이어 URL
			var query = new esri.tasks.Query();
			query.returnGeometry = false;
			
			//console.info(button1.lastValue);
			//console.info(buttonInfo2.lastValue);
			
			if(buttonInfo1.lastValue != null ){
				console.log("수계찾기로검색");
				if(buttonInfo3.lastValue == null || buttonInfo3.lastValue == ""){
					query.where = "CAT_ID like '"+buttonInfo2.lastValue+"%'";
				}else{
					query.where = "CAT_ID like '"+buttonInfo3.lastValue+"%'";
				}
			}else if(buttonInfo1.lastValue == null && nameInfo.rawValue == ""){
				console.log("행정구역찾기로검색");
				if(amdBtn2.lastValue == null){
					query.where = "ADM_CD like '"+amdBtn1.lastValue+"%'";
				}else if(amdBtn2.lastValue != null && amdBtn3.lastValue == null){
					query.where = "ADM_CD like '"+amdBtn2.lastValue.substring(0,5)+"%'";
				}else{    
					query.where = "ADM_CD like '"+amdBtn3.lastValue.substring(0,7)+"%'";
				}
				
			}else{
				console.log("명칭찾기로검색");
				query.where = "JIJUM_NM like '"+nameInfo.rawValue+"%'";
			}
			
			var me = GetCoreMap();
			//console.info("tmp:" + me.reachLayerAdmin.amCD_temp);
			if( me.reachLayerAdmin.amCD_temp != null &&  me.reachLayerAdmin.amCD_temp != ""){
				query.where = "CAT_ID like '" + me.reachLayerAdmin.amCD_temp + "%'";
			}
			
			console.info(query.where);
			
			/*if(buttonInfo2.lastValue != null){
				
			}else{*/
				//query.where = "1=1";	
			//} 
			//query.where = "CAT_ID like '1001%'";
			query.outFields = ["*"];
			queryTask.execute(query, function(result){
				//console.info(result);
				var jsonStr = "[{\n";
				jsonStr += "	\"text\": '수질측정망',\n";
				jsonStr += "	\"cls\": 'khLee-x-tree-node-text-bold',\n";
				jsonStr += "	\"expanded\": true,\n";
				jsonStr += "	\"leaf\": false,\n";
				jsonStr += "	\"children\": [ \n";
				Ext.each(result, function(objLayer, idx, objLayers){
					// 상위 node일때					
						//jsonStr += "{\n";
						//jsonStr += "	\"id\": \"하천수\",\n";
						//jsonStr += "	\"text\": \"하천수\",\n";
						//jsonStr += "	\"cls\": "+'"'+"khLee-x-tree-node-text-bold"+'"'+",\n";
						//jsonStr += "	\"iconCls\": 'layerNoneImg',\n";
						//jsonStr += "	\"checked\": false,\n";
						//console.info(objLayer);
						// children node가 있을때
						//if(objLayer != null){
							var preGubun = "";
							var cnt = 0;
							//jsonStr += "	\"expanded\": false,\n"; // 펼치기..
							//jsonStr += "\n	\"children\": [";
							for(i = 0; i < result.features.length; i++){
								
								if(result.features[i].attributes.GUBUN_CODE != preGubun){
									
									if(i > 0){
										jsonStr = jsonStr.substring(0, jsonStr.length - 2); // 마지막에 "," 빼기
										jsonStr += "\n]}, ";
										cnt = i;
										//console.info(jsonStr);
									}
									
									jsonStr += "{\n";
									jsonStr += "	\"id\": \"" + result.features[i].attributes.GUBUN_CODE + "\",\n";
									jsonStr += "	\"text\": \"" + result.features[i].attributes.LAYER_NM + "\",\n";
									//jsonStr += "	\"cls\": \"khLee-x-tree-node-text-bold\",\n";
									//jsonStr += "	\"iconCls\": \"layerNoneImg\",\n";
									//jsonStr += "	\"checked\": false,\n";
									jsonStr += "	\"expanded\": true,\n"; // 펼치기..
									jsonStr += "	\"children\": [";
									preGubun = result.features[i].attributes.GUBUN_CODE;
								}
								
								//if(result.features[i].attributes.GUBUN_CODE == 'A001'){
								jsonStr += "{\n";
								jsonStr += "		\"id\": \"" + result.features[i].attributes.JIJUM_CODE + "\",\n";
								jsonStr += "		\"text\": \"" + result.features[i].attributes.JIJUM_NM + "\",\n";
								jsonStr += "		\"cls\": \"khLee-x-tree-node-text-small\",\n";
								jsonStr += "		\"iconCls\": \"layerNoneImg\",\n";
								jsonStr += "		\"leaf\": true,\n";
								jsonStr += "		\"checked\": null\n";
								jsonStr += "	}, ";
								
								if(i == cnt){
									//jsonStr = jsonStr.substring(0, jsonStr.length - 2); // 마지막에 "," 빼기
									//jsonStr += "\n], ";
								}
								
							}
						//}
						// children node가 없을때
						//else{
							//jsonStr += "	\"leaf\": true"; 
							//jsonStr += "\n}, "
						//}
					
						
				});
				
				jsonStr = jsonStr.substring(0, jsonStr.length - 2); // 마지막에 "," 빼기
				jsonStr += "]}]}]";
				
				//console.info(jsonStr);
				
				//console.info(jsonStr);
				var jsonData = "";
				//console.info(jsonStr);
				//return;
				jsonData = Ext.util.JSON.decode(jsonStr);
				//console.info(jsonData);
				store.setData(jsonData);
				//store.setData(JSON.parse(jsonStr));

	        });
	  	}
	}
});
