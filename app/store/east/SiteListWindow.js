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

	//autoLoad: true,

	remoteSort: true,
	
	listeners: {
		load: function(store) {
			var a = Ext.getCmp("btnADMSelect");
			
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
			console.info(_mapServiceUrl);
			console.info(_siteInfoLayerId);
			var query = new esri.tasks.Query();
			query.returnGeometry = false;
			
			//console.info(button1.lastValue);
			//console.info(buttonInfo2.lastValue);
			
			if(buttonInfo1.lastValue != null ){
				//console.log("수계찾기로검색");
				if(buttonInfo3.lastValue == null || buttonInfo3.lastValue == ""){
					query.where = "CAT_ID like '"+buttonInfo2.lastValue+"%'";
				}else{
					query.where = "CAT_ID like '"+buttonInfo3.lastValue+"%'";
				}
			}else if(buttonInfo1.lastValue == null && nameInfo.rawValue == ""){
				//console.log("행정구역찾기로검색");
				if(amdBtn2.lastValue == null){
					query.where = "ADM_CD like '"+amdBtn1.lastValue+"%'";
				}else if(amdBtn2.lastValue != null && amdBtn3.lastValue == null){
					query.where = "ADM_CD like '"+amdBtn2.lastValue.substring(0,5)+"%'";
				}else{    
					query.where = "ADM_CD like '"+amdBtn3.lastValue.substring(0,7)+"%'";
				}
				
			}else{
				//console.log("명칭찾기로검색");
				query.where = "JIJUM_NM like '"+nameInfo.rawValue+"%'";
			}
			
			/* 리치모드 지점목록 조건 설정 */
			var me = GetCoreMap();
			
			var reachBtn = Ext.getCmp("btnModeReach");
			console.info(reachBtn.src.indexOf("_on"));
			
			if(reachBtn.src.indexOf("_on") > -1 && me.reachLayerAdmin.selAreaGraphics.length > 0){
				
				query.where = "CAT_ID IN (";
				
				for(var i = 0; i < me.reachLayerAdmin.selAreaGraphics.length; i++){
					//console.info(me.reachLayerAdmin.selAreaGraphics[i]);
					query.where += "'" + me.reachLayerAdmin.selAreaGraphics[i].attributes.CAT_ID + "', ";
				}
				
				query.where = query.where.substring(0, query.where.length - 2);
				query.where += ")";
			}
			
			/*if(buttonInfo2.lastValue != null){
				
			}else{*/
				//query.where = "1=1";	
			//} 
			//query.where = "CAT_ID like '1001%'";
			query.outFields = ["*"];
			queryTask.execute(query, function(result){
				console.info(result);
				var jsonStr = " { \"id\": \"0\", \n";
					jsonStr += "\"text\":  \"root\", \n";
					jsonStr += "\"cls\": 'khLee-x-tree-node-text-bold', \n";
					//jsonStr += "\"iconCls\": 'layerNoneImg', \n";
					jsonStr += "\"checked\": true, \n";
					jsonStr += "\"expanded\": true, \n";
					jsonStr += "\"children\":  \n";
				jsonStr += "[\n";
				
				Ext.each(result, function(objLayer, idx, objLayers){
					
					console.info(result);
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
							var groupGubun ="";
							var cnt = 0;
							var aa = "";
							//jsonStr += "	\"expanded\": false,\n"; // 펼치기..
							//jsonStr += "\n	\"children\": [";
							for(i = 0; i < result.features.length; i++){
								
								
								if(result.features[i].attributes.GROUP_CODE != groupGubun){
									
									
									if(i != "0"){
										
										aa = i;
										
										console.log("!!");
										console.info(aa);
										console.info(i);
										console.log("!!");
											jsonStr = jsonStr.substring(0, jsonStr.length - 2); // 마지막에 "," 빼기
											jsonStr += "\n]}]}, ";
									}
									
								jsonStr += "{	\"id\": \"" + result.features[i].attributes.GROUP_CODE + "\",\n";
								jsonStr += "	\"text\": \"" + result.features[i].attributes.GROUP_NM + "\",\n";
								jsonStr += "	\"cls\": 'khLee-x-tree-node-text-bold',\n";
								if(i == 0){
									jsonStr += "	\"expanded\": true,\n";
								}else{
									jsonStr += "	\"expanded\": false,\n";
								}
								//jsonStr += "	\"expanded\": true,\n";
								jsonStr += "	\"checked\": null,\n";
								jsonStr += "	\"children\": [ \n";
								
								}
								
								if(result.features[i].attributes.LAYER_CODE != preGubun){
									
									/*console.info(i);
									console.info(result.features[i].attributes.GROUP_CODE);
									console.info(groupGubun);*/
									
									
									if(i > 0){
										if(aa == i){
											jsonStr = jsonStr.substring(0, jsonStr.length - 2); // 마지막에 "," 빼기
										}else{
											//console.info(result.features[i].attributes.LAYER_NM);
											jsonStr = jsonStr.substring(0, jsonStr.length - 2); // 마지막에 "," 빼기
											jsonStr += "\n]}, ";
											cnt = i;
										}
										//console.info(jsonStr);
									}
									
									//if(result.features[i].attributes.GUBUN_CODE == 'A001'){
									jsonStr += "{\n";
									jsonStr += "	\"id\": \"" + result.features[i].attributes.LAYER_CODE + "\",\n";
									jsonStr += "	\"text\": \"" + result.features[i].attributes.LAYER_NM + "\",\n";
									//jsonStr += "	\"cls\": \"khLee-x-tree-node-text-bold\",\n";
									//jsonStr += "	\"iconCls\": \"layerNoneImg\",\n";
									//jsonStr += "	\"checked\": false,\n";
									if(i == 0 ){
										jsonStr += "	\"expanded\": true,\n"; // 펼치기..
									}else{
										jsonStr += "	\"expanded\": false,\n"; // 펼치기..
									}
									//jsonStr += "	\"expanded\": false,\n"; // 펼치기..
									jsonStr += "	\"children\": [";
									preGubun = result.features[i].attributes.LAYER_CODE;
									groupGubun = result.features[i].attributes.GROUP_CODE;
								}
								
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
				jsonStr += "]}]}]}";
				
				var jsonData = "";
				//console.info(jsonStr);
				jsonData = Ext.util.JSON.decode(jsonStr);
				//console.info(jsonData);
				//store.setData(jsonData);
				store.setRootNode(jsonData);
				//console.info(store);
				//store.setData(JSON.parse(jsonStr));

	        });
	  	}
	}
});
